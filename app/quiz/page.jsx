import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState("select"); // select, quiz, result
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [score, setScore] = useState(null);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch topics when a subject is selected
  useEffect(() => {
    if (!selectedSubject) return;

    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/topics/subject/${selectedSubject._id}`
        );
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [selectedSubject]);

  // Timer for quiz
  useEffect(() => {
    if (step !== "quiz" || !timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleQuizSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const startQuiz = async () => {
    try {
      setLoading(true);

      // Fetch questions for the selected topic
      const response = await fetch(
        `/api/questions/topic/${selectedTopic._id}/random`
      );
      const data = await response.json();

      if (data.length === 0) {
        alert(
          "No questions available for this topic. Please try another topic."
        );
        return;
      }

      setQuestions(data);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setStep("quiz");
      setTimeLeft(30 * 60); // 30 minutes in seconds
      setQuizStartTime(new Date());
      setQuizEndTime(null);
      setScore(null);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const scorePercentage = Math.round(
      (correctAnswers / questions.length) * 100
    );
    setScore(scorePercentage);
    setQuizEndTime(new Date());
    setStep("result");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "0:00";
    const diffInSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
    return formatTime(diffInSeconds);
  };

  const restartQuiz = () => {
    setStep("select");
    setSelectedSubject(null);
    setSelectedTopic(null);
    setQuestions([]);
    setAnswers({});
  };

  const renderSelectScreen = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Start a Quiz</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-indigo-600">
          <h2 className="text-xl font-semibold text-white">Select a Subject</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject._id}
                onClick={() => handleSubjectSelect(subject)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedSubject?._id === subject._id
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {subject.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
            {subjects.length === 0 && !loading && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No subjects available. Please add subjects first.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedSubject && (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-indigo-600">
            <h2 className="text-xl font-semibold text-white">Select a Topic</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <button
                  key={topic._id}
                  onClick={() => handleTopicSelect(topic)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedTopic?._id === topic._id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                      <BookOpenIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {topic.name}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
              {topics.length === 0 && !loading && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No topics available for this subject. Please select another
                  subject.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>

        <button
          onClick={startQuiz}
          disabled={!selectedTopic || loading}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
            !selectedTopic || loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          Start Quiz
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderQuizScreen = () => {
    if (questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Quiz header */}
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {selectedTopic?.name} Quiz
              </h2>
              <div className="flex items-center text-indigo-100 bg-indigo-700 px-3 py-1 rounded-full">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center text-indigo-100">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>
                {Object.keys(answers).length} of {questions.length} answered
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1">
            <div
              className="bg-indigo-600 h-1"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>

          {/* Question */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion._id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    answers[currentQuestion._id] === index
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className="flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                      answers[currentQuestion._id] === index
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-300'
                    }"
                    >
                      <span className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentQuestionIndex === 0
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleQuizSubmit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Quiz
                <CheckCircleIcon className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question navigator */}
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  answers[q._id] !== undefined
                    ? "bg-indigo-600 text-white"
                    : currentQuestionIndex === index
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResultScreen = () => {
    const correctAnswers = questions.filter(
      (q) => answers[q._id] === q.correctAnswer
    ).length;
    const incorrectAnswers = questions.filter(
      (q) => answers[q._id] !== undefined && answers[q._id] !== q.correctAnswer
    ).length;
    const unanswered = questions.length - correctAnswers - incorrectAnswers;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Result header */}
          <div className="bg-indigo-600 px-6 py-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Quiz Completed!
            </h2>
            <div className="text-5xl font-bold text-white mb-4">{score}%</div>
            <p className="text-indigo-100">
              {score >= 80
                ? "Excellent work!"
                : score >= 60
                ? "Good job!"
                : "Keep practicing!"}
            </p>
          </div>

          {/* Stats */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-2">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {correctAnswers}
                </div>
                <div className="text-sm text-green-600">Correct</div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-2">
                  <XCircleIcon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-700">
                  {incorrectAnswers}
                </div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-2">
                  <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-700">
                  {unanswered}
                </div>
                <div className="text-sm text-gray-600">Unanswered</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quiz Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Topic:</span>
                  <span className="font-medium">{selectedTopic?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{selectedSubject?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Taken:</span>
                  <span className="font-medium">{calculateTimeTaken()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review answers */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Review Your Answers
            </h3>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        answers[question._id] === question.correctAnswer
                          ? "bg-green-100 text-green-700"
                          : answers[question._id] !== undefined
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-2">
                        {question.question}
                      </p>
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              optIndex === question.correctAnswer
                                ? "bg-green-50 border border-green-200"
                                : answers[question._id] === optIndex &&
                                  optIndex !== question.correctAnswer
                                ? "bg-red-50 border border-red-200"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
                                  optIndex === question.correctAnswer
                                    ? "bg-green-100 text-green-700"
                                    : answers[question._id] === optIndex &&
                                      optIndex !== question.correctAnswer
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                <span className="text-xs font-medium">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                              </div>
                              <span
                                className={`text-sm ${
                                  optIndex === question.correctAnswer
                                    ? "text-green-800"
                                    : answers[question._id] === optIndex &&
                                      optIndex !== question.correctAnswer
                                    ? "text-red-800"
                                    : "text-gray-800"
                                }`}
                              >
                                {option}
                              </span>
                              {optIndex === question.correctAnswer && (
                                <CheckCircleIcon className="ml-auto h-5 w-5 text-green-500" />
                              )}
                              {answers[question._id] === optIndex &&
                                optIndex !== question.correctAnswer && (
                                  <XCircleIcon className="ml-auto h-5 w-5 text-red-500" />
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Explanation:</span>{" "}
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4 justify-between">
            <button
              onClick={restartQuiz}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Another Quiz
            </button>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  router.push(`/topics/${selectedTopic?._id}/study`)
                }
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Study This Topic
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && step === "select") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {step === "select" && renderSelectScreen()}
      {step === "quiz" && renderQuizScreen()}
      {step === "result" && renderResultScreen()}
    </div>
  );
}

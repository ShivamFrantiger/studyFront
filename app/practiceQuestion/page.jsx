"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Award, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function MLQuizPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // Quiz questions covering all three learning types
    const questions = [
        {
            id: 1,
            category: "Supervised Learning",
            question: "Which of the following is NOT a characteristic of supervised learning?",
            options: [
                "Uses labeled data for training",
                "Learns patterns without explicit labels",
                "Can be used for classification problems",
                "Requires a target variable"
            ],
            correctAnswer: 1,
            explanation: "Supervised learning uses labeled training data with known outcomes. Learning without explicit labels is a characteristic of unsupervised learning.",
            hint: "Think about what distinguishes supervised learning from unsupervised learning."
        },
        {
            id: 2,
            category: "Supervised Learning",
            question: "Which algorithm is commonly used for regression problems?",
            options: [
                "K-means",
                "Linear Regression",
                "DBSCAN",
                "Principal Component Analysis"
            ],
            correctAnswer: 1,
            explanation: "Linear Regression is a supervised learning algorithm used for predicting continuous values in regression problems.",
            hint: "Consider which algorithm is designed to predict numerical values rather than categories."
        },
        {
            id: 3,
            category: "Supervised Learning",
            question: "What is the main purpose of cross-validation in supervised learning?",
            options: [
                "To speed up model training",
                "To reduce the need for labeled data",
                "To prevent overfitting",
                "To visualize high-dimensional data"
            ],
            correctAnswer: 2,
            explanation: "Cross-validation helps prevent overfitting by evaluating how the model performs on different subsets of data.",
            hint: "It's related to making sure your model generalizes well to new data."
        },
        {
            id: 4,
            category: "Unsupervised Learning",
            question: "K-means is an example of which type of unsupervised learning?",
            options: [
                "Dimensionality reduction",
                "Clustering",
                "Association rule learning",
                "Density estimation"
            ],
            correctAnswer: 1,
            explanation: "K-means is a clustering algorithm that groups similar data points into clusters.",
            hint: "It divides data into groups based on similarity."
        },
        {
            id: 5,
            category: "Unsupervised Learning",
            question: "What is the primary purpose of Principal Component Analysis (PCA)?",
            options: [
                "Classification of data",
                "Regression analysis",
                "Dimensionality reduction",
                "Reinforcement learning"
            ],
            correctAnswer: 2,
            explanation: "PCA is used for dimensionality reduction while preserving as much variance in the data as possible.",
            hint: "It's commonly used when you have too many features and want to reduce them."
        },
        {
            id: 6,
            category: "Unsupervised Learning",
            question: "Which statement about unsupervised learning is correct?",
            options: [
                "It requires labeled training data",
                "It always performs better than supervised learning",
                "It works with unlabeled data",
                "It can't be used for clustering"
            ],
            correctAnswer: 2,
            explanation: "Unsupervised learning works with unlabeled data to find patterns and structures without known outcomes.",
            hint: "Think about what kind of input data unsupervised learning uses."
        },
        {
            id: 7,
            category: "Reinforcement Learning",
            question: "In reinforcement learning, what is an agent?",
            options: [
                "The training dataset",
                "The decision-making entity that interacts with the environment",
                "The reward function",
                "The validation set"
            ],
            correctAnswer: 1,
            explanation: "In reinforcement learning, the agent is the decision-making entity that interacts with the environment to learn optimal behavior.",
            hint: "It's the part of the system that makes decisions and learns from feedback."
        },
        {
            id: 8,
            category: "Reinforcement Learning",
            question: "What guides the learning process in reinforcement learning?",
            options: [
                "Labeled examples",
                "Clustering similarity",
                "Rewards and penalties",
                "Feature extraction"
            ],
            correctAnswer: 2,
            explanation: "Reinforcement learning uses rewards and penalties to guide the learning process, encouraging desirable behaviors and discouraging undesirable ones.",
            hint: "Think about how the algorithm knows if it's doing well or poorly."
        },
        {
            id: 9,
            category: "Reinforcement Learning",
            question: "Which of the following is an application of reinforcement learning?",
            options: [
                "Email spam detection",
                "Customer segmentation",
                "Image classification",
                "Game playing AI"
            ],
            correctAnswer: 3,
            explanation: "Game playing AI is a common application of reinforcement learning, where agents learn optimal strategies through repeated interactions with the game environment.",
            hint: "Think about applications where an AI needs to make sequential decisions."
        },
        {
            id: 10,
            category: "Mixed",
            question: "Which learning paradigm would be most appropriate for a self-driving car?",
            options: [
                "Only supervised learning",
                "Only unsupervised learning",
                "Only reinforcement learning",
                "A combination of supervised and reinforcement learning"
            ],
            correctAnswer: 3,
            explanation: "Self-driving cars typically use supervised learning for perception tasks (like object detection) and reinforcement learning for decision-making and control.",
            hint: "Consider the different tasks a self-driving car needs to perform."
        }
    ];

    useEffect(() => {
        if (quizStarted && !quizCompleted) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [quizStarted, quizCompleted]);

    const startQuiz = () => {
        setQuizStarted(true);
        setTimeRemaining(600); // 10 minutes in seconds
        setScore(0);
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
    };

    const handleAnswerSelect = (answerIndex) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(answerIndex);
        }
    };

    const checkAnswer = () => {
        if (selectedAnswer !== null) {
            setIsAnswerChecked(true);
            if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
                setScore(score + 1);
            }
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
            setShowHint(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        startQuiz();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    const toggleHint = () => {
        setShowHint(!showHint);
    };

    const renderQuizIntro = () => (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Machine Learning Quiz</h1>
            <p className="mb-6 text-gray-600">
                Test your knowledge on Supervised Learning, Unsupervised Learning, and Reinforcement Learning.
            </p>

            <div className="mb-8 text-left">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Quiz Details:</h2>
                <ul className="space-y-2 text-gray-600">
                    <li>• 10 questions covering key machine learning concepts</li>
                    <li>• Topics include classification, regression, clustering, and more</li>
                    <li>• 10 minutes time limit</li>
                    <li>• Explanations provided for each answer</li>
                </ul>
            </div>

            <button
                onClick={startQuiz}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Start Quiz
            </button>
        </div>
    );

    const renderQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <span className="font-medium text-gray-500">
                        Question {currentQuestionIndex + 1}/{questions.length}
                    </span>
                    <span className="font-medium text-gray-500">
                        Time Remaining: {formatTime(timeRemaining)}
                    </span>
                </div>

                <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {currentQuestion.category}
                    </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>

                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === index
                                ? isAnswerChecked
                                    ? index === currentQuestion.correctAnswer
                                        ? 'bg-green-100 border-green-500'
                                        : 'bg-red-100 border-red-500'
                                    : 'bg-indigo-100 border-indigo-500'
                                : isAnswerChecked && index === currentQuestion.correctAnswer
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className="mr-3 flex-shrink-0">
                                    {isAnswerChecked && index === currentQuestion.correctAnswer && (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    )}
                                    {isAnswerChecked && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                    {(!isAnswerChecked || (index !== currentQuestion.correctAnswer && selectedAnswer !== index)) && (
                                        <div className={`h-5 w-5 rounded-full border ${selectedAnswer === index ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                                            }`}>
                                        </div>
                                    )}
                                </div>
                                <span className="text-gray-700">{option}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {isAnswerChecked && (
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h3 className="font-medium text-blue-800 mb-1">Explanation</h3>
                            <p className="text-blue-700">{currentQuestion.explanation}</p>
                        </div>
                    )}

                    {showHint && !isAnswerChecked && (
                        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                            <h3 className="font-medium text-yellow-800 mb-1">Hint</h3>
                            <p className="text-yellow-700">{currentQuestion.hint}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 justify-between">
                        {!isAnswerChecked ? (
                            <>
                                <button
                                    onClick={toggleHint}
                                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md flex items-center hover:bg-yellow-200 transition-colors"
                                >
                                    <HelpCircle className="w-4 h-4 mr-2" />
                                    {showHint ? "Hide Hint" : "Show Hint"}
                                </button>
                                <button
                                    onClick={checkAnswer}
                                    disabled={selectedAnswer === null}
                                    className={`px-4 py-2 rounded-md flex items-center ${selectedAnswer === null
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        } transition-colors`}
                                >
                                    Check Answer
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors ml-auto"
                            >
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <>
                                        Next Question <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                ) : (
                                    "Finish Quiz"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        const percentage = (score / questions.length) * 100;
        let message, messageClass;

        if (percentage >= 90) {
            message = "Outstanding! You're a machine learning expert!";
            messageClass = "text-green-600";
        } else if (percentage >= 70) {
            message = "Great job! You have a solid understanding of machine learning concepts.";
            messageClass = "text-blue-600";
        } else if (percentage >= 50) {
            message = "Good effort! You know the basics, but there's room for improvement.";
            messageClass = "text-yellow-600";
        } else {
            message = "Keep studying! Machine learning takes time to master.";
            messageClass = "text-red-600";
        }

        return (
            <div className="p-8 text-center">
                <Award className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                <p className={`text-lg font-medium mb-6 ${messageClass}`}>{message}</p>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="text-5xl font-bold text-gray-700 mb-2">
                        {score} / {questions.length}
                    </div>
                    <div className="text-xl text-gray-500">
                        {percentage.toFixed(0)}% Score
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                        <div
                            className={`h-4 rounded-full ${percentage >= 70 ? 'bg-green-500' :
                                percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <button
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" /> Try Again
                    </button>

                    <button
                        onClick={() => {
                            // This would typically navigate to a review page or show detailed answers
                            // For now, we'll just reset and start over
                            // resetQuiz();
                            () => router.push('/upload'); // Redirect to home or another page
                        }}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    >
                        Back to Uploads
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {!quizStarted ? (
                    renderQuizIntro()
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {!quizCompleted ? renderQuestion() : renderResults()}
                    </div>
                )}
            </div>
        </div>
    );
}
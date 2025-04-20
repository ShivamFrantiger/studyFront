'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import { Play, StopCircle, Clock, CheckCircle } from "lucide-react";

export default function ExamSimulationPage() {
    const [exams, setExams] = useState([
        { id: 1, title: "Machine Learning Basics", duration: 60 },
        { id: 2, title: "Data Structures and Algorithms", duration: 90 },
        { id: 3, title: "Introduction to AI", duration: 120 },
    ]);

    const [selectedExam, setSelectedExam] = useState(null);
    const [isExamRunning, setIsExamRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Timer logic
    useEffect(() => {
        if (isExamRunning && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isExamRunning) {
            endExam();
        }
    }, [isExamRunning, timeLeft]);

    const startExam = (exam) => {
        setSelectedExam(exam);
        setTimeLeft(exam.duration * 60); // Convert minutes to seconds
        setIsExamRunning(true);
    };

    const endExam = () => {
        setIsExamRunning(false);
        alert("Time's up! The exam has ended.");
        setSelectedExam(null);
        setTimeLeft(0);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <>
            <Head>
                <title>Exam Simulation | StudyBuddy AI</title>
                <meta
                    name="description"
                    content="Simulate real test conditions with full-length practice exams on StudyBuddy AI."
                />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Exam Simulation
                        </h1>
                        <p className="mt-3 text-xl text-gray-600">
                            Mimic real test conditions with full-length practice exams.
                        </p>
                    </div>

                    {!isExamRunning ? (
                        <>
                            {/* Exam List */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    Available Exams
                                </h2>
                                {exams.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {exams.map((exam) => (
                                            <li key={exam.id} className="py-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        Duration: {exam.duration} minutes
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => startExam(exam)}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Start Exam
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No exams available at the moment.</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Exam Simulation */}
                            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {selectedExam?.title}
                                </h2>

                                {/* Timer */}
                                <div className="flex justify-center items-center space-x-3 mb-6">
                                    <Clock className="h-8 w-8 text-indigo-600" />
                                    <span className="text-xl font-semibold text-gray-900">
                                        Time Left: {formatTime(timeLeft)}
                                    </span>
                                </div>

                                {/* End Exam Button */}
                                <button
                                    onClick={endExam}
                                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    End Exam
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

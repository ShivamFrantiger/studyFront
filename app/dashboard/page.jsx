"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import {
//   ChartBarIcon,
//   BookOpenIcon,
//   AcademicCapIcon,
//   ClockIcon,
//   TrophyIcon,
//   ArrowTrendingUpIcon,
//   FireIcon,
// } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    questionsAnswered: 0,
    topicsCompleted: 0,
    studyTime: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // // Fetch user data
        // const userResponse = await fetch("/api/users/profile");
        // const userData = await userResponse.json();
        // setUser(userData);

        // // Fetch subjects
        // const subjectsResponse = await fetch("/api/subjects");
        // const subjectsData = await subjectsResponse.json();
        // setSubjects(subjectsData);

        // // Fetch recent activity
        // const activityResponse = await fetch("/api/users/activity");
        // const activityData = await activityResponse.json();
        // setRecentActivity(activityData);

        // // Fetch user stats
        // const statsResponse = await fetch("/api/users/stats");
        // const statsData = await statsResponse.json();
        // setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-300 flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {user?.name || "User"}!
                </h1>
                <p className="text-indigo-100">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => router.push("/settings")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Settings
              </button>
              <button
                onClick={() => router.push("/study-plan")}
                className="inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                My Study Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <ChartBarIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Questions Answered
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.questionsAnswered}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <BookOpenIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Topics Completed
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.topicsCompleted}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <ClockIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Study Time
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.studyTime} hrs
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <FireIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Current Streak
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.streak} days
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    My Subjects
                  </h3>
                  <Link
                    href="/subjects"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {subjects.slice(0, 5).map((subject) => (
                  <li key={subject._id}>
                    <Link
                      href={`/subjects/${subject._id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                              <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                {subject.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {subject.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div
                                    className="bg-indigo-600 h-2.5 rounded-full"
                                    style={{
                                      width: `${subject.progress || 0}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500">
                                  {subject.progress || 0}%
                                </span>
                              </div>
                            </div>
                            <ArrowTrendingUpIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                {subjects.length === 0 && (
                  <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                    No subjects found. Start by adding some subjects to your
                    study plan.
                  </li>
                )}
              </ul>
              {subjects.length > 0 && (
                <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                  <Link
                    href="/subjects"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    Browse All Subjects
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity & Leaderboard */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <ul className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <li key={index} className="flex space-x-3">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full ${
                          activity.type === "quiz"
                            ? "bg-green-100"
                            : activity.type === "note"
                            ? "bg-blue-100"
                            : "bg-yellow-100"
                        } flex items-center justify-center`}
                      >
                        {activity.type === "quiz" ? (
                          <ChartBarIcon className="h-4 w-4 text-green-600" />
                        ) : activity.type === "note" ? (
                          <BookOpenIcon className="h-4 w-4 text-blue-600" />
                        ) : (
                          <AcademicCapIcon className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                  {recentActivity.length === 0 && (
                    <li className="text-center text-gray-500 py-4">
                      No recent activity. Start studying to see your activity
                      here.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Top Leaderboard */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Top Performers
                  </h3>
                  <Link
                    href="/leaderboard"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <ul className="space-y-3">
                  {[1, 2, 3].map((position) => (
                    <li key={position} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 text-center font-bold text-gray-500">
                        {position}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium text-xs">
                            JD
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          John Doe
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          950 pts
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link
                    href="/leaderboard"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <TrophyIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    View Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => router.push("/practice")}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ChartBarIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Practice Quiz
              </span>
            </button>
            <button
              onClick={() => router.push("/flashcards")}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <BookOpenIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Flashcards
              </span>
            </button>
            <button
              onClick={() => router.push("/notes")}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <AcademicCapIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Study Notes
              </span>
            </button>
            <button
              onClick={() => router.push("/leaderboard")}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6"
            >
              {" "}
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

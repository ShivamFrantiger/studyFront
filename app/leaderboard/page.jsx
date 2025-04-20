"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Leaderboard() {
  const router = useRouter();
  const { subjectId } = router.query;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    if (!subjectId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch subject details
        const subjectResponse = await fetch(`/api/subjects/${subjectId}`);
        const subjectData = await subjectResponse.json();
        setSubject(subjectData);

        // Fetch leaderboard data
        const leaderboardResponse = await fetch(
          `/api/leaderboard/subject/${subjectId}`
        );
        const leaderboardData = await leaderboardResponse.json();
        setLeaderboardData(leaderboardData);

        // Fetch current user
        const userResponse = await fetch("/api/users/profile");
        const userData = await userResponse.json();
        setCurrentUser(userData);

        // Find current user's rank
        const userRankResponse = await fetch(
          `/api/leaderboard/subject/${subjectId}/user-rank`
        );
        const userRankData = await userRankResponse.json();
        setCurrentUserRank(userRankData.rank);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {subject?.name} Leaderboard
          </h1>
          <p className="text-gray-600">
            See how you rank among the top performers
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Top 3 podium */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 py-8 px-4">
            <div className="flex justify-center items-end space-x-4 sm:space-x-8">
              {/* 2nd place */}
              {leaderboardData[1] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 shadow-lg">
                      {leaderboardData[1].user.profilePicture ? (
                        <Image
                          src={leaderboardData[1].user.profilePicture}
                          alt={leaderboardData[1].user.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-indigo-200 flex items-center justify-center">
                          <span className="text-indigo-700 font-bold text-xl">
                            {leaderboardData[1].user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-indigo-600">
                      <span className="text-indigo-800 font-bold">2</span>
                    </div>
                  </div>
                  <div className="mt-4 h-24 sm:h-28 w-16 sm:w-20 bg-indigo-400 rounded-t-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {leaderboardData[1].score}
                    </span>
                  </div>
                  <p className="mt-2 text-white font-medium text-sm truncate max-w-[80px] sm:max-w-[100px]">
                    {leaderboardData[1].user.name}
                  </p>
                </div>
              )}

              {/* 1st place */}
              {leaderboardData[0] && (
                <div className="flex flex-col items-center -mt-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1 shadow-lg">
                      {leaderboardData[0].user.profilePicture ? (
                        <Image
                          src={leaderboardData[0].user.profilePicture}
                          alt={leaderboardData[0].user.name}
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-yellow-100 flex items-center justify-center">
                          <span className="text-yellow-700 font-bold text-2xl">
                            {leaderboardData[0].user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center border-2 border-indigo-600">
                      <span className="text-indigo-800 font-bold text-lg">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-32 sm:h-36 w-20 sm:w-24 bg-indigo-600 rounded-t-lg flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {leaderboardData[0].score}
                    </span>
                  </div>
                  <p className="mt-2 text-white font-medium truncate max-w-[100px] sm:max-w-[120px]">
                    {leaderboardData[0].user.name}
                  </p>
                </div>
              )}

              {/* 3rd place */}
              {leaderboardData[2] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 shadow-lg">
                      {leaderboardData[2].user.profilePicture ? (
                        <Image
                          src={leaderboardData[2].user.profilePicture}
                          alt={leaderboardData[2].user.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-700 font-bold text-xl">
                            {leaderboardData[2].user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center border-2 border-indigo-600">
                      <span className="text-indigo-800 font-bold">3</span>
                    </div>
                  </div>
                  <div className="mt-4 h-20 sm:h-24 w-16 sm:w-20 bg-indigo-300 rounded-t-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {leaderboardData[2].score}
                    </span>
                  </div>
                  <p className="mt-2 text-white font-medium text-sm truncate max-w-[80px] sm:max-w-[100px]">
                    {leaderboardData[2].user.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rest of leaderboard */}
          <div className="divide-y divide-gray-200">
            {leaderboardData.slice(3, 20).map((entry, index) => (
              <div
                key={index}
                className={`flex items-center py-4 px-6 hover:bg-gray-50 ${
                  currentUser && entry.user._id === currentUser._id
                    ? "bg-indigo-50"
                    : ""
                }`}
              >
                <div className="flex-shrink-0 w-10 text-center font-bold text-gray-700">
                  {index + 4}
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {entry.user.profilePicture ? (
                      <Image
                        src={entry.user.profilePicture}
                        alt={entry.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">
                          {entry.user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {entry.user.name}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {entry.score} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current user's position if not in top 20 */}
        {currentUser && currentUserRank > 20 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="py-2 px-6 bg-indigo-50 border-t-2 border-indigo-600">
              <p className="text-sm text-center text-indigo-700 font-medium">
                Your Position
              </p>
            </div>
            <div className="flex items-center py-4 px-6 bg-white">
              <div className="flex-shrink-0 w-10 text-center font-bold text-gray-700">
                {currentUserRank}
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {currentUser.profilePicture ? (
                    <Image
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">
                        {currentUser.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser.name}{" "}
                  <span className="text-indigo-600">(You)</span>
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {currentUser.score || 0} pts
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Subjects
          </button>
        </div>
      </div>
    </div>
  );
}

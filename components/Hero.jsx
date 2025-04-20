"use client"; // Mark this as a Client Component

import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation for navigation

export default function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Learning Experience with AI
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100">
              StudyBuddy AI turns your course materials into personalized
              learning experiences, interactive exercises, and exam prep tools -
              all powered by artificial intelligence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors text-center"
              >
                Get Started Free
              </button>
              <a
                href="/demo"
                className="px-8 py-4 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-800 transition-colors text-center"
              >
                See How It Works
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/ll-removebg-preview.png"
                alt="AI-powered learning platform"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

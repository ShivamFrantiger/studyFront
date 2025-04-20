"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("student");
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? " http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!isLogin) {
      payload.fullName = e.target.fullName?.value;
      payload.userType = userType;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the dashboard
        router.push("/dashboard");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? "Log In" : "Sign Up"} | StudyBuddy AI</title>
        <meta
          name="description"
          content={
            isLogin
              ? "Log in to your StudyBuddy AI account"
              : "Create your StudyBuddy AI account and start learning smarter"
          }
        />
      </Head>

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16">
          <div className="mb-8">
            <Link
              href="/"
              className=" inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>

          <div className="flex items-center mb-8">
            <div className="h-10 w-10 mr-3">
              <Image
                src="/images/StudyBuddy_logo.png"
                alt="StudyBuddy AI Logo"
                width={40}
                height={40}
              />
            </div>
            <h1 className="text-2xl font-bold text-black">StudyBuddy AI</h1>
          </div>

          <h2 className="text-3xl font-bold text-black mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-black mb-8">
            {isLogin
              ? "Log in to continue your learning journey"
              : "Sign up to start learning smarter with AI"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a password"
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {isLogin && (
                <div className="text-right mt-1">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType("student")}
                    className={`px-4 py-3 rounded-lg border ${userType === "student"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700"
                      } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("teacher")}
                    className={`px-4 py-3 rounded-lg border ${userType === "teacher"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700"
                      } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    Teacher
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
            )}

            {!isLogin && (
              <div className="text-sm text-gray-600">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleAuthMode}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                (window.location.href =
                  "http://localhost:5000/api/social-auth/google")
                  // {
                  //   router.push("dashboard")
                  // }
                }
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-indigo-600">
          <div className="h-full flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-6">
                Transform Your Learning Experience with AI
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                StudyBuddy AI turns your course materials into personalized
                learning experiences, interactive exercises, and exam prep
                tools.
              </p>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                    <span className="text-white font-bold">AS</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Alex Smith</h3>
                    <p className="text-indigo-200 text-sm">
                      Computer Science Student
                    </p>
                  </div>
                </div>
                <p className="italic text-indigo-100">
                  "StudyBuddy AI helped me prepare for my exams in half the
                  time. The personalized practice questions and AI explanations
                  made complex topics much easier to understand."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

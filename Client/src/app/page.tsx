"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {

const router = useRouter()
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/dashboard");
  }
}, [router]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg">
        Welcome to SEO Blog Generator 🚀
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-xl">
        Generate blog content automatically from trending Reddit, Dev, and LinkedIn posts.
        Organize your content, boost your SEO, and save time creating summaries.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href="/signup"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Turn trending discussions into SEO-friendly blogs instantly!
      </p>
    </div>
  );
}

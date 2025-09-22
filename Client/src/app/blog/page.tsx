"use client";

import { useEffect } from "react";
import BlogForm from "@/components/blogComponent/BlogForm";
import BlogList from "@/components/blogComponent/BlogList";
import { motion } from "framer-motion";
import { Coffee, Globe, LogOut, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

}, [router]);


  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token")
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md z-50 flex justify-between items-center px-6 py-3"
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-lg font-bold text-gray-800">Social Blog Generator</h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-800 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.nav>

      {/* Main content */}
      <main className="pt-24 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg">
            Social Blog Generator
          </h1>
          <p className="mt-2 text-gray-600 flex justify-center items-center gap-2 text-sm">
            Generate blogs automatically from{" "}
            <span className="font-semibold text-purple-700">Reddit</span>,{" "}
            <span className="font-semibold text-blue-700">Dev</span> and{" "}
            <span className="font-semibold text-blue-700">LinkedIn</span> posts
            <Globe size={18} className="text-gray-500" />
          </p>
          <p className="mt-1 text-gray-500 flex justify-center items-center gap-2 text-xs">
            Turn trending discussions into clean blog summaries instantly
            <Coffee size={16} className="animate-bounce text-amber-600" />
          </p>
        </motion.div>

        {/* Blog Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-10"
        >
          <BlogForm  />
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BlogList  />
        </motion.div>
      </main>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, Square } from "lucide-react";
import { truncateContent } from "@/utils/stringTruncate";
import { fetchBlogById } from "../../../redux/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";

export default function BlogPageClient() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(params?.id);
  const router =useRouter()
  const { currentBlog: blog, loading, error } = useSelector((state: any) => state.blogs);

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [speakingPost, setSpeakingPost] = useState<number | null>(null);

  // Fetch blog by ID from Redux slice
  useEffect(() => {
    if (!isNaN(id)) dispatch(fetchBlogById(id));
  }, [id, dispatch]);

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);

useEffect(() => {
  if (!isNaN(id)) {
    dispatch(fetchBlogById(id));
  }
}, [id, dispatch]);


  // Speech Functions
  function speakText(text: string, idx: number) {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingPost(null);
    setSpeakingPost(idx);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    window.speechSynthesis.cancel();
    setSpeakingPost(null);
  }

  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    );



if (!loading && !blog)
  return <p className="text-center mt-10 text-red-500">{error || "Blog not found"}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 relative">
      <button
        onClick={() => router.push("/dashboard")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md 
             border border-gray-200 text-white px-3 py-2 rounded-full shadow-md 
             hover:scale-105 transition z-50"
      >
        <ArrowLeft size={18} />
      </button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <div className="mt-3 flex flex-wrap gap-2">
          {blog.tags.split(",").map((tag: any, i:any) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white shadow-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>

        <p className="mt-2 text-gray-200 text-sm">
          Created: {new Date(blog.createdAt).toLocaleString()}
        </p>
      </motion.div>

      {/* Posts */}
      <div className="space-y-6">
        <AnimatePresence>
          {blog.content &&
            blog.content.map((post: any, idx :any) => {
              const isExpanded = expanded[idx] || false;
              const displayText = isExpanded
                ? post.content
                : truncateContent(post.content, 300);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  }}
                  className="relative p-6 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold text-xl text-gray-900 flex-1">{post.title}</h2>

                    <div>
                      {speakingPost === idx ? (
                        <button
                          onClick={stopSpeech}
                          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-700 transition text-sm"
                        >
                          <Square size={14} /> Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => speakText(post.title + " " + post.content, idx)}
                          className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md transition text-sm
                     bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600"
                        >
                          <Volume2 size={14} /> Listen
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expandable content */}
                  <motion.p
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    className="text-gray-700 mt-3 leading-relaxed"
                  >
                    {displayText}
                  </motion.p>

                  {/* Read more toggle */}
                  {post.content.split(" ").length > 300 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [idx]: !isExpanded,
                        }))
                      }
                      className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

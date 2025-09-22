"use client";

import Navbar from "../../components/dashboardComponent/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBlogs } from "../../redux/slices/BlogSlice";
import { Blog } from "../../redux/Service/BlogService";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "../../components/pagination";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

const PAGE_SIZE = 4;

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    // Fetch blogs via Redux
    dispatch(fetchBlogs());
  }, [dispatch, router]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentBlogs = blogs.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Explore Our Blogs
        </h1>

        {loading ? (
          <div className="space-y-6">
            {[...Array(PAGE_SIZE)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse shadow-lg"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600 mt-6">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No blogs found.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {currentBlogs.map((blog: Blog, idx: number) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                  }}
                  className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer overflow-hidden relative group"
                >
                  {/* Gradient overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-200 opacity-0 group-hover:opacity-25 transition-opacity rounded-3xl pointer-events-none"
                  />

                  <Link href={`/blog/${blog.id}`}>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="mt-3 text-gray-700 text-sm line-clamp-4">
                      {Array.isArray(blog.content)
                        ? blog.content.map((c) => c.content).join(" ").slice(0, 200) + "..."
                        : blog.content}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full shadow"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      className="mt-4 flex items-center gap-2 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform"
                      whileHover={{ scale: 1.05 }}
                    >
                      Read More <ArrowRight size={18} />
                    </motion.div>

                    <p className="mt-3 text-xs text-gray-400">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Pagination
              totalItems={blogs.length}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

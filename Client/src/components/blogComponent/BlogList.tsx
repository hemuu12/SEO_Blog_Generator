"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchBlogs,
  removeBlog,
} from "../../redux/slices/BlogSlice";
import {
  Blog
} from "../../redux/Service/BlogService";
import Link from "next/link";
import { Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../pagination";

const PAGE_SIZE = 5;

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading } = useSelector((state: RootState) => state.blogs);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = async () => {
    if (deleteId === null) return;
    await dispatch(removeBlog(deleteId));
    setDeleteId(null);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentBlogs = blogs.slice(startIndex, startIndex + PAGE_SIZE);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {[...Array(PAGE_SIZE)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );

  if (blogs.length === 0)
    return <p className="text-center mt-10 text-gray-500">No blogs found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {currentBlogs.map((blog: Blog) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
          className="flex justify-between items-center p-6 border cursor-pointer rounded-xl shadow-md transition-all bg-gradient-to-r from-white to-gray-50"
        >
          <div>
            <Link href={`/blog/${blog.id}`} className="text-lg font-bold text-gray-800 hover:text-blue-600">
              {blog.title}
            </Link>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
              Tags: <span className="font-medium">{blog.tags}</span>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => setDeleteId(blog.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
            title="Delete Blog"
          >
            <Trash2 size={20} />
          </button>
        </motion.div>
      ))}

      <Pagination
        totalItems={blogs.length}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center space-y-4"
            >
              <h2 className="text-xl font-bold text-red-600 flex items-center justify-center gap-2">
                <Trash2 size={24} /> Delete Blog
              </h2>
              <p className="text-gray-700">Are you sure you want to delete this blog?</p>
              <div className="flex justify-center gap-4 mt-4">
                <motion.button
                  onClick={handleDelete}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                  whileTap={{ scale: 0.95 }}
                >
                  <Check size={16} /> Yes
                </motion.button>
                <motion.button
                  onClick={() => setDeleteId(null)}
                  className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl"
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} /> No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

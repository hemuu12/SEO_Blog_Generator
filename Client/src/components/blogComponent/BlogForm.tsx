"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createBlog, fetchBlogs } from "../../redux/slices/BlogSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [tagsInput, setTagsInput] = useState("");
  const [creating, setCreating] = useState(false);
  const {  error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tagsInput.trim()) return;

    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    try {
      setCreating(true); // start local loading
      await dispatch(createBlog(tags));
      setTagsInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false); // stop local loading
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        placeholder="Enter tags (comma separated) / Not to use Hashtags"
        value={tagsInput}
        onChange={e => setTagsInput(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        whileFocus={{ scale: 1.02 }}
      />

      <motion.button
        type="submit"
        disabled={creating}
        className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {creating && <Loader2 className="animate-spin" size={20} />}
        {creating ? "Generating..." : "Generate Blog"}
      </motion.button>

      {error && (
        <motion.p
          className="text-red-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.form>
  );
}

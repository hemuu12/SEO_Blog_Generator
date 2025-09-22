"use client";

import { motion } from "framer-motion";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <motion.button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
        whileTap={{ scale: 0.9 }}
      >
        {"<"}
      </motion.button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <motion.button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full transition font-medium ${
            currentPage === page
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
        whileTap={{ scale: 0.9 }}
      >
        {">"}
      </motion.button>
    </div>
  );
}

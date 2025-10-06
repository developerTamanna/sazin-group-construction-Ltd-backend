"use client";
import {FaEdit, FaTrash } from "react-icons/fa";

export default function BlogCard({ post }) {
  return (
<article className=" flex flex-col items-start justify-between gap-3 border w-full max-w-[400px] h-auto p-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">{ post?.job}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        { post?.location} · { post?.jobType}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
       Salary: { post?.salary} TAKA
      </p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{ post?.description}</p>
      <p className="mt-2 text-sm text-gray-500">Deadline: { new Date(post?.deadline).toLocaleDateString()}</p>

        <div className=" px-2 flex items-center justify-center gap-3 w-full">
                      <button
                        className="p-2 rounded-full hover:bg-green-100 text-green-600"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-red-100 text-red-600"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
           </div>
    </article>
  );
}

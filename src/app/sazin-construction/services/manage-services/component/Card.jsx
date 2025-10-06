"use client";
import {FaEdit, FaTrash } from "react-icons/fa";
export default function BlogCard({ post }) {
  return (
<article
    className="flex flex-col items-start justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition h-full"
    role="group"
    aria-label={post?.service}
    >
     <h3 className="text-lg font-semibold text-red-600">{post?.service}</h3>
     <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            {post?.description}
        </p>
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

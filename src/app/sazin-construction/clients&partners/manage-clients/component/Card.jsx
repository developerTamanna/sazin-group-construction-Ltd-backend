"use client";
import {FaEdit, FaTrash } from "react-icons/fa";
export default function BlogCard({ post }) {

  return (
    <article className="border max-w-3xs border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="w-full aspect-[16/9] overflow-hidden">
             <div
                className="group bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-[280px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-gray-200 mb-4">
                  <Icon className="text-red-600 text-3xl" />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {client.name}
                </h3>

                {/* Description (Fixed height, scrollable on hover) */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 overflow-hidden group-hover:overflow-auto transition-all duration-300 h-[60px]">
                  {client.details}
                </p>
            </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-xl font-semibold mt-2 text-neutral-900 dark:text-neutral-100">
          {post.certificateName}
        </h3>


        <div className="p-3 flex items-center justify-center gap-3">
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

      </div>
     </div>
    </article>
  );
}

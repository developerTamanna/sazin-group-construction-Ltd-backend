"use client";
import {FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

export default function BlogCard({ post }) {
const [expanded, setExpanded] = useState(false);
  return (
<article className=" flex flex-col items-start justify-between gap-3 border w-full max-w-[400px] h-auto min-h-[440px]  border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="w-full aspect-[16/9] overflow-hidden">
        <Image
          src={post?.imageUrl}
          alt={post?.newstitle}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </div>

      {/* Content */}
      <div className="px-2">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {new Date(post?.date).toLocaleDateString()} · {post?.author}
        </div>

        <h3 className="text-xl font-semibold mt-2 text-neutral-900 dark:text-neutral-100">
          {post?.newstitle}
        </h3>

        <p className="mt-2 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {expanded
            ? post?.description
            : post?.description?.slice(0, 70) +
              (post?.description?.length > 70 ? "..." : "")}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          disabled={post?.description?.length <= 70}
          aria-expanded={expanded}
          className={`mt-4 inline-block text-red-600 font-semibold ${
            post?.description?.length <= 70
              ? "cursor-not-allowed opacity-50"
              : "hover:underline underline-offset-3"
          } transition`}
        >
          {expanded ? "Show Less →" : "Read More →"}
        </button>
      </div>


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

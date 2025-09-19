"use client";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
export default function BlogCard({ post }) {

  return (
    <article className="border max-w-3xs border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="w-full aspect-[16/9] overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.certificateName}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
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

    </article>
  );
}

"use client";
import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function NewsTable({ news }) {
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Published</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {news?.length > 0 ? (
            news.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 dark:border-neutral-700 ${
                  index % 2 === 1 ? "bg-gray-100 dark:bg-neutral-800" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <img
                    src={item?.image || "/placeholder.png"}
                    alt={item?.title}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                </td>
                <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                  {item?.title}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {item?.category || "General"}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {item?.author || "Unknown"}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
                    title="View"
                  >
                    <FaEye size={18} />
                  </button>
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No news found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
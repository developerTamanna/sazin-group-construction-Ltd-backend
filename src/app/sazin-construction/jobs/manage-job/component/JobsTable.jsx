"use client";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import React from "react";

export default function JobsTable({ jobs }) {
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Salary</th>
            <th className="py-3 px-4">Deadline</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.length > 0 ? (
            jobs.map((job, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 dark:border-neutral-700 ${
                  index % 2 === 1 ? "bg-gray-100 dark:bg-neutral-800" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <img
                    src={job.image || "/placeholder.png"}
                    alt={job.job}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                </td>
                <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                  {job.job}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {job.jobType}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {job.salary} ৳
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {new Date(job.deadline).toLocaleDateString()}
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
                No more Jobs
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

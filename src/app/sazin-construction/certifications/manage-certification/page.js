'use client'
import React, { useRef, useEffect } from "react";
import DynamicQuery from "../../components/DynamicQuery";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = DynamicQuery("certificate");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <p className="text-center">Loading...</p>;
  if (status === "error") return <p className="text-center">Error fetching certificates!</p>;

  return (
    <div className="w-full p-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-100 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Certificate Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Institution</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Year</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((cert, index) => (
                  <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{cert?.title}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cert?.institution || "—"}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cert?.year || "—"}</td>
                    <td className="px-4 py-2 flex justify-center gap-3">
                      <button className="p-2 rounded-full hover:bg-green-100 text-green-600" title="Edit">
                        <FaEdit size={16} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-red-100 text-red-600" title="Delete">
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.data?.map((cert, index) => (
              <div
                key={index}
                className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    {cert?.title}
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-green-100 text-green-600" title="Edit">
                      <FaEdit size={14} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-red-100 text-red-600" title="Delete">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  <strong>Institution:</strong> {cert?.institution || "N/A"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  <strong>Year:</strong> {cert?.year || "N/A"}
                </p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Load more / End indicator */}
      <div ref={loadMoreRef} className="w-full text-center mt-4">
        {isFetchingNextPage && <p className="text-blue-500">Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more certificates</p>}
      </div>
    </div>
  );
}
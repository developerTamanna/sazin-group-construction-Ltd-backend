'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from 'react-icons/fa';
import DynamicQuery from '../../components/DynamicQuery';

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = DynamicQuery('achievement');

  const [expandedCards, setExpandedCards] = useState({});

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
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isLongDescription = (description) => {
    return description && description.length > 100;
  };

  const truncateDescription = (description) => {
    if (!description) return '—';
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  };

  if (status === 'pending')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading achievements...
            </p>
          </div>
        </div>
      </div>
    );

  if (status === 'error')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 font-medium">
              Error fetching achievements!
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrate your accomplishments and milestones. Each achievement
            tells a story of your journey and growth.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Achievement
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data?.pages.map((page, i) => (
                  <React.Fragment key={i}>
                    {page?.data?.map((item, index) => {
                      const isExpanded = expandedCards[item.id || index];
                      const shouldTruncate = isLongDescription(
                        item?.description
                      );

                      return (
                        <tr
                          key={item.id || index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                        >
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item?.achievement}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item?.description ? (
                                <div>
                                  <p
                                    className={
                                      shouldTruncate && !isExpanded
                                        ? 'line-clamp-2'
                                        : ''
                                    }
                                  >
                                    {isExpanded
                                      ? item.description
                                      : truncateDescription(item.description)}
                                  </p>
                                  {shouldTruncate && (
                                    <button
                                      onClick={() =>
                                        toggleExpand(item.id || index)
                                      }
                                      className="mt-2 flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium text-sm"
                                    >
                                      {isExpanded ? (
                                        <>
                                          <FaChevronUp size={12} />
                                          Show Less
                                        </>
                                      ) : (
                                        <>
                                          <FaChevronDown size={12} />
                                          Read More
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 dark:text-gray-500 italic">
                                  No description provided
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center gap-3">
                              <button
                                className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 transform hover:scale-105 shadow-sm"
                                title="Edit"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 transform hover:scale-105 shadow-sm"
                                title="Delete"
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden grid gap-6">
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.data?.map((item, index) => {
                const isExpanded = expandedCards[item.id || index];
                const shouldTruncate = isLongDescription(item?.description);

                return (
                  <div
                    key={item.id || index}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {item?.achievement}
                          </h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 shadow-sm"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 shadow-sm"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      {item?.description ? (
                        <div>
                          <p
                            className={`text-gray-600 dark:text-gray-400 leading-relaxed ${
                              shouldTruncate && !isExpanded
                                ? 'line-clamp-3'
                                : ''
                            }`}
                          >
                            {isExpanded
                              ? item.description
                              : truncateDescription(item.description)}
                          </p>

                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpand(item.id || index)}
                              className="mt-3 flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium text-sm"
                            >
                              {isExpanded ? (
                                <>
                                  <FaChevronUp size={12} />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <FaChevronDown size={12} />
                                  Read More
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          No description provided
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Load More Indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-12">
          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="font-medium">Loading more achievements...</p>
            </div>
          )}
          {!hasNextPage && data?.pages[0]?.data?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                🎉 You've reached the end of your achievements!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

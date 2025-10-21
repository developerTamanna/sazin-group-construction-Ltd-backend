'use client'
import React, { useRef, useEffect } from "react";
import Card from './component/Card'
import DynamicQuery from "../../components/DynamicQuery";

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = DynamicQuery('service');

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
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Loading Services</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch our services</p>
      </div>
    </div>
  );

  if (status === "error") return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="text-center bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-200 dark:border-neutral-700 p-8 max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Connection Error</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">We're unable to load services at the moment. Please check your connection and try again.</p>
        <button
          onClick={() => refetch()}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of professional services designed to meet your needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.data?.map((item, index) => (
                <div key={`${i}-${index}`} className="transform hover:scale-105 transition-all duration-300">
                  <Card post={item} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Loading and End States */}
        <div
          ref={loadMoreRef}
          className="w-full mt-12 py-8 text-center"
        >
          {isFetchingNextPage && (
            <div className="flex flex-col items-center justify-center space-y-4 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">Loading More Services</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch additional services</p>
              </div>
            </div>
          )}
          {!hasNextPage && data?.pages[0]?.data?.length > 0 && (
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">All Services Loaded</h3>
              <p className="text-gray-600 dark:text-gray-400">You've reached the end of our service catalog</p>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!data?.pages[0]?.data?.length && (
        <div className="max-w-2xl mx-auto px-4 text-center py-20">
          <div className="w-32 h-32 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-gray-200 dark:border-neutral-700">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Services Available</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
            We're currently updating our service offerings. Please check back later for our latest services.
          </p>
          <button
            onClick={() => refetch()}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            Refresh Services
          </button>
        </div>
      )}
    </div>
  );
}

'use client'
import React, { useRef, useEffect } from "react";
import DynamicQuery from "../../components/DynamicQuery";
import NewsTable from "./component/NewsTable";


export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = DynamicQuery("news");

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
      { threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <p className="text-center">Loading...</p>;
  if (status === "error") return <p className="text-center">Error fetching news!</p>;

  const news = data?.pages?.flatMap((page) => page?.data) || [];

  return (
    <>
      <NewsTable news={news} />

      <div ref={loadMoreRef} className="w-full text-center mt-5">
        {isFetchingNextPage && <p className="text-blue-500">Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more news</p>}
      </div>
    </>
  );
}
'use client'
import Card from '../components/card'
import React, { useRef, useEffect, use } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./FetchFunction";

export default function QueryFunction({category}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products",category],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam,category ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  useEffect(() => {
    refetch();
  }, [category, refetch]);  

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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error fetching products!</p>;

  return (
      <>
        {data?.pages.map((page, i) => (
         <React.Fragment key={i}>
            {page?.data.map((item) => (
              <div
                key={item.id}
              >
                <Card data={item} />
              </div>
            ))}
        </React.Fragment>
        ))}

      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more products</p>}
      </div>
    </>
  );
}

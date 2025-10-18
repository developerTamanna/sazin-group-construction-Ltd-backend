'use client'
import Card from '../components/card'
import React, { useRef, useEffect, use } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./FetchFunction";

export default function QueryFunction({value ,ky}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products",value,ky],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam,value,ky ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 1000, // 10 seconds
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    refetch();
    console.log("Refetching data...", { value, ky });
  }, [value, refetch, ky]);

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

        <Card data={data} refetch={refetch} />
  

      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more products</p>}
      </div>
    </>
  );
}

'use client'
import React, { useRef, useEffect, use } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./FetchFunction";
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function DynamicTable({value,ky,th}){
  const { dynamicTheme } = useSidebar();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["project",value,ky],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam,value,ky ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    catchTimeout: 10 * 1000, // 10 seconds
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

  <div className="w-full bg-white shadow-md rounded-lg p-4">
      {/* 🔍 Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-3 text-gray-800" size={18} />
          <input
            type="text"
            placeholder="Search a product"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
            <option>Filter by</option>
            <option>Price</option>
            <option>Name</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
            <option>Sort by</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              {th?.map((t=><th className="p-3">{t}</th>))}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200  transition even:bg-gray-50 odd:bg-white"
                  >
                    <td className="p-3">
                      <Image
                        src={item?.image}
                        alt={item?.title}
                        width={80}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </td>
                    <td className={`p-3 font-semi-bold`}>
                      {item?.title}
                    </td>
                    <td className="p-3">{item?.productName}</td>
                    <td className="p-3 font-medium text-gray-700">{item?.price}</td>
                    <td className="p-3 flex items-center justify-center gap-3">
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
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  

      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more products</p>}
      </div>
    </>
  );
}

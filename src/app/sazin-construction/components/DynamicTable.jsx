'use client'
import React, { useRef, useEffect, use, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./FetchFunction";
import Image from 'next/image';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import DeleteProject from "./DeleteProject";
import UpdateProjectForm from "@/components/DynamicUpdateForm";
import ViewProjectDetail from "./ViewProjectDetail";

export default function DynamicTable({value,ky,th,isFeature,path="project",fields}){
  
  const [updateData,setUpdateData]=useState(null);
  const [viewData,setviewData]=useState(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["project",value,ky,isFeature],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam,value,ky,isFeature ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 1000, // 10 seconds
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    refetch();
  }, [value, refetch, ky,isFeature]);
  useEffect(()=>{
      console.log("st",status);
      
  },[status])

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

  if (status === "pending") return <p className="text-center">Loading...</p>;
  if (status === "error") return <p className="text-center">Error fetching products!</p>;

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
            <tr className="text-center">
              {th?.map(((t,i)=><th key={i} className="p-3">{t}</th>))}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 transition even:bg-gray-400 odd:bg-white"
                  >
                    <td className="p-3 relative w-20 h-14">
                      <Image
                        src={item?.imageUrl}
                        alt={item?.title}
                        sizes="80px"
                        fill
                        loading="lazy"
                        priority={false}
                        className="rounded-md object-cover"
                      />
                    </td>
                    <td className={`p-3 font-semi-bold text-center`}>
                      {item?.title}
                    </td>
                    <td className="p-3 text-center">{item?.category}</td>
                    <td className="p-3 font-medium text-gray-700 text-center">{item?.feature?'Yes':"No"}</td>
                    <td className="p-3 flex items-center justify-center gap-3">
                      <button
                        onClick={()=>setviewData(item)}
                        className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
                        title="View"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                         onClick={()=>setUpdateData({item,path,id:item._id,refetch,setUpdateData})}
                         className="p-2 rounded-full hover:bg-green-100 text-green-600"
                         title="Edit"
                       >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={()=>DeleteProject(item?._id,path,refetch)}
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
   
    {updateData && <UpdateProjectForm updateData={updateData} fields={fields}></UpdateProjectForm>}
    {viewData && <ViewProjectDetail project={viewData} setviewData={setviewData}></ViewProjectDetail>}

      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more products</p>}
      </div>
    </>
  );
}

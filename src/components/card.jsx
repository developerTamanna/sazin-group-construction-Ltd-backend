'use client'
import ViewDetail from '@/app/helmet&safty-accessories/components/viewCard';
import axiosInstance from '@/utils/axios';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

function Table({ data,refetch }) {

  const [viewData,setviewData]=useState(null)
  // Handlers
  const deleteProduct = async(id) => {
    console.log(id);
    if (confirm('Are you sure you want to delete this?')) { 
            try{  
              const res = await axiosInstance.delete(`/Helmets&Safety/deleteAction/delete-product?id=${id}`);
              toast.success("deleted successfully")
              console.log("res",res);
                refetch()
              }catch(err){
                  console.log("err",err);                  
                  toast.error(err.response?.data?.message || "request failed")
              }
         }
  };
  return (
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
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
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
                        src={item?.imageUrl}
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
                    <td className="p-3  font-medium text-gray-700">{item?.price}</td>
                    <td className="p-3 ">
                      <div className=' flex items-center justify-center gap-3'>
                      <button
                        onClick={()=>setviewData(item)}
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
                        onClick={()=>deleteProduct(item._id)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-600"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button> 
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {viewData && <ViewDetail product={viewData} setviewData={setviewData}></ViewDetail> }
    </div>
  );
}

export default Table;

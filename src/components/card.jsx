'use client'
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import React from 'react';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Table({ data }) {
  const { dynamicTheme } = useSidebar();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>

        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
           {page?.data?.map((item, index) => (
             <tr
               key={index}
               className={`border-b  ${dynamicTheme?.bgColor} ${dynamicTheme?.hover}`}
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
              <td className={`p-3 font-semibold ${dynamicTheme?.textColor}`}>
                {item?.title}
              </td>
              <td className={`p-3 font-semibold ${dynamicTheme?.textColor}`}>
                {item?.productName}
              </td>
              <td className="p-3">{item?.price}</td>
              <td className="p-3 flex items-center justify-center gap-3">
                {/* View button */}
                <button
                  className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
                  title="View"
                >
                  <FaEye size={18} />
                </button>
                {/* Edit button */}
                <button
                  className="p-2 rounded-full hover:bg-green-100 text-green-600"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                {/* Delete button */}
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
  );
}

export default Table;

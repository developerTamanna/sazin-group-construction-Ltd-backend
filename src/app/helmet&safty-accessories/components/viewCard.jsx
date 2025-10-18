'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { motion } from 'framer-motion';
import { Star, Tag, Percent } from 'lucide-react';
import Image from 'next/image';

const ViewDetail = ({ product, setviewData}) => {
  const { dynamicTheme } = useSidebar();

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        No product data found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${dynamicTheme.mainBg}  fixed top-16 bottom-1 flex items-center justify-center md:p-4 p-2`}
    >
      <div
        className={`relative w-full h-full max-w-3xl ${dynamicTheme.formBg} shadow-2xl rounded-3xl border ${dynamicTheme.cardBorder} overflow-auto`}
      >
        <button
          onClick={()=>setviewData(null)}
          className='cursor-pointer sticky z-[999] top-1 pr-4 w-full text-right text-red-600 text-2xl font-bold'>
          X
          </button>
        {/* Image Section */}
        <div className=" h-full min-h-[85vh]  w-full ">
          <Image
            src={product?.imageUrl}
            alt={product?.title}
            fill
            className="object-fill w-full h-full"
          />
          {product?.isFeatured && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Star className="w-4 h-4" /> Featured
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-700">
              {product?.productName}
            </h2>
            <h4 className="text-lg font-semibold text-gray-700">
              {product?.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {product?.description || 'No description provided.'}
            </p>

            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full ${dynamicTheme.formButton} text-white`}
              >
                {product?.category || 'Uncategorized'}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <div className="text-lg font-medium flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" />
              <span>
                <span className="font-semibold">Price:</span> ৳
                {product?.price}
              </span>
            </div>

            {product?.hasDiscount && (
              <div className="text-lg font-medium flex items-center gap-2">
                <Percent className="w-5 h-5 text-green-600" />
                <span>
                  <span className="font-semibold">Discount:</span>{' '}
                  {product?.discountPercent}%
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1 text-gray-600 text-sm">
              <span>
                <b>Added On:</b>{' '}
                {new Date(product?.postedAt || Date.now()).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewDetail;

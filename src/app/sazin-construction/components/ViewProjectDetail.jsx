'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { motion } from 'framer-motion';
import { CalendarDays, Star, FolderOpen } from 'lucide-react';
import Image from 'next/image';

const ViewProjectDetail = ({ project, setviewData }) => {
  const { dynamicTheme } = useSidebar();

  if (!project) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        No project data found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${dynamicTheme.mainBg} fixed top-16 bottom-1 flex items-center justify-center md:p-4 p-2`}
    >
      <div
        className={`relative w-full h-full max-w-3xl ${dynamicTheme.formBg} shadow-2xl rounded-3xl border ${dynamicTheme.cardBorder} overflow-auto`}
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => setviewData(null)}
          className="cursor-pointer sticky z-[999] top-1 pr-4 w-full text-right text-red-600 text-2xl font-bold"
        >
          X
        </button>

        {/* 🖼 Image Section */}
        <div className="relative h-[300px] w-full">
          <Image
            src={project?.imageUrl || project?.image || '/placeholder.jpg'}
            alt={project?.title || 'Project Image'}
            fill
            className="object-cover w-full h-full rounded-t-3xl"
          />
          {project?.feature && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Star className="w-4 h-4" /> Featured
            </div>
          )}
        </div>

        {/* 🧾 Content Section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-700">{project?.title}</h2>

            <p className="text-gray-700 leading-relaxed">
              {project?.description || 'No description available.'}
            </p>

            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full ${dynamicTheme.formButton} text-white`}
              >
                {project?.category || 'Uncategorized'}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <div className="text-lg font-medium flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <span>
                <b>Completed On:</b>{' '}
                {project?.date
                  ? new Date(project.date).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>

            <div className="text-lg font-medium flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-green-600" />
              <span>
                <b>Category:</b> {project?.category}
              </span>
            </div>

            {project?.feature && (
              <div className="text-lg font-medium flex items-center gap-2 text-yellow-600">
                <Star className="w-5 h-5" /> Marked as Featured
              </div>
            )}

            <div className="flex flex-col gap-1 text-gray-600 text-sm">
              <span>
                <b>Created On:</b>{' '}
                {new Date(project?.createdAt || Date.now()).toLocaleString()}
              </span>
              {project?.updatedAt && (
                <span>
                  <b>Updated On:</b>{' '}
                  {new Date(project.updatedAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewProjectDetail;

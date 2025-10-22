'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/context/SidebarContext';
import { CalendarDays, MapPin, DollarSign } from 'lucide-react';

const ViewJobDetail = ({ job, setviewData }) => {
  const { dynamicTheme } = useSidebar();

  if (!job) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        No job data found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${dynamicTheme.mainBg} fixed top-16 bottom-1 left-0 right-0 flex items-center justify-center md:p-4 p-2 z-50`}
    >
      <div
        className={`relative w-full h-full max-w-3xl ${dynamicTheme.formBg} shadow-2xl rounded-3xl border ${dynamicTheme.cardBorder} overflow-auto`}
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => setviewData(null)}
          className="cursor-pointer sticky top-1 pr-4 w-full text-right text-red-600 text-2xl font-bold z-[999]"
        >
          X
        </button>

        {/* 🧾 Content Section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-700">{job?.job || "Untitled Job"}</h2>

            <p className="text-gray-700 leading-relaxed">
              {job?.description || "No job description available."}
            </p>

            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full ${dynamicTheme.formButton} text-white`}
              >
                {job?.jobType || "N/A"}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <div className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>
                <b>Salary:</b> {job?.salary ? `${job.salary} BDT` : "N/A"}
              </span>
            </div>

            <div className="text-lg font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>
                <b>Location:</b> {job?.location || "Not specified"}
              </span>
            </div>

            <div className="text-lg font-medium flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-red-600" />
              <span>
                <b>Deadline:</b>{" "}
                {job?.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "No deadline"}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-gray-600 text-sm">
              <span>
                <b>Created On:</b>{" "}
                {new Date(job?.createdAt || Date.now()).toLocaleString()}
              </span>
              {job?.updatedAt && (
                <span>
                  <b>Updated On:</b>{" "}
                  {new Date(job.updatedAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewJobDetail;

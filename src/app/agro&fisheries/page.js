"use client";
import React from "react";
import { FaLeaf, FaWater, FaTractor } from "react-icons/fa";

function Page() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-8 text-center">
        Agro & Fisheries Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Agriculture Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">
              Agriculture
            </h2>
            <FaLeaf className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-500 mt-2">
            120+ active crop fields being monitored this season.
          </p>
          <button className="mt-4 text-sm text-green-700 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* Fisheries Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Fisheries</h2>
            <FaWater className="text-blue-500 text-3xl" />
          </div>
          <p className="text-gray-500 mt-2">
            85 ponds under observation for water quality and feed usage.
          </p>
          <button className="mt-4 text-sm text-green-700 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* Equipment Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Equipment</h2>
            <FaTractor className="text-yellow-500 text-3xl" />
          </div>
          <p className="text-gray-500 mt-2">
            47 machines currently in use across all projects.
          </p>
          <button className="mt-4 text-sm text-green-700 font-medium hover:underline">
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;
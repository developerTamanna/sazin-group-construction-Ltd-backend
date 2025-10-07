"use client";
import React from "react";
import { FaHardHat, FaHands, FaShieldAlt, FaUserShield } from "react-icons/fa";

function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-12 tracking-tight">
        Helmet & Safety Accessories
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Helmet Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Helmets</h2>
            <FaHardHat className="text-yellow-500 text-3xl" />
          </div>
          <p className="text-gray-500 text-sm">
            320+ certified helmets available in stock.
          </p>
          <button className="mt-4 text-sm text-blue-700 font-semibold hover:underline">
            View Details
          </button>
        </div>

        {/* Gloves Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Gloves</h2>
            <FaHands className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-500 text-sm">
            210+ pairs of industrial-grade gloves distributed.
          </p>
          <button className="mt-4 text-sm text-blue-700 font-semibold hover:underline">
            View Details
          </button>
        </div>

        {/* Safety Shields */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Safety Shields
            </h2>
            <FaShieldAlt className="text-red-500 text-3xl" />
          </div>
          <p className="text-gray-500 text-sm">
            120+ safety face shields in use across multiple sites.
          </p>
          <button className="mt-4 text-sm text-blue-700 font-semibold hover:underline">
            View Details
          </button>
        </div>

        {/* Supervisors */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Supervisors
            </h2>
            <FaUserShield className="text-blue-600 text-3xl" />
          </div>
          <p className="text-gray-500 text-sm">
            15+ safety supervisors actively monitoring sites.
          </p>
          <button className="mt-4 text-sm text-blue-700 font-semibold hover:underline">
            View Details
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page;
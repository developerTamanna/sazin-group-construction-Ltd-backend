"use client";
import React from "react";
import { FiShoppingCart, FiClock, FiGift } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Sazin Construction Ltd - Admin Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
            <FiShoppingCart className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">67,343</h3>
          <p className="text-sm text-gray-500 mt-1">↑ 15.6% Since last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Purchases</h2>
            <FiClock className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">2,343</h3>
          <p className="text-sm text-gray-500 mt-1">↑ 4.8% Since last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <FiGift className="text-yellow-500 text-2xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">35,343</h3>
          <p className="text-sm text-gray-500 mt-1">↑ 7.2% Since last month</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overview */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Overview</h2>
          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>Member Profit</span>
              <span className="text-green-600">+2345</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>Member Profit</span>
              <span className="text-green-600">+1345</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>Member Profit</span>
              <span className="text-red-500">-543</span>
            </li>
          </ul>
        </div>

        {/* Total Sale */}
        <div className="bg-white rounded-2xl shadow-md p-5 text-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Sale</h2>
            <button className="text-sm text-green-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="w-40 mx-auto">
            <CircularProgressbar
              value={70}
              text={`70%`}
              styles={buildStyles({
                textColor: "#16a34a",
                pathColor: "#16a34a",
                trailColor: "#d1fae5",
              })}
            />
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Activity</h2>
            <button className="text-sm text-green-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>🟢 Project A successfully completed.</li>
            <li>🟡 New client registration pending.</li>
            <li>🔴 Payment delayed for Project B.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboardPage;
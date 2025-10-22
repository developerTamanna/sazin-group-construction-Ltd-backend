'use client';
import DeleteProject from '@/app/sazin-construction/components/DeleteProject';
import ViewProjectDetail from './ViewDetails';
import UpdateProjectForm from '@/components/DynamicUpdateForm';
import { DangerousContentCheck, DateValidationCheck, NumberValidationCheck } from '@/utils/custom-validation/CustomValidation';
import { useState } from 'react';
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
} from 'react-icons/fa';

export default function JobsTable({ jobs,refetch }) {
    const [updateData,setUpdateData]=useState(null);
    const [viewData,setViewData]=useState(null);
    const fields = [
      { name: "job", placeholder: "Enter job title", label: "Job Title", type: "text", rules: { required: "Job Name is required", ...DangerousContentCheck } },
      { name:'salary', placeholder: "Enter job salary", label: "Salary", type: "number", rules: { required: "Job Salary is required", min: { value: 0, message: "Salary must be a positive number" }, ...NumberValidationCheck } },
      { name: "location", placeholder: "Enter job location", label: "Job Location", type: "text", rules: { required: "Job Location is required", ...DangerousContentCheck } },
      { name: "deadline", label: "Job Deadline", type: "date", rules: { required: "Job Deadline is required", ...DateValidationCheck } },
      { name: 'jobType', placeholder: "Enter job type", label: "Job Type", type: "select", options: ["Full-time", "Part-time", 'Hybrid', "Contract"], rules: { required: "Job Type is required", ...DangerousContentCheck } },
       {name: "description", placeholder: "Enter job description", label: "Job Description", type: "textarea", rules: { required: "Job Description is required", ...DangerousContentCheck } },
    ];
  return (
    <div className="w-full space-y-6">
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                <th className="py-5 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Job Details
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    Location
                  </div>
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaBriefcase />
                    Type
                  </div>
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave />
                    Salary
                  </div>
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Deadline
                  </div>
                </th>
                <th className="py-5 px-6 text-center text-sm font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {jobs?.length > 0 ? (
                jobs.map((job, index) => (
                  <tr
                    key={index}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {job.job?.charAt(0) || 'J'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                            {job.job}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {job.company || 'Leading Company'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{job.location}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {job.jobType}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                          {job.salary} ৳
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaCalendarAlt className="text-purple-500" />
                        <span
                          className={
                            new Date(job.deadline) < new Date()
                              ? 'text-red-500 font-medium'
                              : ''
                          }
                        >
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                        {new Date(job.deadline) < new Date() && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                            Expired
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-center gap-2">
                        <button
                         onClick={()=>setViewData(job)}
                          className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105 transition-all duration-200 shadow-sm group/view"
                          title="View Details"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={()=>setUpdateData({item:job,path:"job",id:job._id,refetch,setUpdateData})}
                          className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105 transition-all duration-200 shadow-sm group/edit"
                          title="Edit Job"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={()=>DeleteProject(job?._id,"job",refetch)}
                          className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:scale-105 transition-all duration-200 shadow-sm group/delete"
                          title="Delete Job"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <FaBriefcase className="text-3xl text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        No Jobs Available
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        There are currently no job listings available. Check
                        back later for new opportunities.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {jobs?.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {job.job?.charAt(0) || 'J'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {job.job}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {job.company || 'Leading Company'}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {job.jobType}
                </span>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaMoneyBillWave className="text-green-500 flex-shrink-0" />
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {job.salary} ৳
                  </span>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCalendarAlt className="text-purple-500 flex-shrink-0" />
                  <span
                    className={`text-sm ${
                      new Date(job.deadline) < new Date()
                        ? 'text-red-500 font-medium'
                        : ''
                    }`}
                  >
                    {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
                {new Date(job.deadline) < new Date() && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                    Expired
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={()=>setViewData(job)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                  title="View Details"
                >
                  <FaEye size={16} />
                  <span className="font-medium">View</span>
                </button>
                <button
                  onClick={()=>setUpdateData({item:job,path:"job",id:job._id,refetch,setUpdateData})}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                  title="Edit Job"
                >
                  <FaEdit size={16} />
                  <span className="font-medium">Edit</span>
                </button>
                <button
                  onClick={()=>DeleteProject(job?._id,"certificate",refetch)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                  title="Delete Job"
                >
                  <FaTrash size={16} />
                  <span className="font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Jobs Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              There are currently no job listings to display.
            </p>
          </div>
        )}
      </div>

      {updateData && <UpdateProjectForm updateData={updateData} fields={fields}></UpdateProjectForm>}
      {viewData && <ViewProjectDetail job={viewData} setviewData={setViewData}></ViewProjectDetail>}
    </div>
  );
}

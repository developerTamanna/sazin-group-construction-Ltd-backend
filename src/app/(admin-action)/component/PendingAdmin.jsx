// app/admin/pending/page.jsx
'use client';
import { useEffect,  useState } from 'react';
import CryptoJS from 'crypto-js';
import axiosInstance from '@/utils/axios';
import { useSidebar } from '@/context/SidebarContext';
import { useQuery } from '@tanstack/react-query';
import Pagination from './pagination';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaDownload,
  FaEnvelope,
  FaEye,
  FaPhone,
  FaPrint,
  FaSearch,
  FaTimesCircle,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaBuilding,
  FaMapMarkerAlt,
  FaUser,
  FaUserTie,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

import toast from 'react-hot-toast';
import Image from 'next/image';

const PendingAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [pendingRequests,setAdmin]=useState([]);
  const [filteredRequests,setfilteredRequests]=useState([]);
  const [viewAdmin,setviewAdmin]=useState(null)

    const {user , loading} = useSidebar();

    // Decryption function
    const decryptData = (data, secretKey) => {
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    };



  const fetchUsers = async () => {
    if(!user?.uid) return [];      
    const res = await axiosInstance.get(`/Auth0781T/manage-admin`);
    const encryptedFields = ["name", "eem"];
    
    const result=[]
      Object.entries(res?.data?.admins || {}).map(([index, adminobj]) => {
        const createValue={}
        Object.entries(adminobj || {}).map(([key, value]) => {
              if (encryptedFields.includes(key)) {
                const decryptedValue = decryptData(value, process.env.NEXT_PUBLIC_SECRET_KEY);
                createValue[key]=decryptedValue
              } 
              else createValue[key]=value
            });
        result.push(createValue)
    });   
    return result;
  };
  const {
  data,              // The transformed or raw response data
  error,             // The actual error object if query fails
  isLoading,         // True only when the query is loading for the first time
  isError,           // True if an error occurred
  isSuccess,         // True if query was successful
  isFetching,        // True anytime the query is fetching (initial, refetch, bg)
  isFetched,         // True once the query has been fetched at least once
  isStale,           // True if the cached data is stale
  refetch,           // Manually trigger a refetch
  status,            // 'loading' | 'error' | 'success'
  fetchStatus,       // 'fetching' | 'paused' | 'idle' (newer addition)
   } = useQuery({
      queryKey: ['All admin'],
      queryFn: fetchUsers,
      enabled: !!user?.uid,   
      placeholderData: null,
      staleTime: 1000 * 60*20 ,
      cacheTime: 1000 * 60*20 , 
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,       
      retry: 2,                       
      retryDelay: 1000,              
    })
    useEffect(()=>{
      if(data) setAdmin(data)
    },[data])

    const updateAdmin = async (id,email,st) => {
    if(!user?.uid) return []; 
    const body={
      uid:id,
      email:email,
      status:st,
    } 
    try{  
    const res = await axiosInstance.post(`/Auth0781T/manage-admin`,body);
     toast.success("Admin status updated successfully")
     console.log("res",res);
      refetch()
    }catch(err){
        console.log("err",err);
        
        toast.error(err.response?.data?.message || "request failed")
    }
  };

  // Filtered requests
  const filter =()=>{
    console.log("calll");    
    const res= pendingRequests.filter((request) => {   
     const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.eem.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
      statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesFilter;
  }); 
  return pendingRequests || [];
}

  useEffect(()=>{
    console.log("xmckdnc",pendingRequests);
        const res=filter();
        setfilteredRequests(res);  
    
  },[statusFilter,searchTerm,pendingRequests])

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map((req) => req._id));
    }
  };

  // Select/Deselect single
  const toggleSelectRequest = (id) => {
      setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  // Action handlers
  const handleApprove = async(id,email,status) => {
    await updateAdmin(id,email,status)   
  };

  const handleReject = async(id,email,status) => {
    await updateAdmin(id,email,status)
  };

  const handleView=async(request)=>{
    console.log("click",request);
    
     setviewAdmin(request);
  }

  const handleBulkAction = (action) => {
    if (selectedRequests.length === 0) {
      alert('Please select one or more requests');
      return;
    }
    console.log(`${action} selected requests:`, selectedRequests);
    alert(`${selectedRequests.length} requests have been ${action}d!`);
  };

    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = filteredRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedAdmins = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ensure currentPage stays within bounds if filters change
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pagedAdmins.length, totalItems);

  if(  loading || !pendingRequests) return (
    <div className='text-black'>
       ...Loading data
    </div>

  )


  return (
    <div className="min-h-screen relative bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Pending Admin Requests
              </h1>
              <p className="text-gray-600">
                Review and manage requests for admin access
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FaDownload /> Export
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FaPrint /> Print
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pendingRequests.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUserClock className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pendingRequests.filter((r) => r.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaEye className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    pendingRequests.filter((r) => r.status === 'active')
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaUserCheck className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    pendingRequests.filter((r) => r.status === 'rejected')
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaUserTimes className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                <option>Sort By</option>
                <option>Date</option>
                <option>Name</option>
                <option>Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedRequests.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-blue-800 font-medium">
                  {selectedRequests.length} requests selected
                </span>
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Reject
                </button>
              </div>
              <button
                onClick={() => setSelectedRequests([])}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        selectedRequests.length === filteredRequests.length &&
                        filteredRequests.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                 {filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request._id)}
                        onChange={() => toggleSelectRequest(request._id)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FaEnvelope className="text-xs" /> {request.eem}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FaPhone className="text-xs" /> {request.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.position}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.experience}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />{' '}
                        {new Date(request.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={()=>handleView(request)}
                          className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleApprove(request._id,request.eem,"active")}
                          className={`${request.status === 'active'?"cursor-not-allowed":"cursor-pointer"} text-green-600 hover:text-green-800 p-1`}
                          disabled={request.status === 'active'}
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleReject(request._id,request.eem,"rejected")}
                          className={`${request.status === 'rejected'?"cursor-not-allowed":"cursor-pointer"} text-red-600 hover:text-red-800 p-1`}
                          disabled={request.status === 'rejected'}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <FaUserClock className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No requests found</p>
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{showingFrom}</span> to{' '}
              <span className="font-medium">{showingTo}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>

              {/* page numbers (show up to 7 pages with ellipsis when needed) */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(p) => setCurrentPage(p)}
              />

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
     
       { viewAdmin && <div className=" z-[1000]   fixed top-16 bottom-4 lg:left-[max(21%,284px)]   left-1 right-1 bg-gray-50 overflow-auto pb-10">
           
            <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800">
              <button onClick={()=>setviewAdmin(null)} className='absolute cursor-pointer top-0 right-2 text-black text-4xl'>x</button>
              {/* Profile Image */}
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                    <Image
                      src={''}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
      
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
              <div >
                {/* Header Actions */}
                <div className="flex justify-between items-start mt-20 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      {viewAdmin.name}
                    </h1>
                    <p className="text-gray-600 mt-1">{viewAdmin.position}</p>
                  </div>
                 </div>
              {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Profile Info Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Profile Information
                      </h2>
      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUser className="inline mr-2 text-gray-400" /> Full Name
                          </label>
                            <p className="text-gray-900">{viewAdmin.name}</p>
                        </div>
      
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="inline mr-2 text-gray-400" /> Email
                          </label>
                            <p className="text-gray-900">{viewAdmin.eem}</p>
                        </div>
      
                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaPhone className="inline mr-2 text-gray-400" /> Phone
                          </label>
                            <p className="text-gray-900">{viewAdmin.phone}</p>
                        </div>
      
      
                        {/* Location */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaMapMarkerAlt className="inline mr-2 text-gray-400" /> Location
                          </label>
                            <p className="text-gray-900">{viewAdmin.location}</p>
                        </div>
      
                        {/* Position */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUserTie className="inline mr-2 text-gray-400" /> Position
                          </label>
                            <p className="text-gray-900">{viewAdmin.position}</p>
                        </div>
      
      
                        {/* Department */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaBuilding className="inline mr-2 text-gray-400" /> Department
                          </label>
                            <p className="text-gray-900">{viewAdmin.department}</p>
                        </div>
                      </div>
      
                      {/* Bio */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                          <p className="text-gray-700 leading-relaxed">{viewAdmin.bio}</p>
                      </div>
                    </div>
                  </div>
                                        {/* Right Column */}
                      <div className="space-y-6">
                        {/* Company Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Company Info
                          </h2>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <FaBuilding className="text-gray-400" />
                              <span className="text-gray-700">{viewAdmin?.company}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaUserTie className="text-gray-400" />
                              <span className="text-gray-700">Position: {viewAdmin?.position}</span>
                            </div>
                          </div>
                        </div>
          
                        {/* Social Media */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Social Media
                          </h2>
                          <div className="space-y-3">
                              <>
                                <a
                                  href={viewAdmin.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                                >
                                  <FaLinkedin className="text-blue-600" /> LinkedIn
                                </a>
                                <a
                                  href={viewAdmin.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                                >
                                  <FaTwitter className="text-blue-400" /> Twitter
                                </a>
                              </>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
          }
          
    </div>
  );

  
};

export default PendingAdmin;

// app/admin/manage/page.jsx
'use client';
import { useSidebar } from '@/context/SidebarContext';
import axiosInstance from '@/utils/axios';
import CryptoJS from 'crypto-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from './pagination';
import {
  FaBuilding,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaSearch,
  FaTimesCircle,
  FaTrash,
  FaTwitter,
  FaUser,
  FaUserCog,
  FaUserShield,
  FaUserTie,
} from 'react-icons/fa';
import Image from 'next/image';
import Loader from '@/components/Loader';
import ErrorCard from '@/components/ErrorCard';

const ManageAdmin = () => {

  const {user } = useSidebar();
  const [admins, setAdmins] = useState([]);
  const [viewAdmin,setviewAdmin]=useState(null)

  // Decryption function
  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const fetchUsers = async () => {     
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
  data,              // The transformed or raw response data         // True if the cached data is stale
  refetch,           // Manually trigger a refetch
  status           // 'loading' | 'error' | 'success'
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
      if(data) setAdmins(data)
    },[data])

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all | active | inactive | pending
  const [sortBy, setSortBy] = useState('name'); // name | role | status | lastActive

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Handlers
  const deleteAdmin = async(id) => {
    console.log(id);
    if (confirm('Are you sure you want to delete this admin?')) {
          if(!user?.uid) return [];  
            try{  
              const res = await axiosInstance.delete(`/Auth0781T/manage-admin?uid=${id}`);
              toast.success("Admin deleted successfully")
              console.log("res",res);
                refetch()
              }catch(err){
                  console.log("err",err);                  
                  toast.error(err.response?.data?.message || "request failed")
              }
         }
  };

  const toggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === 'active' ? 'inactive' : 'active',
            }
          : admin
      )
    );
  };

  // Derived filtered + sorted list (useMemo for optimization)
  const filteredSortedAdmins = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(term) ||
        admin.eem.toLowerCase().includes(term);
      const matchesFilter =
        activeFilter === 'all' || admin.status === activeFilter;
      return matchesSearch && matchesFilter;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'role') return a.role.localeCompare(b.role);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'lastActive')
        return new Date(b.lastActive) - new Date(a.lastActive);
      return 0;
    });

    return sorted;
  }, [admins, searchTerm, activeFilter, sortBy]);

  const totalItems = filteredSortedAdmins.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedAdmins = filteredSortedAdmins.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ensure currentPage stays within bounds if filters change
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pagedAdmins.length, totalItems);

    // Action handlers
  const handleApprove = async(id,email,status) => {
    await updateAdmin(id,email,status)   
  };

  const handleReject = async(id,email,status) => {
    await updateAdmin(id,email,status)
  };
  console.log("status",status);
  
  if (status === 'pending')
    return (
      <Loader type={"admins"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"admins"} refetch={refetch}></ErrorCard>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Manage Admins
          </h1>
          <p className="text-gray-600">
            Manage system admins and control permissions
          </p>
        </div>

        {/* Action bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset to first page on search
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={activeFilter}
                onChange={(e) => {
                  setActiveFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="name">Sort by name</option>
                <option value="role">Sort by role</option>
                <option value="status">Sort by status</option>
                <option value="lastActive">Sort by last active</option>
              </select>

              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FaPlus /> New Admin
              </button>
            </div>
          </div>
        </div>

        {/* Admin list */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pagedAdmins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <FaUserShield className="text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {admin?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {admin?.eem}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{admin?.position||"N/A"}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                          <span
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {admin?.status==='active'?"All":"N/A"}
                          </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(admin._id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          admin.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {admin.status === 'active' ? (
                          <>
                            <FaCheckCircle className="mr-1" /> Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="mr-1" /> {admin?.status}
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.lastActive}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          title="View"
                          onClick={()=>setviewAdmin(admin)}
                          className="text-blue-600 hover:text-blue-800 p-2"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleApprove(admin._id,admin.eem,"active")}
                          className={`${admin.status === 'active'?"cursor-not-allowed":"cursor-pointer"} text-green-600 hover:text-green-800 p-1`}
                          disabled={admin.status === 'active'}
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleReject(admin._id,admin.eem,"rejected")}
                          className={`${admin.status === 'rejected'?"cursor-not-allowed":"cursor-pointer"} text-red-600 hover:text-red-800 p-1`}
                          disabled={admin.status === 'rejected'}
                        >
                          <FaTimesCircle />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteAdmin(admin._id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pagedAdmins.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <FaUserCog className="mx-auto text-4xl text-gray-400 mb-4" />
                      <p className="text-gray-500">No admins found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

         { viewAdmin && <div className=" z-[800]   fixed top-16 bottom-4 lg:left-[max(21%,284px)]   left-1 right-1 bg-gray-50 overflow-auto pb-10">
                 
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


export default ManageAdmin;

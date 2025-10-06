// app/admin/manage/page.jsx
'use client';
import { useSidebar } from '@/context/SidebarContext';
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import {
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaKey,
  FaPlus,
  FaSearch,
  FaTimesCircle,
  FaTrash,
  FaUserCog,
  FaUserShield,
} from 'react-icons/fa';

const ManageAdmin = () => {
  const {user}=useSidebar();
  // initial demo admin data (more entries added)
  const initialAdmins = [
    {
      id: 1,
      name: 'Ahsan Habib',
      email: 'ahsan@sazin.com',
      role: 'Super Admin',
      status: 'active',
      lastActive: '2023-11-15',
      permissions: ['all'],
    },
    {
      id: 2,
      name: 'Karim Uddin',
      email: 'karim@sazin.com',
      role: 'Project Manager',
      status: 'active',
      lastActive: '2023-11-14',
      permissions: ['projects', 'users'],
    },
    {
      id: 3,
      name: 'Rahima Khatun',
      email: 'rahima@sazin.com',
      role: 'Finance Admin',
      status: 'inactive',
      lastActive: '2023-11-10',
      permissions: ['finance', 'reports'],
    },
    {
      id: 4,
      name: 'Jahid Hasan',
      email: 'jahid@sazin.com',
      role: 'Content Moderator',
      status: 'active',
      lastActive: '2023-11-16',
      permissions: ['content', 'comments'],
    },
    {
      id: 5,
      name: 'Lima Akter',
      email: 'lima@sazin.com',
      role: 'Moderator',
      status: 'pending',
      lastActive: '2023-11-05',
      permissions: ['comments'],
    },
    {
      id: 6,
      name: 'Tamanna Akter',
      email: 'tamanna@sazin.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2023-11-18',
      permissions: ['users', 'content'],
    },
    {
      id: 7,
      name: 'Ismail Hossain',
      email: 'ismail@sazin.com',
      role: 'Editor',
      status: 'active',
      lastActive: '2023-11-12',
      permissions: ['content'],
    },
    {
      id: 8,
      name: 'Jannat Ara',
      email: 'jannat@sazin.com',
      role: 'Admin',
      status: 'inactive',
      lastActive: '2023-10-28',
      permissions: ['users'],
    },
    {
      id: 9,
      name: 'Nusrat Jahan',
      email: 'nusrat@sazin.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2023-11-17',
      permissions: ['reports'],
    },
    {
      id: 10,
      name: 'Mahfuz Rahman',
      email: 'mahfuz@sazin.com',
      role: 'Moderator',
      status: 'active',
      lastActive: '2023-11-13',
      permissions: ['projects'],
    },
    {
      id: 11,
      name: 'Rafi Khan',
      email: 'rafi@sazin.com',
      role: 'Editor',
      status: 'active',
      lastActive: '2023-11-11',
      permissions: ['content'],
    },
    {
      id: 12,
      name: 'Sumaiya Akter',
      email: 'sumaiya@sazin.com',
      role: 'Admin',
      status: 'pending',
      lastActive: '2023-11-02',
      permissions: ['users'],
    },
    {
      id: 13,
      name: 'Rakib Hasan',
      email: 'rakib@sazin.com',
      role: 'Admin',
      status: 'inactive',
      lastActive: '2023-09-20',
      permissions: ['reports'],
    },
    {
      id: 14,
      name: 'Hasan Ali',
      email: 'hasan@sazin.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2023-11-19',
      permissions: ['all'],
    },
  ];
   const fetchUsers = async () => {
    try{
      if(!user?.uid) return [];
          const res = await axiosInstance.get('/Auth0781T/manage-admin');
          return res.data;
    }catch(err){
      console.log(err);
      return [];
    }

  }
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
      queryKey: ['profile', user?.uid],
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

  const [admins, setAdmins] = useState(initialAdmins);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all | active | inactive | pending
  const [sortBy, setSortBy] = useState('name'); // name | role | status | lastActive

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handlers
  const deleteAdmin = (id) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      // ensure currentPage is valid after deletion
      setCurrentPage((prev) => {
        const newTotal = Math.ceil((admins.length - 1) / itemsPerPage) || 1;
        return Math.min(prev, newTotal);
      });
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
        admin.email.toLowerCase().includes(term);
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
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <FaUserShield className="text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {admin.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{admin.role}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(admin.id)}
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
                            <FaTimesCircle className="mr-1" /> Inactive
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
                          className="text-blue-600 hover:text-blue-800 p-2"
                        >
                          <FaEye />
                        </button>
                        <button
                          title="Edit"
                          className="text-green-600 hover:text-green-800 p-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Reset Password"
                          className="text-purple-600 hover:text-purple-800 p-2"
                        >
                          <FaKey />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteAdmin(admin.id)}
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
    </div>
  );
};

/**
 * Pagination component (keeps the same look/feel)
 * - shows up to 7 page buttons: first, prev-if-needed, few neighbors, next-if-needed, last
 * - simplifies UX for many pages
 */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 7) {
    return (
      <>
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {page}
            </button>
          );
        })}
      </>
    );
  }

  // when many pages, show condensed pagination with neighbors and ellipsis
  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1)
      pageList.push(i);
    else if (i === 2 && pageList[pageList.length - 1] !== 2) pageList.push(2);
    else if (
      i === totalPages - 1 &&
      pageList[pageList.length - 1] !== totalPages - 1
    )
      pageList.push(totalPages - 1);
  }

  // build unique ordered list with possible holes for ellipsis
  const unique = Array.from(new Set(pageList)).sort((a, b) => a - b);
  const rendered = [];
  for (let i = 0; i < unique.length; i++) {
    const p = unique[i];
    const prev = unique[i - 1];
    if (i > 0 && p - prev > 1) {
      rendered.push('ellipsis-' + i); // placeholder
    }
    rendered.push(p);
  }

  return (
    <>
      {rendered.map((item) =>
        typeof item === 'string' && item.startsWith('ellipsis') ? (
          <span key={item} className="px-2 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === item
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
            }`}
          >
            {item}
          </button>
        )
      )}
    </>
  );
};

export default ManageAdmin;

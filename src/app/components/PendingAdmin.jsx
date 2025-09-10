// app/admin/pending/page.jsx
'use client';
import { useState } from 'react';
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
} from 'react-icons/fa';

const PendingAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);

  // Sample pending requests data
  const pendingRequests = [
    {
      id: 1,
      name: 'Rafiqul Islam',
      email: 'rafikul.islam@email.com',
      phone: '+8801712345678',
      position: 'Senior Project Manager',
      experience: '5 years',
      submittedDate: '2023-11-15',
      status: 'pending',
      documents: ['CV', 'NID', 'Educational Certificate'],
      notes: 'Experience in Metro Rail project',
    },
    {
      id: 2,
      name: 'Salma Khatun',
      email: 'salma.khatun@email.com',
      phone: '+8801812345678',
      position: 'Finance Admin',
      experience: '3 years',
      submittedDate: '2023-11-14',
      status: 'pending',
      documents: ['CV', 'TIN'],
      notes: 'Completed CA',
    },
    {
      id: 3,
      name: 'Anisur Rahman',
      email: 'anisur.rahman@email.com',
      phone: '+8801912345678',
      position: 'Contract Manager',
      experience: '7 years',
      submittedDate: '2023-11-10',
      status: 'reviewed',
      documents: ['CV', 'NID', 'Company Registration'],
      notes: 'Has experience in large projects',
    },
    {
      id: 4,
      name: 'Tasnima Akter',
      email: 'tasnima.akter@email.com',
      phone: '+8801612345678',
      position: 'Quality Assurance Manager',
      experience: '4 years',
      submittedDate: '2023-11-08',
      status: 'approved',
      documents: ['CV', 'Training Certificate'],
      notes: 'Certified ISO Auditor',
    },
    {
      id: 5,
      name: 'Javed Karim',
      email: 'javed.karim@email.com',
      phone: '+8801512345678',
      position: 'Site Engineer',
      experience: '2 years',
      submittedDate: '2023-11-05',
      status: 'rejected',
      documents: ['CV', 'BSc Certificate'],
      notes: 'Less experience',
    },
  ];

  // Filtered requests
  const filteredRequests = pendingRequests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map((req) => req.id));
    }
  };

  // Select/Deselect single
  const toggleSelectRequest = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  // Action handlers
  const handleApprove = (id) => {
    console.log(`Approving request ${id}`);
    alert('Request has been approved!');
  };

  const handleReject = (id) => {
    console.log(`Rejecting request ${id}`);
    alert('Request has been rejected!');
  };

  const handleBulkAction = (action) => {
    if (selectedRequests.length === 0) {
      alert('Please select one or more requests');
      return;
    }
    console.log(`${action} selected requests:`, selectedRequests);
    alert(`${selectedRequests.length} requests have been ${action}d!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
                    pendingRequests.filter((r) => r.status === 'approved')
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
                  placeholder="Search by name, email or position..."
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
                <option value="reviewed">Reviewed</option>
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
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => toggleSelectRequest(request.id)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FaEnvelope className="text-xs" /> {request.email}
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
                        {request.submittedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : request.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-800 p-1"
                          disabled={request.status === 'approved'}
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-800 p-1"
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
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">5</span> of{' '}
              <span className="font-medium">{filteredRequests.length}</span>{' '}
              results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-red-500 bg-red-500 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingAdmin;

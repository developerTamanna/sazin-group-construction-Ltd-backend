// app/admin/assign/page.jsx
'use client';
import { useState } from 'react';
import {
  FaCheckCircle,
  FaEye,
  FaProjectDiagram,
  FaSearch,
  FaTimesCircle,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';

const AssignAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');

  // Sample Project Data
  const projects = [
    {
      id: 1,
      name: 'Rooppur Nuclear Power Plant',
      code: 'RPP-2023-001',
      status: 'Ongoing',
      location: 'Pabna',
      startDate: '2023-01-15',
      endDate: '2025-12-30',
      assignedAdmin: 'Ahsan Habib',
      progress: 75,
    },
    {
      id: 2,
      name: 'Metro Rail Expressway',
      code: 'MRE-2023-002',
      status: 'Ongoing',
      location: 'Dhaka',
      startDate: '2023-03-10',
      endDate: '2024-11-20',
      assignedAdmin: null,
      progress: 45,
    },
    {
      id: 3,
      name: 'Padma Bridge Link Road',
      code: 'PBS-2023-003',
      status: 'Completed',
      location: 'Munshiganj',
      startDate: '2022-08-01',
      endDate: '2023-10-15',
      assignedAdmin: 'Karim Uddin',
      progress: 100,
    },
    {
      id: 4,
      name: 'Bangabandhu Hi-Tech City',
      code: 'BHTC-2023-004',
      status: 'Planning',
      location: 'Gazipur',
      startDate: '2024-01-01',
      endDate: '2026-12-31',
      assignedAdmin: null,
      progress: 15,
    },
  ];

  // Sample Admin Data
  const admins = [
    {
      id: 1,
      name: 'Ahsan Habib',
      email: 'ahsan@sazin.com',
      role: 'Super Admin',
      status: 'active',
      currentProjects: 2,
      maxCapacity: 5,
      specialization: 'Infrastructure',
    },
    {
      id: 2,
      name: 'Karim Uddin',
      email: 'karim@sazin.com',
      role: 'Project Manager',
      status: 'active',
      currentProjects: 1,
      maxCapacity: 4,
      specialization: 'Civil Engineering',
    },
    {
      id: 3,
      name: 'Rahima Khatun',
      email: 'rahima@sazin.com',
      role: 'Finance Admin',
      status: 'inactive',
      currentProjects: 0,
      maxCapacity: 3,
      specialization: 'Finance',
    },
    {
      id: 4,
      name: 'Jahid Hasan',
      email: 'jahid@sazin.com',
      role: 'Content Manager',
      status: 'active',
      currentProjects: 3,
      maxCapacity: 4,
      specialization: 'Content Management',
    },
  ];

  // Filtered Projects
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered Admins
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Assign Handler
  const handleAssign = (projectId, adminId) => {
    console.log(`Assigning project ${projectId} to admin ${adminId}`);
    alert(`Project assigned successfully!`);
  };

  // Unassign Handler
  const handleUnassign = (projectId) => {
    console.log(`Unassigning project ${projectId}`);
    alert(`Assignment has been cancelled!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Assignment
          </h1>
          <p className="text-gray-600">Assign and manage admins for projects</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 px-4 font-medium border-b-2 transition-colors ${
                activeTab === 'projects'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaProjectDiagram className="inline mr-2" />
              Project List
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`pb-3 px-4 font-medium border-b-2 transition-colors ${
                activeTab === 'admins'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUsers className="inline mr-2" />
              Admin List
            </button>
            <button
              onClick={() => setActiveTab('assign')}
              className={`pb-3 px-4 font-medium border-b-2 transition-colors ${
                activeTab === 'assign'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUserPlus className="inline mr-2" />
              New Assignment
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'projects'
                      ? 'Search projects...'
                      : 'Search admins...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                <option>Status Filter</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Planning</option>
              </select>

              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                <option>Sort By</option>
                <option>Name</option>
                <option>Date</option>
                <option>Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">{project.code}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'Ongoing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Start:</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End:</span>
                    <span>{project.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned:</span>
                    <span
                      className={`font-medium ${
                        project.assignedAdmin
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {project.assignedAdmin || 'Not Assigned'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    <FaEye className="inline mr-1" /> View
                  </button>
                  {project.assignedAdmin ? (
                    <button
                      onClick={() => handleUnassign(project.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      <FaTimesCircle className="inline mr-1" /> Unassign
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedProject(project.id);
                        setActiveTab('assign');
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      <FaUserPlus className="inline mr-1" /> Assign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <FaUsers className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {admin.name}
                    </h3>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span className="font-medium">{admin.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialization:</span>
                    <span className="font-medium">{admin.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Projects:</span>
                    <span
                      className={
                        admin.currentProjects >= admin.maxCapacity
                          ? 'text-red-600 font-medium'
                          : 'text-green-600 font-medium'
                      }
                    >
                      {admin.currentProjects} / {admin.maxCapacity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`font-medium ${
                        admin.status === 'active'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {admin.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    <FaEye className="inline mr-1" /> Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAdmin(admin.id);
                      setActiveTab('assign');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                    disabled={
                      admin.currentProjects >= admin.maxCapacity ||
                      admin.status !== 'active'
                    }
                  >
                    <FaUserPlus className="inline mr-1" /> Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assign' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              New Assignment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="">Choose a project</option>
                  {projects
                    .filter((p) => !p.assignedAdmin)
                    .map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name} ({project.code})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Admin
                </label>
                <select
                  value={selectedAdmin}
                  onChange={(e) => setSelectedAdmin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="">Choose an admin</option>
                  {admins
                    .filter(
                      (a) =>
                        a.status === 'active' &&
                        a.currentProjects < a.maxCapacity
                    )
                    .map((admin) => (
                      <option key={admin.id} value={admin.id}>
                        {admin.name} - {admin.specialization}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Assignment Summary
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Project:{' '}
                  {selectedProject
                    ? projects.find((p) => p.id == selectedProject)?.name
                    : 'Not Selected'}
                </p>
                <p>
                  Admin:{' '}
                  {selectedAdmin
                    ? admins.find((a) => a.id == selectedAdmin)?.name
                    : 'Not Selected'}
                </p>
                <p>Date: {new Date().toLocaleDateString('en-US')}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleAssign(selectedProject, selectedAdmin)}
                disabled={!selectedProject || !selectedAdmin}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-lg transition-colors"
              >
                <FaCheckCircle className="inline mr-2" /> Confirm Assignment
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignAdmin;

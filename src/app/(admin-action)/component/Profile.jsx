// app/profile/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaBuilding,
  FaCalendarAlt,
  FaCamera,
  FaEdit,
  FaEnvelope,
  FaLinkedin,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaSpinner,
  FaTimes,
  FaTwitter,
  FaUser,
  FaUserTie,
} from 'react-icons/fa';

import Image from 'next/image';
import { 
  DangerousContentCheck,
  EmailValidationCheck,
  PhoneValidationCheck,
  UrlValidationCheck,
  PasswordValidationCheck,
  DateValidationCheck
 } from '@/utils/custom-validation/CustomValidation';
const Profile = ({onUpdate,user}) => {
  console.log("uauhdusicishdus",user);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState('/api/placeholder/120/120');
  // React Hook Form setup
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const formData = watch(); // live values

  const handleSave = async(data) => {
    try {
      setSaving(true);
      console.log('Profile saved:', data);
      const res = await onUpdate({...data, profileImageFile});
    } catch (error) {
      console.error("Submit error:", error);
    }finally{
      setSaving(false);
      setIsEditing(false);
      reset(); // reset form
    }
  };  


  const handleCancel = () => {
    setIsEditing(false);
    reset(); // reset to initial values
  };

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setProfileImageFile(file); // Save the file for submission
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Total Projects', value: '42' },
    { label: 'Completed Projects', value: '38' },
    { label: 'Ongoing Projects', value: '4' },
    { label: 'Team Members', value: '15' },
  ];

  useEffect(() => {
    if (user) {
      setProfileImage(user?.imageUrl || '/api/placeholder/120/120');
      reset({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '+880',
      position: user.position || 'Project Manager',
      department: user.department || 'Project Management',
      company: user.company || 'Sazin Construction Ltd.',
      location: user.location || 'Dhaka, Bangladesh',
      joinDate: user.joinDate || '2022-01-15',
      bio: user.bio || 'A skilled project manager...',
      linkedin: user.linkedin || 'https://linkedin.com',
      twitter: user.twitter || 'https://twitter.com',
    });
    }
  }, [user, reset]);
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">No user data available.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-12 ">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800">
        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
              <Image
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white"
                layout="fill"
              />
            </div>
            {(isEditing && !saving) && (
              <label className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors">
                <FaCamera className="text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <form onSubmit={handleSubmit(handleSave)}>
          <input
            type="hidden"
            {...register('id', { required: true, value:'MSTTAMANNAAKTERTOMA' })}
          />
          {/* Header Actions */}
          <div className="flex justify-between items-start mt-20 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {formData.name}
            </h1>
            <p className="text-gray-600 mt-1">{formData.position}</p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  type='submit'
                  disabled={saving}
                  className={`  bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${saving ? ' cursor-not-allowed' : ''}`}
                >
                  {saving ? <FaSpinner className="animate-spin" /> :<FaSave /> } Save
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleCancel}
                  className={`bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaEdit /> Edit Profile
              </div>
            )}
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
                    {(isEditing && !saving) ? (
                      <div className="relative">
                        <input
                          type="text"
                          {...register('name',{required: 'Name is required', ...DangerousContentCheck })}

                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                      </div>
                    ) : (
                      <p className="text-gray-900">{formData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2 text-gray-400" /> Email
                    </label>
                      <p className="text-gray-900">{formData.email}</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2 text-gray-400" /> Phone
                    </label>
                    {(isEditing && !saving)? (
                      <div className="relative">
                        <input
                          type="tel"
                          {...register('phone',{required: 'Phone is required', ...PhoneValidationCheck })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900">{formData.phone}</p>
                    )}
                  </div>


                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2 text-gray-400" /> Location
                    </label>
                    {(isEditing && !saving) ? (
                      <div className="relative">
                        <input
                          type="text"
                          {...register('location',{required: 'Location is required', ...DangerousContentCheck})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        />
                        {errors.location && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900">{formData.location}</p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUserTie className="inline mr-2 text-gray-400" /> Position
                    </label>
                    {(isEditing && !saving) ? (
                      <div className="relative">
                        <input
                          type="text"
                          {...register('position',{required:'Position is required', ...DangerousContentCheck})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        />
                        {errors.position && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.position.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900">{formData.position}</p>
                    )}
                  </div>


                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaBuilding className="inline mr-2 text-gray-400" /> Department
                    </label>
                    {(isEditing && !saving) ? (
                      <div className="relative">
                        <input
                          type="text"
                          {...register('department',{required:'Department is required',...DangerousContentCheck})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        />
                        {errors.department && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.department.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900">{formData.department}</p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {(isEditing && !saving)? (
                    <div className="relative">
                      <textarea
                        {...register('bio',{required:'Bio is required',...DangerousContentCheck})}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                      />
                      {errors.bio && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.bio.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                  )}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Career Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
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
                    <span className="text-gray-700">{formData.company}</span>
                  </div>
                { (!isEditing || saving) ?(<div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-gray-700">Joined: {formData.joinDate}</span>
                  </div>):(<div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-400" />
                    <input
                      type="date"
                      {...register('joinDate',{required:'Join date is required',...DateValidationCheck})}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                    {errors.joinDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.joinDate.message}
                      </p>
                    )}
                  </div>)}
                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-gray-400" />
                    <span className="text-gray-700">Position: {formData.position}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Social Media
                </h2>
                <div className="space-y-3">
                  {(isEditing && !saving)? (
                    <>
                      <div className="flex  items-center gap-3">
                       <label htmlFor="linkedin">
                        <FaLinkedin className="text-blue-600" />
                       </label>

                       <input
                         type="url"
                         {...register('linkedin',{...UrlValidationCheck})}
                         placeholder="LinkedIn URL"
                         className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                       />
                       {errors.linkedin && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.linkedin.message}
                        </p>
                       )}
                     </div>
                     <div className="flex items-center gap-3">
                       <label htmlFor="twitter">
                         <FaTwitter className="text-blue-400" />
                       </label>
                       <input
                         type="url"
                         {...register('twitter',{...UrlValidationCheck})}
                         placeholder="Twitter URL"
                         className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                       />
                       {errors.twitter && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.twitter.message}
                        </p>
                       )}
                     </div>
                   </>
                 ) : (
                   <>
                      <a
                        href={formData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                      >
                        <FaLinkedin className="text-blue-600" /> LinkedIn
                      </a>
                      <a
                        href={formData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                      >
                        <FaTwitter className="text-blue-400" /> Twitter
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Security
                </h2>
                <button
                  type="button"
                  onClick={() => alert('Change Password functionality to be implemented')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <FaLock /> Change Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

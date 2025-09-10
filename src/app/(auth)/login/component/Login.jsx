// components/AdminLogin.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaHardHat,
  FaLock,
  FaSignInAlt,
  FaTimes,
  FaUpload,
  FaUser,
} from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // লগিন ওপেন হলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ করবে
  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // লগিন লজিক - সিমুলেট করা
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onLogin(loginData);
    console.log('Login data:', loginData);
    setIsLoading(false);
    // লগিন সফল হলে রিডাইরেক্ট বা অন্য কিছু করুন
  };

  return (
    <>
      {/* Centered Rotating Login Button */}
      {!isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 animate-rotate shadow-red-500/50"
            style={{
              width: '140px',
              height: '140px',
              animation: 'rotate 8s linear infinite',
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <FaSignInAlt className="text-3xl" />
            </div>
            <span className="text-lg font-semibold tracking-wide">LOGIN</span>
            <span className="text-xs mt-1 opacity-80">Click to access</span>

            {/* Animated circles around the button */}
            <div className="absolute -inset-4 border-4 border-red-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute -inset-6 border-2 border-red-300 rounded-full animate-pulse opacity-30"></div>
          </button>

          {/* Floating construction elements */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-16 h-16 bg-red-500 rounded-lg opacity-20 animate-float rotate-45"></div>
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-12 h-12 bg-red-600 rounded-lg opacity-30 animate-float-delayed -rotate-12"></div>
          </div>
          <div className="absolute top-1/3 right-1/3">
            <FaHardHat className="text-4xl text-red-400 opacity-40 animate-bounce" />
          </div>
        </div>
      )}

      {/* Login Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-red-200 dark:border-red-900">
            {/* Close Button */}
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 z-10 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Animated Background Elements */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-200 dark:bg-red-900 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-300 dark:bg-red-800 rounded-full opacity-30 animate-bounce delay-1000"></div>

            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                    <FaHardHat className="text-4xl text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Admin Login
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Sazin Construction Ltd.
                </p>
              </div>

              {/* Profile Image Upload */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div
                    className="w-28 h-28 rounded-full border-4 border-red-200 dark:border-red-800 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer transition-all hover:border-red-300 dark:hover:border-red-700"
                    onClick={triggerFileInput}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FaUser className="text-4xl text-gray-400 mx-auto" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                          Click to upload
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {profileImage ? (
                    <button
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-gray-600 text-white p-2 rounded-full text-xs hover:bg-gray-700 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  ) : (
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors"
                    >
                      <FaUpload className="text-sm" />
                    </label>
                  )}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={loginData.username}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white transition outline-none"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white transition outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-[1.02] disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes float-delayed {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-rotate {
          animation: rotate 8s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default Login;

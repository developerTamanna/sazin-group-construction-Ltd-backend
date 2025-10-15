// components/AdminLogin.jsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaHardHat,
  FaLock,
  FaSignInAlt,
  FaUser,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { EmailValidationCheck, PasswordValidationCheck } from '@/utils/custom-validation/CustomValidation';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode:"onChange",
    shouldUnregister:true,
    criteriaMode:"all"
  });

  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen]);



  const onSubmit = async (data) => {
    try{
        setIsLoading(true); // 🚀 submitting শুরু
        const res=await onLogin(data);
          toast.success(res?.data?.message); // success toast
          setIsLoading(false);
           reset();
           router.push("/profile");
       } catch (error) {
      console.log("Submit error:", error);
      const message = error?.response?.data?.message || "request failed";
      if (!message) return;

      if (typeof message === "string") {
                    toast.error(message); // সরাসরি string
                  } else if (Array.isArray(message)) {
                    // যদি array হয়
                    message.forEach((msg) => toast.error(msg));
                  } else if (typeof message === "object") {
                    // object হলে loop করে সব key এর value দেখাবে
                    Object.values(message).forEach((val) => {
                      if (Array.isArray(val)) {
                        val.forEach((msg) => toast.error(msg));
                      } else {
                        toast.error(val);
                      }
                    });
                  }
      } finally {
        setIsLoading(false); // ✅ backend থেকে response এলেই বন্ধ হবে
      }
  };

  return (
    <>
      {/* Floating Login Button */}
      {!isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 animate-rotate shadow-red-500/50"
            style={{ width: '140px', height: '140px' }}
          >
            <FaSignInAlt className="text-3xl mb-2" />
            <span className="text-lg font-semibold tracking-wide">LOGIN</span>
            <span className="text-xs mt-1 opacity-80">Click to access</span>

            <div className="absolute -inset-4 border-4 border-red-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute -inset-6 border-2 border-red-300 rounded-full animate-pulse opacity-30"></div>
          </button>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 p-2 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative overflow-auto h-full max-h-[620px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-red-200 dark:border-red-900">
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

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="Email"
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                      {...register('email', { required: 'Email is required', ...EmailValidationCheck })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
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
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                      {...register('password', { required: 'Password is required',...PasswordValidationCheck })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      {...register('rememberMe')}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgotten"
                    className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition disabled:opacity-70"
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
              </form>

              <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Are you new?{' '}
                  <Link
                    href="/registration"
                    className="font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Sign Up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate {
          animation: rotate 8s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Login;

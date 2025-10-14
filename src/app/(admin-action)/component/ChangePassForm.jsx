// components/AdminLogin.jsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { EmailValidationCheck, PasswordValidationCheck } from '@/utils/custom-validation/CustomValidation';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axios';

    // Encryption function
    const encryptData = (data) => {
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // env থেকে নিচ্ছে
      return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

 function ChangePassForm({closeModal}){
  const [showPassword, setShowPassword] = useState(false);
  const [NewshowPassword, setNewShowPassword] = useState(false);
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

    const encryptField=["email","password","newpassword"]
  
    const PassChange = async(data) => { 
         const formdata = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if(!encryptField.includes(key)){
                 formdata.append(key, value);
              } else {
              const enc=encryptData(value);
              formdata.append(key, enc);
           }
        });
     try {
       const res = await axiosInstance.post('/Auth0782T/changePass', formdata);
       console.log("Password change successful:", res);
       toast.success(res?.data?.message); // success toast
       return true;    
     } catch (error) {
          console.error("Submit error:", error);
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
            throw error      
     }
    };


  const onSubmit = async (data) => {
    try{
        setIsLoading(true); // 🚀 submitting শুরু
        const res=await PassChange(data);
          setIsLoading(false);
           reset();
           closeModal(false)
       } catch (error) {
         console.error("Submit error:", error);
      } finally {
        setIsLoading(false); // ✅ backend থেকে response এলেই বন্ধ হবে
      }
  };

  return (
    <>
        <div className="fixed top-16 bottom-4 lg:left-[max(21%,284px)]   left-1 right-1  z-[1000] flex items-center justify-center md:p-4 p-2 bg-gray-400 bg-opacity-70 backdrop-blur-sm">
              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:min-w-xs min-w-full">
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
                {/* new password */}
                <div>
                  <label
                    htmlFor="Newpassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                   New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="New password"
                      type={NewshowPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                      {...register('newpassword', { required: 'New password is required',...PasswordValidationCheck })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setNewShowPassword(!NewshowPassword)}
                    >
                      {NewshowPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                  </div>
                  {errors.newpassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newpassword.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgottenPass"
                    className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Forgot password?
                  </Link>
                </div>

              <div className='flex flex-wrap items-center justify-between gap-2'>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="md:w-[280px] w-full flex justify-center items-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition disabled:opacity-70"
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
                      Changing...
                    </>
                  ) : (
                    'Change password'
                  )}
                </button>
                <button
                  type="button"
                  onClick={()=>closeModal(false)}
                  className="flex-1 flex justify-center items-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition disabled:opacity-70"
                  >
                   Cancel
                </button>
              </div>
              </form>
        </div>
    </>
  );
};

export default ChangePassForm;

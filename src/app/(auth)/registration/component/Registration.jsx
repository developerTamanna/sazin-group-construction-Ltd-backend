// components/Registration.jsx
"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUpload,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  EmailValidationCheck,
  PasswordValidationCheck,
  StringValidationCheck,
} from "@/utils/custom-validation/CustomValidation";
import { useRouter } from "next/navigation";

const Registration = ({ onRegister }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    shouldUnregister: true,
    criteriaMode: "all",
  });

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = { ...data, image: imageFile };
      const res = await onRegister(formData);
      toast.success(res?.data?.message); // success toast
       setIsLoading(false);
       reset(); 
       setProfileImage(null);
       setImageFile(null);
       router.push("/login"); // redirect
    } catch (error) {
      console.error("Submit error:", error);
      const message = error?.response?.data?.message;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 p-2 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative overflow-auto h-full max-h-[620px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-red-200 dark:border-red-900 p-6 sm:p-12 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
              <FaUser className="text-3xl text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join Sazin Construction Ltd.
          </p>
        </div>

        {/* Profile Image Upload */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-28 h-28">
            <div
              className="w-28 h-28 rounded-full border-3 border-red-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden text-center"
              onClick={triggerFileInput}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <FaUser className="text-4xl text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 mt-1 mb-2">
                    Click to upload
                  </p>
                </>
              )}
            </div>

            <div
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer shadow-lg"
            >
              <FaUpload className="w-4 h-4" />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                {...register("name", { required: "Full name is required",...StringValidationCheck })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                {...register("email", {
                  required: "Email is required",
                  ...EmailValidationCheck,
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                {...register("password", {
                  required: "Password is required",
                  ...PasswordValidationCheck,
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white outline-none"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  ...PasswordValidationCheck,
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign in link */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

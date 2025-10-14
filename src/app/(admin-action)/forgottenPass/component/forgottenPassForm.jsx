"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import axiosInstance from "@/utils/axios";
import { EmailValidationCheck, PasswordValidationCheck } from "@/utils/custom-validation/CustomValidation";
import { useRouter } from 'next/navigation';

const ENC_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // Must match process.env.DEC on backend

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, ENC_KEY).toString();
};

export default function ForgotPassword() {
  const router=useRouter()
  const [step, setStep] = useState(1); // Step 1: email, Step 2: otp + password
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
       mode:"onChange",
       shouldUnregister:true,
       criteriaMode:"all"
    });

  //  STEP 1: REQUEST OTP 
  const handleRequestOtp = async (data) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const payload = {
        email: encrypt(data.email),
      };

      const res = await axiosInstance.post(`Auth0783T/forgottenPass/request`,payload,);

      if (res.data.success) {
        setMessage("OTP sent to your email");
        setEmail(data.email);
        setStep(2);
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ===== STEP 2: VERIFY OTP =====
  const handleVerifyOtp = async (data) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const payload = {
        email: encrypt(email),
        otp: encrypt(data.otp),
        newpassword: encrypt(data.newpassword),
      };

      const res = await axiosInstance.post(
        `Auth0783T/forgottenPass/verify`,
        payload,
      );

      if (res.data.success) {
        setMessage("Password changed successfully ✅");
        router.push("/login")
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          {step === 1 ? "Forgot Password" : "Verify OTP"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleSubmit(handleRequestOtp)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                  ...EmailValidationCheck
                })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your registered email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">OTP</label>
              <input
                type="text"
                maxLength={6}
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 6-digit OTP"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                New Password
              </label>
              <input
                type="password"
                {...register("newpassword", {
                  required: "Password is required",
                  ...PasswordValidationCheck
                })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              {errors.newpassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newpassword.message}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Verifying..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* ✅ Status messages */}
        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

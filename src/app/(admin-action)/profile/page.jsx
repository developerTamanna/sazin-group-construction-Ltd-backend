"use client";

import React from 'react';
import Profile from '../component/Profile';
import CryptoJS from 'crypto-js';
import axiosInstance from '@/utils/axios';
import { useSidebar } from '@/context/SidebarContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';



const Page = () => {

    const {user ,updateJWT, loading} = useSidebar();

    // Decryption function
    const decryptData = (data, secretKey) => {
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    };

    // Encryption function
    const encryptData = (data) => {
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // env থেকে নিচ্ছে
      return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

  const fetchUsers = async () => {
    if(!user?.uid) return [];      
    const res = await axiosInstance.get(`/Auth0780T/profile?uid=${user?.uid}`);
    const encryptedFields = ["name", "email"];
    const result=Object.fromEntries(Object.entries(res?.data?.data || {}).map(([key, value]) => {
      if (encryptedFields.includes(key)) {
        const decryptedValue = decryptData(value, process.env.NEXT_PUBLIC_SECRET_KEY);
        return [key, decryptedValue];
      }
      return [key, value];
    }));
    return result;
  };
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

    const encryptField=["name","email"]
  
    const handleProfileUpdate = async(data) => { 
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
       const res = await axiosInstance.post('/Auth0779T/profile-update', formdata);
       console.log("Profile update successful:", res);
       toast.success(res?.data?.message); // success toast
       await updateJWT(res?.data?.user); // context update
       refetch();  // refetch user data
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
     }
    };


  if (loading || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!user || !data) {
    return <div className="min-h-screen flex items-center justify-center">No user data available.</div>;
  }
  return (
    <div>
      <Profile onUpdate={handleProfileUpdate} user={data} />
    </div>
  );
};

export default Page;

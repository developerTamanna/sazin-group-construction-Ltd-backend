"use client";

import React from 'react';
import Profile from '../component/Profile';
import CryptoJS from 'crypto-js';
import axiosInstance from '@/utils/axios';

const page = () => {

    // Encryption function
    const encryptData = (data) => {
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // env থেকে নিচ্ছে
      return CryptoJS.AES.encrypt(data, secretKey).toString();
    };
  
    const handleProfileUpdate = async(data) => {
         const formdata = new FormData();
          Object.entries(data).forEach(([key, value]) => {
           console.log(key,value);
           if( value instanceof File || value instanceof Blob || !value){
              formdata.append(key, value);
           } else if (typeof value === "string" && value.startsWith("data:image/")) {
                 // base64 image string হলে encrypt করবেন না
                 formdata.append(key, value);
              } else {
              const enc=encryptData(value);
              console.log(key,enc);
              formdata.append(key, enc);
           }
  
        });
       console.log(formdata);
     try {
       const res = await axiosInstance.post('/Auth0779T/profile-update', formdata);
       console.log("Profile update successful:", res);
       return res;
     
     } catch (error) {
       console.error("Profile update error:", error);
         throw error; // error ta abar uporte pathacchi
     }
    };

  return (
    <div>
      <Profile onUpdate={handleProfileUpdate} />
    </div>
  );
};

export default page;

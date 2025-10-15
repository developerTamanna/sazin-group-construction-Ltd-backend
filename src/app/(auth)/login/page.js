'use client';
import React from 'react';
import Login from './component/Login';
import { useSidebar  } from '@/context/SidebarContext';
import CryptoJS from 'crypto-js';
import axiosInstance from '@/utils/axios';

const Page = () => {

  const { login } = useSidebar();

  // Encryption function
  const encryptData = (data) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // env থেকে নিচ্ছে
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const handleLogin = async(data) => {
      console.log("data",data);  
       const formdata = new FormData();
        Object.entries(data).filter(([key])=>key==="email" || key==="password").forEach(([key, value]) => {    
         const enc=encryptData(value);
         formdata.append(key, enc);
      });
    try {
    const res=await axiosInstance.post('/Auth0777T/login',formdata)  
    console.log(res);
    await login(res?.data?.user); // context update
    return res;
    }catch (error) {
       console.error("login error:", error);
       throw error; // error ta abar uporte pathacchi
   }
  };

  return (
   <Login onLogin={handleLogin}></Login>
  );
};

export default Page;

'use client';
import React, { use } from 'react';
import Login from './component/Login';
import { useRouter } from 'next/navigation';
import { useSidebar  } from '@/context/SidebarContext';

const page = () => {

  const { login } = useSidebar();
  const router = useRouter();

  const handleLogin = () => {
    const fakeToken = "abc123"; // normally API response er token
    login(fakeToken); // context update

    router.push("/"); // redirect
  };

  return (
   <Login onLogin={handleLogin}></Login>
  );
};

export default page;

'use client';
import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const colorMap = {
  'agro&fisheries': {
    bgColor: 'bg-green-500',
    textColor: 'text-green-800',
  },
  'helmet&safty-accessories': {
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-800',
  },
  'sazin-construction': {
    bgColor: 'bg-red-500',
    textColor: 'text-red-800',
  },
};

// ✅ Custom Hook
export function DynamicColor() {
  const pathname = usePathname();
  const {setDynamicTheme } = useSidebar(); 

  useEffect(() => {
    if (!pathname) return <></>;
    const array = pathname.split('/');
    const root = array.find(item => colorMap[item]);
    setDynamicTheme(colorMap[root] || { bgColor: '', textColor: '' });
  }, [pathname]);

  return(<> </>);
}

'use client';
import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const colorMap = {
  'agro&fisheries': {
    root: '/agro&fisheries',
    bgColor: 'bg-green-800',
    textColor: 'text-gray-100',
    cardBorder: 'border-2 border-green-500',
    sidebarActive: 'bg-white text-black',
    navbar: 'bg-white shadow-md',
    active: 'bg-green-700 text-white',
    hover: 'hover:bg-black hover:text-white',
    accent: 'text-green-600',
    formBg: 'bg-white',
    formButton: 'bg-green-600 hover:bg-green-700',
    formInput: 'border-green-300 focus:ring-2 focus:ring-green-400',
    formLabel: 'text-green-800',
    imageCard:
      'border-2 border-green-300 rounded-xl p-6 hover:shadow-lg transition',
  },

  'helmet&safty-accessories': {
    root: '/helmet&safty-accessories',
    bgColor: 'bg-blue-800',
    mainBg: 'bg-blue-100',
    textColor: 'text-gray-100',
    cardBorder: 'border border-blue-200',
    navbar: 'bg-white shadow-md',
    sidebarActive: 'bg-white text-black',
    active: 'bg-blue-800 text-white',
    hover: 'hover:bg-black hover:text-white',
    accent: 'text-blue-600',
    formBg: 'bg-white',
    formButton: 'bg-blue-600 hover:bg-blue-700',
    formInput: 'border-blue-300 focus:ring-2 focus:ring-blue-400',
    formLabel: 'text-blue-800',
    imageCard:
      'border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition',
  },
  'sazin-construction': {
    root: '/sazin-construction',
    bgColor: 'bg-blue-800',
    mainBg: 'bg-blue-100',
    textColor: 'text-gray-100',
    cardBorder: 'border border-blue-200',
    navbar: 'bg-white shadow-md',
    sidebarActive: 'bg-white text-black',
    active: 'bg-blue-800 text-white',
    hover: 'hover:bg-black hover:text-white',
    accent: 'text-blue-600',
    formBg: 'bg-white',
    formButton: 'bg-blue-600 hover:bg-blue-700',
    formInput: 'border-blue-300 focus:ring-2 focus:ring-blue-400',
    formLabel: 'text-blue-800',
    imageCard:
      'border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition',
  },
};

// ✅ Custom Hook
export function DynamicColor() {
  const pathname = usePathname();
  const { setDynamicTheme } = useSidebar();

  useEffect(() => {
    if (!pathname) return <></>;
    const array = pathname.split('/');
    const root = array[1];
    setDynamicTheme(
      colorMap[root] || {
        bgColor: '',
        textColor: '',
        cardBorder: '',
        navbar: '',
        sidebar: '',
        accent: '',
      }
    );
  }, [pathname]);

  return <> </>;
}
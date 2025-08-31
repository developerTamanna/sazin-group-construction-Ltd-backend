"use client";
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
const navlist=[
    {title: "Sazin-Construction", link: "/Sazin-Construction"},
    {title: "Agro&Fisheries", link: "/agro&fisheries"},
    {title: "Helmets&(PPE)", link: "/helmet&safty-accessories"},
]
function Navbar() {
  return (
    <div className='fixed inline-flex justify-between  items-center rounded-tl-md rounded-tr-md z-[999] top-0 left-0 right-0 bg-gray-800 text-white p-2 text-lg font-bold '>
        <h1 className='text-3xl font-bold'>logo</h1>
        <div className='flex space-x-4'>
            {navlist?.map((item) => (
            <Link key={item.title} href={item.link} className="inline-block p-2 hover:bg-gray-700 rounded cursor-pointer">
                {item.title}
            </Link>
            ))}
        </div>
        <div className='profile'>
           <Image 
           src="/path/to/profile.jpg" 
           alt="Profile" 
           width={40} height={40}
           className="rounded-full w-12 h-12 border-1 border-white" />
        </div>
    </div>
  )
}

export default Navbar
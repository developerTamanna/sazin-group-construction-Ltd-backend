"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
const navlist=[
    {title: "Sazin-Construction", link: "/sazin-construction"},
    {title: "Agro&Fisheries", link: "/agro&fisheries"},
    {title: "Helmets&(PPE)", link: "/helmet&safty-accessories"},
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {dynamicTheme,user} = useSidebar();
    /* dynamicTheme.bgColor */

  return (
    <nav className="bg-white sticky top-0 left-0 w-full z-[999] shadow-md">
      <div className="flex justify-between items-center px-4 md:px-6 h-16 w-full relative">
        {/* Left side - Menu + Dashboard */}
        <div className="flex items-center gap-3 relative">
          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
          >
            ☰
          </button>
          <span className="text-lg font-semibold">Dashboard</span>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-14 left-0  bg-white/95 border border-gray-200 rounded-md shadow-lg w-60">
              <ul className="p-2 space-y-2">
                {navlist.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      prefetch={false}
                      className={`block rounded px-4 py-2 ${dynamicTheme?.hover} ${
                        dynamicTheme?.root === item.link ? dynamicTheme?.active :'' 
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right side - Profile */}
        <div>
         <Link prefetch={false} href="/profile" className='w-fit h-fit'>
          {/* Profile Image */} 
          <Image
            src={user?.photoURL || 'https://gravatar.com/avatar/5abc513fc3232e3c780bd5545de495cb?s=400&d=mp&r=x'}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full h-13 w-13 object-fill border-3 border-green-700 cursor-pointer"
          />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
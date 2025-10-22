'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa'; // toggle button icon

function Sidebar() {
  const { items, dynamicTheme,logout } = useSidebar();
  const [toggle, settoggle] = React.useState(false);
  const [checkActive,setActive]=React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false); // 🔹 sidebar open/close state
  const pathName = usePathname();

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-[999] p-2 rounded-md bg-gray-200 text-red-500"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? <FaTimes /> : <FaBars />}
      </button>

      {/* 🔹 Sidebar */}
      <aside
        className={`${dynamicTheme.bgColor} ${
          dynamicTheme.textColor
        } lg:relative z-[995] text-base rounded-bl-md lg:h-screen w-full overflow-hidden py-4  bg-blue-500

        ${
          openSidebar ? 'translate-x-0 fixed top-16 bottom-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* 🔹 Logo Section */}
        <div className="p-2 w-full flex items-center justify-center mb-6">
           <Image
            src="/favicon.png" // এখানে তোমার logo path দিতে হবে
            alt="Logo"
            width={140}
            height={40}
            className="object-contain w-8 h-8 "
          /> 
          SAZIN CONSTRACTION LTD.
        </div>

        {/* 🔹 Sidebar Menu */}
        <ul className="space-y-2 pl-4 h-full w-full overflow-auto pb-28">
          {items?.map((item) => (
            <li key={item.id}>
              {item?.categories?.length > 0 ? (
                <div
                  className={`w-full ${
                    toggle ? 'h-auto' : 'h-fit'
                  } transform transition-height duration-800 ease-in-out`}
                >
                  <button
                    onClick={() => {
                      settoggle((itemid) =>
                        item.id === itemid ? false : item.id
                      );
                    }}
                    className={`w-full flex items-center gap-2 p-2 ${
                            (checkActive ===item?.id)
                              ? dynamicTheme?.sidebarActive
                              : 'hover:border border-gray-300'
                          } rounded-tl-md rounded-bl-md cursor-pointer`}
                  >
                    {item.icon}
                    {item.title}
                  </button>
                  {toggle === item.id && (
                    <ul className="ml-4 mt-2 bg-transparent text-sm space-y-2">
                      {item.categories.map((category) => (
                        <Link
                          href={`${category.path}`}
                          key={category.id}
                          onClick={()=>setActive(item?.id)}
                          className={`flex items-center gap-2 p-2 ${
                            pathName === `${category.path}`
                              ? dynamicTheme?.sidebarActive
                              : 'hover:border border-gray-300'
                          } rounded-tl-md rounded-bl-md cursor-pointer`}
                        >
                          {category.icon}
                          <span>{category.title}</span>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={`${item.path}`}
                  className={`flex items-center gap-2 p-2 ${
                    pathName === `${item.path}`
                      ? dynamicTheme?.sidebarActive
                      : 'hover:border border-gray-300'
                  } rounded-tl-md rounded-bl-md cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={()=>logout()} 
          className="absolute bottom-0 w-full text-center p-2 cursor-pointer bg-green-700">
            Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;

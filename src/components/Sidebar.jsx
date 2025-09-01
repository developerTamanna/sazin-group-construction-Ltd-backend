'use client';
import React from 'react'
import { useSidebar } from '@/context/SidebarContext'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

function Sidebar(){
  const { items, dynamicTheme } = useSidebar();
  const [toggle, settoggle] = React.useState(false);
  const pathName = usePathname();

  return (
    <aside className={`${dynamicTheme.bgColor} ${dynamicTheme.textColor} text-base rounded-bl-md h-full w-full overflow-auto py-4 pl-4`}>
      {/* 🔹 Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <Image 
          src="/logo.png"   // এখানে তোমার logo path দিতে হবে
          alt="Logo"
          width={140}
          height={40}
          className="object-contain"
        />
      </div>

      {/* 🔹 Sidebar Menu */}
      <ul className='space-y-2'>
        {items?.map(item => (
          <li key={item.id} >
            {item?.categories?.length > 0 ? (
              <div className={`w-full ${toggle ? 'h-auto' : 'h-fit'} transform transition-height duration-800 ease-in-out`}>
                <button
                  onClick={() => {
                    settoggle((itemid) => item.id === itemid ? false : item.id);
                  }}
                  className="flex w-full items-center gap-2 p-2  cursor-pointer"
                >
                  {item.icon}
                  {item.title}
                </button>
                {toggle === item.id && (
                  <ul className="ml-4 bg-transparent text-sm space-y-2">
                    {item.categories.map(category => (
                      <Link 
                        href={`${category.path}`} 
                        key={category.id} 
                        className={`flex items-center gap-2 p-2 ${pathName === `${category.path}` ? dynamicTheme?.sidebarActive : 'hover:border border-gray-300'} rounded-tl-md rounded-bl-md cursor-pointer`}
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
                className={`flex items-center gap-2 p-2 ${pathName === `${item.path}` ? dynamicTheme?.sidebarActive : 'hover:border border-gray-300'} rounded-tl-md rounded-bl-md cursor-pointer`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar;
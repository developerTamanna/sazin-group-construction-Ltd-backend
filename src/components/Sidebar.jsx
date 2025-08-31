'use client';
import React, { useEffect } from 'react'
import { useSidebar } from '@/context/SidebarContext'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar(){
  const { items, dynamicTheme } = useSidebar();
  const [toggle, settoggle] = React.useState(false);
  const pathName=usePathname();

  return (
    <aside className={` ${dynamicTheme.bgColor} ${dynamicTheme.textColor} text-base rounded-bl-md h-full w-full overflow-auto p-4`}>
      <ul>
        {items?.map(item => (
          <li key={item.id} className=" ">
            {item?.categories?.length > 0 ? (
              <div className={`w-full  ${toggle ? 'h-auto' : 'h-fit'} transform transition-height duration-800 ease-in-out `}>
                  <button
                    onClick={() => {
                      settoggle((itemid) => item.id === itemid ? false : item.id);
                    }}
                    className="flex w-full items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                  >
                    {item.icon}
                    {item.title}
                  </button>
                  {toggle === item.id && (
                    <ul className="ml-4 bg-gray-800 text-sm">
                      {item.categories.map(category => (
                        <Link href={`${category.path}`} key={category.id} className={` flex items-center gap-2 p-2 ${pathName === `${category.path}` ? 'active' : 'hover:bg-gray-700'}  rounded cursor-pointer`}>
                          {category.icon}
                          <span>{category.title}</span>
                        </Link>
                      ))}
                    </ul>
                  )}
              </div>
            ) : (
              <Link href={`${item.path}`} className={`flex  items-center gap-2 p-2 ${pathName === `${item.path}` ? 'active' : 'hover:bg-gray-700'}  rounded cursor-pointer`}>
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

export default Sidebar
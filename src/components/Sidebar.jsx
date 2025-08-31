'use client';
import React from 'react'
import { useSidebar } from '@/context/SidebarContext'; 
import Link from 'next/link';
function Sidebar(){
  const { items } = useSidebar();
  const [toggle, settoggle] = React.useState(false);
  return (
    <aside className="bg-gray-800 text-base rounded-bl-md text-white h-full w-full overflow-auto p-4">
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
                        <Link href={`/category/${category.id}`} key={category.id} className=" flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                          {category.icon}
                          <span>{category.title}</span>
                        </Link>
                      ))}
                    </ul>
                  )}
              </div>
            ) : (
              <Link href={`/category/${item.id}`} className="flex  items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
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
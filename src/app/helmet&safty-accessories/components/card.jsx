'use client'
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import React from 'react'

function card({data}) {
  const {dynamicTheme} = useSidebar();
  return (
    <div >
        <Image
         src={data?.image}
         alt={data?.title}
         width={300}
         height={200}
         className={`rounded-lg ${dynamicTheme?.bgColor}`}
        >

        </Image>
        <h2 className={`text-lg font-semibold mt-2 ${dynamicTheme?.textColor}`}>{data?.title}</h2>
        <p className=''>{data?.price}</p>
        <p className={`text-sm ${dynamicTheme?.textColor}`}>{data?.description}</p>
    </div>
  )
}

export default card
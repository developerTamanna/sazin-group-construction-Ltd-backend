'use client';

import { useSidebar } from '@/context/SidebarContext';
import React from 'react'

function card() {
    const{dynamicTheme} = useSidebar();

  return (
    <div className={`p-4 rounded-lg shadow-md ${dynamicTheme?.cardBorder}`}>
      <h2 className={`text-lg font-semibold ${dynamicTheme?.textColor}`}>Card Title</h2>
      <p className={`text-sm ${dynamicTheme?.textColor}`}>Card description goes here.</p>
    </div>
  )
}

export default card
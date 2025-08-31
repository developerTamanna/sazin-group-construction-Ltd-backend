import React from 'react'
import SidebarWithHelmetsAndPPE from './components/Sidebar'
import { DynamicColor } from '@/utils/DynamicColor'
function layout({children}) {
  return (
    <main>
      <SidebarWithHelmetsAndPPE />
      <DynamicColor />
      {children}
    </main>
  )
}

export default layout
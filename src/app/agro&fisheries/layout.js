import React from 'react'
import Sidebar from './components/Sidebar'
import { DynamicColor } from '@/utils/DynamicColor'
function layout({children}) {
  return (
    <main>
      <Sidebar />
      <DynamicColor />
      {children}
    </main>
  )
}

export default layout
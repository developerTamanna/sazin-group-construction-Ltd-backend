import React from 'react'
import ProtectedLayout from '@/utils/ProtectedLayout'
function layout({children}) {
  return (
      <ProtectedLayout>
        {children}
      </ProtectedLayout>
  )
}

export default layout
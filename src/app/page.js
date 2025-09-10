import React from 'react'
import ProtectedLayout from '@/utils/ProtectedLayout';
export default function Home() {
  return (
    <main className=''>
      <ProtectedLayout>
        <h1 className='text-4xl font-bold text-center'>Dashboard</h1>
      </ProtectedLayout>
    </main>
  );
}



import React from 'react'
import ProtectedLayout from '@/utils/ProtectedLayout';
import Page from './(admin-action)/profile/page';
export default function Home() {
  return (
    <main className=''>
      <ProtectedLayout>
        <Page></Page>
      </ProtectedLayout>
    </main>
  );
}



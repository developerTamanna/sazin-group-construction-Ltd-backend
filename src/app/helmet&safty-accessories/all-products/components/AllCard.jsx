import React from 'react'
import QueryFunction from '../../utils/queryFuction'
export default function AllCard() {
 return(
   <div className='relative flex h-full  w-full flex-wrap justify-center items-start gap-4 mt-4'>
     <QueryFunction category="all" />
   </div>
 )
}


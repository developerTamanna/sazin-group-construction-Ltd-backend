import React from 'react'
import Card from '@/components/Card'
function AllCard() {
    const data={
    name:"Helmet & Safety Accessories",
    image:"/path/to/image.jpg",
    price:"$100",
    description:"This is a great helmet."
    }
  return (
    <div>
      <Card data={data} />
    </div>
  )
}

export default AllCard
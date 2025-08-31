import React from 'react'
import Card from './components/card'

function page() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default page
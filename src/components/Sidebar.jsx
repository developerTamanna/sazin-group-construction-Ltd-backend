import React from 'react'

function Sidebar({SidebarItems=[]}){
  return (
    <aside>      
      <ul>
        {SidebarItems.map((item, index)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
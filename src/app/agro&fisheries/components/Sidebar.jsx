import React from 'react'
import Sidebar from '@/components/Sidebar'
import {FaAppleAlt, FaCarrot, FaCheese, FaDrumstickBite, FaBreadSlice, FaFish , MdDashboard, MdShoppingCart, MdInventory2, MdWorkspacePremium, MdCategory, MdSettings } from "react-icons/md";
import { GiSeafood, GiFishEggs } from "react-icons/gi"; 

const SidebarItems = [
  { id: 1, title: "Dashboard", icon: <MdDashboard /> },
  { id: 2, title: "Add Product", icon: <MdShoppingCart /> },
  { id: 3, title: "All Products", icon: <MdInventory2 /> },
  { id: 4, title: "Featured Products", icon: <MdWorkspacePremium /> },
  { id: 5, title: "Product Category", icon: <MdCategory />,
    categories:[
        { id: 1, title: "Fruits", icon: <FaAppleAlt /> },
        { id: 2, title: "Vegetables", icon: <FaCarrot /> },
        { id: 3, title: "Dairy", icon: <FaCheese /> },
        { id: 4, title: "Meat", icon: <FaDrumstickBite /> },
        { id: 5, title: "Grains", icon: <FaBreadSlice /> },
        { id: 6, title: "Seafood", icon: <GiSeafood /> },
        { id: 7, title: "Fish", icon: <FaFish /> },
        { id: 8, title: "Fish Fry", icon: <GiFishEggs /> }, // মাছের পোনা
        { id: 9, title: "Fish Eggs (Roe)", icon: <GiFishEggs /> }, // মাছের ডিম
        ]
   },
  { id: 6, title: "Settings", icon: <MdSettings /> },
];


function Sidebar() {
  return (
    <Sidebar SidebarItems={SidebarItems} />
  )
}

export default Sidebar
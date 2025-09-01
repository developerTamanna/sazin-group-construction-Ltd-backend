'use client';
import React, { useEffect } from 'react'
// FontAwesome icons
import { FaAppleAlt, FaCarrot, FaCheese, FaDrumstickBite, FaBreadSlice, FaFish } from "react-icons/fa";

// Material Design icons
import { MdDashboard, MdShoppingCart, MdInventory2, MdWorkspacePremium, MdCategory, MdSettings } from "react-icons/md";

// Game icons
import { GiShrimp, GiFishEggs } from "react-icons/gi";
 
import { useSidebar } from '@/context/SidebarContext';

const SidebarItems = [
  { id: 1, title: "Dashboard", icon: <MdDashboard />, path:'/sazin-construction' },
  { id: 2, title: "Add Product", icon: <MdShoppingCart />, path:'/sazin-construction/add-product' },
  { id: 3, title: "All Products", icon: <MdInventory2 />, path:'/sazin-construction/all-products' },
  { id: 4, title: "Featured Products", icon: <MdWorkspacePremium />, path:'/sazin-construction/featured-products' },
  { id: 5, title: "Product Category", icon: <MdCategory />,
    categories:[
        { id: 1, title: "Fruits", icon: <FaAppleAlt />, path:'/sazin-construction/category/fruits' },
        { id: 2, title: "Vegetables", icon: <FaCarrot />, path:'/agro&fisheries/category/vegetables' },
        { id: 3, title: "Dairy", icon: <FaCheese />, path:'/agro&fisheries/category/dairy' },
        { id: 4, title: "Meat", icon: <FaDrumstickBite />, path:'/agro&fisheries/category/meat' },
        { id: 5, title: "Grains", icon: <FaBreadSlice />, path:'/agro&fisheries/category/grains' },
        { id: 6, title: "Seafood", icon: <GiShrimp />, path:'/agro&fisheries/category/seafood' },
        { id: 7, title: "Fish", icon: <FaFish />, path:'/agro&fisheries/category/fish' },
        { id: 8, title: "Fish Fry", icon: <GiFishEggs />, path:'/agro&fisheries/category/fish-fry' }, // মাছের পোনা
        { id: 9, title: "Fish Eggs (Roe)", icon: <GiFishEggs />, path:'/agro&fisheries/category/fish-eggs' }, // মাছের ডিম
        ]
   },

  ];



function Sidebar() {
  const { setItems } = useSidebar();
  useEffect(() => {
    setItems(SidebarItems);
  }, [setItems]);
  return (
    <>
    </>
  )
}

export default Sidebar
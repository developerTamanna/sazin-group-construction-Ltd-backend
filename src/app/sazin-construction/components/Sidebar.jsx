'use client';
import React, { useEffect } from 'react'

// FontAwesome icons
import { FaTools, FaBuilding, FaDraftingCompass, FaShieldAlt } from "react-icons/fa";

// Material Design icons
import { MdDashboard, MdShoppingCart, MdInventory2, MdWorkspacePremium, MdCategory } from "react-icons/md";

import { useSidebar } from '@/context/SidebarContext';

const SidebarItems = [
  { id: 1, title: "Dashboard", icon: <MdDashboard />, path: '/sazin-construction' },
  { id: 2, title: "Add Project", icon: <MdShoppingCart />, path: '/sazin-construction/add-project' },
  { id: 3, title: "Add News", icon: <MdShoppingCart />, path: '/sazin-construction/add-news' },
  { id: 4, title: "Post Job", icon: <MdShoppingCart />, path: '/sazin-construction/post-job' },

  { id: 5, title: "All Projects", icon: <MdInventory2 />, path: '/sazin-construction/all-projects' },
  { id: 6, title: "Featured Projects", icon: <MdWorkspacePremium />, path: '/sazin-construction/featured-projects' },
  {
    id: 7,
    title: "Project Category",
    icon: <MdCategory />,
    categories: [
      {
        id: 1,
        title: "Electro-Mechanical",
        icon: <FaTools />, // Tools = Electro-mechanical
        path: '/sazin-construction/category/electro-mechanical'
      },
      {
        id: 2,
        title: "Civil",
        icon: <FaBuilding />, // Building = Civil works
        path: '/sazin-construction/category/civil'
      },
      {
        id: 3,
        title: "Engineering Procurement",
        icon: <FaDraftingCompass />, // Compass = Engineering/Procurement
        path: '/sazin-construction/category/engineering-procurement'
      },
      {
        id: 4,
        title: "Safety & Security",
        icon: <FaShieldAlt />, // Shield = Safety & Security
        path: '/sazin-construction/category/safety-security'
      },
    ]
  },
];

function Sidebar() {
  const { setItems } = useSidebar();
  useEffect(() => {
    setItems(SidebarItems);
  }, [setItems]);

  return <></>;
}

export default Sidebar;

'use client';

import React, { useEffect } from "react";
import { useSidebar } from '@/context/SidebarContext';

import {
  MdDashboard,
  MdShoppingCart,
  MdInventory2,
  MdWorkspacePremium,
  MdSettings,
  MdHealthAndSafety,
  MdMasks,
  MdWork,
} from "react-icons/md";

// FontAwesome icons (valid)
import {
  FaShieldAlt,     // Helmet substitute
  FaGlasses,
  FaDeaf,
  FaHandPaper,
  FaShoePrints,
  FaVest,
} from "react-icons/fa";

// Game Icons
import { GiGasMask, GiBeltArmor, GiFallDown } from "react-icons/gi";

// Remix Icon
import { RiShieldStarFill } from "react-icons/ri";


const SidebarItems = [
  { id: 1, title: "Dashboard", icon: <MdDashboard /> },
  { id: 2, title: "Add Product", icon: <MdShoppingCart /> },
  { id: 3, title: "All Products", icon: <MdInventory2 /> },
  { id: 4, title: "Featured Products", icon: <MdWorkspacePremium /> },

  {
    id: 5,
    title: "Motorcycle Helmets",
    icon: <FaShieldAlt />, // valid helmet substitute
    categories: [
      { id: 1, title: "Full Face", icon: <RiShieldStarFill /> },
      { id: 2, title: "Modular Face", icon: <MdWork /> },
      { id: 3, title: "Open Face", icon: <FaShieldAlt /> },
      { id: 4, title: "Half Face", icon: <RiShieldStarFill /> },
    ],
  },

  {
    id: 6,
    title: "Reliance Safety (PPE)",
    icon: <MdHealthAndSafety />,
    categories: [
      { id: 1, title: "Safety Helmets (Hard Hats)", icon: <FaShieldAlt /> },
      { id: 2, title: "Safety Goggles / Face Shields", icon: <FaGlasses /> },
      { id: 3, title: "Hearing Protection", icon: <FaDeaf /> },
      { id: 4, title: "Safety Gloves", icon: <FaHandPaper /> },
      { id: 5, title: "Safety Shoes / Gumboots", icon: <FaShoePrints /> },
      { id: 6, title: "High-Visibility Vests / Jackets", icon: <FaVest /> },
      { id: 7, title: "Respirators / Masks", icon: <GiGasMask /> },
      { id: 8, title: "Coveralls / Protective Suits", icon: <GiBeltArmor /> },
      { id: 9, title: "Fall Protection Harness", icon: <GiFallDown /> },
      { id: 10, title: "Welding Helmets & Gloves", icon: <MdMasks /> },
    ],
  },

  { id: 7, title: "Settings", icon: <MdSettings /> },
];



function SidebarWithHelmetsAndPPE() {
  const { setItems } = useSidebar();
  useEffect(() => {
    setItems(SidebarItems);
  }, [setItems]);
  return (
    <>
    </>
  )
}

export default SidebarWithHelmetsAndPPE;

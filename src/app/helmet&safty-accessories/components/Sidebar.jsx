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
  { id: 1, title: "Dashboard", icon: <MdDashboard />,path:'/helmet&safty-accessories' },
  { id: 2, title: "Add Product", icon: <MdShoppingCart />,path:'/helmet&safty-accessories/add-product' },
  { id: 3, title: "All Products", icon: <MdInventory2 />,path:'/helmet&safty-accessories/all-products' },
  { id: 4, title: "Featured Products", icon: <MdWorkspacePremium />,path:'/helmet&safty-accessories/featured-products' },

  {
    id: 5,
    title: "Motorcycle Helmets",
    icon: <FaShieldAlt />, // valid helmet substitute
    categories: [
      { id: 1, title: "Full Face", icon: <RiShieldStarFill />,path:'/helmet&safty-accessories/category/full-face' },
      { id: 2, title: "Modular Face", icon: <MdWork />,path:'/helmet&safty-accessories/category/modular-face' },
      { id: 3, title: "Open Face", icon: <FaShieldAlt />,path:'/helmet&safty-accessories/category/open-face' },
      { id: 4, title: "Half Face", icon: <RiShieldStarFill />,path:'/helmet&safty-accessories/category/half-face' },
    ],
  },

  {
    id: 6,
    title: "Reliance Safety (PPE)",
    icon: <MdHealthAndSafety />,
    categories: [
      { id: 1, title: "Safety Helmets (Hard Hats)", icon: <FaShieldAlt />,path:'/helmet&safty-accessories/category/safety-helmets' },
      { id: 2, title: "Safety Goggles / Face Shields", icon: <FaGlasses />,path:'/helmet&safty-accessories/category/safety-goggles' },
      { id: 3, title: "Hearing Protection", icon: <FaDeaf />,path:'/helmet&safty-accessories/category/hearing-protection' },
      { id: 4, title: "Safety Gloves", icon: <FaHandPaper />,path:'/helmet&safty-accessories/category/safety-gloves' },
      { id: 5, title: "Safety Shoes / Gumboots", icon: <FaShoePrints />,path:'/helmet&safty-accessories/category/safety-shoes' },
      { id: 6, title: "High-Visibility Vests / Jackets", icon: <FaVest />,path:'/helmet&safty-accessories/category/high-visibility-vests' },
      { id: 7, title: "Respirators / Masks", icon: <GiGasMask />,path:'/helmet&safty-accessories/category/respirators-masks' },
      { id: 8, title: "Coveralls / Protective Suits", icon: <GiBeltArmor />,path:'/helmet&safty-accessories/category/coveralls-protective-suits' },
      { id: 9, title: "Fall Protection Harness", icon: <GiFallDown />,path:'/helmet&safty-accessories/category/fall-protection-harness' },
      { id: 10, title: "Welding Helmets & Gloves", icon: <MdMasks />,path:'/helmet&safty-accessories/category/welding-helmets-gloves' },
    ],
  },
  
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

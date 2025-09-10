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

   {
    id: 7,
    title: "All Projects",
    icon: <MdInventory2 />,
    path: '/sazin-construction/all-projects'
  },
  {
    id: 8,
    title: "Featured Projects",
    icon: <MdWorkspacePremium />,
    path: '/sazin-construction/featured-projects'
  },
  {
    id: 9,
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

   {id:5, title: "Certifications", icon: <MdShoppingCart />, path: '/sazin-construction/certifications',
      categories:[
          {id:1, title:"Add Certification", icon:<FaTools/>, path:'/sazin-construction/certifications/add-certification'},
          {id:2, title:"Manage Certification", icon:<FaTools/>, path:'/sazin-construction/certifications/manage-certification'},
      ]
   },

   {id:6, title: "Achievements", icon: <MdShoppingCart />, path: '/sazin-construction/achievement',
      categories:[
          {id:1, title:"Add Achievement", icon:<FaTools/>, path:'/sazin-construction/achievement/add-achievement'},
          {id:2, title:"Manage Achievement", icon:<FaTools/>, path:'/sazin-construction/achievement/manage-achievement'},
      ]
   },

     {
    id:12 ,title: 'Clients & partners', icon: <MdShoppingCart />, path: '/sazin-construction/clients&partners',
    categories:[
        {id:1, title:"Add Client", icon:<FaTools/>, path:'/sazin-construction/clients&partners/add-client'},
        {id:2, title:"Manage Clients", icon:<FaTools/>, path:'/sazin-construction/clients&partners/manage-clients'},
    ]
  },

  { id: 3, title: "News", icon: <MdShoppingCart />, path: '/sazin-construction/add-news',
       categories:[
             { id: 1, title: "Add News", icon: <FaTools />, path: '/sazin-construction/news/add-news' },
             { id: 2, title: "Manage News", icon: <FaTools />, path: '/sazin-construction/news/manage-news' },
       ]
   },
  { id: 4, title: "Jobs", icon: <MdShoppingCart />, path: '/sazin-construction/post-job',
     categories:[
         {id:1, title:"Post Job", icon:<FaTools/>, path:'/sazin-construction/jobs/post-job'},
         {id:2, title:"Manage Job", icon:<FaTools/>, path:'/sazin-construction/jobs/manage-job'},
     ]
   },
  {
    id:10 , title: 'Gallery', icon: <MdShoppingCart />, path: '/sazin-construction/gallery',
    categories:[
        {id:1, title:"Add Image", icon:<FaTools/>, path:'/sazin-construction/gallery/add-image'},
        {id:2, title:"Manage Gallery", icon:<FaTools/>, path:'/sazin-construction/gallery/manage-gallery'},
    ]
  },
  {
    id:11, title: 'Equipment', icon: <MdShoppingCart />, path: '/sazin-construction/equipment',
    categories:[
        {id:1, title:"Add Equipment", icon:<FaTools/>, path:'/sazin-construction/equipment/add-equipment'},
        {id:2, title:"Manage Equipment", icon:<FaTools/>, path:'/sazin-construction/equipment/manage-equipment'},
    ]
  },

  {
    id:13, title: 'Services', icon: <MdShoppingCart />, path: '/sazin-construction/services',
    categories:[
        {id:1, title:"Add Service", icon:<FaTools/>, path:'/sazin-construction/services/add-service'},
        {id:2, title:"Manage Services", icon:<FaTools/>, path:'/sazin-construction/services/manage-services'},
    ]
  }
];

function Sidebar() {
  const { setItems } = useSidebar();
  useEffect(() => {
    setItems(SidebarItems);
  }, [setItems]);

  return <></>;
}

export default Sidebar;

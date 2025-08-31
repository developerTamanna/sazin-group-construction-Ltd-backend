// src/components/SidebarWrapper.jsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";

export default function SidebarWrapper() {
  const { items } = useSidebar();
  return <Sidebar SidebarItems={items} />;
}

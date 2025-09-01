"use client";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const colorMap = {
  "agro&fisheries": {
    root: "/agro&fisheries",
    bgColor: "bg-green-800",
    textColor: "text-gray-100",
    cardBorder: "border-2 border-green-500",
    sidebarActive: "bg-white text-black",
    navbar: "bg-white shadow-md",
    active: "bg-green-700 text-white",
    hover: "hover:bg-black hover:text-white",
    accent: "text-yellow-500",
  },
  "helmet&safty-accessories": {
    root: "/helmet&safty-accessories",
    bgColor: "bg-blue-800",
    textColor: "text-gray-100",
    cardBorder: "border-2 border-red-500",
    navbar: "bg-white shadow-md",
    sidebarActive: "bg-white text-black",
    active: "bg-blue-800 text-white",
    hover: "hover:bg-black hover:text-white",
    accent: "text-yellow-500",
  },

};

// ✅ Custom Hook
export function DynamicColor() {
  const pathname = usePathname();
  const { setDynamicTheme } = useSidebar();

  useEffect(() => {
    if (!pathname) return <></>;
    const array = pathname.split("/");
    const root = array[1];
    setDynamicTheme(colorMap[root] || { bgColor: "", textColor: "", cardBorder: "", navbar: "", sidebar: "", accent: "" });
  }, [pathname]);

  return <> </>;
}
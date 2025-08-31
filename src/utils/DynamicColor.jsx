"use client";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const colorMap = {
  "agro&fisheries": {
    bgColor: "bg-green-800",
    textColor: "text-gray-100",
    cardBorder: "border-2 border-green-500",
    sidebar: "bg-green-600 text-white",
    navbar: "bg-white shadow-md",
    accent: "text-yellow-500",
  },
  "helmet&safty-accessories": {
    bgColor: "bg-blue-800",
    textColor: "text-gray-100",
    cardBorder: "border-2 border-red-500",
    navbar: "bg-white shadow-md",
  },
  "sazin-construction": {
    bgColor: "bg-black",
    textColor: "text-red-600",
    cardBorder: "border-2 border-red-500",
    navbar: "bg-white shadow-md",
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

'use client';
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [items, setItems] = useState([]); // default empty sidebar
  const [dynamicTheme, setDynamicTheme] = useState({ bgColor: '', textColor: '' });

  return (
    <SidebarContext.Provider value={{ items, setItems, dynamicTheme, setDynamicTheme }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

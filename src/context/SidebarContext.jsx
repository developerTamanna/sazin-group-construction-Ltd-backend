'use client';
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [items, setItems] = useState([]); // default empty sidebar

  return (
    <SidebarContext.Provider value={{ items, setItems }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

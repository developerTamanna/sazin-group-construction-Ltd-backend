"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import SidebarWrapper from "../app/components/SidebarWrapper";
import Navbar from "@/components/Navbar";
export default function ProtectedLayout({ children }) {
  const { user, loading } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    ); // loader dekhabe cookie check er age
  }

  if (!user) return null; // redirect er age empty render

  return( <>  <div className="h-[100vh] overflow-auto flex items-start justify-center">
                <div className="h-[100vh] w-full overflow-auto flex items-start justify-center">
                  {/* Sidebar সবসময় থাকবে */}
                    <div className="lg:w-[20%] lg:min-w-[280px] h-full shadow-lg w-0">

                      <SidebarWrapper />
                    </div>
                    {/* <main className="flex-1 rounded-br-md overflow-auto h-full p-4 bg-gray-50">{children}</main> */}
                    {/* //update code  */}
                    <main className="flex-1 rounded-br-md overflow-auto h-full bg-gray-100">
                      {/* Top Navbar */}
                        <Navbar />

                      {/* Main Content */}
                      <div className=" p-4">

                          {children}

                      </div>
                    </main>
              </div>
            </div>
            </>);
}

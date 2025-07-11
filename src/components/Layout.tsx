"use client";

import React from "react";
import CollapsibleSidebar from "./CollapsibleSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <CollapsibleSidebar />

      {/* Main content */}
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-[90rem] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

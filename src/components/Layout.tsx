"use client";

import React from "react";
import { LeftSidebar } from "./LeftSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />

      {/* Main content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;

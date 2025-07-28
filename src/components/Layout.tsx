"use client";

import React from "react";
import { LeftSidebar } from "./NADALeftSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-brand-white">
      <LeftSidebar />

      {/* Main content */}
      <main className="flex-1 ml-16 p-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

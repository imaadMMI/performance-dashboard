"use client";

import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-8 fixed h-full">
        <div className="space-y-10">
          {/* Logo */}
          <div className="text-4xl font-sans text-gray-500">nada</div>

          {/* Navigation */}
          <nav className="space-y-6">
            <Link
              href="/"
              className="block font-sans text-xl text-gray-500 hover:text-gray-700"
            >
              home
            </Link>
            <Link
              href="/profile"
              className="block font-sans text-xl text-gray-500 hover:text-gray-700"
            >
              my profile
            </Link>
            <Link
              href="/history"
              className="block font-sans text-xl text-gray-500 hover:text-gray-700"
            >
              session history
            </Link>
            <Link
              href="/feedback"
              className="block font-sans text-xl text-[#c68f00] hover:text-[#c68f00]/80"
            >
              feedback
            </Link>
            <Link
              href="/settings"
              className="block font-sans text-xl text-gray-500 hover:text-gray-700"
            >
              settings
            </Link>
          </nav>

          {/* Speak to nada button */}
          <button className="w-full bg-[#c68f00] text-white py-4 px-6 rounded-lg hover:bg-[#c68f00]/80 transition-colors font-sans text-xl">
            Speak to nada
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8 bg-white">
        <div className="max-w-[94rem] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

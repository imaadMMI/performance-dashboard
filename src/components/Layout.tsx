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
      <aside className="w-80 bg-white border-r border-gray-200 p-8 fixed h-full">
        <div className="space-y-20">
          {/* Logo */}
          <div className="text-6xl font-sans text-gray-500">nada</div>

          {/* Navigation */}
          <nav className="flex flex-col">
            <div className="space-y-6 mb-36">
              <Link
                href="/"
                className="block font-sans text-2xl text-gray-500 hover:text-gray-700"
              >
                home
              </Link>
              <Link
                href="/profile"
                className="block font-sans text-2xl text-gray-500 hover:text-gray-700"
              >
                my profile
              </Link>
              <Link
                href="/history"
                className="block font-sans text-2xl text-gray-500 hover:text-gray-700"
              >
                session history
              </Link>
              <Link
                href="/feedback"
                className="block font-sans text-2xl text-[#c68f00] hover:text-[#c68f00]/80"
              >
                feedback
              </Link>
            </div>
            <div className="space-y-6">
              <Link
                href="/settings"
                className="block font-sans text-2xl text-gray-500 hover:text-gray-700"
              >
                settings
              </Link>
            </div>
          </nav>

          {/* Speak to nada button */}
          <button className="w-full bg-[#c68f00] text-white py-4 px-6 rounded-lg hover:bg-[#c68f00]/80 transition-colors font-sans text-2xl">
            Speak to nada
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-80 p-8 bg-white">
        <div className="max-w-[94rem] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

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
      <aside className="w-70 bg-white border-r border-gray-200 p-8 fixed h-full shadow-sm">
        <div className="space-y-16">
          {/* Logo */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-[#b68d2e]">
              National Bonds Dashboard
            </div>
            {/* <div className="text-sm text-[#58595b] font-medium">Dashboard</div> */}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col">
            <div className="space-y-4 mb-24">
              <Link
                href="/"
                className="block font-sans text-lg text-[#58595b] hover:text-[#b68d2e] transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-[#b68d2e]/5"
              >
                Home
              </Link>
              <Link
                href="/profile"
                className="block font-sans text-lg text-[#58595b] hover:text-[#b68d2e] transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-[#b68d2e]/5"
              >
                My Profile
              </Link>
              <Link
                href="/history"
                className="block font-sans text-lg text-[#58595b] hover:text-[#b68d2e] transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-[#b68d2e]/5"
              >
                Session History
              </Link>
              <Link
                href="/feedback"
                className="block font-sans text-lg text-[#b68d2e] font-medium bg-[#b68d2e]/10 py-2 px-3 rounded-lg hover:bg-[#b68d2e]/15 transition-colors duration-200"
              >
                Feedback
              </Link>
            </div>
            <div className="space-y-4">
              <Link
                href="/settings"
                className="block font-sans text-lg text-[#58595b] hover:text-[#b68d2e] transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-[#b68d2e]/5"
              >
                Settings
              </Link>
            </div>
          </nav>

          {/* Primary Action Button */}
          <button className="w-full bg-[#b68d2e] text-white py-4 px-6 rounded-lg hover:bg-[#a67d29] transition-colors duration-200 font-sans text-lg font-medium shadow-md">
            Speak to nada
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-70 p-8 bg-[#f8f9fa]">
        <div className="max-w-[90rem] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

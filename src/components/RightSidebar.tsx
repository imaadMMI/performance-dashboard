"use client";

import React from "react";
import { ChevronsRight } from "lucide-react";

interface RightSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

export function RightSidebar({ showSidebar, setShowSidebar }: RightSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-full sm:w-[520px] h-full bg-[#F5F5F5] p-8 shadow-2xl transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto`}>
      <div className="text-left mb-8">
        <button
          onClick={() => setShowSidebar(false)}
          className="text-gray-600 font-medium text-base hover:text-yellow-600 transition-colors duration-200 inline-flex items-center gap-2"
        >
          Collapse retention stats
          <ChevronsRight className="w-4 h-4 transition-colors duration-200" />
        </button>
      </div>

      {/* Retention Stats Section */}
      <div className="mb-12">
        <div className="flex items-baseline gap-15 mb-6">
          <h2 className="text-2xl font-semibold">Retention stats</h2>
          <span className="text-gray-500 text-sm font-semibold">Monash TP5 2025</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">Students</p>
            <p className="text-3xl font-semibold">103</p>
          </div>
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">Enrolled</p>
            <p className="text-3xl font-semibold">56</p>
          </div>
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">Retained</p>
            <p className="text-3xl font-semibold">35</p>
          </div>
          <div className="bg-white p-8 rounded col-span-2 flex flex-col justify-center">
            <p className="text-black-600 text-sm mb-4 font-semibold">Successful progression</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-semibold mb-1">70.0%</p>
                <p className="text-black-500 text-sm font-semibold">census retention</p>
              </div>
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="90 10"
                    strokeDashoffset="25"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium">+90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archetype Stats Section */}
      <div>
        <div className="flex items-baseline gap-15 mb-6">
          <h2 className="text-2xl font-semibold">Archetype stats</h2>
          <span className="text-gray-500 text-sm font-semibold">Monash TP5 2025</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">Total</p>
            <p className="text-3xl font-semibold">13</p>
          </div>
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">Success</p>
            <p className="text-3xl font-semibold">06</p>
          </div>
          <div className="bg-white p-6 rounded text-left">
            <p className="text-gray-500 text-sm mb-2 font-semibold">High-risk</p>
            <p className="text-3xl font-semibold">07</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import DashboardEnhanced from "@/app/sales/dashboard-page/DashboardComponent";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { useRouter } from "next/navigation";




export default function Home() {
  const [selectedSchema, setSelectedSchema] = useState<"tp1" | "tp2" | "combined" | "sol-tp1">("tp1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataView, setDataView] = useState<"enrolled-only" | "all-students">("all-students");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Derive selected university from selected schema
  const selectedUniversity = selectedSchema === "sol-tp1" ? "sol" : "monash";
  const [activeUniversity, setActiveUniversity] = useState<"monash" | "sol">("monash");
  
  // Sync activeUniversity with selectedSchema when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      setActiveUniversity(selectedUniversity);
    }
  }, [isDropdownOpen, selectedUniversity]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">        
        {/* Header with Dropdown Filter - matching original page.tsx */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl text-[#58595b]">
            Performance Dashboard
          </h1>
            
            {/* Filters Container */}
            <div className="flex items-center gap-6">
              {/* Data View Toggle */}
              <div className="flex bg-[#F5F5F5] rounded-lg p-0.5">
                <button
                  onClick={() => setDataView("all-students")}
                  className={`px-4 py-2 rounded-md text-sm font-montserrat font-medium transition-all duration-200 ${
                    dataView === "all-students"
                      ? "bg-white text-[#282828] shadow-sm"
                      : "text-[#797A79] hover:text-[#282828]"
                  }`}
                >
                  All Customers
                </button>
                <button
                  onClick={() => setDataView("enrolled-only")}
                  className={`px-4 py-2 rounded-md text-sm font-montserrat font-medium transition-all duration-200 ${
                    dataView === "enrolled-only"
                      ? "bg-white text-[#282828] shadow-sm"
                      : "text-[#797A79] hover:text-[#282828]"
                  }`}
                >
                  Converted Only
                </button>
              </div>
              
              {/* Dropdown Filter for TP Selection */}
              <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-white border border-[#FF8A00] rounded-lg font-montserrat font-medium text-[#FF8A00] hover:bg-[#FFE5D0] transition-all duration-200 flex items-center gap-2"
              >
                <span>
                  {selectedSchema === "tp1" ? "Wayne Corp. - Q1" : 
                   selectedSchema === "tp2" ? "Wayne Corp. - Q2" : 
                   selectedSchema === "combined" ? "Wayne Corp. - Combined" : 
                   "Stark Inc. - Q1"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-[320px] bg-white border border-[#F0F0F0] rounded-lg shadow-lg z-10 overflow-hidden">
                  {/* University Toggle */}
                  <div className="p-4 border-b border-[#F0F0F0]">
                    <p className="text-xs font-montserrat font-semibold text-[#797A79] uppercase tracking-wide mb-3">Select Company</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveUniversity("monash")}
                        className={`flex-1 px-4 py-2 rounded-lg font-montserrat font-medium transition-all duration-200 ${
                          activeUniversity === "monash"
                            ? "bg-[#FF8A00] text-white shadow-sm"
                            : "bg-[#F5F5F5] text-[#58595b] hover:bg-[#ECECEC]"
                        }`}
                      >
                        Wayne
                      </button>
                      <button
                        onClick={() => setActiveUniversity("sol")}
                        className={`flex-1 px-4 py-2 rounded-lg font-montserrat font-medium transition-all duration-200 ${
                          activeUniversity === "sol"
                            ? "bg-[#FF8A00] text-white shadow-sm"
                            : "bg-[#F5F5F5] text-[#58595b] hover:bg-[#ECECEC]"
                        }`}
                      >
                        Stark
                      </button>
                    </div>
                  </div>
                  
                  {/* Teaching Period Selection */}
                  <div className="p-4">
                    <p className="text-xs font-montserrat font-semibold text-[#797A79] uppercase tracking-wide mb-3">Select Yearly Quarter</p>
                    <div className="space-y-2">
                      {activeUniversity === "monash" ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedSchema("tp1");
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                              selectedSchema === "tp1" 
                                ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                                : "hover:bg-[#F5F5F5] text-[#58595b]"
                            }`}
                          >
                            Quarter 1 (Jan - Mar)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSchema("tp2");
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                              selectedSchema === "tp2" 
                                ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                                : "hover:bg-[#F5F5F5] text-[#58595b]"
                            }`}
                          >
                            Quarter 2 (Apr - Jun)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSchema("combined");
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                              selectedSchema === "combined" 
                                ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                                : "hover:bg-[#F5F5F5] text-[#58595b]"
                            }`}
                          >
                            Q1-Q2 Combined
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedSchema("sol-tp1");
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                            selectedSchema === "sol-tp1" 
                              ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                              : "hover:bg-[#F5F5F5] text-[#58595b]"
                          }`}
                        >
                          Quarter 1 (Jan - Mar)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
        </div>
        
        {/* Dashboard Component */}
        <div className="mb-8">
          <DashboardEnhanced 
            selectedSchema={selectedSchema}
            dataView={dataView}
          />
        </div>
      </main>
    </div>
  );
}
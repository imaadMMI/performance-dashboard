"use client";

import React, { useState, useEffect } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardComponent from "./DashboardComponent";

export default function DashboardPage() {
  const router = useRouter();
  const [selectedSchema, setSelectedSchema] = useState<"tp1" | "tp2" | "combined" | "sol-tp1">("tp1");
  const [isSchemaDropdownOpen, setIsSchemaDropdownOpen] = useState(false);
  const [activeUniversity, setActiveUniversity] = useState<"monash" | "sol">("monash");
  
  // Derive selected university from selected schema
  const selectedUniversity = selectedSchema === "sol-tp1" ? "sol" : "monash";
  
  // Sync activeUniversity with selectedSchema when dropdown opens
  useEffect(() => {
    if (isSchemaDropdownOpen) {
      setActiveUniversity(selectedUniversity);
    }
  }, [isSchemaDropdownOpen, selectedUniversity]);

  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">
        {/* Back Button and Schema Filter */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/sales/placeholder')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Sales Center</span>
          </button>
          
          {/* Schema Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSchemaDropdownOpen(!isSchemaDropdownOpen)}
              className="px-4 py-2 bg-white border border-[#FF8A00] rounded-lg font-montserrat font-medium text-[#FF8A00] hover:bg-[#FFE5D0] transition-all duration-200 flex items-center gap-2"
            >
              <span>{selectedSchema === "tp1" ? "Monash - TP1" : selectedSchema === "tp2" ? "Monash - TP2" : selectedSchema === "combined" ? "Monash - Combined" : "SOL - TP1"}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isSchemaDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            
            {/* Dropdown Menu */}
            {isSchemaDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-[320px] bg-white border border-[#F0F0F0] rounded-lg shadow-lg z-10 overflow-hidden">
                {/* University Toggle */}
                <div className="p-4 border-b border-[#F0F0F0]">
                  <p className="text-xs font-montserrat font-semibold text-[#797A79] uppercase tracking-wide mb-3">Select University</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveUniversity("monash")}
                      className={`flex-1 px-4 py-2 rounded-lg font-montserrat font-medium transition-all duration-200 ${
                        activeUniversity === "monash"
                          ? "bg-[#FF8A00] text-white shadow-sm"
                          : "bg-[#F5F5F5] text-[#58595b] hover:bg-[#ECECEC]"
                      }`}
                    >
                      Monash
                    </button>
                    <button
                      onClick={() => setActiveUniversity("sol")}
                      className={`flex-1 px-4 py-2 rounded-lg font-montserrat font-medium transition-all duration-200 ${
                        activeUniversity === "sol"
                          ? "bg-[#FF8A00] text-white shadow-sm"
                          : "bg-[#F5F5F5] text-[#58595b] hover:bg-[#ECECEC]"
                      }`}
                    >
                      SOL
                    </button>
                  </div>
                </div>
                
                {/* Teaching Period Selection */}
                <div className="p-4">
                  <p className="text-xs font-montserrat font-semibold text-[#797A79] uppercase tracking-wide mb-3">Select Teaching Period</p>
                  <div className="space-y-2">
                    {activeUniversity === "monash" ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedSchema("tp1");
                            setIsSchemaDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                            selectedSchema === "tp1" 
                              ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                              : "hover:bg-[#F5F5F5] text-[#58595b]"
                          }`}
                        >
                          Teaching Period 1
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchema("tp2");
                            setIsSchemaDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                            selectedSchema === "tp2" 
                              ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                              : "hover:bg-[#F5F5F5] text-[#58595b]"
                          }`}
                        >
                          Teaching Period 2
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchema("combined");
                            setIsSchemaDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                            selectedSchema === "combined" 
                              ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                              : "hover:bg-[#F5F5F5] text-[#58595b]"
                          }`}
                        >
                          TP1-TP2 Combined
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedSchema("sol-tp1");
                          setIsSchemaDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left font-montserrat rounded-lg transition-colors ${
                          selectedSchema === "sol-tp1" 
                            ? "bg-[#FFE5D0] font-semibold text-[#FF8A00]" 
                            : "hover:bg-[#F5F5F5] text-[#58595b]"
                        }`}
                      >
                        Teaching Period 1
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Component */}
        <DashboardComponent selectedSchema={selectedSchema} />
      </main>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import KeyMomentsComponent from "./KeyMomentsComponent";
import tpCombinedData from '../dashboardJson/tp-combined.json';

export default function KeyMomentsPage() {
  const router = useRouter();
  
  // Key Moments filters state
  const [selectedConsultant, setSelectedConsultant] = useState<string>("all");
  const [consultants, setConsultants] = useState<{ id: string; name: string}[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedBehavior, setSelectedBehavior] = useState<string>("all");
  const [behaviors, setBehaviors] = useState<{ id: string; title: string }[]>([]);
  const [isConsultantDropdownOpen, setIsConsultantDropdownOpen] = useState(false);
  const [isBehaviorDropdownOpen, setIsBehaviorDropdownOpen] = useState(false);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  
  const consultantDropdownRef = useRef<HTMLDivElement>(null);
  const behaviorDropdownRef = useRef<HTMLDivElement>(null);
  const weekDropdownRef = useRef<HTMLDivElement>(null);
  const totalWeeks = 12;
  
  // Extract consultant and behavior data from JSON
  useEffect(() => {
    const individualPerformance = tpCombinedData.individual_consultant_performance as Record<string, any>;
    const consultantList = Object.entries(individualPerformance).map(([id, data]) => ({
      id,
      name: data.consultant_name.replace(/-/g, ' '),
    })).sort((a, b) => a.name.localeCompare(b.name));
    
    setConsultants(consultantList);
    
    // Extract behaviors from overall_behavioral_effects
    const behavioralEffects = tpCombinedData.overall_behavioral_effects as Record<string, any>;
    const behaviorList = Object.entries(behavioralEffects)
      .map(([id, data]) => ({
        id,
        title: data.taxonomy_info.title
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    
    setBehaviors(behaviorList);
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (consultantDropdownRef.current && !consultantDropdownRef.current.contains(event.target as Node)) {
        setIsConsultantDropdownOpen(false);
      }
      if (behaviorDropdownRef.current && !behaviorDropdownRef.current.contains(event.target as Node)) {
        setIsBehaviorDropdownOpen(false);
      }
      if (weekDropdownRef.current && !weekDropdownRef.current.contains(event.target as Node)) {
        setIsWeekDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">
        {/* Back Button and Filters */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/sales/placeholder')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Sales Center</span>
          </button>
          
          {/* Filters */}
          <div className="flex gap-3 items-center">
            {/* Behavior Filter */}
            <div className="relative" ref={behaviorDropdownRef}>
              <button
                onClick={() => setIsBehaviorDropdownOpen(!isBehaviorDropdownOpen)}
                className="px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] transition-colors duration-200 flex items-center gap-2 min-w-[180px] max-w-[280px]"
              >
                <span className="text-sm text-[#282828] truncate flex-1">
                  {selectedBehavior === "all" 
                    ? "All Behaviors" 
                    : behaviors.find(b => b.id === selectedBehavior)?.title || "Select Behavior"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-[#797A79] transition-transform duration-200 flex-shrink-0 ${
                    isBehaviorDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isBehaviorDropdownOpen && (
                <div className="absolute z-50 mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden" style={{ minWidth: '280px', maxWidth: '400px' }}>
                  <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                    <button
                      onClick={() => {
                        setSelectedBehavior("all");
                        setIsBehaviorDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                        selectedBehavior === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <span className="text-sm text-[#282828] block break-words">All Behaviors</span>
                    </button>
                    {behaviors.map((behavior) => (
                      <button
                        key={behavior.id}
                        onClick={() => {
                          setSelectedBehavior(behavior.id);
                          setIsBehaviorDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                          selectedBehavior === behavior.id ? "bg-[#F5F5F5] font-semibold" : ""
                        }`}
                      >
                        <span className="text-sm text-[#282828] block break-words pr-2">{behavior.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Week Filter */}
            <div className="relative" ref={weekDropdownRef}>
              <button
                onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                className="px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] transition-colors duration-200 flex items-center gap-2 min-w-[100px]"
              >
                <span className="text-sm text-[#282828]">Week {selectedWeek}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-[#797A79] transition-transform duration-200 ${
                    isWeekDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isWeekDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
                      <button
                        key={week}
                        onClick={() => {
                          setSelectedWeek(week);
                          setIsWeekDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                          week > 1 ? 'border-t border-[#F0F0F0]' : ''
                        } ${selectedWeek === week ? "bg-[#F5F5F5] font-semibold" : ""}`}
                      >
                        <span className="text-sm text-[#282828]">Week {week}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Consultant Filter */}
            <div className="relative" ref={consultantDropdownRef}>
              <button
                onClick={() => setIsConsultantDropdownOpen(!isConsultantDropdownOpen)}
                className="px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] transition-colors duration-200 flex items-center gap-2 min-w-[160px]"
              >
                <span className="text-sm text-[#282828] truncate">
                  {selectedConsultant === "all" 
                    ? "All Consultants" 
                    : consultants.find(c => c.id === selectedConsultant)?.name || "Select Consultant"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-[#797A79] transition-transform duration-200 ${
                    isConsultantDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isConsultantDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedConsultant("all");
                        setIsConsultantDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                        selectedConsultant === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <span className="text-sm text-[#282828]">All Consultants</span>
                    </button>
                    {consultants.map((consultant) => (
                      <button
                        key={consultant.id}
                        onClick={() => {
                          setSelectedConsultant(consultant.id);
                          setIsConsultantDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                          selectedConsultant === consultant.id ? "bg-[#F5F5F5] font-semibold" : ""
                        }`}
                      >
                        <span className="text-sm text-[#282828]">{consultant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Moments Component */}
        <KeyMomentsComponent 
          selectedConsultant={selectedConsultant}
          setSelectedConsultant={setSelectedConsultant}
          consultants={consultants}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          selectedBehavior={selectedBehavior}
          setSelectedBehavior={setSelectedBehavior}
          behaviors={behaviors}
        />
      </main>
    </div>
  );
}
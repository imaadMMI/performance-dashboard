"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import dashboardData from "./dashboard-data.json";

interface ArchetypeChartProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  animationDuration?: number;
}

const ArchetypeChart: React.FC<ArchetypeChartProps> = ({
  value,
  size = 80,
  strokeWidth = 6,
  primaryColor = "#8BAF20",
  backgroundColor = "#F0F0F0",
  fontSize = "20px",
  fontWeight = "600",
  animationDuration = 1000,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;
  
  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / animationDuration, 1);
      
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentValue = value * easeOutCubic(progress);
      
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, animationDuration]);
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.35s ease",
          }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontSize,
          fontWeight,
          fontFamily: "'Quicksand', sans-serif",
          color: "#282828",
        }}
      >
        {animatedValue > 0 ? "+" : ""}{animatedValue.toFixed(1)}%
      </div>
    </div>
  );
};

interface BehaviourData {
  name: string;
  impact_on_retention: string;
  change_since_last_TP: number;
  description: string;
  tags: string[];
}

interface ConsultantData {
  rank: number;
  name: string;
  average_score: number;
  potential_increase_retention: string;
  retention_rate: string;
}

export default function Dashboard() {
  const behaviourData = dashboardData.MOL_TP1_2025.impact_on_enrolment_retention;
  const consultantData = dashboardData.MOL_TP1_2025.individual_potential_improvement;
  const comparisonData = dashboardData.MOL_TP1_2025.support_mechanism_integration_patterns;
  const [selectedBehaviour, setSelectedBehaviour] = useState<BehaviourData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBehaviourFilter, setSelectedBehaviourFilter] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Calculate dynamic team average from actual consultants (excluding "Team average" entry)
  const actualConsultants = consultantData.consultants.filter((c: ConsultantData) => c.name !== "Team average");
  const dynamicTeamAverage = (
    actualConsultants.reduce((sum: number, consultant: ConsultantData) => 
      sum + parseFloat(consultant.retention_rate), 0) / actualConsultants.length
  ).toFixed(1);
  
  return (
    <div className="w-full relative">
      {/* Main Container Card */}
      <div 
        className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#282828] mb-2">
            Impact of Behaviours on Retention
          </h1>
          <p className="text-sm text-[#797A79]">
            Tracking behavioral patterns and their influence on student enrollment retention rates
          </p>
        </div>
        
        {/* Behaviour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {behaviourData.behaviours.map((behaviour: BehaviourData, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedBehaviour(behaviour)}
              className="group bg-[#F5F5F5] rounded-xl border border-[#F0F0F0] p-6 hover:shadow-md hover:border-[#E0E0E0] hover:bg-white transition-all duration-[250ms] cursor-pointer"
            >
              {/* Behaviour Name */}
              <h3 className="text-base font-semibold text-[#282828] mb-6 leading-relaxed min-h-[48px]">
                {behaviour.name}
              </h3>
              
              {/* Chart and Impact Value */}
              <div className="flex items-center justify-between">
                <ArchetypeChart 
                  value={behaviour.change_since_last_TP}
                  size={80}
                  strokeWidth={6}
                  primaryColor={behaviour.change_since_last_TP > 15 ? "#FF8A00" : "#8BAF20"}
                  backgroundColor="#F0F0F0"
                  fontSize="18px"
                  fontWeight="600"
                />
                
                <div className="text-right">
                  <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">
                    Impact
                  </p>
                  <p className="text-xl font-bold text-[#282828]">
                    {behaviour.impact_on_retention}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary Statistics */}
        <div 
          className="bg-[#F5F5F5] rounded-xl border border-[#F0F0F0] p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-[#797A79] mb-1">Total Behaviours Tracked</p>
              <p className="text-2xl font-bold text-[#282828]">{behaviourData.behaviours.length}</p>
            </div>
            <div>
              <p className="text-sm text-[#797A79] mb-1">Average Impact</p>
              <p className="text-2xl font-bold text-[#8BAF20]">
                +{(behaviourData.behaviours.reduce((acc: number, b: BehaviourData) => acc + b.change_since_last_TP, 0) / behaviourData.behaviours.length).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-[#797A79] mb-1">Highest Impact</p>
              <p className="text-2xl font-bold text-[#FF8A00]">
                +{Math.max(...behaviourData.behaviours.map((b: BehaviourData) => b.change_since_last_TP)).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Individual Potential Improvement Card */}
      <div 
        className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm mt-6"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Title Section */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#282828] mb-2">
              Individual Potential Improvement
            </h1>
            <p className="text-sm text-[#797A79]">
              Consultant performance metrics and retention rates
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">Team Average</p>
            <p className="text-2xl font-bold text-[#FF8A00]">
              {dynamicTeamAverage}%
            </p>
          </div>
        </div>
        
        {/* Sort Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-200"
          >
            <span className="text-sm font-medium text-[#282828]">
              Sort by Retention Rate
            </span>
            {sortOrder === "desc" ? (
              <ArrowDown size={16} className="text-[#797A79]" />
            ) : (
              <ArrowUp size={16} className="text-[#797A79]" />
            )}
          </button>
        </div>
        
        {/* Consultants Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#F0F0F0]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                  Consultant Name
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                  Retention Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {consultantData.consultants
                .filter((consultant: ConsultantData) => consultant.name !== "Team average")
                .sort((a: ConsultantData, b: ConsultantData) => {
                  const aRate = parseFloat(a.retention_rate);
                  const bRate = parseFloat(b.retention_rate);
                  return sortOrder === "desc" ? bRate - aRate : aRate - bRate;
                })
                .map((consultant: ConsultantData, index: number) => {
                  const isTopPerformer = consultant.rank <= 3;
                  
                  return (
                    <tr 
                      key={index} 
                      className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-sm text-[#282828]">
                        #{consultant.rank}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {isTopPerformer && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8BAF20] text-white text-xs font-bold">
                              {consultant.rank}
                            </span>
                          )}
                          <span className="text-base text-[#282828]">
                            {consultant.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`text-lg font-semibold ${
                          parseFloat(consultant.retention_rate) >= 85 ? "text-[#8BAF20]" :
                          parseFloat(consultant.retention_rate) >= 75 ? "text-[#FF8A00]" :
                          "text-[#D84D51]"
                        }`}>
                          {consultant.retention_rate}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Enhanced Comparison of Sales Behaviours Patterns Card */}
      <div 
        className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm mt-6"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Title Section with Filter */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#282828] mb-2">
              Enhanced Comparison of Sales Behaviours Patterns
            </h1>
            <p className="text-sm text-[#797A79]">
              Analyze and compare different behavioural patterns across sales consultations
            </p>
          </div>
          
          {/* Dropdown Filter */}
          <div className="ml-6">
            <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
              Filter by Behaviour
            </label>
            <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-80 px-4 py-3 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
            >
              <span className="text-base text-[#282828]">
                {selectedBehaviourFilter === "all" 
                  ? "All Behaviours" 
                  : behaviourData.behaviours.find(b => b.name === selectedBehaviourFilter)?.name || "Select Behaviour"}
              </span>
              <ChevronDown 
                size={20} 
                className={`text-[#797A79] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full md:w-80 mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedBehaviourFilter("all");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                      selectedBehaviourFilter === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                    }`}
                  >
                    <span className="text-base text-[#282828]">All Behaviours</span>
                  </button>
                  {behaviourData.behaviours.map((behaviour: BehaviourData, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedBehaviourFilter(behaviour.name);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                        selectedBehaviourFilter === behaviour.name ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base text-[#282828]">{behaviour.name}</span>
                        <span className="text-xs text-[#8BAF20] font-semibold">{behaviour.impact_on_retention}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
        
        {/* Content Area - Comparison Data */}
        <div className="bg-[#F5F5F5] rounded-lg border border-[#F0F0F0] p-6">
          {selectedBehaviourFilter === "all" ? (
            <div className="text-center py-8">
              <p className="text-[#797A79] text-base">
                Select a behaviour from the dropdown above to view detailed comparison patterns
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#282828] mb-4">
                Pattern Analysis: {selectedBehaviourFilter}
              </h3>
              
              {/* Display comparison data based on selected behaviour */}
              <div className="space-y-4">
                {comparisonData.comparison && comparisonData.comparison.map((item: any, index: number) => (
                  <div key={index} className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 ${
                    item.category === "Enrolled and Retained" ? "border-l-[#8BAF20]" :
                    item.category === "Enrolled Not Retained" ? "border-l-[#FF8A00]" :
                    "border-l-[#D84D51]"
                  }`}>
                    {/* Header with Category and Score Range */}
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#282828]">
                          {item.category}
                        </h4>
                        <div className="text-right">
                          <p className="text-xs text-[#797A79] uppercase tracking-wide">Score Range</p>
                          <p className="text-sm font-bold text-[#282828]">{item.score_range}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content with Sample Script */}
                    <div className="p-6">
                      <div>
                        <p className="text-base font-semibold text-[#282828] italic leading-relaxed">
                          "{item.consultant_script}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal Popup */}
      {selectedBehaviour && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setSelectedBehaviour(null)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] p-8 max-w-lg w-full mx-4 shadow-xl pointer-events-auto"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#282828]">
                  {selectedBehaviour.name}
                </h2>
                <button
                  onClick={() => setSelectedBehaviour(null)}
                  className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                >
                  <X size={24} className="text-[#797A79]" />
                </button>
              </div>
              
              {/* Metrics and Tags */}
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-[#797A79]">
                    Impact: <span className="font-semibold text-[#282828]">{selectedBehaviour.impact_on_retention}</span>
                  </span>
                  <span className="text-sm text-[#797A79]">
                    Change: <span className="font-semibold text-[#8BAF20]">+{selectedBehaviour.change_since_last_TP}%</span>
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  {selectedBehaviour.tags && selectedBehaviour.tags.map((tag, index) => {
                    const isConsultation = tag === "consultation";
                    const isEnrollment = tag === "enrollment";
                    const isSuccessful = tag.includes("successful");
                    const isHighRisk = tag.includes("high risk");
                    
                    return (
                      <span
                        key={index}
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          isConsultation ? "bg-[#B5DAD4] text-[#282828] border border-[#B5DAD4]" :
                          isEnrollment ? "bg-[#FF8A00] text-white" :
                          isSuccessful ? "bg-[#8BAF20] text-white" :
                          isHighRisk ? "bg-[#D84D51] text-white" :
                          "bg-[#F5F5F5] text-[#282828] border border-[#F0F0F0]"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              {/* Description */}
              <div className="p-6 bg-[#F5F5F5] rounded-lg border border-[#F0F0F0]">
                <p className="text-sm font-semibold text-[#797A79] uppercase tracking-wide mb-3">
                  Description
                </p>
                <p className="text-base text-[#282828] leading-relaxed">
                  {selectedBehaviour.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
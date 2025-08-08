"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
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
  const [selectedBehaviour, setSelectedBehaviour] = useState<BehaviourData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
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
              {consultantData.consultants.find((c: ConsultantData) => c.name === "Team average")?.retention_rate || "75.8%"}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#282828]">
                  Qualitative Data
                </h2>
                <button
                  onClick={() => setSelectedBehaviour(null)}
                  className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                >
                  <X size={24} className="text-[#797A79]" />
                </button>
              </div>
              
              {/* Behaviour Name */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#282828] mb-2">
                  {selectedBehaviour.name}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-[#797A79]">
                    Impact: <span className="font-semibold text-[#282828]">{selectedBehaviour.impact_on_retention}</span>
                  </span>
                  <span className="text-sm text-[#797A79]">
                    Change: <span className="font-semibold text-[#8BAF20]">+{selectedBehaviour.change_since_last_TP}%</span>
                  </span>
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
              
              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedBehaviour(null)}
                  className="px-6 py-2 bg-[#8BAF20] text-white rounded-lg font-medium hover:bg-[#7A9E1B] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
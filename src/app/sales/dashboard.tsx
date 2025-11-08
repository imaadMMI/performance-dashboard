"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import tp1Data from "./dashboardJson/tp1-schema.json";
import tp2Data from "./dashboardJson/tp2-schema.json";
import tpCombinedData from "./dashboardJson/tp-combined.json";
import solTp1Data from "./dashboardJson/sol-tp1.json";

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
  const originalValue = value; // Store original value with sign
  const absValue = Math.abs(value); // Use absolute value for chart
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // For negative values, we need to draw counter-clockwise
  const strokeDashoffset = originalValue < 0 
    ? circumference + (Math.abs(animatedValue) / 100) * circumference
    : circumference - (Math.abs(animatedValue) / 100) * circumference;
  
  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / animationDuration, 1);
      
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentValue = absValue * easeOutCubic(progress);
      
      setAnimatedValue(originalValue < 0 ? -currentValue : currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [originalValue, absValue, animationDuration]);
  
  const isNegative = originalValue < 0;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={isNegative ? "transform rotate-270" : "transform -rotate-90"}
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
            transformOrigin: "center",
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


interface BehavioralFeature {
  taxonomy_info: {
    title: string;
    description: string;
    identification_guidance: string;
    examples: string[];
  };
  meta_analysis_metrics: {
    overall_confidence: string;
    weighted_effect_size: number;
    effect_size_percentage: string;
    sample_size: {
      students_with_behavior: number;
      students_without_behavior: number;
      total_sample_size: number;
    };
    retention_rates: {
      retention_with_behavior: number;
      retention_without_behavior: number;
      retention_with_behavior_percentage: string;
      retention_without_behavior_percentage: string;
    };
    evidence_strength: {
      total_significant_findings: number;
      datasets_found: number;
      combined_p_value: number;
    };
  };
}

interface QuoteExample {
  quote_id: string;
  evidence: string;
  justification: string;
  outcome_category: string;
}

interface BehaviorData {
  consultant_metrics?: {
    percentage_students_with_behavior: number;
  };
  improvement_potential?: {
    optimal_percentage_students_with_behavior?: number;
    potential_retention_increase_percentage?: string;
  };
  optimal_conditions?: {
    optimal_percentage_students_with_behavior?: number;
    potential_retention_increase_percentage?: string;
  };
  team_averages?: {
    team_percentage_students_with_behavior?: number;
  };
}

interface ConsultantPerformance {
  consultant_name: string;
  overall_metrics: {
    average_retention_rate: number;
    potential_retention_increase_percentage: string;
    total_students: number;
    average_retention_rate_percentage: string;
  };
  behavioral_features: {
    [key: string]: BehaviorData;
  };
}

interface DashboardProps {
  selectedSchema?: "tp1" | "tp2" | "combined" | "sol-tp1";
}

// interface Consultant {
//   id: string;
//   name: string;
//   retention_rate: string;
//   potential_increase: string;
//   rate_value: number;
//   rank?: number;
// }

export default function Dashboard({ selectedSchema = "tp1" }: DashboardProps) {
  
  // Get behavioral features from selected schema
  const behavioralData = selectedSchema === "tp1" ? tp1Data : selectedSchema === "tp2" ? tp2Data : selectedSchema === "combined" ? tpCombinedData : solTp1Data;
  const behavioralFeatures = behavioralData.overall_behavioral_effects as Record<string, BehavioralFeature>;
  const exampleQuotes = behavioralData.example_quotes as Record<string, { behavioral_feature_title: string; outcome_categories: Record<string, QuoteExample[]> }>;
  const individualPerformance = behavioralData.individual_consultant_performance as Record<string, ConsultantPerformance>;
  
  const [selectedBehaviour, setSelectedBehaviour] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBehaviourFilter, setSelectedBehaviourFilter] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalDataType, setModalDataType] = useState<"qualitative" | "quantitative">("qualitative");
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  
  // Create consultant data from selected schema
  const consultantsFromSchema = Object.entries(individualPerformance)
    .map(([consultantId, data]: [string, ConsultantPerformance]) => ({
      id: consultantId,
                name: data.consultant_name,
                retention_rate: (data.overall_metrics.average_retention_rate * 100).toFixed(1) + "%",
                potential_increase: data.overall_metrics.potential_retention_increase_percentage,
                rate_value: data.overall_metrics.average_retention_rate * 100    }))
    .sort((a, b) => parseFloat(b.retention_rate) - parseFloat(a.retention_rate))
    .map((consultant, index) => ({
      ...consultant,
      rank: index + 1
    }));
  
  // Calculate dynamic team average from all consultants
  const dynamicTeamAverage = (
    consultantsFromSchema.reduce((sum: number, consultant: { retention_rate: string }) => 
      sum + parseFloat(consultant.retention_rate), 0) / consultantsFromSchema.length
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {Object.entries(behavioralFeatures).slice(0, 10).map(([key, feature]) => {
            const effectSize = feature.meta_analysis_metrics.weighted_effect_size * 100;
            
            return (
              <div
                key={key}
                onClick={() => setSelectedBehaviour(key)}
                className="group bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer"
              >
                {/* Impact Level Badge */}
                <div className="flex justify-center mb-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                    effectSize > 0 ? "bg-[#8BAF20] text-white" : "bg-[#D84D51] text-white"
                  }`}>
                    {effectSize > 0 ? "Increase" : "Avoid"}
                  </span>
                </div>
                
                {/* Behaviour Name */}
                <h3 className="text-sm font-semibold text-[#282828] mb-4 text-center leading-relaxed min-h-[40px]">
                  {feature.taxonomy_info.title}
                </h3>
                
                {/* Chart Only */}
                <div className="flex justify-center">
                  <ArchetypeChart 
                    value={effectSize}
                    size={72}
                    strokeWidth={6}
                    primaryColor={effectSize > 0 ? "#8BAF20" : "#D84D51"}
                    backgroundColor="#F0F0F0"
                    fontSize="16px"
                    fontWeight="600"
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary Statistics */}
        <div 
          className="bg-[#F5F5F5] rounded-xl border border-[#F0F0F0] p-8"
        >
          <div className="flex justify-around items-center">
            <div className="text-center flex-1">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Behaviors Analyzed</p>
              <p className="text-3xl font-bold text-[#282828]">{Object.keys(behavioralFeatures).length}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Highest Impact</p>
              <p className="text-3xl font-bold text-[#8BAF20]">
                +{Math.max(...Object.values(behavioralFeatures).map(f => 
                  f.meta_analysis_metrics.weighted_effect_size * 100)).toFixed(1)}%
              </p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Lowest Impact</p>
              <p className="text-3xl font-bold text-[#D84D51]">
                {(() => {
                  const lowestImpact = Math.min(...Object.values(behavioralFeatures).map(f => 
                    f.meta_analysis_metrics.weighted_effect_size * 100));
                  return lowestImpact > 0 ? `+${lowestImpact.toFixed(1)}%` : `${lowestImpact.toFixed(1)}%`;
                })()}
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
              {consultantsFromSchema
                .sort((a: { retention_rate: string }, b: { retention_rate: string }) => {
                  const aRate = parseFloat(a.retention_rate);
                  const bRate = parseFloat(b.retention_rate);
                  return sortOrder === "desc" ? bRate - aRate : aRate - bRate;
                })
                .map((consultant: { id: string; name: string; retention_rate: string; rank: number }, index: number) => {
                  // Determine color based on position in sorted list
                  const totalConsultants = consultantsFromSchema.length;
                  const topThird = Math.ceil(totalConsultants / 3);
                  const middleThird = Math.ceil(totalConsultants * 2 / 3);
                  
                  let colorClass = "text-[#D84D51]"; // Default red for bottom third
                  if (consultant.rank <= topThird) {
                    colorClass = "text-[#8BAF20]"; // Green for top third
                  } else if (consultant.rank <= middleThird) {
                    colorClass = "text-[#FF8A00]"; // Orange for middle third
                  }
                  
                  return (
                    <tr 
                      key={index} 
                      onClick={() => setSelectedConsultant(consultant.id)}
                      className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-200 cursor-pointer"
                    >
                      <td className="py-4 px-4 text-sm text-[#282828]">
                        #{consultant.rank}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-base text-[#282828]">
                          {consultant.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`text-lg font-semibold ${colorClass}`}>
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
              Behavioral Pattern Examples
            </h1>
            <p className="text-sm text-[#797A79]">
              Real consultant quotes demonstrating behavioral patterns and their outcomes
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
                  : behavioralFeatures[selectedBehaviourFilter]?.taxonomy_info?.title || "Select Behaviour"}
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
                  {Object.entries(behavioralFeatures).map(([key, feature]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedBehaviourFilter(key);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                        selectedBehaviourFilter === key ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base text-[#282828]">{feature.taxonomy_info.title}</span>
                        <span className={`text-xs font-semibold ${
                          feature.meta_analysis_metrics.weighted_effect_size < 0 
                            ? "text-[#D84D51]" 
                            : "text-[#8BAF20]"
                        }`}>
                          {feature.meta_analysis_metrics.effect_size_percentage}
                        </span>
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
                Select a behaviour from the dropdown above to view real consultant examples
              </p>
            </div>
          ) : exampleQuotes[selectedBehaviourFilter] ? (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#282828] mb-2">
                  {behavioralFeatures[selectedBehaviourFilter]?.taxonomy_info?.title || exampleQuotes[selectedBehaviourFilter].behavioral_feature_title}
                </h3>
                <p className="text-sm text-[#797A79]">
                  {behavioralFeatures[selectedBehaviourFilter]?.taxonomy_info?.description}
                </p>
              </div>
              
              {/* Display real quotes from JSON */}
              <div className="space-y-4">
                {/* Enrolled and Retained Examples */}
                {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_retained && 
                 exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_retained.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#8BAF20]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <h4 className="text-lg font-semibold text-[#282828]">
                        Enrolled and Retained
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed">
                            {quote.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Enrolled Not Retained Examples */}
                {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_not_retained && 
                 exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_not_retained.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#FF8A00]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <h4 className="text-lg font-semibold text-[#282828]">
                        Enrolled Not Retained
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_not_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed">
                            {quote.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Not Enrolled Examples */}
                {exampleQuotes[selectedBehaviourFilter].outcome_categories.not_enrolled && 
                 exampleQuotes[selectedBehaviourFilter].outcome_categories.not_enrolled.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#D84D51]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <h4 className="text-lg font-semibold text-[#282828]">
                        Not Enrolled
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.not_enrolled.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed">
                            {quote.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#797A79] text-base">
                No examples available for this behavior
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal Popup */}
      {selectedBehaviour && behavioralFeatures[selectedBehaviour] && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setSelectedBehaviour(null)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] max-w-5xl w-full mx-4 shadow-xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {/* Modal Header with Title and Effect Size */}
              <div className="border-b border-[#F0F0F0] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#282828]">
                    {behavioralFeatures[selectedBehaviour].taxonomy_info.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    {(() => {
                      const effectSize = behavioralFeatures[selectedBehaviour].meta_analysis_metrics.weighted_effect_size * 100;
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[#797A79] uppercase tracking-wide">Effect Size:</span>
                            <span className="text-xl font-bold" style={{ 
                              color: effectSize > 0 ? "#8BAF20" : "#D84D51" 
                            }}>
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.effect_size_percentage}
                            </span>
                          </div>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                            effectSize > 0 ? "bg-[#8BAF20] text-white" : "bg-[#D84D51] text-white"
                          }`}>
                            {effectSize > 0 ? "Increase" : "Avoid"}
                          </span>
                        </>
                      );
                    })()}
                    <button
                      onClick={() => setSelectedBehaviour(null)}
                      className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    >
                      <X size={24} className="text-[#797A79]" />
                    </button>
                  </div>
                </div>
                
                {/* Toggle Buttons */}
                <div className="flex bg-[#F5F5F5] rounded-lg p-1">
                  <button
                    onClick={() => setModalDataType("qualitative")}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      modalDataType === "qualitative"
                        ? "bg-white text-[#282828] shadow-sm"
                        : "text-[#797A79] hover:text-[#282828]"
                    }`}
                  >
                    Qualitative Data
                  </button>
                  <button
                    onClick={() => setModalDataType("quantitative")}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      modalDataType === "quantitative"
                        ? "bg-white text-[#282828] shadow-sm"
                        : "text-[#797A79] hover:text-[#282828]"
                    }`}
                  >
                    Quantitative Data
                  </button>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6">
                {modalDataType === "qualitative" ? (
                  /* Qualitative Data View */
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-3">
                        Description
                      </p>
                      <p className="text-sm text-[#282828] leading-relaxed">
                        {behavioralFeatures[selectedBehaviour].taxonomy_info.description}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-3">
                        Identification Guidance
                      </p>
                      <p className="text-sm text-[#282828] leading-relaxed">
                        {behavioralFeatures[selectedBehaviour].taxonomy_info.identification_guidance}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-3">
                        Examples
                      </p>
                      <div className="space-y-3">
                        {behavioralFeatures[selectedBehaviour].taxonomy_info.examples.map((example: string, idx: number) => (
                          <div key={idx} className={`border-l-3 pl-4 ${(() => {
                            const effectSize = behavioralFeatures[selectedBehaviour].meta_analysis_metrics.weighted_effect_size * 100;
                            return effectSize > 0 ? "border-[#8BAF20]" : "border-[#D84D51]";
                          })()}`}>
                            <p className="text-sm text-[#282828] italic leading-relaxed">
                              &ldquo;{example}&rdquo;
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Quantitative Data View */
                  <div>
                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-4">
                      Statistical Metrics
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0]">
                        <p className="text-xs text-[#797A79] uppercase tracking-wide mb-2">Retention Rates</p>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-[#797A79] mb-1">With Behavior</p>
                            <p className={`text-lg font-semibold ${
                              behavioralFeatures[selectedBehaviour].meta_analysis_metrics.weighted_effect_size > 0 
                                ? "text-[#8BAF20]" 
                                : "text-[#D84D51]"
                            }`}>
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.retention_rates.retention_with_behavior_percentage}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#797A79] mb-1">Without Behavior</p>
                            <p className={`text-lg font-semibold ${
                              behavioralFeatures[selectedBehaviour].meta_analysis_metrics.weighted_effect_size > 0 
                                ? "text-[#D84D51]" 
                                : "text-[#8BAF20]"
                            }`}>
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.retention_rates.retention_without_behavior_percentage}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0]">
                        <p className="text-xs text-[#797A79] uppercase tracking-wide mb-2">Sample Size</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-[#797A79]">Total Students</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.sample_size.total_sample_size.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-[#797A79]">With Behavior</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.sample_size.students_with_behavior.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-[#797A79]">Without Behavior</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.sample_size.students_without_behavior.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0] md:col-span-2">
                        <p className="text-xs text-[#797A79] uppercase tracking-wide mb-2">Evidence Strength</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <span className="text-xs text-[#797A79] block mb-1">Confidence Level</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.overall_confidence.replace("Meta ", "")}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-[#797A79] block mb-1">P-value</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.evidence_strength.combined_p_value.toExponential(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-[#797A79] block mb-1">Significant Findings</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.evidence_strength.total_significant_findings}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-[#797A79] block mb-1">Datasets</span>
                            <span className="text-sm font-semibold text-[#282828]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.evidence_strength.datasets_found}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Consultant Performance Modal */}
      {selectedConsultant && (individualPerformance[selectedConsultant] as ConsultantPerformance) && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setSelectedConsultant(null)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] max-w-6xl w-full shadow-xl pointer-events-auto overflow-y-auto"
              style={{ fontFamily: "'Quicksand', sans-serif", maxHeight: "calc(100vh - 2rem)", minHeight: "600px" }}
            >
              {/* Modal Header */}
              <div className="border-b border-[#F0F0F0] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#282828]">
                    {(individualPerformance[selectedConsultant] as ConsultantPerformance).consultant_name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-[#797A79]">
                      {selectedSchema === "tp1" ? "Monash TP1" : selectedSchema === "tp2" ? "Monash TP2" : selectedSchema === "combined" ? "Monash TP1-TP2 Combined" : "SOL TP1"}
                    </span>
                    <button
                      onClick={() => setSelectedConsultant(null)}
                      className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    >
                      <X size={24} className="text-[#797A79]" />
                    </button>
                  </div>
                </div>
                
                {/* Overall Metrics Summary */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="bg-[#F5F5F5] rounded-lg p-3">
                    <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">Retention Rate</p>
                    <p className="text-xl font-bold text-[#282828]">
                      {(individualPerformance[selectedConsultant] as ConsultantPerformance).overall_metrics.average_retention_rate_percentage}
                    </p>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-lg p-3">
                    <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">Potential Increase</p>
                    <p className="text-xl font-bold text-[#8BAF20]">
                      {(() => {
                        // Calculate sum of all behavior potential improvements
                        const totalPotential = Object.values((individualPerformance[selectedConsultant] as ConsultantPerformance).behavioral_features || {})
                          .reduce((sum: number, behavior: { improvement_potential?: { potential_retention_increase_percentage?: string }; optimal_conditions?: { potential_retention_increase_percentage?: string } }) => {
                            const potentialStr = behavior.improvement_potential?.potential_retention_increase_percentage || 
                                               behavior.optimal_conditions?.potential_retention_increase_percentage || "0%";
                            const potential = parseFloat(potentialStr.replace('%', '').replace('+', ''));
                            return sum + potential;
                          }, 0);
                        return `+${totalPotential.toFixed(2)}%`;
                      })()}
                    </p>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-lg p-3">
                    <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">Total Students</p>
                    <p className="text-xl font-bold text-[#282828]">
                      {(individualPerformance[selectedConsultant] as ConsultantPerformance).overall_metrics.total_students}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Behavioral Metrics Table */}
              <div className="p-6 pb-32">
                <h3 className="text-lg font-semibold text-[#282828] mb-4">Behavioral Performance Metrics</h3>
                
                <div className="relative">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#F0F0F0]">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4">
                          Behavior Name
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4">
                          <div className="relative inline-block group">
                            <span className="cursor-help">Actual Score</span>
                            <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                              <div className="font-normal normal-case text-left">
                                <p className="mb-2 font-semibold">Actual Score:</p>
                                <p>Percentage of this consultant&apos;s students who experienced this specific behaviour during their enrollment or consultation conversations.</p>
                              </div>
                            </div>
                          </div>
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4">
                          <div className="relative inline-block group">
                            <span className="cursor-help">Ideal Score</span>
                            <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                              <div className="font-normal normal-case text-left">
                                <p className="mb-2 font-semibold">Ideal Score:</p>
                                <p>The optimal percentage of students, for each consultant, who should experience this sales behaviour. This &apos;optimal percentage&apos; is defined using the top 25% of consultants (based on retention rate).</p>
                              </div>
                            </div>
                          </div>
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4">
                          <div className="relative inline-block group">
                            <span className="cursor-help">Potential Improvement</span>
                            <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                              <div className="font-normal normal-case text-left">
                                <p className="mb-2 font-semibold">Potential Improvement in Retention:</p>
                                <p>The potential increase in retention rate if this consultant achieves the ideal score for this behavior.</p>
                              </div>
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries((individualPerformance[selectedConsultant] as ConsultantPerformance).behavioral_features || {}).map(([behaviorKey, behaviorData]: [string, BehaviorData], idx) => {
                        // Use the correct field names from the JSON schemas
                        const actualScore = (behaviorData.consultant_metrics?.percentage_students_with_behavior || 0) * 100 || 0;
                        
                        // Check for improvement_potential (tp1/tp2) or optimal_conditions (combined)
                        const idealScore = ((behaviorData.improvement_potential?.optimal_percentage_students_with_behavior || 0) * 100) || 
                                          ((behaviorData.optimal_conditions?.optimal_percentage_students_with_behavior || 0) * 100) || 
                                          ((behaviorData.team_averages?.team_percentage_students_with_behavior || 0) * 100 || 50);
                        
                        const potentialImprovementStr = behaviorData.improvement_potential?.potential_retention_increase_percentage || 
                                                        behaviorData.optimal_conditions?.potential_retention_increase_percentage || "0%";
                        const potentialImprovement = parseFloat(potentialImprovementStr.replace('%', ''));
                        const behaviorName = behavioralFeatures[behaviorKey]?.taxonomy_info?.title || behaviorKey;
                        const behaviorDescription = behavioralFeatures[behaviorKey]?.taxonomy_info?.description || "";
                        
                        return (
                          <tr key={idx} className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-200">
                            <td className="py-4 px-4 w-1/4 relative">
                              <div className="relative inline-block group">
                                <p className="text-sm font-medium text-[#282828] cursor-help">{behaviorName}</p>
                                {behaviorDescription && (
                                  <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-80 left-0 top-full mt-2 shadow-xl">
                                    <div className="font-normal text-left">
                                      <p className="mb-2 font-semibold">{behaviorName}:</p>
                                      <p className="leading-relaxed">{behaviorDescription}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center w-1/4">
                              <span className="text-sm font-semibold text-[#282828]">
                                {actualScore.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center w-1/4">
                              <span className="text-sm font-semibold text-[#8BAF20]">
                                {idealScore.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center w-1/4">
                              <span className={`text-sm font-semibold ${
                                potentialImprovement > 0 ? "text-[#FF8A00]" : "text-[#8BAF20]"
                              }`}>
                                {potentialImprovement > 0 ? "+" : ""}{potentialImprovement.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {Object.keys((individualPerformance[selectedConsultant] as ConsultantPerformance).behavioral_features || {}).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-[#797A79] text-base">
                      No behavioral data available for this consultant
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
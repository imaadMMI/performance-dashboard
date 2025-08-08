"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import dashboardData from "./dashboard-data.json";
import behavioralData from "./jason-schema.json";

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
    retention_with_behavior_percentage?: string;
    retention_without_behavior_percentage?: string;
    evidence_strength: {
      total_significant_findings: number;
      datasets_found: number;
      combined_p_value: number;
    };
  };
}

interface QuoteExample {
  quote: string;
  context: string;
  consultant_id: string;
}

interface ConsultantData {
  rank: number;
  name: string;
  average_score: number;
  potential_increase_retention: string;
  retention_rate: string;
}

export default function Dashboard() {
  const consultantData = dashboardData.MOL_TP1_2025.individual_potential_improvement;
  
  // Get behavioral features from jason-schema.json
  const behavioralFeatures = behavioralData.overall_behavioral_effects as Record<string, BehavioralFeature>;
  const exampleQuotes = behavioralData.example_quotes as Record<string, { feature_title: string; quotes_by_outcome: Record<string, QuoteExample[]> }>;
  
  const [selectedBehaviour, setSelectedBehaviour] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBehaviourFilter, setSelectedBehaviourFilter] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalDataType, setModalDataType] = useState<"qualitative" | "quantitative">("qualitative");
  
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
                    effectSize > 35 ? "bg-[#8BAF20] text-white" : 
                    effectSize > 25 ? "bg-[#FF8A00] text-white" : 
                    "bg-[#D84D51] text-white"
                  }`}>
                    {effectSize > 35 ? "High" : effectSize > 25 ? "Moderate" : "Low"}
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
                    primaryColor={effectSize > 35 ? "#8BAF20" : effectSize > 25 ? "#FF8A00" : "#D84D51"}
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
            <div className="text-center">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Behaviors Analyzed</p>
              <p className="text-3xl font-bold text-[#282828]">{Object.keys(behavioralFeatures).length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Average Impact</p>
              <p className="text-3xl font-bold text-[#8BAF20]">
                +{(Object.values(behavioralFeatures).reduce((acc, f) => 
                  acc + f.meta_analysis_metrics.weighted_effect_size * 100, 0) / Object.keys(behavioralFeatures).length).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Highest Impact</p>
              <p className="text-3xl font-bold text-[#8BAF20]">
                +{Math.max(...Object.values(behavioralFeatures).map(f => 
                  f.meta_analysis_metrics.weighted_effect_size * 100)).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Lowest Impact</p>
              <p className="text-3xl font-bold text-[#D84D51]">
                +{Math.min(...Object.values(behavioralFeatures).map(f => 
                  f.meta_analysis_metrics.weighted_effect_size * 100)).toFixed(1)}%
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
                        <span className="text-xs text-[#8BAF20] font-semibold">{feature.meta_analysis_metrics.effect_size_percentage}</span>
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
                  {exampleQuotes[selectedBehaviourFilter].feature_title}
                </h3>
                <p className="text-sm text-[#797A79]">
                  {behavioralFeatures[selectedBehaviourFilter]?.taxonomy_info?.description}
                </p>
              </div>
              
              {/* Display real quotes from JSON */}
              <div className="space-y-4">
                {/* Enrolled and Retained Examples */}
                {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_retained && 
                 exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_retained.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#8BAF20]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#282828]">
                          Enrolled and Retained
                        </h4>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#8BAF20] text-white">
                          BEST PRACTICE
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed mb-2">
                            &ldquo;{quote.quote}&rdquo;
                          </p>
                          <p className="text-xs text-[#797A79]">
                            Context: {quote.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Enrolled Not Retained Examples */}
                {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_not_retained && 
                 exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_not_retained.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#FF8A00]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#282828]">
                          Enrolled Not Retained
                        </h4>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#FF8A00] text-white">
                          NEEDS IMPROVEMENT
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.enrolled_not_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed mb-2">
                            &ldquo;{quote.quote}&rdquo;
                          </p>
                          <p className="text-xs text-[#797A79]">
                            Context: {quote.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Not Enrolled Examples */}
                {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.not_enrolled && 
                 exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.not_enrolled.length > 0 && (
                  <div className={`bg-white rounded-lg border border-[#F0F0F0] overflow-hidden border-l-4 border-l-[#D84D51]`}>
                    <div className="px-6 py-4 bg-white border-b border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#282828]">
                          Not Enrolled
                        </h4>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#D84D51] text-white">
                          AVOID
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].quotes_by_outcome.not_enrolled.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-[#282828] italic leading-relaxed mb-2">
                            &ldquo;{quote.quote}&rdquo;
                          </p>
                          <p className="text-xs text-[#797A79]">
                            Context: {quote.context}
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
                              color: effectSize > 35 ? "#8BAF20" : effectSize > 25 ? "#FF8A00" : "#D84D51" 
                            }}>
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.effect_size_percentage}
                            </span>
                          </div>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                            effectSize > 35 ? "bg-[#8BAF20] text-white" : 
                            effectSize > 25 ? "bg-[#FF8A00] text-white" : 
                            "bg-[#D84D51] text-white"
                          }`}>
                            {effectSize > 35 ? "High" : effectSize > 25 ? "Moderate" : "Low"}
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
                            return effectSize > 35 ? "border-[#8BAF20]" : effectSize > 25 ? "border-[#FF8A00]" : "border-[#D84D51]";
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
                            <p className="text-lg font-semibold text-[#8BAF20]">
                              {behavioralFeatures[selectedBehaviour].meta_analysis_metrics.retention_rates.retention_with_behavior_percentage}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#797A79] mb-1">Without Behavior</p>
                            <p className="text-lg font-semibold text-[#D84D51]">
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
    </div>
  );
}
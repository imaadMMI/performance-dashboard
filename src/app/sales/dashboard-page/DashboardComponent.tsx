"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, ArrowUp, ArrowDown, ChevronDown, ChevronLeft, ChevronRight, Info } from "lucide-react";

// Import all data files
// Enrolled-only files
import mulTp1EnrolledOnly from "../finalNewJsonBackend/enrolled-only/mul/mul_tp1_enrolled_only_dashboard.json";
import mulTp2EnrolledOnly from "../finalNewJsonBackend/enrolled-only/mul/mul_tp2_enrolled_only_dashboard.json";
import mulOverallEnrolledOnly from "../finalNewJsonBackend/enrolled-only/mul/mul_overall_enrolled_only_dashboard.json";
import solTp1EnrolledOnly from "../finalNewJsonBackend/enrolled-only/sol/sol_tp1_enrolled_only_dashboard.json";

// All-students files
import mulTp1AllStudents from "../finalNewJsonBackend/all-students/mul/mul_tp1_all_students_dashboard.json";
import mulTp2AllStudents from "../finalNewJsonBackend/all-students/mul/mul_tp2_all_students_dashboard.json";
import mulOverallAllStudents from "../finalNewJsonBackend/all-students/mul/mul_overall_all_students_dashboard.json";
import solTp1AllStudents from "../finalNewJsonBackend/all-students/sol/sol_tp1_all_students_dashboard.json";

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
  const originalValue = value;
  const absValue = Math.abs(value);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
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

// Unified interface to handle both retention and enrollment rates
interface UnifiedRates {
  retention_with_behavior?: number;
  retention_without_behavior?: number;
  retention_with_behavior_percentage?: string;
  retention_without_behavior_percentage?: string;
  rate_with_behavior_percentage?: string;
  rate_without_behavior_percentage?: string;
  enrollment_with_behavior?: number;
  enrollment_without_behavior?: number;
  enrollment_with_behavior_percentage?: string;
  enrollment_without_behavior_percentage?: string;
}

interface BehavioralFeature {
  taxonomy_info: {
    title: string;
    description: string;
    identification_guidance: string;
    examples: string[];
  };
  meta_analysis_metrics?: {
    overall_confidence: string;
    weighted_effect_size: number;
    effect_size_percentage: string;
    sample_size: {
      students_with_behavior: number;
      students_without_behavior: number;
      total_sample_size: number;
    };
    retention_rates?: UnifiedRates;
    enrollment_rates?: UnifiedRates;
    evidence_strength: {
      total_significant_findings: number;
      datasets_found: number;
      combined_p_value: number;
    };
  };
  effect_analysis_metrics?: {
    effect_size: number;
    effect_size_percentage: string;
    p_value: number;
    sample_size: {
      students_with_behavior: number;
      students_without_behavior: number;
      total_sample_size: number;
    };
    retention_rates?: UnifiedRates;
    enrollment_rates?: UnifiedRates;
    statistical_significance: string;
    confidence_level: string;
    variant_selected: string;
  };
}

interface QuoteExample {
  quote_id: string;
  evidence: string;
  justification: string;
  outcome_category: string;
}

interface DashboardProps {
  selectedSchema?: "tp1" | "tp2" | "combined" | "sol-tp1";
  dataView?: "enrolled-only" | "all-students";
}

interface ConsultantMetrics {
  success_rate: number;
  total_students?: number;
  enrolled_students?: number;
  retained_students?: number;
  potential_increase?: number;
  potential_increase_percentage?: string;
}

interface BehavioralFeatureMetrics {
  consultant_metrics?: {
    percentage_students_with_behavior: number;
    average_count_per_student: number;
    percentage_students_with_behavior_formatted: string;
  };
  team_averages?: {
    team_percentage_students_with_behavior: number;
    team_average_count_per_student: number;
    team_percentage_students_with_behavior_formatted: string;
  };
  top_performer_benchmarks?: {
    top_25_percentage_students_with_behavior: number;
    top_25_average_count_per_student: number;
    top_25_percentage_students_with_behavior_formatted: string;
  };
  potential_improvement?: {
    usage_gap: number;
    usage_gap_percentage: string;
    optimal_percentage_students_with_behavior: number;
    optimal_percentage_formatted: string;
    behavior_effect_size: number;
    potential_increase: number;
    potential_enrollment_increase_percentage?: string;
    potential_retention_increase_percentage?: string;
  };
  optimal_conditions?: {
    potential_retention_increase_percentage?: string;
    potential_enrollment_increase_percentage?: string;
    optimal_percentage_students_with_behavior?: number;
  };
}

interface ConsultantPerformance {
  consultant_name: string;
  rank?: number;
  is_top_performer?: boolean;
  overall_metrics: ConsultantMetrics;
  behavioral_features?: Record<string, BehavioralFeatureMetrics>;
}

// Data source mapping with university info
const getDataSource = (schema: string, view: string) => {
  if (view === "enrolled-only") {
    switch (schema) {
      case "tp1": return { data: mulTp1EnrolledOnly, university: "Wayne Corp." };
      case "tp2": return { data: mulTp2EnrolledOnly, university: "Wayne Corp." };
      case "combined": return { data: mulOverallEnrolledOnly, university: "Wayne Corp." };
      case "sol-tp1": return { data: solTp1EnrolledOnly, university: "Stark Inc." };
      default: return { data: mulTp1EnrolledOnly, university: "Wayne Corp." };
    }
  } else { // all-students
    switch (schema) {
      case "tp1": return { data: mulTp1AllStudents, university: "Wayne Corp." };
      case "tp2": return { data: mulTp2AllStudents, university: "Wayne Corp." };
      case "combined": return { data: mulOverallAllStudents, university: "Wayne Corp." };
      case "sol-tp1": return { data: solTp1AllStudents, university: "Stark Inc." };
      default: return { data: mulTp1AllStudents, university: "Wayne Corp." };
    }
  }
};

export default function DashboardEnhanced({ 
  selectedSchema = "tp1",
  dataView = "all-students"
}: DashboardProps) {
  const [currentDataView, setCurrentDataView] = useState<"enrolled-only" | "all-students">(dataView);
  const [selectedBehaviour, setSelectedBehaviour] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [behaviorSortOrder, setBehaviorSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBehaviourFilter, setSelectedBehaviourFilter] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalDataType, setModalDataType] = useState<"qualitative" | "quantitative">("qualitative");
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [behaviorsPage, setBehaviorsPage] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reset modal data type when opening a new behavior
  useEffect(() => {
    if (selectedBehaviour) {
      setModalDataType("qualitative");
    }
  }, [selectedBehaviour]);

  // Update internal state when prop changes
  useEffect(() => {
    setCurrentDataView(dataView);
  }, [dataView]);

  // Reset page when changing data view
  useEffect(() => {
    setBehaviorsPage(0);
  }, [currentDataView]);

  // Reset state when selectedSchema changes (filter is applied)
  useEffect(() => {
    setSelectedBehaviour(null);
    setSelectedConsultant(null);
    setBehaviorsPage(0);
    setSortOrder("desc");
    setSelectedBehaviourFilter("all");
    setModalDataType("qualitative");
  }, [selectedSchema]);

  // Reset state when dataView prop changes
  useEffect(() => {
    setSelectedBehaviour(null);
    setSelectedConsultant(null);
    setBehaviorsPage(0);
  }, [dataView]);

  // Lock/unlock scroll when modals are open
  useEffect(() => {
    if (selectedBehaviour || selectedConsultant) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBehaviour, selectedConsultant]);

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

  // Helper function to render quotes with formatted CONSULTANT: and STUDENT: prefixes
  const renderFormatQuotes = (text: string) => {
    // Split text by Consultant: or Student: patterns (case-insensitive)
    const parts = text.split(/((?:Agent|Customer):\s*)/gi);
    
    if (parts.length === 1) {
      // No matches found, return as italic
      return <span className="font-normal italic">{text}</span>;
    }
    
    return (
      <>
        {parts.map((part, index) => {
          // Check if this part matches Consultant: or Student:
          if (/^(?:Agent|Customer):\s*$/i.test(part)) {
            return <span key={index} className="font-semibold not-italic">{part}</span>;
          }
          // Otherwise render as italic
          return <span key={index} className="font-normal italic">{part}</span>;
        })}
      </>
    );
  };

  // Get data based on current selection
  const { data: behavioralData } = getDataSource(selectedSchema, currentDataView);
  const behavioralFeatures = behavioralData.overall_behavioral_effects as Record<string, BehavioralFeature>;
  const exampleQuotes = behavioralData.example_quotes as Record<string, { behavioral_feature_title: string; outcome_categories: Record<string, QuoteExample[]> }>;
  const individualPerformance = behavioralData.individual_consultant_performance as Record<string, ConsultantPerformance>;

  // Helper function to get metrics from either meta_analysis_metrics or effect_analysis_metrics
  const getMetrics = (feature: BehavioralFeature) => {
    return feature.meta_analysis_metrics || feature.effect_analysis_metrics;
  };

  // Helper function to safely extract effect size
  const getEffectSize = (metrics: ReturnType<typeof getMetrics> | undefined): number => {
    if (!metrics) return 0;
    if ('weighted_effect_size' in metrics) {
      return metrics.weighted_effect_size || 0;
    }
    if ('effect_size' in metrics) {
      return metrics.effect_size || 0;
    }
    return 0;
  };

  // Helper function to extract confidence level
  const getConfidenceLevel = (metrics: ReturnType<typeof getMetrics> | undefined): string => {
    if (!metrics) return 'N/A';
    if ('overall_confidence' in metrics) {
      return metrics.overall_confidence.replace("Meta ", "");
    }
    if ('confidence_level' in metrics) {
      return metrics.confidence_level;
    }
    return 'N/A';
  };

  // Helper function to extract rates from either structure
  const getRates = (feature: BehavioralFeature): { with_behavior: string; without_behavior: string } | null => {
    const metrics = getMetrics(feature);
    if (!metrics) return null;
    
    // Prioritize retention rates if available
    if (metrics.retention_rates) {
      const rates = metrics.retention_rates;
      return {
        with_behavior: rates.retention_with_behavior_percentage || rates.rate_with_behavior_percentage || "0%",
        without_behavior: rates.retention_without_behavior_percentage || rates.rate_without_behavior_percentage || "0%",
      };
    } 
    // Then check for enrollment rates
    else if (metrics.enrollment_rates) {
      const rates = metrics.enrollment_rates;
      return {
        with_behavior: rates.enrollment_with_behavior_percentage || rates.rate_with_behavior_percentage || "0%",
        without_behavior: rates.enrollment_without_behavior_percentage || rates.rate_without_behavior_percentage || "0%",
      };
    }
    // Fallback for direct percentage fields in meta_analysis_metrics/effect_analysis_metrics
    else if ('enrollment_with_behavior_percentage' in metrics && 'enrollment_without_behavior_percentage' in metrics) {
      return {
        with_behavior: metrics.enrollment_with_behavior_percentage as string,
        without_behavior: metrics.enrollment_without_behavior_percentage as string,
      };
    }
    else if ('retention_with_behavior_percentage' in metrics && 'retention_without_behavior_percentage' in metrics) {
      return {
        with_behavior: metrics.retention_with_behavior_percentage as string,
        without_behavior: metrics.retention_without_behavior_percentage as string,
      };
    }
    return null;
  };
  
  // Determine metric type and labels
  const metricType = currentDataView === "all-students" ? "conversion" : "retention";
  const metricLabel = metricType === "conversion" ? "Conversion" : "Retention";
  
  // Create consultant data from selected schema (handles both retention and enrollment)
  const consultantsFromSchema = Object.entries(individualPerformance)
    .map(([consultantId, data]) => {
      const metrics = data.overall_metrics;
      // The success_rate field represents enrollment rate for all-students and retention rate for enrolled-only
      const rate = metrics.success_rate || 0;
      const ratePercentage = (rate * 100).toFixed(1) + "%";
      const potentialIncrease = metrics.potential_increase_percentage || "0%";
      
      return {
        id: consultantId,
        name: data.consultant_name,
        retention_rate: ratePercentage,
        potential_increase: potentialIncrease,
        rate_value: rate * 100
      };
    })
    .sort((a, b) => b.rate_value - a.rate_value)  // Sort by numeric value (descending)
    .map((consultant, index) => ({
      ...consultant,
      rank: index + 1
    }));
  
interface Consultant {
  id: string;
  name: string;
  retention_rate: string;
  potential_increase: string;
  rate_value: number;
  rank?: number;
}

// Calculate dynamic team average from all consultants
  const dynamicTeamAverage = consultantsFromSchema.length > 0 
    ? (consultantsFromSchema.reduce((sum: number, consultant: Consultant) => 
        sum + consultant.rate_value, 0) / consultantsFromSchema.length).toFixed(1)
    : "0.0";

  // Pagination for behaviors
  const behaviorsPerPage = 10;
  const totalBehaviors = Object.keys(behavioralFeatures).length;
  const totalBehaviorsShown = totalBehaviors; // Show all behaviors
  const totalPages = Math.ceil(totalBehaviorsShown / behaviorsPerPage);
  
  // Sort behaviors by effect size based on behaviorSortOrder
  const sortedBehaviors = Object.entries(behavioralFeatures)
    .sort(([, a], [, b]) => {
      const aMetrics = getMetrics(a);
      const bMetrics = getMetrics(b);
      const aEffectSize = getEffectSize(aMetrics);
      const bEffectSize = getEffectSize(bMetrics);
      return behaviorSortOrder === "desc" ? bEffectSize - aEffectSize : aEffectSize - bEffectSize;
    });
  
  const displayedBehaviors = sortedBehaviors
    .slice(behaviorsPage * behaviorsPerPage, (behaviorsPage + 1) * behaviorsPerPage) as [string, BehavioralFeature][];

  return (
    <div className="w-full relative">
      {/* Main Container Card */}
      <div 
        className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Title Section with Data View Toggle */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-[#282828]">
                  Impact of Behaviours on {metricLabel}
                </h1>
                
                <div className="relative group">
                  <Info className="w-5 h-5 text-[#797A79] cursor-help" />
                  <div className="absolute left-0 top-full mt-2 w-96 p-3 bg-[#282828] text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="absolute -top-1 left-2 w-2 h-2 bg-[#282828] rotate-45"></div>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Tracking behavioral patterns and their influence on {metricLabel === "Conversion" ? "customer conversion" : "converted customers' retention"} rates.
                      </li>
                      <li>
                        Each value shows the difference in the {metricLabel === "Conversion" ? "customer conversion" : "converted customers' retention"} rate when an agent displays the behavior versus when they do not.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-[#282828]">
                Effect size percentage represents the difference in {metricLabel.toLowerCase()} rate between customers who experienced the given behaviour and customers who did not.
              </h3>
            </div>
            
            {/* Sort Button for Behaviors */}
            <div className="ml-4">
              <button
                onClick={() => setBehaviorSortOrder(behaviorSortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-200"
              >
                <span className="text-sm font-medium text-[#282828]">
                  Sort by Effect Size
                </span>
                {behaviorSortOrder === "desc" ? (
                  <ArrowDown size={16} className="text-[#797A79]" />
                ) : (
                  <ArrowUp size={16} className="text-[#797A79]" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Behaviour Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {displayedBehaviors.map(([key, feature]) => {
            const metrics = getMetrics(feature);
            const effectSize = getEffectSize(metrics) * 100;
            
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

        {/* Pagination Controls for Behaviors */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setBehaviorsPage(prev => Math.max(0, prev - 1))}
              disabled={behaviorsPage === 0}
              className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} className="text-[#797A79]" />
            </button>
            <span className="text-sm text-[#797A79]">
              Page {behaviorsPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setBehaviorsPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={behaviorsPage === totalPages - 1}
              className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} className="text-[#797A79]" />
            </button>
          </div>
        )}
        
        {/* Summary Statistics */}
        <div 
          className="bg-[#F5F5F5] rounded-xl border border-[#F0F0F0] p-8"
        >
          <div className="flex justify-around items-center">
            <div className="text-center flex-1">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Behaviors Analyzed</p>
              <p className="text-3xl font-bold text-[#282828]">{totalBehaviorsShown}</p>
            </div>
            <div className="text-center flex-1 relative group">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Highest Impact</p>
              <p className="text-3xl font-bold text-[#8BAF20] cursor-help">
                {Math.max(...Object.values(behavioralFeatures).map(f => {
                  const metrics = getMetrics(f);
                  return getEffectSize(metrics) * 100;
                })).toFixed(1)}%
              </p>
              {/* Tooltip for Highest Impact */}
              <div className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 left-1/2 transform -translate-x-1/2 top-full mt-2 shadow-xl">
                <div className="font-normal text-left">
                  <p className="mb-1 font-semibold">Highest Impact Behavior:</p>
                  <p className=" font-medium">
                    {(() => {
                      const behaviors = Object.entries(behavioralFeatures);
                      const highest = behaviors.reduce((max, [key, feature]) => {
                        const metrics = getMetrics(feature);
                        const effectSize = getEffectSize(metrics) * 100;
                        return effectSize > max.value ? { key, feature, value: effectSize } : max;
                      }, { key: '', feature: null as BehavioralFeature | null, value: -Infinity });
                      return highest.feature?.taxonomy_info.title || 'N/A';
                    })()}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center flex-1 relative group">
              <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2">Lowest Impact</p>
              <p className="text-3xl font-bold text-[#D84D51] cursor-help">
                {(() => {
                  const lowestImpact = Math.min(...Object.values(behavioralFeatures).map(f => {
                    const metrics = getMetrics(f);
                    return getEffectSize(metrics) * 100;
                  }));
                  return lowestImpact > 0 ? `${lowestImpact.toFixed(1)}%` : `${lowestImpact.toFixed(1)}%`;
                })()}
              </p>
              {/* Tooltip for Lowest Impact */}
              <div className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 left-1/2 transform -translate-x-1/2 top-full mt-2 shadow-xl">
                <div className="font-normal text-left">
                  <p className="mb-1 font-semibold">Lowest Impact Behavior:</p>
                  <p className=" font-medium">
                    {(() => {
                      const behaviors = Object.entries(behavioralFeatures);
                      const lowest = behaviors.reduce((min, [, feature]) => {
                        const metrics = getMetrics(feature);
                        const effectSize = getEffectSize(metrics) * 100;
                        if (effectSize < min.value) {
                          return { key: feature.taxonomy_info.title, feature, value: effectSize };
                        }
                        return min;
                      }, { key: '', feature: null as BehavioralFeature | null, value: Infinity });
                      return lowest.feature?.taxonomy_info.title || 'N/A';
                    })()}
                  </p>
                </div>
              </div>
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
            {/* <p className="text-sm text-[#797A79]">
              Consultant performance metrics and {metricLabel.toLowerCase()} rates
            </p> */}
            <h3 className="font-medium text-[#282828]">
              Agent performance metrics and {metricLabel.toLowerCase()} rates
            </h3>
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
              Sort by {metricLabel} Rate
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
                  Agent Name
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                  {metricLabel} Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {consultantsFromSchema
                .sort((a: Consultant, b: Consultant) => {
                  const aRate = a.rate_value;
                  const bRate = b.rate_value;
                  return sortOrder === "desc" ? bRate - aRate : aRate - bRate;
                })
                .map((consultant: Consultant) => {
                  // Determine color based on position in sorted list
                  const totalConsultants = consultantsFromSchema.length;
                  const topThird = Math.ceil(totalConsultants / 3);
                  const middleThird = Math.ceil(totalConsultants * 2 / 3);
                  
                  let colorClass = "text-[#D84D51]"; // Default red for bottom third
                  if (consultant.rank! <= topThird) {
                    colorClass = "text-[#8BAF20]"; // Green for top third
                  } else if (consultant.rank! <= middleThird) {
                    colorClass = "text-[#FF8A00]"; // Orange for middle third
                  }
                  
                  return (
                    <tr 
                      key={consultant.id} 
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
            {/* <p className="text-sm text-[#797A79]">
              Real consultant quotes demonstrating behavioral patterns and their outcomes
            </p> */}
            <h3 className="font-medium text-[#282828]">
              Real agent quotes demonstrating behavioral patterns and their outcomes
            </h3>
          </div>
          
          {/* Dropdown Filter */}
          <div className="ml-6">
            <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
              Filter by Behaviour
            </label>
            <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-80 px-4 py-3 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between text-left"
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
                  {Object.entries(behavioralFeatures).map(([behaviorKey, feature]) => (
                    <button
                      key={behaviorKey}
                      onClick={() => {
                        setSelectedBehaviourFilter(behaviorKey);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                        selectedBehaviourFilter === behaviorKey ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base text-[#282828]">{feature.taxonomy_info.title}</span>
                                                <span className={`text-xs font-semibold ${
                                                  getEffectSize(getMetrics(feature)) < 0
                                                    ? "text-[#D84D51]"
                                                    : "text-[#8BAF20]"
                                                }`}>                          {getMetrics(feature)?.effect_size_percentage || "N/A"}
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
                Select a behaviour from the dropdown above to view real agent examples
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
                        Converted and Retained
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base text-[#282828] leading-relaxed">
                            {renderFormatQuotes(quote.evidence)}
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
                        Customers Not Retained
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.enrolled_not_retained.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base text-[#282828] leading-relaxed">
                            {renderFormatQuotes(quote.evidence)}
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
                        Not Converted
                      </h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {exampleQuotes[selectedBehaviourFilter].outcome_categories.not_enrolled.map((quote: QuoteExample, idx: number) => (
                        <div key={idx}>
                          <p className="text-base text-[#282828] leading-relaxed">
                            {renderFormatQuotes(quote.evidence)}
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
      {selectedBehaviour && behavioralFeatures[selectedBehaviour] && (() => {
        const rates = getRates(behavioralFeatures[selectedBehaviour]);
        return (
          <>
            {/* Backdrop with blur */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
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
                        const metrics = getMetrics(behavioralFeatures[selectedBehaviour]);
                        const effectSize = getEffectSize(metrics) * 100;
                        return (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-[#797A79] uppercase tracking-wide">Effect Size:</span>
                              <span className="text-xl font-bold" style={{ 
                                color: effectSize > 0 ? "#8BAF20" : "#D84D51" 
                              }}>
                                {getMetrics(behavioralFeatures[selectedBehaviour])?.effect_size_percentage}
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
                              const metrics = getMetrics(behavioralFeatures[selectedBehaviour]);
                        const effectSize = getEffectSize(metrics) * 100;
                              return effectSize > 0 ? "border-[#8BAF20]" : "border-[#D84D51]";
                            })()}`}>
                              <p className="text-sm text-[#282828] italic leading-relaxed">
                                {renderFormatQuotes(example)}
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
                          <p className="text-xs text-[#797A79] uppercase tracking-wide mb-2">{metricLabel} Rates</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-[#797A79] mb-1">With Behavior</p>
                                                            <p className={`text-lg font-semibold ${
                                                              (getEffectSize(getMetrics(behavioralFeatures[selectedBehaviour]))) > 0
                                                                ? "text-[#8BAF20]"
                                                                : "text-[#D84D51]"
                                                            }`}>                                {rates?.with_behavior || "N/A"}
                              </p>
                            </div>
                                                        <div>
                                                          <p className="text-xs text-[#797A79] mb-1">Without Behavior</p>
                                                          <p className={`text-lg font-semibold ${
                                                            (getEffectSize(getMetrics(behavioralFeatures[selectedBehaviour]))) > 0
                                                              ? "text-[#D84D51]"
                                                              : "text-[#8BAF20]"
                                                          }`}>                                {rates?.without_behavior || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0]">
                          <div className="flex items-center gap-1 mb-2">
                            <p className="text-xs text-[#797A79] uppercase tracking-wide">Sample Size</p>
                            <div className="relative group">
                              <Info className="w-3 h-3 text-[#797A79] cursor-help" />
                              <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-[#282828] text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#282828] rotate-45"></div>
                                Only includes {metricLabel === "Conversion" ? "customers" : "converted customers"} with calls over 2 minutes.
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-[#797A79]">Total Customers</span>
                              <div className="relative group">
                                <span className="text-sm font-semibold text-[#282828] cursor-help">
                                  {getMetrics(behavioralFeatures[selectedBehaviour])?.sample_size?.total_sample_size?.toLocaleString() || '0'}
                                </span>
                                <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-[#282828] text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                  <div className="absolute -bottom-1 right-2 w-2 h-2 bg-[#282828] rotate-45"></div>
                                  Only includes {metricLabel === "Conversion" ? "customers" : "converted customers"} with calls over 2 minutes.
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-[#797A79]">With Behavior</span>
                              <span className="text-sm font-semibold text-[#282828]">
                                {getMetrics(behavioralFeatures[selectedBehaviour])?.sample_size?.students_with_behavior?.toLocaleString() || '0'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-[#797A79]">Without Behavior</span>
                              <span className="text-sm font-semibold text-[#282828]">
                                {getMetrics(behavioralFeatures[selectedBehaviour])?.sample_size?.students_without_behavior?.toLocaleString() || '0'}
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
                                {getConfidenceLevel(getMetrics(behavioralFeatures[selectedBehaviour]))}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-[#797A79] block mb-1">P-value</span>
                              <span className="text-sm font-semibold text-[#282828]">
                                                                 {((metrics) => {
                                                                   if (!metrics) return 0;
                                                                   if ('evidence_strength' in metrics && metrics.evidence_strength) {
                                                                     return metrics.evidence_strength.combined_p_value || 0;
                                                                   }
                                                                   if ('p_value' in metrics) {
                                                                     return metrics.p_value || 0;
                                                                   }
                                                                   return 0;
                                                                 })(getMetrics(behavioralFeatures[selectedBehaviour]))?.toExponential(2)}                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-[#797A79] block mb-1">Significant Findings</span>
                              <span className="text-sm font-semibold text-[#282828]">
                                                                 {((metrics) => {
                                                                   if (!metrics) return 0;
                                                                   if ('evidence_strength' in metrics && metrics.evidence_strength) {
                                                                     return metrics.evidence_strength.total_significant_findings || 0;
                                                                   }
                                                                   return 0;
                                                                 })(getMetrics(behavioralFeatures[selectedBehaviour]))}                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-[#797A79] block mb-1">Datasets</span>
                              <span className="text-sm font-semibold text-[#282828]">
                                                                 {((metrics) => {
                                                                   if (!metrics) return 0;
                                                                   if ('evidence_strength' in metrics && metrics.evidence_strength) {
                                                                     return metrics.evidence_strength.datasets_found || 0;
                                                                   }
                                                                   return 0;
                                                                 })(getMetrics(behavioralFeatures[selectedBehaviour]))}                              </span>
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
        );
      })()}
      
      {/* Consultant Performance Modal */}
      {selectedConsultant && individualPerformance[selectedConsultant] && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
            onClick={() => setSelectedConsultant(null)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] max-w-6xl w-full shadow-xl pointer-events-auto flex flex-col overflow-hidden"
              style={{ fontFamily: "'Quicksand', sans-serif", maxHeight: "calc(100vh - 2rem)", minHeight: "600px" }}
            >
              <div className="flex-1 overflow-y-auto rounded-xl">
              {/* Sticky Modal Header */}
              <div className="sticky top-0 z-20 border-b border-[#F0F0F0] p-6 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#282828]">
                    {individualPerformance[selectedConsultant].consultant_name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-[#797A79]">
                      {selectedSchema === "tp1" ? "Wayne Corp. Q1" : selectedSchema === "tp2" ? "Wayne Corp. Q2" : selectedSchema === "combined" ? "Wayne Corp. Q1-Q2 Combined" : "Stark Inc. Q1"} • {currentDataView === "all-students" ? "All Customers" : "Converted Only"}
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
                    <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">{metricLabel} Rate</p>
                    <p className="text-xl font-bold text-[#282828]">
                      {(individualPerformance[selectedConsultant].overall_metrics.success_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-lg p-3">
                    <p className="text-xs text-[#797A79] uppercase tracking-wide mb-1">Potential Increase</p>
                    <p className="text-xl font-bold text-[#8BAF20]">
                      {(() => {
                        // Calculate sum of all behavior potential improvements
                        const totalPotential = Object.values(individualPerformance[selectedConsultant].behavioral_features || {})
                          .reduce((sum: number, behavior: BehavioralFeatureMetrics) => {
                            const potentialStr = behavior.potential_improvement?.potential_enrollment_increase_percentage || 
                                               behavior.potential_improvement?.potential_retention_increase_percentage ||
                                               behavior.optimal_conditions?.potential_retention_increase_percentage || 
                                               behavior.optimal_conditions?.potential_enrollment_increase_percentage;
                            
                            let potential = 0;
                            if (typeof potentialStr === 'string') {
                              potential = parseFloat(potentialStr.replace('%', '').replace('+', ''));
                            } else if (typeof potentialStr === 'number') {
                              potential = potentialStr;
                            }
                            return sum + potential;
                          }, 0);
                        return `+${totalPotential.toFixed(2)}%`;
                      })()}
                    </p>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-xs text-[#797A79] uppercase tracking-wide">Total Customers</p>
                      <div className="relative group">
                        <Info className="w-3 h-3 text-[#797A79] cursor-help" />
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 w-48 p-2 bg-[#282828] text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#282828] rotate-45"></div>
                          Only includes {metricLabel === "Conversion" ? "customers" : "converted customers"} with calls over 2 minutes.
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-[#282828]">
                      {individualPerformance[selectedConsultant].overall_metrics.total_students || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Behavioral Metrics Section */}
              <div className="p-6">
                {/* Background filler for gap - positioned to fill from modal header bottom to section title */}
                <div className="sticky top-[170px] h-[25px] bg-white z-[8] -mx-6"></div>
                <h3 className="sticky top-[190px] z-10 bg-white pb-4 -mt-[44px] pt-2 px-6 -mx-6 text-lg font-semibold text-[#282828]">Behavioral Performance Metrics</h3>
                
                <div className="relative">
                  <table className="w-full">
                    <thead className="sticky top-[234px] z-10">
                        <tr className="border-b-2 border-[#F0F0F0]">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4 bg-white">
                            Behavior Name
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4 bg-white">
                            <div className="relative inline-block group">
                              <span className="cursor-help">Actual Score</span>
                              <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                                <div className="font-normal normal-case text-left">
                                  <p className="mb-2 font-semibold">Actual Score:</p>
                                  <p>Percentage of this agent&apos;s customers who experienced this specific behaviour during their conversion or consultation conversations.</p>
                                </div>
                              </div>
                            </div>
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4 bg-white">
                            <div className="relative inline-block group">
                              <span className="cursor-help">Ideal Score</span>
                              <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                                <div className="font-normal normal-case text-left">
                                  <p className="mb-2 font-semibold">Ideal Score:</p>
                                  <p>The optimal percentage of customers, for each agent, who should experience this sales behaviour. This &apos;optimal percentage&apos; is defined using the top 25% of agents (based on {metricLabel.toLowerCase()} rate).</p>
                                </div>
                              </div>
                            </div>
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-[#797A79] uppercase tracking-wide w-1/4 bg-white">
                            <div className="relative inline-block group">
                              <span className="cursor-help">Potential Improvement</span>
                              <div className="absolute z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-[#282828] text-white text-xs rounded-lg p-3 w-64 right-0 top-full mt-2 shadow-xl">
                                <div className="font-normal normal-case text-left">
                                  <p className="mb-2 font-semibold">Potential Improvement in {metricLabel}:</p>
                                  <p>The potential increase in {metricLabel.toLowerCase()} rate if this agent achieves the ideal score for this behavior.</p>
                                </div>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {Object.entries(individualPerformance[selectedConsultant].behavioral_features || {})
                        .filter(([behaviorKey]) => {
                          // Only show behaviors that exist in the main behavioral features section
                          return behavioralFeatures[behaviorKey] !== undefined;
                        })
                        .map(([behaviorKey, behaviorData]: [string, BehavioralFeatureMetrics]) => {
                        const actualScore = (behaviorData.consultant_metrics?.percentage_students_with_behavior || 0) * 100 || 0;
                        
                        const idealScore = ((behaviorData.potential_improvement?.optimal_percentage_students_with_behavior || 0) * 100) || 
                                          ((behaviorData.top_performer_benchmarks?.top_25_percentage_students_with_behavior || 0) * 100) || 
                                          ((behaviorData.optimal_conditions?.optimal_percentage_students_with_behavior || 0) * 100) || 
                                          ((behaviorData.team_averages?.team_percentage_students_with_behavior || 0) * 100 || 50);
                        
                        // Handle both retention and enrollment potential fields
                        const potentialImprovementStr = behaviorData.potential_improvement?.potential_enrollment_increase_percentage || 
                                                        behaviorData.potential_improvement?.potential_retention_increase_percentage ||
                                                        behaviorData.optimal_conditions?.potential_retention_increase_percentage || 
                                                        behaviorData.optimal_conditions?.potential_enrollment_increase_percentage;
                        let potentialImprovement = 0;
                        if (typeof potentialImprovementStr === 'string') {
                          potentialImprovement = parseFloat(potentialImprovementStr.replace('%', '').replace('+', ''));
                        } else if (typeof potentialImprovementStr === 'number') {
                          potentialImprovement = potentialImprovementStr;
                        }
                        // Always use the proper name from behavioralFeatures if available, never show the ID
                        const behaviorName = behavioralFeatures[behaviorKey]?.taxonomy_info?.title || "";
                        const behaviorDescription = behavioralFeatures[behaviorKey]?.taxonomy_info?.description || "";
                        
                        // Skip rendering if we don't have a proper behavior name
                        if (!behaviorName) return null;
                        
                        return (
                          <tr key={behaviorKey} className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-200">
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
                  
                  {(() => {
                    const validBehaviors = Object.entries(individualPerformance[selectedConsultant].behavioral_features || {})
                      .filter(([behaviorKey]) => behavioralFeatures[behaviorKey] !== undefined);
                    
                    if (validBehaviors.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <p className="text-[#797A79] text-base">
                            No behavioral data available for this agent
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })()}
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
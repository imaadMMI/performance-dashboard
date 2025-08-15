"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, X, ArrowDown, ArrowUp, Target, Info } from 'lucide-react';
import tpCombinedData from './dashboardJson/tp-combined.json';

interface ConsultantData {
  consultant_name: string;
}

interface CallAnalysis {
  call_id: string;
  week_num: number;
  analysis: {
    opportunity: {
      text: string;
      opportunity_score: number;
    };
    consultant_response: {
      text: string;
      response_score: number;
    };
    recommended_response?: {
      enrolment_impact_percent: number;
      retention_impact_percent: number;
      text: string;
    };
    why_good?: {
      enrolment_impact_percent: number;
      retention_impact_percent: number;
      text: string;
    };
  };
}

interface TranscriptEntry {
  speaker: string;
  message: string;
  key_moment?: boolean;
}

interface CallTranscript {
  call_id: string;
  week_num: number;
  transcript: TranscriptEntry[];
  summary?: {
    total_messages: number;
    customer_messages: number;
    agent_messages: number;
  };
}

// Component for showing all consultants' data
const AllConsultantsView = ({ 
  consultants, 
  selectedWeek, 
  selectedDataType,
  selectedBehavior 
}: { 
  consultants: { id: string; name: string }[], 
  selectedWeek: number, 
  selectedDataType: "strengths" | "opportunities",
  selectedBehavior: string 
}) => {
  const [consultantsData, setConsultantsData] = useState<{
    [key: string]: {
      positive: CallAnalysis[];
      missed: CallAnalysis[];
    }
  }>({});
  const [expandedConsultants, setExpandedConsultants] = useState<Set<string>>(new Set());

  // Reset expanded consultants when week or data type changes
  useEffect(() => {
    setExpandedConsultants(new Set());
  }, [selectedWeek, selectedDataType]);

  // Load data for all consultants
  useEffect(() => {
    const loadAllConsultantsData = async () => {
      const allData: typeof consultantsData = {};

      for (const consultant of consultants) {
        const positiveData: CallAnalysis[] = [];
        const missedData: CallAnalysis[] = [];

        try {
          if (consultant.name === "Alyssa Pennacchia") {
            const alyssaPositive1 = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228_Analysis.json');
            const alyssaPositive2 = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229_Analysis.json');
            const alyssaMissed1 = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307_Analysis.json');
            const alyssaMissed2 = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308_Analysis.json');
            
            positiveData.push(alyssaPositive1.default);
            positiveData.push(alyssaPositive2.default);
            missedData.push(alyssaMissed1.default);
            missedData.push(alyssaMissed2.default);
          } else if (consultant.name === "Michael Whyte") {
            const michaelPositive1 = await import('./keyMomentsJson/M. Whyte/Positive/Call_56/56_Analysis.json');
            const michaelPositive2 = await import('./keyMomentsJson/M. Whyte/Positive/Call_78/78_Analysis.json');
            const michaelMissed1 = await import('./keyMomentsJson/M. Whyte/Missed/Call_12/12_Analysis.json');
            const michaelMissed2 = await import('./keyMomentsJson/M. Whyte/Missed/Call_34/34_Analysis.json');
            
            positiveData.push(michaelPositive1.default);
            positiveData.push(michaelPositive2.default);
            missedData.push(michaelMissed1.default);
            missedData.push(michaelMissed2.default);
          }
        } catch (error) {
          console.error(`Error loading data for ${consultant.name}:`, error);
        }

        if (positiveData.length > 0 || missedData.length > 0) {
          allData[consultant.id] = { positive: positiveData, missed: missedData };
        }
      }

      setConsultantsData(allData);
    };

    loadAllConsultantsData();
  }, [consultants]);

  const toggleConsultant = (consultantId: string) => {
    const newExpanded = new Set(expandedConsultants);
    if (newExpanded.has(consultantId)) {
      newExpanded.delete(consultantId);
    } else {
      newExpanded.add(consultantId);
    }
    setExpandedConsultants(newExpanded);
  };

  return (
    <div className="space-y-6">
        {consultants.map((consultant) => {
          const data = consultantsData[consultant.id];
          if (!data) return null;

          const calls = selectedDataType === "strengths" ? data.positive : data.missed;
          const filteredCalls = calls.filter(call => call.week_num === selectedWeek);

          if (filteredCalls.length === 0) return null;

          const isExpanded = expandedConsultants.has(consultant.id);

          return (
            <div key={consultant.id} className="bg-white rounded-xl border border-[#F0F0F0] overflow-hidden">
              {/* Consultant Header */}
              <button
                onClick={() => toggleConsultant(consultant.id)}
                className="w-full px-6 py-4 bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-[#282828]">{consultant.name}</h3>
                  <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                    {filteredCalls.length} {filteredCalls.length === 1 ? 'call' : 'calls'}
                  </span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-[#797A79] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>

              {/* Calls List */}
              {isExpanded && (
                <div className="p-6 space-y-4 border-t border-[#F0F0F0]">
                  {filteredCalls.map((callData) => (
                    <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms]">
                      {/* Call Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</p>
                          <p className="text-sm font-semibold text-[#282828]">{callData.call_id}</p>
                        </div>
                      </div>

                      {/* Analysis Content */}
                      <div className="mt-4 space-y-4">
                        {/* Opportunity Section */}
                        <div className="pb-3 border-b border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-bold text-[#282828]">
                              {selectedDataType === "strengths" ? "Opportunity Identified" : "Missed Opportunity"}
                            </h5>
                            <span className={`px-2 py-0.5 ${
                              selectedDataType === "strengths" 
                                ? "bg-[#8BAF20]/10 text-[#8BAF20]" 
                                : "bg-[#FF8A00]/10 text-[#FF8A00]"
                            } rounded text-xs font-semibold`}>
                              Score: {callData.analysis.opportunity.opportunity_score}/5
                            </span>
                          </div>
                          <p className="text-sm text-[#797A79] leading-relaxed">
                            {callData.analysis.opportunity.text.length > 150 
                              ? callData.analysis.opportunity.text.substring(0, 150) + "..." 
                              : callData.analysis.opportunity.text}
                          </p>
                        </div>
                        
                        {/* Consultant Response Section */}
                        <div className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                            <span className={`px-2 py-0.5 ${
                              selectedDataType === "strengths"
                                ? "bg-[#8BAF20]/10 text-[#8BAF20]"
                                : "bg-[#D84D51]/10 text-[#D84D51]"
                            } rounded text-xs font-semibold`}>
                              Score: {callData.analysis.consultant_response.response_score}/5
                            </span>
                          </div>
                          <p className="text-sm text-[#797A79] leading-relaxed">
                            {callData.analysis.consultant_response.text.length > 150 
                              ? callData.analysis.consultant_response.text.substring(0, 150) + "..." 
                              : callData.analysis.consultant_response.text}
                          </p>
                        </div>
                        
                        {/* Why Effective or Recommended Section */}
                        {selectedDataType === "strengths" ? (
                          <div className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-[#FF8A00]">Why This Is Effective</h5>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{callData?.analysis.why_good?.enrolment_impact_percent || 0}% Enrollment
                                </span>
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{callData?.analysis.why_good?.retention_impact_percent || 0}% Retention
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[#797A79] leading-relaxed">
                              {(callData?.analysis.why_good?.text?.length || 0) > 150 
                                ? callData?.analysis.why_good?.text?.substring(0, 150) + "..." 
                                : callData?.analysis.why_good?.text || ""}
                            </p>
                          </div>
                        ) : (
                          <div className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-[#FF8A00]">Recommended Approach</h5>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{callData.analysis.recommended_response?.enrolment_impact_percent || 0}% Enrollment
                                </span>
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{callData.analysis.recommended_response?.retention_impact_percent || 0}% Retention
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[#797A79] leading-relaxed">
                              {(callData.analysis.recommended_response?.text?.length || 0) > 150 
                                ? callData.analysis.recommended_response?.text?.substring(0, 150) + "..." 
                                : callData.analysis.recommended_response?.text || ""}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        
        {/* No data message */}
        {Object.keys(consultantsData).length === 0 || 
         !consultants.some(c => {
           const data = consultantsData[c.id];
           if (!data) return false;
           const calls = selectedDataType === "strengths" ? data.positive : data.missed;
           return calls.filter(call => call.week_num === selectedWeek).length > 0;
         }) ? (
          <div className="bg-[#F5F5F5] rounded-lg p-8 text-center">
            <p className="text-sm text-[#797A79]">
              No data available for the selected filters.
            </p>
          </div>
        ) : null}
    </div>
  );
};

const KeyMoments = ({ onDetailViewChange }: { onDetailViewChange?: (inDetailView: boolean) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBehaviorDropdownOpen, setIsBehaviorDropdownOpen] = useState(false);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<string>("all");
  const [consultants, setConsultants] = useState<{ id: string; name: string}[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDataType, setSelectedDataType] = useState<"strengths" | "opportunities">("strengths");
  const [selectedCallDetails, setSelectedCallDetails] = useState<any>(null);
  const [selectedBehavior, setSelectedBehavior] = useState<string>("all");
  const [behaviors, setBehaviors] = useState<{ id: string; title: string }[]>([]);
  const [consultantCallData, setConsultantCallData] = useState<{
    positive: CallAnalysis[];
    missed: CallAnalysis[];
  }>({ positive: [], missed: [] });
  const [consultantTranscripts, setConsultantTranscripts] = useState<{
    positive: CallTranscript[];
    missed: CallTranscript[];
  }>({ positive: [], missed: [] });
  const [showPositiveSummary, setShowPositiveSummary] = useState(false);
  const [showMissedSummary, setShowMissedSummary] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const behaviorDropdownRef = useRef<HTMLDivElement>(null);
  const weekDropdownRef = useRef<HTMLDivElement>(null);
  const positiveTranscriptScrollRef = useRef<HTMLDivElement>(null);
  const missedTranscriptScrollRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  
  const totalWeeks = 12; // You can adjust this based on your data
  
  // Get calls based on selected data type and consultant
  // This will be calculated after selectedConsultantData is defined

  // Extract consultant and behavior data from JSON
  useEffect(() => {
    const individualPerformance = tpCombinedData.individual_consultant_performance as Record<string, ConsultantData>;
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

  // Load consultant call data when consultant is selected
  useEffect(() => {
    const loadConsultantData = async () => {
      if (selectedConsultant === "all") {
        setConsultantCallData({ positive: [], missed: [] });
        setConsultantTranscripts({ positive: [], missed: [] });
        return;
      }

      const selectedConsultantObj = consultants.find(c => c.id === selectedConsultant);
      if (!selectedConsultantObj) return;

      const positiveData: CallAnalysis[] = [];
      const missedData: CallAnalysis[] = [];
      const positiveTranscripts: CallTranscript[] = [];
      const missedTranscripts: CallTranscript[] = [];

      try {
        // Load data based on consultant name
        if (selectedConsultantObj.name === "Alyssa Pennacchia") {
          // Import Alyssa's data with transcripts
          const alyssaPositive1 = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228_Analysis.json');
          const alyssaPositive1Transcript = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228.json');
          const alyssaPositive2 = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229_Analysis.json');
          const alyssaPositive2Transcript = await import('./keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229.json');
          const alyssaMissed1 = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307_Analysis.json');
          const alyssaMissed1Transcript = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307.json');
          const alyssaMissed2 = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308_Analysis.json');
          const alyssaMissed2Transcript = await import('./keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308.json');
          
          positiveData.push(alyssaPositive1.default);
          positiveData.push(alyssaPositive2.default);
          positiveTranscripts.push(alyssaPositive1Transcript.default);
          positiveTranscripts.push(alyssaPositive2Transcript.default);
          
          missedData.push(alyssaMissed1.default);
          missedData.push(alyssaMissed2.default);
          missedTranscripts.push(alyssaMissed1Transcript.default);
          missedTranscripts.push(alyssaMissed2Transcript.default);
        } else if (selectedConsultantObj.name === "Michael Whyte") {
          // Import Michael's data with transcripts
          const michaelPositive1 = await import('./keyMomentsJson/M. Whyte/Positive/Call_56/56_Analysis.json');
          const michaelPositive1Transcript = await import('./keyMomentsJson/M. Whyte/Positive/Call_56/56.json');
          const michaelPositive2 = await import('./keyMomentsJson/M. Whyte/Positive/Call_78/78_Analysis.json');
          const michaelPositive2Transcript = await import('./keyMomentsJson/M. Whyte/Positive/Call_78/78.json');
          const michaelMissed1 = await import('./keyMomentsJson/M. Whyte/Missed/Call_12/12_Analysis.json');
          const michaelMissed1Transcript = await import('./keyMomentsJson/M. Whyte/Missed/Call_12/12.json');
          const michaelMissed2 = await import('./keyMomentsJson/M. Whyte/Missed/Call_34/34_Analysis.json');
          const michaelMissed2Transcript = await import('./keyMomentsJson/M. Whyte/Missed/Call_34/34.json');
          
          positiveData.push(michaelPositive1.default);
          positiveData.push(michaelPositive2.default);
          positiveTranscripts.push(michaelPositive1Transcript.default);
          positiveTranscripts.push(michaelPositive2Transcript.default);
          
          missedData.push(michaelMissed1.default);
          missedData.push(michaelMissed2.default);
          missedTranscripts.push(michaelMissed1Transcript.default);
          missedTranscripts.push(michaelMissed2Transcript.default);
        }
        // Future consultants can be added here with their respective data paths
      } catch (error) {
        console.error('Error loading consultant data:', error);
      }

      setConsultantCallData({ positive: positiveData, missed: missedData });
      setConsultantTranscripts({ positive: positiveTranscripts, missed: missedTranscripts });
    };

    loadConsultantData();
  }, [selectedConsultant, consultants]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
  

  // Reset state when consultant changes
  useEffect(() => {
    if (selectedConsultant !== "all") {
      setSelectedWeek(1);
      setSelectedDataType("strengths");
      setShowPositiveSummary(false);
      setShowMissedSummary(false);
      setSelectedCallDetails(null);
    }
  }, [selectedConsultant]);

  // Reset view state when switching between strengths and opportunities
  useEffect(() => {
    setSelectedCallDetails(null);
    setShowPositiveSummary(false);
    setShowMissedSummary(false);
    // Reset scroll position of content area
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [selectedDataType]);

  const selectedConsultantData = consultants.find(c => c.id === selectedConsultant);

  // Notify parent when detail view changes
  useEffect(() => {
    if (onDetailViewChange) {
      onDetailViewChange(!!selectedCallDetails);
    }
  }, [selectedCallDetails, onDetailViewChange]);

  

  return (
    <div className="w-full overflow-hidden">
      {/* Main Container Card - matching dashboard.tsx style */}
      <div 
        className={`bg-white rounded-xl border border-[#F0F0F0] shadow-sm flex flex-col ${selectedCallDetails ? "" : "h-[calc(100vh-120px)]"}`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Fixed Header Section with Filters */}
        <div className="bg-white border-b border-[#F0F0F0]">
          <div className="p-8 pb-6">
            {/* Title and Description */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-[#282828] mb-2">
                Key Moments Analysis
              </h1>
              <p className="text-sm text-[#797A79]">
                Analyze key conversation moments and patterns for individual consultants
              </p>
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-wrap gap-3 items-end">
            {/* Behavior Filter */}
            <div className="flex-1 min-w-[200px]" ref={behaviorDropdownRef}>
              <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
                Behavior
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsBehaviorDropdownOpen(!isBehaviorDropdownOpen)}
                  className="w-full px-4 py-2.5 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="text-sm text-[#282828] truncate">
                    {selectedBehavior === "all" 
                      ? "All Behaviors" 
                      : behaviors.find(b => b.id === selectedBehavior)?.title || "Select Behavior"}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#797A79] transition-transform duration-200 flex-shrink-0 ml-2 ${isBehaviorDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                {isBehaviorDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      <button
                        onClick={() => {
                          setSelectedBehavior("all");
                          setIsBehaviorDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                          selectedBehavior === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                        }`}
                      >
                        <span className="text-sm text-[#282828]">All Behaviors</span>
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
                          <span className="text-sm text-[#282828]">{behavior.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Week Filter */}
            <div className="min-w-[140px]" ref={weekDropdownRef}>
              <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
                Week
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                  className="w-full px-4 py-2.5 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="text-sm text-[#282828]">
                    Week {selectedWeek}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#797A79] transition-transform duration-200 ml-2 ${isWeekDropdownOpen ? "rotate-180" : ""}`}
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
            </div>
            
            {/* Consultant Filter */}
            <div className="flex-1 min-w-[200px]" ref={dropdownRef}>
              <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
                Consultant
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-2.5 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="text-sm text-[#282828] truncate">
                    {selectedConsultant === "all" 
                      ? "All Consultants" 
                      : selectedConsultantData?.name || "Select Consultant"}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#797A79] transition-transform duration-200 flex-shrink-0 ml-2 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      <button
                        onClick={() => {
                          setSelectedConsultant("all");
                          setIsDropdownOpen(false);
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
                            setIsDropdownOpen(false);
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
          
          {/* Data Type Toggle - Part of Fixed Header */}
          <div className="px-8 pb-3 pt-8">
            <div className="flex bg-[#F5F5F5] rounded-lg p-1">
              <button
                onClick={() => setSelectedDataType("strengths")}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                  selectedDataType === "strengths"
                    ? "bg-white text-[#282828] shadow-sm"
                    : "text-[#797A79] hover:text-[#282828]"
                }`}
              >
                Identified Strengths
              </button>
              <button
                onClick={() => setSelectedDataType("opportunities")}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                  selectedDataType === "opportunities"
                    ? "bg-white text-[#282828] shadow-sm"
                    : "text-[#797A79] hover:text-[#282828]"
                }`}
              >
                Missed Opportunities
              </button>
            </div>
          </div>
        </div>
        </div>
        
        {/* Scrollable Content Area */}
        <div ref={contentAreaRef} className={`${selectedCallDetails ? "" : "flex-1 overflow-y-auto"} p-8`}>
          {selectedConsultant === "all" ? (
            <AllConsultantsView 
              consultants={consultants}
              selectedWeek={selectedWeek}
              selectedDataType={selectedDataType}
              selectedBehavior={selectedBehavior}
            />
          ) : selectedConsultantData ? (
            <div>
                  {selectedDataType === "strengths" ? (
                    <div>
                      {/* Check if Alyssa is selected, week 7, and appropriate call */}
                      {(() => {
                        const filteredPositiveCalls = consultantCallData.positive
                          .filter(call => call.week_num === selectedWeek);
                        
                        const getTranscriptForCall = (callId: string) => {
                          return consultantTranscripts.positive.find(t => t.call_id === callId);
                        };
                        
                        const isDetailView = selectedCallDetails && selectedCallDetails.type === 'strength';
                        
                        return (
                          <>
                            {isDetailView && (
                              <div className="mb-4">
                                <button
                                  onClick={() => setSelectedCallDetails(null)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#797A79] hover:text-[#282828] bg-[#F5F5F5] hover:bg-[#E0E0E0] rounded-lg transition-all"
                                >
                                  <ChevronLeft size={18} />
                                  Back to all calls
                                </button>
                              </div>
                            )}
                            {filteredPositiveCalls.length > 0 ? (
                              <div className={isDetailView ? "flex gap-4" : "grid gap-4"}>
                                {!isDetailView ? (
                                  <div className="grid gap-4 w-full">
                                {filteredPositiveCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full">
                                {/* Card Header with Call Info */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</p>
                                    <p className="text-sm font-semibold text-[#282828]">{callData.call_id}</p>
                                  </div>
                                </div>
                            
                            
                            {/* Analysis Content - Leaflet Style */}
                            <div className="mt-4 space-y-4">
                              {/* Opportunity Section */}
                              <div className="pb-3 border-b border-[#F0F0F0]">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#282828]">Opportunity Identified</h5>
                                  <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                    Score: {callData.analysis.opportunity.opportunity_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {callData.analysis.opportunity.text.length > 150 
                                    ? callData.analysis.opportunity.text.substring(0, 150) + "..." 
                                    : callData.analysis.opportunity.text}
                                </p>
                              </div>
                              
                              {/* Consultant Response Section */}
                              <div className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                                  <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                    Score: {callData.analysis.consultant_response.response_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {callData.analysis.consultant_response.text.length > 150 
                                    ? callData.analysis.consultant_response.text.substring(0, 150) + "..." 
                                    : callData.analysis.consultant_response.text}
                                </p>
                              </div>
                              
                              {/* Why This Is Effective Section */}
                              <div className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#FF8A00]">Why This Is Effective</h5>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                      +{callData?.analysis.why_good?.enrolment_impact_percent || 0}% Enrollment
                                    </span>
                                    <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                      +{callData?.analysis.why_good?.retention_impact_percent || 0}% Retention
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {(callData?.analysis.why_good?.text?.length || 0) > 150 
                                    ? callData?.analysis.why_good?.text?.substring(0, 150) + "..." 
                                    : callData?.analysis.why_good?.text || ""}
                                </p>
                              </div>
                              
                              {/* View More Link */}
                              <div className="flex justify-end mt-3">
                                <button
                                  onClick={() => {
                                    setSelectedCallDetails({
                                      type: 'strength',
                                      data: callData,
                                      callId: callData.call_id
                                    });
                                  }}
                                  className="text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] underline transition-colors duration-200"
                                >
                                  View more
                                </button>
                              </div>
                                </div>
                              </div>
                                ))}
                              </div>
                            ) : (
                              /* Detail Panel - Show expanded view when View more is clicked */
                              selectedCallDetails && (() => {
                                const transcript = getTranscriptForCall(selectedCallDetails.callId);
                                const callData = selectedCallDetails.data;
                              if (!transcript || !callData) return null;
                              
                              const scrollToTop = () => {
                                if (positiveTranscriptScrollRef.current) {
                                  positiveTranscriptScrollRef.current.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }
                              };
                              
                              const scrollToBottom = () => {
                                if (positiveTranscriptScrollRef.current) {
                                  positiveTranscriptScrollRef.current.scrollTo({
                                    top: positiveTranscriptScrollRef.current.scrollHeight,
                                    behavior: 'smooth'
                                  });
                                }
                              };
                              
                              const scrollToKeyMoment = () => {
                                if (positiveTranscriptScrollRef.current) {
                                  const keyMomentElement = positiveTranscriptScrollRef.current.querySelector('[data-key-moment="true"]') as HTMLElement;
                                  if (keyMomentElement) {
                                    const elementTop = keyMomentElement.offsetTop;
                                    // Subtract 20px to ensure the full message is visible with some padding
                                    const scrollPosition = Math.max(0, elementTop - 65);
                                    
                                    positiveTranscriptScrollRef.current.scrollTo({
                                      top: scrollPosition,
                                      behavior: 'smooth'
                                    });
                                  }
                                }
                              };
                              
                              return (
                                <>
                                  <div className="w-1/2">
                                    {/* Full Call Details */}
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] p-5">
                                      <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-[#282828]">Full Analysis: {selectedConsultantData?.name} - Call {callData.call_id}</h4>
                                      </div>
                                    
                                    {/* Full Opportunity */}
                                    <div className="pb-4 border-b border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#282828]">Opportunity Identified</h5>
                                        <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                          Score: {callData.analysis.opportunity.opportunity_score}/5
                                        </span>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData.analysis.opportunity.text}
                                      </p>
                                    </div>
                                    
                                    {/* Full Response */}
                                    <div className="py-4 border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                                        <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                          Score: {callData.analysis.consultant_response.response_score}/5
                                        </span>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData.analysis.consultant_response.text}
                                      </p>
                                    </div>
                                    
                                    {/* Full Why Effective */}
                                    <div className="pt-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#FF8A00]">Why This Is Effective</h5>
                                        <div className="flex items-center gap-2">
                                          <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                            +{callData?.analysis.why_good?.enrolment_impact_percent || 0}% Enrollment
                                          </span>
                                          <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                            +{callData?.analysis.why_good?.retention_impact_percent || 0}% Retention
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData?.analysis.why_good?.text || ""}
                                      </p>
                                    </div>
                                    </div>
                                  </div>
                                  
                                  {/* Transcript */}
                                  <div className="w-1/2">
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] h-full max-h-[900px] flex flex-col relative overflow-hidden">
                                    <div className="px-5 py-4 border-b border-[#F0F0F0] bg-white rounded-t-xl sticky top-0 z-10">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-[#282828]">Transcript</h4>
                                        <div className="relative">
                                          <button
                                            onClick={() => setShowPositiveSummary(!showPositiveSummary)}
                                            className="p-1.5 hover:bg-[#8BAF20]/10 rounded-md transition-colors"
                                            title="Call Summary"
                                          >
                                            <Info size={18} className="text-[#797A79] hover:text-[#8BAF20]" />
                                          </button>
                                          {showPositiveSummary && transcript.summary && (
                                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#F0F0F0] p-4 z-20">
                                              <div className="flex items-center justify-between mb-3">
                                                <h5 className="text-sm font-semibold text-[#282828]">Call Summary</h5>
                                                <button
                                                  onClick={() => setShowPositiveSummary(false)}
                                                  className="p-0.5 hover:bg-[#F5F5F5] rounded"
                                                >
                                                  <X size={14} className="text-[#797A79]" />
                                                </button>
                                              </div>
                                              <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Total Messages:</span>
                                                  <span className="text-xs font-semibold text-[#282828]">{transcript.summary.total_messages}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Customer Messages:</span>
                                                  <span className="text-xs font-semibold text-[#8BAF20]">{transcript.summary.customer_messages}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Agent Messages:</span>
                                                  <span className="text-xs font-semibold text-[#8BAF20]">{transcript.summary.agent_messages}</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div ref={positiveTranscriptScrollRef} className="flex-1 overflow-y-auto p-5 bg-[#FAFAFA]">
                                      <div className="space-y-4">
                                      {transcript.transcript.map((entry: TranscriptEntry, index: number) => (
                                        <div 
                                          key={index}
                                          data-key-moment={entry.key_moment ? "true" : "false"}
                                          className={`flex ${entry.speaker === 'Customer' ? 'justify-end' : 'justify-start'} ${
                                            entry.key_moment ? 'bg-[#8BAF20]/10 py-3 px-4 -mx-4 rounded-lg border-l-4 border-[#8BAF20]' : ''
                                          }`}
                                        >
                                          <div className={`max-w-[70%] ${entry.speaker === 'Customer' ? 'order-2' : 'order-1'}`}>
                                            <div className={`mb-1 px-2 text-xs text-[#797A79] ${
                                              entry.speaker === 'Customer' ? 'text-right' : 'text-left'
                                            }`}>
                                              {entry.speaker}
                                            </div>
                                            <div className={`flex items-end gap-2 ${entry.speaker === 'Customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                                              <div className={`px-4 py-3 rounded-2xl ${
                                                entry.speaker === 'Customer' 
                                                  ? 'bg-[#F26A37] text-white' 
                                                  : 'bg-white text-[#282828] border border-[#E0E0E0]'
                                              }`}>
                                                <p className="text-sm leading-relaxed">
                                                  {entry.message}
                                                </p>
                                              </div>
                                            </div>
                                            {entry.key_moment && (
                                              <div className={`mt-1 px-2 text-xs font-semibold text-[#8BAF20] ${
                                                entry.speaker === 'Customer' ? 'text-right' : 'text-left'
                                              }`}>
                                                ⭐ Key Moment
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                      </div>
                                    </div>
                                    {/* Navigation Buttons */}
                                    <div className="flex items-center justify-center gap-2 p-3 border-t border-[#F0F0F0] bg-[#F5F5F5] rounded-b-xl">
                                      <button
                                        onClick={scrollToBottom}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Bottom"
                                      >
                                        <ArrowDown size={14} />
                                        Bottom
                                      </button>
                                      <button
                                        onClick={scrollToKeyMoment}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Key Moment"
                                      >
                                        <Target size={14} />
                                        Key Moment
                                      </button>
                                      <button
                                        onClick={scrollToTop}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Top"
                                      >
                                        <ArrowUp size={14} />
                                        Top
                                      </button>
                                    </div>
                                    </div>
                                  </div>
                                </>
                              );
                              })()
                            )}
                          </div>
                        ) : (
                          <div className="bg-[#F5F5F5] rounded-lg p-8 text-center">
                            <p className="text-sm text-[#797A79]">
                              No data available for the selected filters
                            </p>
                          </div>
                        )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div>
                      {/* Check if data exists for selected filters */}
                      {(() => {
                        const filteredCalls = consultantCallData.missed
                          .filter(call => call.week_num === selectedWeek);
                        
                        const getTranscriptForCall = (callId: string) => {
                          return consultantTranscripts.missed.find(t => t.call_id === callId);
                        };
                        
                        const isDetailView = selectedCallDetails && selectedCallDetails.type === 'missed';
                        
                        return (
                          <>
                            {isDetailView && (
                              <div className="mb-4">
                                <button
                                  onClick={() => setSelectedCallDetails(null)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#797A79] hover:text-[#282828] bg-[#F5F5F5] hover:bg-[#E0E0E0] rounded-lg transition-all"
                                >
                                  <ChevronLeft size={18} />
                                  Back to all calls
                                </button>
                              </div>
                            )}
                            {filteredCalls.length > 0 ? (
                              <div className={isDetailView ? "flex gap-4" : "grid gap-4"}>
                                {!isDetailView ? (
                                  <div className="grid gap-4 w-full">
                                {filteredCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full">
                                {/* Card Header with Call Info */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</p>
                                    <p className="text-sm font-semibold text-[#282828]">{callData.call_id}</p>
                              </div>
                            </div>
                            
                            
                            {/* Analysis Content - Leaflet Style */}
                            <div className="mt-4 space-y-4">
                              {/* Opportunity Section */}
                              <div className="pb-3 border-b border-[#F0F0F0]">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#282828]">Missed Opportunity</h5>
                                  <span className="px-2 py-0.5 bg-[#FF8A00]/10 text-[#FF8A00] rounded text-xs font-semibold">
                                    Score: {callData.analysis.opportunity.opportunity_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {callData.analysis.opportunity.text.length > 150 
                                    ? callData.analysis.opportunity.text.substring(0, 150) + "..." 
                                    : callData.analysis.opportunity.text}
                                </p>
                              </div>
                              
                              {/* Consultant Response Section */}
                              <div className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                                  <span className="px-2 py-0.5 bg-[#D84D51]/10 text-[#D84D51] rounded text-xs font-semibold">
                                    Score: {callData.analysis.consultant_response.response_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {callData.analysis.consultant_response.text.length > 150 
                                    ? callData.analysis.consultant_response.text.substring(0, 150) + "..." 
                                    : callData.analysis.consultant_response.text}
                                </p>
                              </div>
                              
                              {/* Recommended Approach Section */}
                              <div className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-bold text-[#FF8A00]">Recommended Approach</h5>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                      +{callData.analysis.recommended_response?.enrolment_impact_percent || 0}% Enrollment
                                    </span>
                                    <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                      +{callData.analysis.recommended_response?.retention_impact_percent || 0}% Retention
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-[#797A79] leading-relaxed">
                                  {(callData.analysis.recommended_response?.text?.length || 0) > 150 
                                    ? callData.analysis.recommended_response?.text?.substring(0, 150) + "..." 
                                    : callData.analysis.recommended_response?.text || ""}
                                </p>
                              </div>
                              
                              {/* View More Link */}
                              <div className="flex justify-end mt-3">
                                <button
                                  onClick={() => {
                                    setSelectedCallDetails({
                                      type: 'missed',
                                      data: callData,
                                      callId: callData.call_id
                                    });
                                  }}
                                  className="text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] underline transition-colors duration-200"
                                >
                                  View more
                                </button>
                              </div>
                            </div>
                                </div>
                                ))}
                              </div>
                            ) : (
                              /* Detail Panel - Show expanded view when View more is clicked */
                              selectedCallDetails && (() => {
                                const transcript = getTranscriptForCall(selectedCallDetails.callId);
                                const callData = selectedCallDetails.data;
                              if (!transcript || !callData) return null;
                              
                              const scrollToTop = () => {
                                if (missedTranscriptScrollRef.current) {
                                  missedTranscriptScrollRef.current.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }
                              };
                              
                              const scrollToBottom = () => {
                                if (missedTranscriptScrollRef.current) {
                                  missedTranscriptScrollRef.current.scrollTo({
                                    top: missedTranscriptScrollRef.current.scrollHeight,
                                    behavior: 'smooth'
                                  });
                                }
                              };
                              
                              const scrollToKeyMoment = () => {
                                if (missedTranscriptScrollRef.current) {
                                  const keyMomentElement = missedTranscriptScrollRef.current.querySelector('[data-key-moment="true"]') as HTMLElement;
                                  if (keyMomentElement) {
                                    const elementTop = keyMomentElement.offsetTop;
                                    // Subtract 20px to ensure the full message is visible with some padding
                                    const scrollPosition = Math.max(0, elementTop - 65);
                                    
                                    missedTranscriptScrollRef.current.scrollTo({
                                      top: scrollPosition,
                                      behavior: 'smooth'
                                    });
                                  }
                                }
                              };
                              
                              return (
                                <>
                                  <div className="w-1/2">
                                    {/* Full Call Details */}
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] p-5">
                                      <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-[#282828]">Full Analysis: {selectedConsultantData?.name} - Call {callData.call_id}</h4>
                                      </div>
                                    
                                    {/* Full Opportunity */}
                                    <div className="pb-4 border-b border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#282828]">Missed Opportunity</h5>
                                        <span className="px-2 py-0.5 bg-[#FF8A00]/10 text-[#FF8A00] rounded text-xs font-semibold">
                                          Score: {callData.analysis.opportunity.opportunity_score}/5
                                        </span>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData.analysis.opportunity.text}
                                      </p>
                                    </div>
                                    
                                    {/* Full Response */}
                                    <div className="py-4 border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                                        <span className="px-2 py-0.5 bg-[#D84D51]/10 text-[#D84D51] rounded text-xs font-semibold">
                                          Score: {callData.analysis.consultant_response.response_score}/5
                                        </span>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData.analysis.consultant_response.text}
                                      </p>
                                    </div>
                                    
                                    {/* Full Recommended Approach */}
                                    <div className="pt-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-[#FF8A00]">Recommended Approach</h5>
                                        <div className="flex items-center gap-2">
                                          <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                            +{callData?.analysis.recommended_response?.enrolment_impact_percent || 0}% Enrollment
                                          </span>
                                          <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                            +{callData?.analysis.recommended_response?.retention_impact_percent || 0}% Retention
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-sm text-[#797A79] leading-relaxed">
                                        {callData?.analysis.recommended_response?.text || ""}
                                      </p>
                                    </div>
                                    </div>
                                  </div>
                                  
                                  {/* Transcript */}
                                  <div className="w-1/2">
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] h-full max-h-[900px] flex flex-col relative overflow-hidden">
                                    <div className="px-5 py-4 border-b border-[#F0F0F0] bg-white rounded-t-xl sticky top-0 z-10">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-[#282828]">Transcript</h4>
                                        <div className="relative">
                                          <button
                                            onClick={() => setShowMissedSummary(!showMissedSummary)}
                                            className="p-1.5 hover:bg-[#FF8A00]/10 rounded-md transition-colors"
                                            title="Call Summary"
                                          >
                                            <Info size={18} className="text-[#797A79] hover:text-[#FF8A00]" />
                                          </button>
                                          {showMissedSummary && transcript.summary && (
                                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#F0F0F0] p-4 z-20">
                                              <div className="flex items-center justify-between mb-3">
                                                <h5 className="text-sm font-semibold text-[#282828]">Call Summary</h5>
                                                <button
                                                  onClick={() => setShowMissedSummary(false)}
                                                  className="p-0.5 hover:bg-[#F5F5F5] rounded"
                                                >
                                                  <X size={14} className="text-[#797A79]" />
                                                </button>
                                              </div>
                                              <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Total Messages:</span>
                                                  <span className="text-xs font-semibold text-[#282828]">{transcript.summary.total_messages}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Customer Messages:</span>
                                                  <span className="text-xs font-semibold text-[#FF8A00]">{transcript.summary.customer_messages}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-xs text-[#797A79]">Agent Messages:</span>
                                                  <span className="text-xs font-semibold text-[#FF8A00]">{transcript.summary.agent_messages}</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div ref={missedTranscriptScrollRef} className="flex-1 overflow-y-auto p-5 bg-[#FAFAFA]">
                                      <div className="space-y-4">
                                      {transcript.transcript.map((entry: TranscriptEntry, index: number) => (
                                        <div 
                                          key={index}
                                          data-key-moment={entry.key_moment ? "true" : "false"}
                                          className={`flex ${entry.speaker === 'Customer' ? 'justify-end' : 'justify-start'} ${
                                            entry.key_moment ? 'bg-[#FF8A00]/10 py-3 px-4 -mx-4 rounded-lg border-l-4 border-[#FF8A00]' : ''
                                          }`}
                                        >
                                          <div className={`max-w-[70%] ${entry.speaker === 'Customer' ? 'order-2' : 'order-1'}`}>
                                            <div className={`mb-1 px-2 text-xs text-[#797A79] ${
                                              entry.speaker === 'Customer' ? 'text-right' : 'text-left'
                                            }`}>
                                              {entry.speaker}
                                            </div>
                                            <div className={`flex items-end gap-2 ${entry.speaker === 'Customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                                              <div className={`px-4 py-3 rounded-2xl ${
                                                entry.speaker === 'Customer' 
                                                  ? 'bg-[#F26A37] text-white' 
                                                  : 'bg-white text-[#282828] border border-[#E0E0E0]'
                                              }`}>
                                                <p className="text-sm leading-relaxed">
                                                  {entry.message}
                                                </p>
                                              </div>
                                            </div>
                                            {entry.key_moment && (
                                              <div className={`mt-1 px-2 text-xs font-semibold text-[#FF8A00] ${
                                                entry.speaker === 'Customer' ? 'text-right' : 'text-left'
                                              }`}>
                                                ⭐ Key Moment
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                      </div>
                                    </div>
                                    {/* Navigation Buttons */}
                                    <div className="flex items-center justify-center gap-2 p-3 border-t border-[#F0F0F0] bg-[#F5F5F5] rounded-b-xl">
                                      <button
                                        onClick={scrollToBottom}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FF8A00]/10 text-[#282828] hover:text-[#FF8A00] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Bottom"
                                      >
                                        <ArrowDown size={14} />
                                        Bottom
                                      </button>
                                      <button
                                        onClick={scrollToKeyMoment}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FF8A00]/10 text-[#282828] hover:text-[#FF8A00] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Key Moment"
                                      >
                                        <Target size={14} />
                                        Key Moment
                                      </button>
                                      <button
                                        onClick={scrollToTop}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FF8A00]/10 text-[#282828] hover:text-[#FF8A00] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                                        title="Scroll to Top"
                                      >
                                        <ArrowUp size={14} />
                                        Top
                                      </button>
                                    </div>
                                    </div>
                                  </div>
                                </>
                              );
                              })()
                            )}
                          </div>
                        ) : (
                          <div className="bg-[#F5F5F5] rounded-lg p-8 text-center">
                            <p className="text-sm text-[#797A79]">
                              No data available for the selected filters
                            </p>
                          </div>
                        )}
                          </>
                        );
                      })()}
                    </div>
                  )}
              </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#797A79] text-base">
                No data available for this consultant
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyMoments;
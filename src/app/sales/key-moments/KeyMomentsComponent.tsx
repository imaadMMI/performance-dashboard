"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, X, ArrowDown, ArrowUp, Target, Info, ThumbsUp, ThumbsDown, Filter, Settings2 } from 'lucide-react';
import './keyMomentsAnimations.css';

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
  selectedBehavior,
  onCallDetailSelect
}: { 
  consultants: { id: string; name: string }[], 
  selectedWeek: number, 
  selectedDataType: "strengths" | "opportunities",
  selectedBehavior: string,
  onCallDetailSelect?: (detail: { consultantId: string; consultantName: string; callId: string; type: 'strengths' | 'opportunities'; callData: CallAnalysis; transcript: CallTranscript } | null) => void
}) => {
  const [consultantsData, setConsultantsData] = useState<{
    [key: string]: {
      positive: CallAnalysis[];
      missed: CallAnalysis[];
    }
  }>({});
  const [consultantTranscripts, setConsultantTranscripts] = useState<{
    [key: string]: {
      positive: CallTranscript[];
      missed: CallTranscript[];
    }
  }>({});
  const [expandedConsultants, setExpandedConsultants] = useState<Set<string>>(new Set());
  const [closingConsultants, setClosingConsultants] = useState<Set<string>>(new Set());

  // Reset expanded consultants when week or data type changes
  useEffect(() => {
    setExpandedConsultants(new Set());
  }, [selectedWeek, selectedDataType]);

  // Handle consultant toggle with animation
  const toggleConsultant = (consultantId: string) => {
    if (expandedConsultants.has(consultantId)) {
      // Closing animation
      setClosingConsultants(new Set([...closingConsultants, consultantId]));
      setTimeout(() => {
        setExpandedConsultants(prev => {
          const newSet = new Set(prev);
          newSet.delete(consultantId);
          return newSet;
        });
        setClosingConsultants(prev => {
          const newSet = new Set(prev);
          newSet.delete(consultantId);
          return newSet;
        });
      }, 200);
    } else {
      // Opening
      setExpandedConsultants(prev => new Set([...prev, consultantId]));
    }
  };

  // Load data for all consultants
  useEffect(() => {
    const loadAllConsultantsData = async () => {
      const allData: typeof consultantsData = {};
      const allTranscripts: typeof consultantTranscripts = {};

      for (const consultant of consultants) {
        const positiveData: CallAnalysis[] = [];
        const missedData: CallAnalysis[] = [];
        const positiveTranscripts: CallTranscript[] = [];
        const missedTranscripts: CallTranscript[] = [];

        try {
          if (consultant.name === "Alyssa Pennacchia") {
            const alyssaPositive1 = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228_Analysis.json');
            const alyssaPositive1Transcript = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228.json');
            const alyssaPositive2 = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229_Analysis.json');
            const alyssaPositive2Transcript = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229.json');
            const alyssaMissed1 = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307_Analysis.json');
            const alyssaMissed1Transcript = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307.json');
            const alyssaMissed2 = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308_Analysis.json');
            const alyssaMissed2Transcript = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308.json');
            
            positiveData.push(alyssaPositive1.default);
            positiveData.push(alyssaPositive2.default);
            positiveTranscripts.push(alyssaPositive1Transcript.default);
            positiveTranscripts.push(alyssaPositive2Transcript.default);
            
            missedData.push(alyssaMissed1.default);
            missedData.push(alyssaMissed2.default);
            missedTranscripts.push(alyssaMissed1Transcript.default);
            missedTranscripts.push(alyssaMissed2Transcript.default);
          } else if (consultant.name === "Michael Whyte") {
            const michaelPositive1 = await import('../keyMomentsJson/M. Whyte/Positive/Call_56/56_Analysis.json');
            const michaelPositive1Transcript = await import('../keyMomentsJson/M. Whyte/Positive/Call_56/56.json');
            const michaelPositive2 = await import('../keyMomentsJson/M. Whyte/Positive/Call_78/78_Analysis.json');
            const michaelPositive2Transcript = await import('../keyMomentsJson/M. Whyte/Positive/Call_78/78.json');
            const michaelMissed1 = await import('../keyMomentsJson/M. Whyte/Missed/Call_12/12_Analysis.json');
            const michaelMissed1Transcript = await import('../keyMomentsJson/M. Whyte/Missed/Call_12/12.json');
            const michaelMissed2 = await import('../keyMomentsJson/M. Whyte/Missed/Call_34/34_Analysis.json');
            const michaelMissed2Transcript = await import('../keyMomentsJson/M. Whyte/Missed/Call_34/34.json');
            
            positiveData.push(michaelPositive1.default);
            positiveData.push(michaelPositive2.default);
            positiveTranscripts.push(michaelPositive1Transcript.default);
            positiveTranscripts.push(michaelPositive2Transcript.default);
            
            missedData.push(michaelMissed1.default);
            missedData.push(michaelMissed2.default);
            missedTranscripts.push(michaelMissed1Transcript.default);
            missedTranscripts.push(michaelMissed2Transcript.default);
          }
        } catch (error) {
          console.error(`Error loading data for ${consultant.name}:`, error);
        }

        if (positiveData.length > 0 || missedData.length > 0) {
          allData[consultant.id] = { positive: positiveData, missed: missedData };
          allTranscripts[consultant.id] = { positive: positiveTranscripts, missed: missedTranscripts };
        }
      }

      setConsultantsData(allData);
      setConsultantTranscripts(allTranscripts);
    };

    loadAllConsultantsData();
  }, [consultants]);

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
            <div key={consultant.id} className="bg-white rounded-xl border border-[#F0F0F0] overflow-hidden consultant-card-transition">
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
                <div className={`p-6 space-y-4 border-t border-[#F0F0F0] ${
                  closingConsultants.has(consultant.id) ? 'animate-fadeOut' : ''
                }`}>
                  {filteredCalls.map((callData) => (
                    <React.Fragment key={callData.call_id}>
                    <div className={`bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms]${
                      closingConsultants.has(consultant.id) ? '' : 'animate-slideUp'
                    }`}>
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
                        
                        {/* View More Button */}
                        <div className="flex justify-end mt-3 pt-3 border-t border-[#F0F0F0]">
                          <button
                            onClick={() => {
                              // Find the transcript for this call
                              const transcripts = consultantTranscripts[consultant.id];
                              const transcriptList = selectedDataType === "strengths" 
                                ? transcripts?.positive 
                                : transcripts?.missed;
                              const transcript = transcriptList?.find(t => t.call_id === callData.call_id);
                              
                              if (onCallDetailSelect && transcript) {
                                onCallDetailSelect({
                                  consultantId: consultant.id,
                                  consultantName: consultant.name,
                                  callId: callData.call_id,
                                  type: selectedDataType,
                                  callData: callData,
                                  transcript: transcript
                                });
                              }
                            }}
                            className="text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] underline transition-colors duration-200"
                          >
                            View more
                          </button>
                        </div>
                      </div>
                    </div>
                    </React.Fragment>
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

interface KeyMomentsProps {
  onDetailViewChange?: (inDetailView: boolean) => void;
  consultants: { id: string; name: string }[];
  behaviors: { id: string; title: string }[];
}

const KeyMoments = ({ 
  onDetailViewChange,
  consultants,
  behaviors
}: KeyMomentsProps) => {
  const [selectedDataType, setSelectedDataType] = useState<"strengths" | "opportunities">("strengths");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("all");
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedBehavior, setSelectedBehavior] = useState<string>("");
  const [selectedCallDetails, setSelectedCallDetails] = useState<any>(null);
  const [closingCallDetails, setClosingCallDetails] = useState<any>(null);
  const [allConsultantsCallDetail, setAllConsultantsCallDetail] = useState<{
    consultantId: string;
    consultantName: string;
    callId: string;
    type: 'strengths' | 'opportunities';
    callData: CallAnalysis;
    transcript: CallTranscript;
  } | null>(null);
  const [closingAllConsultantsDetail, setClosingAllConsultantsDetail] = useState(false);
  const [showAllConsultantsTranscript, setShowAllConsultantsTranscript] = useState(false);
  const [closingAllConsultantsTranscript, setClosingAllConsultantsTranscript] = useState(false);
  const [showIndividualTranscript, setShowIndividualTranscript] = useState(false);
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
  const positiveTranscriptScrollRef = useRef<HTMLDivElement>(null);
  const missedTranscriptScrollRef = useRef<HTMLDivElement>(null);
  const allConsultantsTranscriptRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const [individualFilterKey, setIndividualFilterKey] = useState(0);
  const [individualSectionFeedback, setIndividualSectionFeedback] = useState<{ [key: string]: 'up' | 'down' | null }>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isBehaviorDropdownOpen, setIsBehaviorDropdownOpen] = useState(false);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const [isConsultantDropdownOpen, setIsConsultantDropdownOpen] = useState(false);
  
  // Refs for dropdown outside click detection
  const behaviorDropdownRef = useRef<HTMLDivElement>(null);
  const weekDropdownRef = useRef<HTMLDivElement>(null);
  const consultantDropdownRef = useRef<HTMLDivElement>(null);

  // Handle feedback for individual consultant sections
  const handleIndividualSectionFeedback = (sectionKey: string, feedback: 'up' | 'down') => {
    setIndividualSectionFeedback(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === feedback ? null : feedback
    }));
  };

  // Click outside handlers for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (behaviorDropdownRef.current && !behaviorDropdownRef.current.contains(event.target as Node)) {
        setIsBehaviorDropdownOpen(false);
      }
      if (weekDropdownRef.current && !weekDropdownRef.current.contains(event.target as Node)) {
        setIsWeekDropdownOpen(false);
      }
      if (consultantDropdownRef.current && !consultantDropdownRef.current.contains(event.target as Node)) {
        setIsConsultantDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalWeeks = 12; // Based on your key-moments page

  // Handle back to all calls with animation
  const handleBackToAllCalls = () => {
    setClosingCallDetails(selectedCallDetails);
    setTimeout(() => {
      setSelectedCallDetails(null);
      setClosingCallDetails(null);
      setShowIndividualTranscript(false);
    }, 200);
  };

  // Trigger animation on filter changes
  useEffect(() => {
    setIndividualFilterKey(prev => prev + 1);
  }, [selectedWeek, selectedDataType, selectedConsultant, selectedBehavior]);

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
          const alyssaPositive1 = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228_Analysis.json');
          const alyssaPositive1Transcript = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761228/679951761228.json');
          const alyssaPositive2 = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229_Analysis.json');
          const alyssaPositive2Transcript = await import('../keyMomentsJson/Alyssa/Positive/Call: 679951761229/679951761229.json');
          const alyssaMissed1 = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307_Analysis.json');
          const alyssaMissed1Transcript = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129307/679942129307.json');
          const alyssaMissed2 = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308_Analysis.json');
          const alyssaMissed2Transcript = await import('../keyMomentsJson/Alyssa/Missed/Call: 679942129308/679942129308.json');
          
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
          const michaelPositive1 = await import('../keyMomentsJson/M. Whyte/Positive/Call_56/56_Analysis.json');
          const michaelPositive1Transcript = await import('../keyMomentsJson/M. Whyte/Positive/Call_56/56.json');
          const michaelPositive2 = await import('../keyMomentsJson/M. Whyte/Positive/Call_78/78_Analysis.json');
          const michaelPositive2Transcript = await import('../keyMomentsJson/M. Whyte/Positive/Call_78/78.json');
          const michaelMissed1 = await import('../keyMomentsJson/M. Whyte/Missed/Call_12/12_Analysis.json');
          const michaelMissed1Transcript = await import('../keyMomentsJson/M. Whyte/Missed/Call_12/12.json');
          const michaelMissed2 = await import('../keyMomentsJson/M. Whyte/Missed/Call_34/34_Analysis.json');
          const michaelMissed2Transcript = await import('../keyMomentsJson/M. Whyte/Missed/Call_34/34.json');
          
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
        // className={`bg-white rounded-xl border border-[#F0F0F0] shadow-sm flex flex-col ${selectedCallDetails || allConsultantsCallDetail ? "" : "h-[calc(100vh-120px)]"}`}
        className={`bg-white rounded-xl  border-[#F0F0F0] shadow-sm flex flex-col ${selectedCallDetails || allConsultantsCallDetail ? "" : "h-[calc(100vh-120px)]"}`}

        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Fixed Header Section with Filters */}
        {/* <div className="bg-white border-b border-[#F0F0F0]"> */}
        <div className="bg-white border-[#F0F0F0]">

          <div className="p-8 pb-6">
            {/* Title, Description and Data Type Toggle */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-[#282828]">
                  Key Moments Analysis
                </h1>
                <div className="flex items-center gap-3">
                  {/* Filter Button */}
                  <button
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                      showFilterPanel 
                        ? "bg-[#F97316] text-white border-[#F97316]" 
                        : "bg-white text-[#282828] border-[#E5E5E5] hover:border-[#F97316] hover:text-[#F97316]"
                    }`}
                  >
                    <span className="text-sm font-medium">Filter</span>
                    <Settings2 className="w-4 h-4" />
                  </button>
                  {/* Data Type Toggle */}
                  <div className="flex bg-[#F5F5F5] rounded-lg p-1">
                    <button
                      onClick={() => setSelectedDataType("strengths")}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      selectedDataType === "strengths"
                        ? "bg-white text-[#282828] shadow-sm"
                        : "text-[#797A79] hover:text-[#282828]"
                    }`}
                  >
                    Identified Strengths
                  </button>
                    <button
                      onClick={() => setSelectedDataType("opportunities")}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
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
              <p className="text-sm text-[#797A79]">
                Analyze key conversation moments and patterns for individual consultants
              </p>
            </div>
            
            {/* Expandable Filter Panel */}
            {showFilterPanel && (
              <div className="border-t border-[#F0F0F0] pt-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Behaviors Dropdown */}
                  <div className="relative" ref={behaviorDropdownRef}>
                    <label className="block text-sm font-medium text-[#282828] mb-2">
                      Behaviors
                    </label>
                    <button
                      onClick={() => setIsBehaviorDropdownOpen(!isBehaviorDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#282828] hover:border-[#F97316] focus:outline-none focus:border-[#F97316]"
                    >
                      <span>{selectedBehavior || "All Behaviors"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isBehaviorDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isBehaviorDropdownOpen && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setSelectedBehavior("");
                              setIsBehaviorDropdownOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                          >
                            All Behaviors
                          </button>
                          {behaviors.map((behavior, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedBehavior(behavior.title);
                                setIsBehaviorDropdownOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                            >
                              {behavior.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Week Dropdown */}
                  <div className="relative" ref={weekDropdownRef}>
                    <label className="block text-sm font-medium text-[#282828] mb-2">
                      Week
                    </label>
                    <button
                      onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#282828] hover:border-[#F97316] focus:outline-none focus:border-[#F97316]"
                    >
                      <span>{selectedWeek > 0 ? `Week ${selectedWeek}` : "All Weeks"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isWeekDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isWeekDropdownOpen && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setSelectedWeek(0);
                              setIsWeekDropdownOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                          >
                            All Weeks
                          </button>
                          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
                            <button
                              key={week}
                              onClick={() => {
                                setSelectedWeek(week);
                                setIsWeekDropdownOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                            >
                              Week {week}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Consultants Dropdown */}
                  <div className="relative" ref={consultantDropdownRef}>
                    <label className="block text-sm font-medium text-[#282828] mb-2">
                      Consultants
                    </label>
                    <button
                      onClick={() => setIsConsultantDropdownOpen(!isConsultantDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#282828] hover:border-[#F97316] focus:outline-none focus:border-[#F97316]"
                    >
                      <span>
                        {selectedConsultant === "all" 
                          ? "All Consultants" 
                          : consultants.find(c => c.id === selectedConsultant)?.name || "Select Consultant"}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isConsultantDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isConsultantDropdownOpen && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setSelectedConsultant("all");
                              setIsConsultantDropdownOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                          >
                            All Consultants
                          </button>
                          {consultants.map((consultant) => (
                            <button
                              key={consultant.id}
                              onClick={() => {
                                setSelectedConsultant(consultant.id);
                                setIsConsultantDropdownOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-[#282828] hover:bg-[#FFF7ED]"
                            >
                              {consultant.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
        </div>
        
        {/* Scrollable Content Area */}
        <div ref={contentAreaRef} className={`flex-1 overflow-y-auto p-8`}>
          {selectedConsultant === "all" ? (
            allConsultantsCallDetail ? (
              // Show detail view for All Consultants
              <div>
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setClosingAllConsultantsDetail(true);
                      setTimeout(() => {
                        setAllConsultantsCallDetail(null);
                        setClosingAllConsultantsDetail(false);
                        setShowAllConsultantsTranscript(false);
                        setClosingAllConsultantsTranscript(false);
                        if (onDetailViewChange) onDetailViewChange(false);
                      }, 200);
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] transition-colors"
                  >
                    <ChevronLeft size={18} />
                    Back to all calls
                  </button>
                </div>
                
                {/* Full Analysis and Transcript View */}
                <div className={`flex gap-6 ${
                  closingAllConsultantsDetail ? 'animate-fadeOut' : 'animate-fadeIn'
                }`}>
                  {/* Full Analysis Column */}
                  <div className={showAllConsultantsTranscript ? "w-1/2" : "w-full"}>
                    <div className="bg-white rounded-xl border border-[#F0F0F0] p-6">
                      {/* Header with Toggle Button */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Consultant</h4>
                            <p className="text-lg font-semibold text-[#282828]">{allConsultantsCallDetail.consultantName}</p>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</h4>
                            <p className="text-sm font-semibold text-[#282828]">{allConsultantsCallDetail.callId}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (showAllConsultantsTranscript) {
                              setClosingAllConsultantsTranscript(true);
                              setTimeout(() => {
                                setShowAllConsultantsTranscript(false);
                                setClosingAllConsultantsTranscript(false);
                              }, 200);
                            } else {
                              setShowAllConsultantsTranscript(true);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#F26A37] transition-colors font-medium text-sm"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H5.5C6.32843 3 7 3.67157 7 4.5V11.5C7 12.3284 6.32843 13 5.5 13H3.5C2.67157 13 2 12.3284 2 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M9 4.5C9 3.67157 9.67157 3 10.5 3H12.5C13.3284 3 14 3.67157 14 4.5V11.5C14 12.3284 13.3284 13 12.5 13H10.5C9.67157 13 9 12.3284 9 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                          {showAllConsultantsTranscript ? "Hide Transcript" : "Show Transcript"}
                        </button>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Opportunity Section */}
                        <div className="pb-4 border-b border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-bold text-[#282828]">
                              {allConsultantsCallDetail.type === "strengths" ? "Opportunity Identified" : "Missed Opportunity"}
                            </h5>
                            <span className={`px-2 py-0.5 ${
                              allConsultantsCallDetail.type === "strengths" 
                                ? "bg-[#8BAF20]/10 text-[#8BAF20]" 
                                : "bg-[#FF8A00]/10 text-[#FF8A00]"
                            } rounded text-xs font-semibold`}>
                              Score: {allConsultantsCallDetail.callData.analysis.opportunity.opportunity_score}/5
                            </span>
                          </div>
                          <p className="text-sm text-[#797A79] leading-relaxed">
                            {allConsultantsCallDetail.callData.analysis.opportunity.text}
                          </p>
                        </div>
                        
                        {/* Consultant Response Section */}
                        <div className="pb-4 border-b border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                            <span className={`px-2 py-0.5 ${
                              allConsultantsCallDetail.type === "strengths"
                                ? "bg-[#8BAF20]/10 text-[#8BAF20]"
                                : "bg-[#D84D51]/10 text-[#D84D51]"
                            } rounded text-xs font-semibold`}>
                              Score: {allConsultantsCallDetail.callData.analysis.consultant_response.response_score}/5
                            </span>
                          </div>
                          <p className="text-sm text-[#797A79] leading-relaxed">
                            {allConsultantsCallDetail.callData.analysis.consultant_response.text}
                          </p>
                        </div>
                        
                        {/* Why Effective or Recommended Section */}
                        {allConsultantsCallDetail.type === "strengths" ? (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-[#FF8A00]">Why This Is Effective</h5>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{allConsultantsCallDetail.callData.analysis.why_good?.enrolment_impact_percent || 0}% Enrollment
                                </span>
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{allConsultantsCallDetail.callData.analysis.why_good?.retention_impact_percent || 0}% Retention
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[#797A79] leading-relaxed">
                              {allConsultantsCallDetail.callData.analysis.why_good?.text || ""}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-[#FF8A00]">Recommended Approach</h5>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{allConsultantsCallDetail.callData.analysis.recommended_response?.enrolment_impact_percent || 0}% Enrollment
                                </span>
                                <span className="px-2 py-0.5 bg-[#8BAF20]/10 text-[#8BAF20] rounded text-xs font-semibold">
                                  +{allConsultantsCallDetail.callData.analysis.recommended_response?.retention_impact_percent || 0}% Retention
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[#797A79] leading-relaxed">
                              {allConsultantsCallDetail.callData.analysis.recommended_response?.text || ""}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Transcript Column - Only show when toggled */}
                  {showAllConsultantsTranscript && (
                  <div className={`w-1/2 ${closingAllConsultantsTranscript ? 'animate-fadeOut' : 'animate-slideDown'}`}>
                    <div className="bg-white rounded-xl border border-[#F0F0F0] h-full max-h-[900px] flex flex-col">
                      <div className="px-5 py-4 border-b border-[#F0F0F0]">
                        <h4 className="text-lg font-semibold text-[#282828]">Transcript</h4>
                      </div>
                      <div ref={allConsultantsTranscriptRef} className="flex-1 overflow-y-auto p-5 bg-[#FAFAFA]">
                        <div className="space-y-4">
                          {allConsultantsCallDetail.transcript.transcript.map((entry: TranscriptEntry, index: number) => (
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
                          onClick={() => {
                            if (allConsultantsTranscriptRef.current) {
                              allConsultantsTranscriptRef.current.scrollTo({
                                top: allConsultantsTranscriptRef.current.scrollHeight,
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                          title="Scroll to Bottom"
                        >
                          <ArrowDown size={14} />
                          Bottom
                        </button>
                        <button
                          onClick={() => {
                            if (allConsultantsTranscriptRef.current) {
                              const keyMomentElement = allConsultantsTranscriptRef.current.querySelector('[data-key-moment="true"]') as HTMLElement;
                              if (keyMomentElement) {
                                const elementTop = keyMomentElement.offsetTop;
                                const scrollPosition = Math.max(0, elementTop - 65);
                                
                                allConsultantsTranscriptRef.current.scrollTo({
                                  top: scrollPosition,
                                  behavior: 'smooth'
                                });
                              }
                            }
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                          title="Scroll to Key Moment"
                        >
                          <Target size={14} />
                          Key Moment
                        </button>
                        <button
                          onClick={() => {
                            if (allConsultantsTranscriptRef.current) {
                              allConsultantsTranscriptRef.current.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#8BAF20]/10 text-[#282828] hover:text-[#8BAF20] rounded-md transition-colors text-xs font-medium border border-[#F0F0F0]"
                          title="Scroll to Top"
                        >
                          <ArrowUp size={14} />
                          Top
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            ) : (
              <AllConsultantsView 
                consultants={consultants}
                selectedWeek={selectedWeek}
                selectedDataType={selectedDataType}
                selectedBehavior={selectedBehavior}
                onCallDetailSelect={(detail) => {
                  if (detail) {
                    setAllConsultantsCallDetail(detail);
                    if (onDetailViewChange) onDetailViewChange(true);
                  }
                }}
              />
            )
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
                                  onClick={handleBackToAllCalls}
                                  className="flex items-center gap-2 text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] transition-colors"
                                >
                                  <ChevronLeft size={18} />
                                  Back to all calls
                                </button>
                              </div>
                            )}
                            {filteredPositiveCalls.length > 0 ? (
                              <div className={isDetailView ? "flex gap-4" : "grid gap-4"}>
                                {!isDetailView ? (
                                  <div key={individualFilterKey} className="grid gap-4 w-full animate-stagger animate-quickFade">
                                {filteredPositiveCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full animate-slideUp">
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
                                  <div className={`${showIndividualTranscript ? 'w-1/2' : 'w-full'} ${closingCallDetails ? 'animate-fadeOut' : 'animate-slideDown'}`}>
                                    {/* Full Call Details */}
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] p-5 animate-fadeIn">
                                      <div className="flex items-start justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-[#282828]">Full Analysis: {selectedConsultantData?.name} - Call {callData.call_id}</h4>
                                        <button
                                          onClick={() => setShowIndividualTranscript(!showIndividualTranscript)}
                                          className="flex items-center gap-2 px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#F26A37] transition-colors font-medium text-sm"
                                        >
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H5.5C6.32843 3 7 3.67157 7 4.5V11.5C7 12.3284 6.32843 13 5.5 13H3.5C2.67157 13 2 12.3284 2 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M9 4.5C9 3.67157 9.67157 3 10.5 3H12.5C13.3284 3 14 3.67157 14 4.5V11.5C14 12.3284 13.3284 13 12.5 13H10.5C9.67157 13 9 12.3284 9 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                          </svg>
                                          {showIndividualTranscript ? "Hide Transcript" : "Show Transcript"}
                                        </button>
                                      </div>
                                    
                                    {/* Full Opportunity */}
                                    <div className="pb-4 border-b border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                          <h5 className="text-sm font-bold text-[#282828]">Opportunity Identified</h5>
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-opportunity`, 'up')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-opportunity`] === 'up'
                                                  ? 'bg-green-100 text-green-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsUp size={14} />
                                            </button>
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-opportunity`, 'down')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-opportunity`] === 'down'
                                                  ? 'bg-red-100 text-red-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsDown size={14} />
                                            </button>
                                          </div>
                                        </div>
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
                                        <div className="flex items-center gap-3">
                                          <h5 className="text-sm font-bold text-[#282828]">Consultant Response</h5>
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-response`, 'up')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-response`] === 'up'
                                                  ? 'bg-green-100 text-green-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsUp size={14} />
                                            </button>
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-response`, 'down')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-response`] === 'down'
                                                  ? 'bg-red-100 text-red-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsDown size={14} />
                                            </button>
                                          </div>
                                        </div>
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
                                        <div className="flex items-center gap-3">
                                          <h5 className="text-sm font-bold text-[#FF8A00]">Why This Is Effective</h5>
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-effective`, 'up')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-effective`] === 'up'
                                                  ? 'bg-green-100 text-green-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsUp size={14} />
                                            </button>
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-effective`, 'down')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-effective`] === 'down'
                                                  ? 'bg-red-100 text-red-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsDown size={14} />
                                            </button>
                                          </div>
                                        </div>
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
                                  
                                  {/* Transcript - Only show when toggled */}
                                  {showIndividualTranscript && (
                                  <div className={`w-1/2 ${closingCallDetails ? 'animate-fadeOut' : 'animate-slideDown'}`}>
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
                                  )}
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
                                  onClick={handleBackToAllCalls}
                                  className="flex items-center gap-2 text-sm font-semibold text-[#FF8A00] hover:text-[#F26A37] transition-colors"
                                >
                                  <ChevronLeft size={18} />
                                  Back to all calls
                                </button>
                              </div>
                            )}
                            {filteredCalls.length > 0 ? (
                              <div className={isDetailView ? "flex gap-4" : "grid gap-4"}>
                                {!isDetailView ? (
                                  <div key={individualFilterKey} className="grid gap-4 w-full animate-stagger animate-quickFade">
                                {filteredCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full animate-slideUp">
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
                                  <div className={`${showIndividualTranscript ? 'w-1/2' : 'w-full'} ${closingCallDetails ? 'animate-fadeOut' : 'animate-slideDown'}`}>
                                    {/* Full Call Details */}
                                    <div className="bg-white rounded-xl border border-[#F0F0F0] p-5 animate-fadeIn">
                                      <div className="flex items-start justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-[#282828]">Full Analysis: {selectedConsultantData?.name} - Call {callData.call_id}</h4>
                                        <button
                                          onClick={() => setShowIndividualTranscript(!showIndividualTranscript)}
                                          className="flex items-center gap-2 px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#F26A37] transition-colors font-medium text-sm"
                                        >
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H5.5C6.32843 3 7 3.67157 7 4.5V11.5C7 12.3284 6.32843 13 5.5 13H3.5C2.67157 13 2 12.3284 2 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M9 4.5C9 3.67157 9.67157 3 10.5 3H12.5C13.3284 3 14 3.67157 14 4.5V11.5C14 12.3284 13.3284 13 12.5 13H10.5C9.67157 13 9 12.3284 9 11.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                          </svg>
                                          {showIndividualTranscript ? "Hide Transcript" : "Show Transcript"}
                                        </button>
                                      </div>
                                    
                                    {/* Full Opportunity */}
                                    <div className="pb-4 border-b border-[#F0F0F0]">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                          <h5 className="text-sm font-bold text-[#282828]">Missed Opportunity</h5>
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-missed-opportunity`, 'up')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-missed-opportunity`] === 'up'
                                                  ? 'bg-green-100 text-green-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsUp size={14} />
                                            </button>
                                            <button
                                              onClick={() => handleIndividualSectionFeedback(`${callData.call_id}-missed-opportunity`, 'down')}
                                              className={`p-1 rounded transition-all ${
                                                individualSectionFeedback[`${callData.call_id}-missed-opportunity`] === 'down'
                                                  ? 'bg-red-100 text-red-600'
                                                  : 'hover:bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              <ThumbsDown size={14} />
                                            </button>
                                          </div>
                                        </div>
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
                                  
                                  {/* Transcript - Only show when toggled */}
                                  {showIndividualTranscript && (
                                  <div className={`w-1/2 ${closingCallDetails ? 'animate-fadeOut' : 'animate-slideDown'}`}>
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
                                  )}
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
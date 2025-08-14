"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, X, ThumbsUp, ThumbsDown } from 'lucide-react';
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
}

const KeyMoments = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<string>("all");
  const [consultants, setConsultants] = useState<{ id: string; name: string}[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekInputValue, setWeekInputValue] = useState("1");
  const [isEditingWeek, setIsEditingWeek] = useState(false);
  const [selectedCall, setSelectedCall] = useState<string>("all");
  const [isCallDropdownOpen, setIsCallDropdownOpen] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState<"strengths" | "opportunities">("strengths");
  const [selectedCallDetails, setSelectedCallDetails] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sectionVotes, setSectionVotes] = useState<{
    opportunity: 'up' | 'down' | null;
    response: 'up' | 'down' | null;
    effectiveness: 'up' | 'down' | null;
  }>({
    opportunity: null,
    response: null,
    effectiveness: null
  });
  const [consultantCallData, setConsultantCallData] = useState<{
    positive: CallAnalysis[];
    missed: CallAnalysis[];
  }>({ positive: [], missed: [] });
  const [consultantTranscripts, setConsultantTranscripts] = useState<{
    positive: CallTranscript[];
    missed: CallTranscript[];
  }>({ positive: [], missed: [] });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const weekInputRef = useRef<HTMLInputElement>(null);
  const callDropdownRef = useRef<HTMLDivElement>(null);
  
  const totalWeeks = 12; // You can adjust this based on your data
  
  // Get calls based on selected data type and consultant
  // This will be calculated after selectedConsultantData is defined

  // Extract consultant data from JSON
  useEffect(() => {
    const individualPerformance = tpCombinedData.individual_consultant_performance as Record<string, ConsultantData>;
    const consultantList = Object.entries(individualPerformance).map(([id, data]) => ({
      id,
      name: data.consultant_name.replace(/-/g, ' '),
      })).sort((a, b) => a.name.localeCompare(b.name));
    
    setConsultants(consultantList);
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
      if (callDropdownRef.current && !callDropdownRef.current.contains(event.target as Node)) {
        setIsCallDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Reset call selection when data type or week changes
  useEffect(() => {
    setSelectedCall("all");
  }, [selectedDataType, selectedWeek]);

  const selectedConsultantData = consultants.find(c => c.id === selectedConsultant);
  
  // Get calls based on selected data type, consultant, and week
  const getCallsForDataType = () => {
    // Filter calls by selected week first
    const dataSource = selectedDataType === "strengths" 
      ? consultantCallData.positive 
      : consultantCallData.missed;
    
    const callsInWeek = dataSource.filter(call => call.week_num === selectedWeek);
    return callsInWeek.map(call => call.call_id);
  };
  
  const availableCalls = getCallsForDataType();

  // Handle voting for sections
  const handleVote = (section: 'opportunity' | 'response' | 'effectiveness', vote: 'up' | 'down') => {
    setSectionVotes(prev => ({
      ...prev,
      [section]: prev[section] === vote ? null : vote // Toggle off if same vote, otherwise set new vote
    }));
  };

  // Reset votes when modal opens
  useEffect(() => {
    if (showDetailsModal) {
      setSectionVotes({
        opportunity: null,
        response: null,
        effectiveness: null
      });
    }
  }, [showDetailsModal]);
  

  return (
    <div className="w-full relative">
      {/* Main Container Card - matching dashboard.tsx style */}
      <div 
        className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Title Section - matching dashboard.tsx */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#282828] mb-2">
              Key Moments Analysis
            </h1>
            <p className="text-sm text-[#797A79]">
              Analyze key conversation moments and patterns for individual consultants
            </p>
          </div>
          
          {/* Dropdown Filter - matching dashboard.tsx style */}
          <div className="ml-6" ref={dropdownRef}>
            <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
              Filter by Consultant
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full md:w-80 px-4 py-3 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
              >
                <span className="text-base text-[#282828]">
                  {selectedConsultant === "all" 
                    ? "All Consultants" 
                    : selectedConsultantData?.name || "Select Consultant"}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-[#797A79] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {/* Dropdown Menu - matching dashboard.tsx style */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full md:w-80 mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedConsultant("all");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                        selectedConsultant === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                      }`}
                    >
                      <span className="text-base text-[#282828]">All Consultants</span>
                    </button>
                    {consultants.map((consultant) => (
                      <button
                        key={consultant.id}
                        onClick={() => {
                          setSelectedConsultant(consultant.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                          selectedConsultant === consultant.id ? "bg-[#F5F5F5] font-semibold" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base text-[#282828]">{consultant.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Area - matching dashboard.tsx style */}
        <div className="bg-[#F5F5F5] rounded-lg border border-[#F0F0F0] p-6">
          {selectedConsultant === "all" ? (
            <div className="text-center py-8">
              <p className="text-[#797A79] text-base">
                Select a consultant from the dropdown above to view their key conversation moments
              </p>
            </div>
          ) : selectedConsultantData ? (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#282828] mb-2">
                  {selectedConsultantData.name}
                </h3>
              </div>
              
              {/* Filters Section */}
              <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
                {/* Week Selection */}
                <div className="mb-6">
                  {/* Week Navigation */}
                  <div>
                    <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
                      Select Week
                    </label>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          const newWeek = Math.max(1, selectedWeek - 1);
                          setSelectedWeek(newWeek);
                          setWeekInputValue(newWeek.toString());
                        }}
                        disabled={selectedWeek === 1}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          selectedWeek === 1 
                            ? 'bg-[#F5F5F5] text-[#C0C0C0] cursor-not-allowed' 
                            : 'bg-white hover:bg-[#F5F5F5] text-[#797A79] hover:text-[#282828] border border-[#F0F0F0] hover:shadow-sm'
                        }`}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div 
                        className="mx-2 relative"
                        onClick={() => {
                          setIsEditingWeek(true);
                          setTimeout(() => weekInputRef.current?.select(), 0);
                        }}
                      >
                        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-text transition-all duration-200 ${
                          isEditingWeek 
                            ? 'bg-white border-2 border-[#8BAF20] shadow-sm' 
                            : 'bg-[#F5F5F5] border-2 border-transparent hover:bg-white hover:border-[#F0F0F0]'
                        }`}>
                          <span className="text-base font-semibold text-[#282828] select-none">
                            Week
                          </span>
                          <input
                            ref={weekInputRef}
                            type="text"
                            value={isEditingWeek ? weekInputValue : selectedWeek}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow empty string and numbers only
                              if (value === '' || /^\d+$/.test(value)) {
                                setWeekInputValue(value);
                              }
                            }}
                            onFocus={() => {
                              setIsEditingWeek(true);
                              setWeekInputValue(selectedWeek.toString());
                            }}
                            onBlur={() => {
                              setIsEditingWeek(false);
                              const value = parseInt(weekInputValue);
                              if (!isNaN(value) && value >= 1 && value <= totalWeeks) {
                                setSelectedWeek(value);
                                setWeekInputValue(value.toString());
                              } else {
                                setWeekInputValue(selectedWeek.toString());
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              } else if (e.key === 'Escape') {
                                setWeekInputValue(selectedWeek.toString());
                                e.currentTarget.blur();
                              }
                            }}
                            className={`w-8 text-center text-base font-semibold bg-transparent focus:outline-none ${
                              isEditingWeek ? 'text-[#8BAF20]' : 'text-[#282828]'
                            }`}
                            style={{ caretColor: '#8BAF20' }}
                          />
                        </div>
                        {isEditingWeek && (
                          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-[#797A79] whitespace-nowrap z-10">
                            Press Enter to confirm • Esc to cancel
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => {
                          const newWeek = Math.min(totalWeeks, selectedWeek + 1);
                          setSelectedWeek(newWeek);
                          setWeekInputValue(newWeek.toString());
                        }}
                        disabled={selectedWeek === totalWeeks}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          selectedWeek === totalWeeks 
                            ? 'bg-[#F5F5F5] text-[#C0C0C0] cursor-not-allowed' 
                            : 'bg-white hover:bg-[#F5F5F5] text-[#797A79] hover:text-[#282828] border border-[#F0F0F0] hover:shadow-sm'
                        }`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Data Type Toggle */}
                <div className="mb-6">
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
                
                {/* Call Number Dropdown */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2">
                    Select Call
                  </label>
                  <div className="relative" ref={callDropdownRef}>
                    <button
                      onClick={() => setIsCallDropdownOpen(!isCallDropdownOpen)}
                      className="w-full px-4 py-3 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#B5DAD4] focus:outline-none focus:border-[#B5DAD4] transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="text-base text-[#282828]">
                        {selectedCall === "all" 
                          ? "All Calls" 
                          : selectedCall}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-[#797A79] transition-transform duration-200 ${isCallDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    
                    {/* Call Dropdown Menu */}
                    {isCallDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-[#F0F0F0] rounded-lg shadow-lg overflow-hidden">
                        <div className="max-h-48 overflow-y-auto">
                          <button
                            onClick={() => {
                              setSelectedCall("all");
                              setIsCallDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 ${
                              selectedCall === "all" ? "bg-[#F5F5F5] font-semibold" : ""
                            }`}
                          >
                            <span className="text-base text-[#282828]">All Calls</span>
                          </button>
                          {availableCalls.map((call, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedCall(call);
                                setIsCallDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors duration-150 border-t border-[#F0F0F0] ${
                                selectedCall === call ? "bg-[#F5F5F5] font-semibold" : ""
                              }`}
                            >
                              <span className="text-base text-[#282828]">{call}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content for selected filters */}
                <div className="border-t border-[#F0F0F0] pt-6">
                  {selectedDataType === "strengths" ? (
                    <div>
                      <h4 className="text-lg font-semibold text-[#282828] mb-3">
                        Identified Strengths
                      </h4>
                      {/* Check if Alyssa is selected, week 7, and appropriate call */}
                      {(() => {
                        const filteredPositiveCalls = consultantCallData.positive
                          .filter(call => call.week_num === selectedWeek)
                          .filter(call => selectedCall === "all" || call.call_id === selectedCall);
                        
                        const getTranscriptForCall = (callId: string) => {
                          return consultantTranscripts.positive.find(t => t.call_id === callId);
                        };
                        
                        return filteredPositiveCalls.length > 0 ? (
                          <div className={selectedCall === "all" ? "grid gap-4" : "flex gap-4"}>
                            <div className={selectedCall === "all" ? "grid gap-4 w-full" : "flex flex-col gap-4 w-1/2"}>
                              {filteredPositiveCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full">
                                {/* Card Header with Call Info */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</p>
                                    <p className="text-sm font-semibold text-[#282828]">{callData.call_id}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Week</p>
                                    <p className="text-lg font-bold text-[#8BAF20]">{callData.week_num}</p>
                                  </div>
                                </div>
                            
                            
                            {/* Analysis Sections */}
                            <div className="space-y-3">
                              {/* Opportunity Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#8BAF20] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Opportunity</p>
                                  <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                      Score: {callData.analysis.opportunity.opportunity_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {callData.analysis.opportunity.text.length > 150 
                                    ? callData.analysis.opportunity.text.substring(0, 150) + "..." 
                                    : callData.analysis.opportunity.text}
                                </p>
                              </div>
                              
                              {/* Consultant Response Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#8BAF20] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Response</p>
                                  <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                    Score: {callData.analysis.consultant_response.response_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {callData.analysis.consultant_response.text.length > 150 
                                    ? callData.analysis.consultant_response.text.substring(0, 150) + "..." 
                                    : callData.analysis.consultant_response.text}
                                </p>
                              </div>
                              
                              {/* Why This Is Effective Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#8BAF20] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Why This Is Effective</p>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                      Enrollment: +{callData?.analysis.why_good?.enrolment_impact_percent || 0}%
                                    </span>
                                    <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                      Retention: +{callData?.analysis.why_good?.retention_impact_percent || 0}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {(callData?.analysis.why_good?.text?.length || 0) > 150 
                                    ? callData?.analysis.why_good?.text?.substring(0, 150) + "..." 
                                    : callData?.analysis.why_good?.text || ""}
                                </p>
                              </div>
                              
                              {/* View More Button */}
                              <button
                                onClick={() => {
                                  setSelectedCallDetails({
                                    type: 'strength',
                                    data: callData
                                  });
                                  setShowDetailsModal(true);
                                }}
                                className="w-full py-2 text-sm font-semibold text-[#8BAF20] hover:text-[#7A9B1B] transition-colors duration-200"
                              >
                                View more →
                              </button>
                                </div>
                              </div>
                              ))}
                            </div>
                            
                            {/* Transcript Panel - Only show when specific call is selected */}
                            {selectedCall !== "all" && (() => {
                              const transcript = getTranscriptForCall(selectedCall);
                              if (!transcript) return null;
                              return (
                                <div className="w-1/2">
                                  <div className="bg-white rounded-xl border border-[#F0F0F0] h-full max-h-[600px] flex flex-col">
                                    <div className="px-5 py-4 border-b border-[#F0F0F0] bg-white rounded-t-xl sticky top-0 z-10">
                                      <h4 className="text-lg font-semibold text-[#282828]">Call {transcript.call_id} Transcript</h4>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-5">
                                      <div className="space-y-3">
                                      {transcript.transcript.map((entry: TranscriptEntry, index: number) => (
                                        <div 
                                          key={index} 
                                          className={`p-3 rounded-lg ${
                                            entry.key_moment 
                                              ? 'bg-[#8BAF20]/10 border border-[#8BAF20]/20' 
                                              : entry.speaker === 'Agent' 
                                                ? 'bg-[#F5F5F5]' 
                                                : 'bg-white border border-[#F0F0F0]'
                                          }`}
                                        >
                                          <div className="flex items-start gap-2">
                                            <span className={`text-xs font-bold uppercase tracking-wide ${
                                              entry.speaker === 'Agent' ? 'text-[#8BAF20]' : 'text-[#797A79]'
                                            }`}>
                                              {entry.speaker}:
                                            </span>
                                            <p className="text-sm text-[#282828] flex-1 leading-relaxed">
                                              {entry.message}
                                            </p>
                                          </div>
                                          {entry.key_moment && (
                                            <span className="inline-block mt-2 px-2 py-1 bg-[#8BAF20] text-white text-xs font-semibold rounded-md">
                                              Key Moment
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="bg-[#F5F5F5] rounded-lg p-8 text-center">
                            <p className="text-sm text-[#797A79]">
                              No strength data available for the selected filters
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-semibold text-[#282828] mb-3">
                        Missed Opportunities
                      </h4>
                      {/* Check if data exists for selected filters */}
                      {(() => {
                        const filteredCalls = consultantCallData.missed
                          .filter(call => call.week_num === selectedWeek)
                          .filter(call => selectedCall === "all" || call.call_id === selectedCall);
                        
                        const getTranscriptForCall = (callId: string) => {
                          return consultantTranscripts.missed.find(t => t.call_id === callId);
                        };
                        
                        return filteredCalls.length > 0 ? (
                          <div className={selectedCall === "all" ? "grid gap-4" : "flex gap-4"}>
                            <div className={selectedCall === "all" ? "grid gap-4 w-full" : "flex flex-col gap-4 w-1/2"}>
                              {filteredCalls.map((callData) => (
                                <div key={callData.call_id} className="bg-white rounded-xl border border-[#F0F0F0] p-5 hover:border-[#B5DAD4] hover:bg-[#FAFAFA] transition-all duration-[250ms] cursor-pointer w-full">
                                {/* Card Header with Call Info */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Call ID</p>
                                    <p className="text-sm font-semibold text-[#282828]">{callData.call_id}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-1">Week</p>
                                <p className="text-lg font-bold text-[#FF8A00]">{callData.week_num}</p>
                              </div>
                            </div>
                            
                            
                            {/* Analysis Sections */}
                            <div className="space-y-3">
                              {/* Opportunity Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#FF8A00] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Opportunity</p>
                                  <span className="px-2 py-1 bg-[#FF8A00]/10 text-[#FF8A00] rounded-md text-sm font-bold">
                                    Score: {callData.analysis.opportunity.opportunity_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {callData.analysis.opportunity.text.length > 150 
                                    ? callData.analysis.opportunity.text.substring(0, 150) + "..." 
                                    : callData.analysis.opportunity.text}
                                </p>
                              </div>
                              
                              {/* Consultant Response Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#D84D51] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Response</p>
                                  <span className="px-2 py-1 bg-[#D84D51]/10 text-[#D84D51] rounded-md text-sm font-bold">
                                    Score: {callData.analysis.consultant_response.response_score}/5
                                  </span>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {callData.analysis.consultant_response.text.length > 150 
                                    ? callData.analysis.consultant_response.text.substring(0, 150) + "..." 
                                    : callData.analysis.consultant_response.text}
                                </p>
                              </div>
                              
                              {/* Recommended Approach Section */}
                              <div className="bg-white rounded-lg border border-[#F0F0F0] border-l-4 border-l-[#8BAF20] p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-[#797A79] uppercase tracking-wide">Recommended Approach</p>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                      Enrollment: +{callData.analysis.recommended_response?.enrolment_impact_percent || 0}%
                                    </span>
                                    <span className="px-2 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                                      Retention: +{callData.analysis.recommended_response?.retention_impact_percent || 0}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-[#282828] leading-relaxed">
                                  {(callData.analysis.recommended_response?.text?.length || 0) > 150 
                                    ? callData.analysis.recommended_response?.text?.substring(0, 150) + "..." 
                                    : callData.analysis.recommended_response?.text || ""}
                                </p>
                              </div>
                              
                              {/* View More Button */}
                              <button
                                onClick={() => {
                                  setSelectedCallDetails({
                                    type: 'missed',
                                    data: callData
                                  });
                                  setShowDetailsModal(true);
                                }}
                                className="w-full py-2 text-sm font-semibold text-[#FF8A00] hover:text-[#D84D51] transition-colors duration-200"
                              >
                                View more →
                              </button>
                            </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Transcript Panel - Only show when specific call is selected */}
                            {selectedCall !== "all" && (() => {
                              const transcript = getTranscriptForCall(selectedCall);
                              if (!transcript) return null;
                              return (
                                <div className="w-1/2">
                                  <div className="bg-white rounded-xl border border-[#F0F0F0] h-full max-h-[600px] flex flex-col">
                                    <div className="px-5 py-4 border-b border-[#F0F0F0] bg-white rounded-t-xl sticky top-0 z-10">
                                      <h4 className="text-lg font-semibold text-[#282828]">Call {transcript.call_id} Transcript</h4>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-5">
                                      <div className="space-y-3">
                                      {transcript.transcript.map((entry: TranscriptEntry, index: number) => (
                                        <div 
                                          key={index} 
                                          className={`p-3 rounded-lg ${
                                            entry.key_moment 
                                              ? 'bg-[#FF8A00]/10 border border-[#FF8A00]/20' 
                                              : entry.speaker === 'Agent' 
                                                ? 'bg-[#F5F5F5]' 
                                                : 'bg-white border border-[#F0F0F0]'
                                          }`}
                                        >
                                          <div className="flex items-start gap-2">
                                            <span className={`text-xs font-bold uppercase tracking-wide ${
                                              entry.speaker === 'Agent' ? 'text-[#FF8A00]' : 'text-[#797A79]'
                                            }`}>
                                              {entry.speaker}:
                                            </span>
                                            <p className="text-sm text-[#282828] flex-1 leading-relaxed">
                                              {entry.message}
                                            </p>
                                          </div>
                                          {entry.key_moment && (
                                            <span className="inline-block mt-2 px-2 py-1 bg-[#FF8A00] text-white text-xs font-semibold rounded-md">
                                              Key Moment
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="bg-[#F5F5F5] rounded-lg p-8 text-center">
                            <p className="text-sm text-[#797A79]">
                              No missed opportunity data available for the selected filters
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
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
      
      {/* Details Modal - matching dashboard.tsx style */}
      {showDetailsModal && selectedCallDetails && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setShowDetailsModal(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] max-w-5xl w-full mx-4 shadow-xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {/* Modal Header */}
              <div className="border-b border-[#F0F0F0] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#282828] mb-2">
                      Call Analysis Details
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#797A79]">
                        Call ID: <span className="font-semibold text-[#282828]">{selectedCallDetails.data.call_id}</span>
                      </span>
                      <span className="text-sm text-[#797A79]">
                        Week: <span className="font-semibold text-[#282828]">{selectedCallDetails.data.week_num}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    <X size={24} className="text-[#797A79]" />
                  </button>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Opportunity Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-[#282828]">Opportunity:</h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleVote('opportunity', 'up')}
                          className={`p-1 rounded transition-colors ${
                            sectionVotes.opportunity === 'up' 
                              ? 'bg-green-100 text-green-600' 
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={() => handleVote('opportunity', 'down')}
                          className={`p-1 rounded transition-colors ${
                            sectionVotes.opportunity === 'down' 
                              ? 'bg-red-100 text-red-600' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      selectedCallDetails.type === 'strength' 
                        ? "bg-[#8BAF20] text-white" 
                        : "bg-[#FF8A00] text-white"
                    }`}>
                      Score: {selectedCallDetails.data.analysis.opportunity.opportunity_score}/5
                    </span>
                  </div>
                  <p className="text-sm text-[#282828] leading-relaxed">
                    {selectedCallDetails.data.analysis.opportunity.text}
                  </p>
                </div>
                <hr />
                {/* Consultant Response Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-[#282828]">Consultant Response:</h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleVote('response', 'up')}
                          className={`p-1 rounded transition-colors ${
                            sectionVotes.response === 'up' 
                              ? 'bg-green-100 text-green-600' 
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={() => handleVote('response', 'down')}
                          className={`p-1 rounded transition-colors ${
                            sectionVotes.response === 'down' 
                              ? 'bg-red-100 text-red-600' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      selectedCallDetails.type === 'strength' 
                        ? "bg-[#8BAF20] text-white" 
                        : "bg-[#D84D51] text-white"
                    }`}>
                      Score: {selectedCallDetails.data.analysis.consultant_response.response_score}/5
                    </span>
                  </div>
                  <p className="text-sm text-[#282828] leading-relaxed">
                    {selectedCallDetails.data.analysis.consultant_response.text}
                  </p>
                </div>
                
                {/* Why This Is Effective / Recommended Approach Section */}
                {selectedCallDetails.type === 'strength' ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#282828]">Why This Is Effective:</h3>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleVote('effectiveness', 'up')}
                            className={`p-1 rounded transition-colors ${
                              sectionVotes.effectiveness === 'up' 
                                ? 'bg-green-100 text-green-600' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            <ThumbsUp size={16} />
                          </button>
                          <button
                            onClick={() => handleVote('effectiveness', 'down')}
                            className={`p-1 rounded transition-colors ${
                              sectionVotes.effectiveness === 'down' 
                                ? 'bg-red-100 text-red-600' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                          Enrollment: +{selectedCallDetails.data.analysis.why_good?.enrolment_impact_percent || 0}%
                        </span>
                        <span className="px-3 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                          Retention: +{selectedCallDetails.data.analysis.why_good?.retention_impact_percent || 0}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#282828] leading-relaxed">
                      {selectedCallDetails.data.analysis.why_good.text}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#282828]">Recommended Approach:</h3>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleVote('effectiveness', 'up')}
                            className={`p-1 rounded transition-colors ${
                              sectionVotes.effectiveness === 'up' 
                                ? 'bg-green-100 text-green-600' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            <ThumbsUp size={16} />
                          </button>
                          <button
                            onClick={() => handleVote('effectiveness', 'down')}
                            className={`p-1 rounded transition-colors ${
                              sectionVotes.effectiveness === 'down' 
                                ? 'bg-red-100 text-red-600' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                          Enrollment: +{selectedCallDetails.data.analysis.recommended_response?.enrolment_impact_percent || 0}%
                        </span>
                        <span className="px-3 py-1 bg-[#8BAF20]/10 text-[#8BAF20] rounded-md text-sm font-bold">
                          Retention: +{selectedCallDetails.data.analysis.recommended_response?.retention_impact_percent || 0}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#282828] leading-relaxed">
                      {selectedCallDetails.data.analysis.recommended_response.text}
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
};

export default KeyMoments;
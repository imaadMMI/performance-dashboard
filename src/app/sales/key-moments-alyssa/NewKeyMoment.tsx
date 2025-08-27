"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { X, LayoutGrid, LayoutList, Filter, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import './keyMomentsAnimations.css';

// Dynamically import all consultant JSON files
// Add new files here as needed - just follow the same pattern
const consultantDataFiles = [
  { name: 'alyssaJson43', data: require('../keyMomentsJson/ALYSSA ONLY/alyssaJson43.json') },
  { name: 'alyssaW41', data: require('../keyMomentsJson/ALYSSA ONLY/Alyssa-Pennacchia_ENRO_W41.json') },
  { name: 'mrudang', data: require('../keyMomentsJson/MRUDANG ONLY/mrudangJson.json') },
  // Add more files here as needed:
  // { name: 'consultantName', data: require('../keyMomentsJson/PATH/TO/FILE.json') },
];

interface KeyMoment {
  call_id: string;
  opportunity_id: number;
  impact_type: string;
  opportunity: string;
  consultant_response: string;
  opportunity_score: string;
  response_score: string;
  has_like_dislike_buttons: boolean;
  has_view_more_button: boolean;
  detailed_view?: {
    call_id: string;
    opportunity_detailed: string;
    consultant_response_detailed: string;
    recommended_response_detailed?: string;
    why_this_works_detailed?: string;
  };
  enrolment_impact_percentage: number;
  retention_impact_percentage: number;
  recommended_response?: string;
  why_this_works?: string;
  opportunity_score_value: number;
  response_score_value: number;
  is_positive: boolean;
  consultant_name?: string;
  week_number?: number;
  report_type?: string;
}

const NewKeyMoment = () => {
  const [selectedView, setSelectedView] = useState<'opportunities' | 'positive'>('opportunities');
  const [selectedMoment, setSelectedMoment] = useState<KeyMoment | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [showDetailedView, setShowDetailedView] = useState(false);
  
  // Feedback state for modal sections
  const [sectionFeedback, setSectionFeedback] = useState<{
    opportunity?: 'up' | 'down';
    response?: 'up' | 'down';
    recommendation?: 'up' | 'down';
  }>({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    behavior: 'all',
    week: 'all',
    consultant: 'all'
  });
  const [appliedFilters, setAppliedFilters] = useState({
    behavior: 'all',
    week: 'all',
    consultant: 'all'
  });
  
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Combine data from all consultants dynamically
  const allData = useMemo(() => {
    const allOpportunities: any[] = [];
    const allPositiveMoments: any[] = [];
    
    // Process each consultant data file
    consultantDataFiles.forEach(({ data }) => {
      // Check if the data has the expected structure
      if (data?.key_trigger_moments && data?.metadata) {
        // Process opportunities
        if (data.key_trigger_moments.opportunities) {
          const opportunities = data.key_trigger_moments.opportunities.map((m: any) => ({
            ...m,
            consultant_name: data.metadata.consultant_name,
            week_number: data.metadata.week_number,
            report_type: data.metadata.report_type
          }));
          allOpportunities.push(...opportunities);
        }
        
        // Process positive moments
        if (data.key_trigger_moments.positive_moments) {
          const positiveMoments = data.key_trigger_moments.positive_moments.map((m: any) => ({
            ...m,
            consultant_name: data.metadata.consultant_name,
            week_number: data.metadata.week_number,
            report_type: data.metadata.report_type
          }));
          allPositiveMoments.push(...positiveMoments);
        }
      }
    });
    
    return {
      opportunities: allOpportunities,
      positive_moments: allPositiveMoments
    };
  }, []);
  
  // Extract unique filter options from actual data
  const behaviors = useMemo(() => {
    const types = new Set<string>();
    types.add('all');
    allData.opportunities.forEach(m => types.add(m.report_type));
    allData.positive_moments.forEach(m => types.add(m.report_type));
    return Array.from(types).map(t => ({ 
      id: t, 
      name: t === 'all' ? 'All Behaviors' : t 
    }));
  }, [allData]);
  
  const weeks = useMemo(() => {
    const weekSet = new Set<number>();
    allData.opportunities.forEach(m => weekSet.add(m.week_number));
    allData.positive_moments.forEach(m => weekSet.add(m.week_number));
    const weekArray = Array.from(weekSet).sort((a, b) => a - b);
    return [
      { id: 'all', name: 'All Weeks' },
      ...weekArray.map(w => ({ id: w.toString(), name: `Week ${w}` }))
    ];
  }, [allData]);
  
  const consultants = useMemo(() => {
    const consultantSet = new Set<string>();
    allData.opportunities.forEach(m => consultantSet.add(m.consultant_name));
    allData.positive_moments.forEach(m => consultantSet.add(m.consultant_name));
    return [
      { id: 'all', name: 'All Consultants' },
      ...Array.from(consultantSet).map(c => ({ id: c, name: c }))
    ];
  }, [allData]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleViewMore = (moment: KeyMoment) => {
    setSelectedMoment(moment);
    setShowDetailedView(true);
  };

  const closeDetailedView = () => {
    setShowDetailedView(false);
    setSectionFeedback({});
    setTimeout(() => setSelectedMoment(null), 300);
  };
  
  const handleSectionFeedback = (section: 'opportunity' | 'response' | 'recommendation', feedback: 'up' | 'down') => {
    setSectionFeedback(prev => ({
      ...prev,
      [section]: prev[section] === feedback ? undefined : feedback
    }));
  };
  
  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleResetFilters = () => {
    const defaultFilters = {
      behavior: 'all',
      week: 'all',
      consultant: 'all'
    };
    setTempFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1); // Reset to first page when filters reset
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedFilters.behavior !== 'all') count++;
    if (appliedFilters.week !== 'all') count++;
    if (appliedFilters.consultant !== 'all') count++;
    return count;
  };
  
  // Filter the data based on applied filters
  const filteredData = useMemo(() => {
    let opportunities = [...allData.opportunities];
    let positive_moments = [...allData.positive_moments];
    
    // Apply consultant filter
    if (appliedFilters.consultant !== 'all') {
      opportunities = opportunities.filter(m => m.consultant_name === appliedFilters.consultant);
      positive_moments = positive_moments.filter(m => m.consultant_name === appliedFilters.consultant);
    }
    
    // Apply week filter
    if (appliedFilters.week !== 'all') {
      const weekNum = parseInt(appliedFilters.week);
      opportunities = opportunities.filter(m => m.week_number === weekNum);
      positive_moments = positive_moments.filter(m => m.week_number === weekNum);
    }
    
    // Apply behavior filter
    if (appliedFilters.behavior !== 'all') {
      opportunities = opportunities.filter(m => m.report_type === appliedFilters.behavior);
      positive_moments = positive_moments.filter(m => m.report_type === appliedFilters.behavior);
    }
    
    return {
      key_trigger_moments: {
        opportunities,
        positive_moments
      }
    };
  }, [allData, appliedFilters]);
  
  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const data = selectedView === 'opportunities' 
      ? filteredData.key_trigger_moments.opportunities
      : filteredData.key_trigger_moments.positive_moments;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return data.slice(startIndex, endIndex);
  }, [filteredData, selectedView, currentPage, itemsPerPage]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    const data = selectedView === 'opportunities' 
      ? filteredData.key_trigger_moments.opportunities
      : filteredData.key_trigger_moments.positive_moments;
    
    return Math.ceil(data.length / itemsPerPage);
  }, [filteredData, selectedView, itemsPerPage]);
  
  // Reset page when view changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedView]);

  return (
    <div className="w-full relative" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      
      {/* Key Trigger Moments Card */}
      <div className="bg-white rounded-xl border border-[#F0F0F0] p-8 shadow-sm">
        {/* Title Section with Navigation */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#282828] mb-2">
                Key Trigger Moments
              </h1>
              <p className="text-sm text-[#797A79]">
                Critical moments that impact enrollment and retention outcomes
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <div className="relative" ref={filterDropdownRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors border border-[#F0F0F0] flex items-center gap-2"
                >
                  <Filter size={18} className="text-[#797A79]" />
                  <span className="text-sm text-[#282828] font-medium">Filter</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-[#FF8A00] text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
                
                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-[#F0F0F0] rounded-lg shadow-xl z-50">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#282828]">Filters</h3>
                        <button
                          onClick={handleResetFilters}
                          className="text-xs text-[#797A79] hover:text-[#FF8A00] transition-colors"
                        >
                          Reset all
                        </button>
                      </div>
                    </div>
                    
                    {/* Filter Options */}
                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {/* Behavior Filter */}
                      <div>
                        <label className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2 block">
                          Behavior
                        </label>
                        <select
                          value={tempFilters.behavior}
                          onChange={(e) => setTempFilters({ ...tempFilters, behavior: e.target.value })}
                          className="w-full px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm text-[#282828] focus:border-[#FF8A00] focus:outline-none"
                        >
                          {behaviors.map((behavior) => (
                            <option key={behavior.id} value={behavior.id}>
                              {behavior.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Week Filter */}
                      <div>
                        <label className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2 block">
                          Week
                        </label>
                        <select
                          value={tempFilters.week}
                          onChange={(e) => setTempFilters({ ...tempFilters, week: e.target.value })}
                          className="w-full px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm text-[#282828] focus:border-[#FF8A00] focus:outline-none"
                        >
                          {weeks.map((week) => (
                            <option key={week.id} value={week.id}>
                              {week.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Consultant Filter */}
                      <div>
                        <label className="text-xs font-semibold text-[#797A79] uppercase tracking-wide mb-2 block">
                          Consultant
                        </label>
                        <select
                          value={tempFilters.consultant}
                          onChange={(e) => setTempFilters({ ...tempFilters, consultant: e.target.value })}
                          className="w-full px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm text-[#282828] focus:border-[#FF8A00] focus:outline-none"
                        >
                          {consultants.map((consultant) => (
                            <option key={consultant.id} value={consultant.id}>
                              {consultant.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Footer with Apply Button */}
                    <div className="px-4 py-3 border-t border-[#F0F0F0] flex gap-2">
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-[#797A79] bg-white border border-[#F0F0F0] rounded-lg hover:bg-[#F5F5F5] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApplyFilters}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-[#FF8A00] rounded-lg hover:bg-[#FF7A00] transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Grid/List Toggle */}
              <button
                onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors border border-[#F0F0F0]"
              >
                {viewType === 'grid' ? <LayoutList size={20} className="text-[#797A79]" /> : <LayoutGrid size={20} className="text-[#797A79]" />}
              </button>
            </div>
          </div>

          {/* Catalogue-Style Bookmark Tabs */}
          <div className="relative">
            {/* Tab Container with Filter Tags */}
            <div className="flex gap-2 relative justify-between items-center">
              {/* Active Filter Tags on the left */}
              <div className="flex items-center gap-2 flex-wrap">
                {appliedFilters.week !== 'all' && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FF8A00]/10 text-[#FF8A00] rounded-md text-xs font-medium">
                    <span>Week {appliedFilters.week}</span>
                    <button
                      onClick={() => {
                        setAppliedFilters({ ...appliedFilters, week: 'all' });
                        setTempFilters({ ...tempFilters, week: 'all' });
                      }}
                      className="ml-1 hover:text-[#FF8A00]/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {appliedFilters.behavior !== 'all' && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FF8A00]/10 text-[#FF8A00] rounded-md text-xs font-medium">
                    <span>{appliedFilters.behavior}</span>
                    <button
                      onClick={() => {
                        setAppliedFilters({ ...appliedFilters, behavior: 'all' });
                        setTempFilters({ ...tempFilters, behavior: 'all' });
                      }}
                      className="ml-1 hover:text-[#FF8A00]/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {appliedFilters.consultant !== 'all' && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FF8A00]/10 text-[#FF8A00] rounded-md text-xs font-medium">
                    <span>{appliedFilters.consultant}</span>
                    <button
                      onClick={() => {
                        setAppliedFilters({ ...appliedFilters, consultant: 'all' });
                        setTempFilters({ ...tempFilters, consultant: 'all' });
                      }}
                      className="ml-1 hover:text-[#FF8A00]/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Tabs on the right */}
              <div className="flex gap-2">
              {/* Opportunities Tab */}
              <button
                onClick={() => setSelectedView('opportunities')}
                className={`
                  relative px-6 py-3 rounded-t-lg transition-all duration-200
                  flex items-center justify-center gap-2
                  ${selectedView === 'opportunities'
                    ? 'bg-[#FF8A00] text-white font-bold z-10 -translate-y-1 transition-all duration-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
                // style={{
                //   boxShadow: selectedView === 'opportunities' 
                //     ? '0 -4px 10px rgba(255, 138, 0, 0.4), 0 -2px 6px rgba(0, 0, 0, 0.15)' 
                //     : 'none'
                // }}
              >
                <span className="text-sm font-medium">Opportunities</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full font-bold
                  ${selectedView === 'opportunities'
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-300 text-gray-700'
                  }
                `}>
                  {filteredData.key_trigger_moments.opportunities.length}
                </span>
              </button>

              {/* Positive Moments Tab */}
              <button
                onClick={() => setSelectedView('positive')}
                className={`
                  relative px-6 py-3 rounded-t-lg transition-all duration-200
                  flex items-center justify-center gap-2
                  ${selectedView === 'positive'
                    ? 'bg-[#8BAF20] text-white font-bold z-10 -translate-y-1 transition-all duration-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
                // style={{
                //   boxShadow: selectedView === 'positive' 
                //     ? '0 -2px 8px rgba(139, 175, 32, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)' 
                //     : 'none'
                // }}
              >
                <span className="text-sm font-medium">Positive Moments</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full font-bold
                  ${selectedView === 'positive'
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-300 text-gray-700'
                  }
                `}>
                  {filteredData.key_trigger_moments.positive_moments.length}
                </span>
              </button>
              </div>
            </div>
            
            {/* Border line that tabs overlap */}
            <div className={`absolute bottom-0 left-0 right-0 h-[5px] ${
              selectedView === 'opportunities' ? 'bg-[#FF8A00]' : 'bg-[#8BAF20]'
            }`}></div>
          </div>
        </div>

        {/* Content Area */}
        {selectedView === 'opportunities' && (
          <div className={viewType === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-7' : 'space-y-10 max-w-6xl mx-auto'}>
            {paginatedData.map((moment) => (
              <div
                key={`${moment.call_id}-${moment.opportunity_id}`}
                
                className="group bg-white rounded-xl border border-[#d4d4d4] border-l-4 border-l-[#ff8a00] p-5 transform hover:scale-103 hover:border-[#B5DAD4] hover:border-l-[#ff8a00] hover:shadow-sm transition-all duration-[250ms] cursor-pointer"
              >
                

                {/* Call Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#797A79] uppercase tracking-wide">Call ID:</p>
                      <p className="text-sm font-semibold text-[#282828]">{moment.call_id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#797A79] uppercase tracking-wide">Consultant:</p>
                      <p className="text-sm font-semibold text-[#282828]">{moment.consultant_name}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Opportunity */}
                  <div className="pb-4 border-b border-[#F0F0F0]">
                    <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2 font-semibold">Opportunity</p>
                    <p className="text-sm text-[#282828] leading-relaxed">{moment.opportunity}</p>
                  </div>
                  
                  {/* Consultant Response */}
                  <div>
                    <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2 font-semibold">Consultant Response</p>
                    <p className="text-sm text-[#282828] leading-relaxed">{moment.consultant_response}</p>
                  </div>
                  
                  {/* Recommended Response */}
                  {'recommended_response' in moment && moment.recommended_response && (
                    <div className="bg-[#FFF5F0] rounded-lg p-3 border border-[#FFE5D0]">
                      <p className="text-sm text-[#FF8A00] uppercase tracking-wide mb-2 font-semibold">Recommended Response</p>
                      <p className="text-sm text-[#282828] leading-relaxed">{moment.recommended_response}</p>
                    </div>
                  )}
                  
                  {/* View More Link */}
                  {moment.has_view_more_button && (
                    <div className="pt-3 text-right">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMore(moment);
                        }}
                        className="text-sm text-[#FF8A00] hover:text-[#FF7A00] cursor-pointer underline transition-colors font-bold"
                      >
                        View more
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'positive' && (
          <div className={viewType === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-7' : 'space-y-10 max-w-6xl mx-auto'}>
            {paginatedData.map((moment) => (
              <div
                key={`${moment.call_id}-${moment.opportunity_id}`}
                className="group bg-white rounded-xl border border-[#f0f0f0] border-l-4 border-l-[#85ba60] p-5 transform hover:scale-103 hover:border-[#B5DAD4] hover:border-l-[#85ba60] hover:shadow-sm transition-all duration-[250ms] cursor-pointer"
              >
                {/* Call Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#797A79] uppercase tracking-wide">Call ID:</p>
                      <p className="text-sm font-semibold text-[#282828]">{moment.call_id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#797A79] uppercase tracking-wide">Consultant:</p>
                      <p className="text-sm font-semibold text-[#282828]">{moment.consultant_name}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Opportunity */}
                  <div className="pb-4 border-b border-[#F0F0F0]">
                    <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2 font-semibold">Opportunity</p>
                    <p className="text-sm text-[#282828] leading-relaxed">{moment.opportunity}</p>
                  </div>
                  
                  {/* Consultant Response */}
                  <div>
                    <p className="text-sm text-[#797A79] uppercase tracking-wide mb-2 font-semibold">Consultant Response</p>
                    <p className="text-sm text-[#282828] leading-relaxed">{moment.consultant_response}</p>
                  </div>
                  
                  {/* Why This Works */}
                  {'why_this_works' in moment && moment.why_this_works && (
                    <div className="bg-[#F0F8F0] rounded-lg p-3 border border-[#D0E8D0]">
                      <p className="text-sm text-[#8BAF20] uppercase tracking-wide mb-2 font-semibold">Why This Was Good</p>
                      <p className="text-sm text-[#282828] leading-relaxed">{moment.why_this_works}</p>
                    </div>
                  )}
                  
                  {/* View More Link */}
                  {moment.has_view_more_button && (
                    <div className="pt-3 text-right">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMore(moment);
                        }}
                        className="text-sm text-[#8BAF20] hover:text-[#7A9F10] cursor-pointer underline transition-colors font-bold"
                      >
                        View more
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-[#F0F0F0]">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-[#E5E5E5] text-[#282828] hover:border-[#FF8A00] hover:text-[#FF8A00]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#FF8A00] text-white'
                        : 'bg-white border border-[#E5E5E5] text-[#282828] hover:border-[#FF8A00] hover:text-[#FF8A00]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-[#E5E5E5] text-[#282828] hover:border-[#FF8A00] hover:text-[#FF8A00]'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Page Info */}
            <div className="text-sm text-[#797A79] ml-4">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup */}
      {showDetailedView && selectedMoment && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeDetailedView}
          />

          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-8">
            <div 
              className="bg-white rounded-xl border border-[#F0F0F0] max-w-5xl w-full shadow-xl pointer-events-auto flex flex-col"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                maxHeight: 'calc(100vh - 4rem)',
              }}
            >
              {/* Modal Header - Fixed */}
              <div className="p-6 pb-4 border-b border-[#F0F0F0] flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-[#e5e7eb] px-3 py-1 rounded">
                      <span className="text-sm text-black font-medium uppercase tracking-wide">Call ID:</span>
                      <span className="text-md font-bold text-black">
                        {selectedMoment.call_id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#e5e7eb] px-3 py-1 rounded">
                      <span className="text-sm text-black font-medium uppercase tracking-wide">Consultant:</span>
                      <span className="text-md font-bold text-black">
                        {selectedMoment.consultant_name}
                      </span>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      selectedMoment.is_positive ? "bg-[#8BAF20] text-white" : "bg-[#D84D51] text-white"
                    }`}>
                      {selectedMoment.is_positive ? "Positive" : "Opportunity"}
                    </span>
                  </div>
                  <button
                    onClick={closeDetailedView}
                    className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    <X size={24} className="text-[#797A79]" />
                  </button>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 pb-10">
                <div className="space-y-6">
                  {/* Detailed Opportunity */}
                  {selectedMoment.detailed_view?.opportunity_detailed && (
                    <div className="pb-6 border-b border-[#F0F0F0]">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                            Opportunity
                          </p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSectionFeedback('opportunity', 'up')}
                              className={`p-1.5 rounded-lg transition-all ${
                                sectionFeedback.opportunity === 'up' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'hover:bg-gray-100 text-gray-400'
                              }`}
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={() => handleSectionFeedback('opportunity', 'down')}
                              className={`p-1.5 rounded-lg transition-all ${
                                sectionFeedback.opportunity === 'down' 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'hover:bg-gray-100 text-gray-400'
                              }`}
                            >
                              <ThumbsDown size={16} />
                            </button>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded ${
                          selectedMoment.opportunity_score === 'high' ? 'bg-red-100' : 
                          selectedMoment.opportunity_score === 'medium' ? 'bg-orange-100' : 'bg-yellow-100'
                        }`}>
                          <span className="text-xs text-gray-700 uppercase tracking-wide">Opportunity Score:</span>
                          <span className={`text-sm font-bold ${
                            selectedMoment.opportunity_score === 'high' ? 'text-red-700' : 
                            selectedMoment.opportunity_score === 'medium' ? 'text-orange-700' : 'text-yellow-700'
                          }`}>
                            {selectedMoment.opportunity_score?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#282828] leading-relaxed">
                        {selectedMoment.detailed_view.opportunity_detailed}
                      </p>
                    </div>
                  )}

                  {/* Detailed Response */}
                  {selectedMoment.detailed_view?.consultant_response_detailed && (
                    <div className="pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                            Consultant Response
                          </p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSectionFeedback('response', 'up')}
                              className={`p-1.5 rounded-lg transition-all ${
                                sectionFeedback.response === 'up' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'hover:bg-gray-100 text-gray-400'
                              }`}
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={() => handleSectionFeedback('response', 'down')}
                              className={`p-1.5 rounded-lg transition-all ${
                                sectionFeedback.response === 'down' 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'hover:bg-gray-100 text-gray-400'
                              }`}
                            >
                              <ThumbsDown size={16} />
                            </button>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded ${
                          selectedMoment.response_score === 'excellent' ? 'bg-green-100' :
                          selectedMoment.response_score === 'good' ? 'bg-green-50' :
                          selectedMoment.response_score === 'poor' ? 'bg-red-100' : 'bg-orange-100'
                        }`}>
                          <span className="text-xs text-gray-700 uppercase tracking-wide">Response Score:</span>
                          <span className={`text-sm font-bold ${
                            selectedMoment.response_score === 'excellent' ? 'text-green-700' :
                            selectedMoment.response_score === 'good' ? 'text-green-600' :
                            selectedMoment.response_score === 'poor' ? 'text-red-700' : 'text-orange-700'
                          }`}>
                            {selectedMoment.response_score?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#282828] leading-relaxed">
                        {selectedMoment.detailed_view.consultant_response_detailed}
                      </p>
                    </div>
                  )}

                  {/* Recommended Response or Why This Works */}
                  {selectedMoment.is_positive ? (
                    selectedMoment.detailed_view?.why_this_works_detailed && (
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0] border-l-4 border-l-[#8BAF20]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                              Why This Was Good
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSectionFeedback('recommendation', 'up')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  sectionFeedback.recommendation === 'up' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                              >
                                <ThumbsUp size={16} />
                              </button>
                              <button
                                onClick={() => handleSectionFeedback('recommendation', 'down')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  sectionFeedback.recommendation === 'down' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                              >
                                <ThumbsDown size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                              <span className="text-xs text-gray-700">Enrollment:</span>
                              <span className="text-sm font-bold text-green-700">
                                +{selectedMoment.enrolment_impact_percentage}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                              <span className="text-xs text-gray-700">Retention:</span>
                              <span className="text-sm font-bold text-green-700">
                                +{selectedMoment.retention_impact_percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#282828] leading-relaxed">
                          {selectedMoment.detailed_view.why_this_works_detailed}
                        </p>
                      </div>
                    )
                  ) : (
                    selectedMoment.detailed_view?.recommended_response_detailed && (
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F0F0F0] border-l-4 border-l-[#FF8A00]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-[#797A79] uppercase tracking-wide">
                              Recommended Response
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSectionFeedback('recommendation', 'up')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  sectionFeedback.recommendation === 'up' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                              >
                                <ThumbsUp size={16} />
                              </button>
                              <button
                                onClick={() => handleSectionFeedback('recommendation', 'down')}
                                className={`p-1.5 rounded-lg transition-all ${
                                  sectionFeedback.recommendation === 'down' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                              >
                                <ThumbsDown size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded">
                              <span className="text-xs text-gray-700">Enrollment:</span>
                              <span className="text-sm font-bold text-orange-700">
                                +{selectedMoment.enrolment_impact_percentage}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded">
                              <span className="text-xs text-gray-700">Retention:</span>
                              <span className="text-sm font-bold text-orange-700">
                                +{selectedMoment.retention_impact_percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#282828] leading-relaxed">
                          {selectedMoment.detailed_view.recommended_response_detailed}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewKeyMoment;
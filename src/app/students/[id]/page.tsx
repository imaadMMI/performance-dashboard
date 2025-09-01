"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, X, ChevronsDown, Search, Download } from "lucide-react";
import Image from "next/image";
import ArchetypeCharts from "@/components/ArchetypeCharts";
import { PieChart, Pie, Cell } from "recharts";
import { useArchetypeProfile } from "@/hooks/useArchetypes";
import { apiService, FeatureAnalysisResponse, FeatureAnalysisItem } from "@/services/api";

interface StudentProfileProps {
  params: Promise<{
    id: string;
  }>;
}

// Function to get archetype-specific image
const getArchetypeImage = (archetypeName: string): string => {
  // Map archetype names to their image files
  // Add your archetype images to the public folder with these names
  const archetypeImages: { [key: string]: string } = {
    'Strategic Achiever': '/strategicAchiever.jpg',
    'Timeline Focused Planners': '/timelinePlanned.jpg',
    'The Socializer': '/socializer.jpg',
    'The Killer': '/killer.jpg',
    'The Scholar': '/scholar.jpg',
    'The Leader': '/leader.jpg',
    'The Collaborator': '/collaborator.jpg',
    // Add more archetype mappings as needed
  };
  
  // Return the specific image or a default fallback
  return archetypeImages[archetypeName] || '/profile.jpg';
};

export default function StudentProfile({ params }: StudentProfileProps) {
  const resolvedParams = React.use(params);
  const archetypeName = resolvedParams.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const { profile, loading, error } = useArchetypeProfile(archetypeName);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [dynamicPaddingBottom, setDynamicPaddingBottom] = useState(68); // Default pb-17
  const [showStudentIdsModal, setShowStudentIdsModal] = useState(false);
  const [studentIdSearchQuery, setStudentIdSearchQuery] = useState("");
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [featureSearchQuery, setFeatureSearchQuery] = useState("");
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [featureAnalysis, setFeatureAnalysis] = useState<FeatureAnalysisResponse | null>(null);
  const [featureAnalysisLoading, setFeatureAnalysisLoading] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const signatureFeaturesRef = useRef<HTMLDivElement>(null);

  const formatPercentage = (value: number): string => {
    return value >= 0 ? `+${value}%` : `${value}%`;
  };

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName);
    setShowFeatureModal(true);
  };

  const getFeatureData = (featureName: string): FeatureAnalysisItem | undefined => {
    if (!featureAnalysis) {
      console.log('No feature analysis data available');
      return undefined;
    }
    
    // Normalize the search feature name (from profile)
    // Convert underscores to spaces and remove any parenthetical content
    const normalizedSearch = featureName
      .replace(/_/g, ' ')
      .replace(/\s*\([^)]*\)\s*/g, '') // Remove anything in parentheses
      .toLowerCase()
      .trim();
    
    // Try to find a match
    const match = featureAnalysis.features.find(f => {
      // Normalize the feature name from analysis API
      const normalizedFeature = f.feature_name
        .replace(/_/g, ' ')
        .replace(/\s*\([^)]*\)\s*/g, '') // Remove anything in parentheses  
        .toLowerCase()
        .trim();
      
      // Check for exact match or if one contains the other
      return normalizedFeature === normalizedSearch || 
             normalizedFeature.includes(normalizedSearch) || 
             normalizedSearch.includes(normalizedFeature);
    });
    
    if (!match) {
      console.log(`No match found for feature: "${featureName}" (normalized: "${normalizedSearch}")`);
      console.log('Available features:', featureAnalysis.features.slice(0, 10).map(f => f.feature_name));
    } else {
      console.log(`Found match for "${featureName}": "${match.feature_name}"`);
    }
    
    return match;
  };

  useEffect(() => {
    if (!profile?.quotes || profile.quotes.length === 0) return;

    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      
      setTimeout(() => {
        setCurrentQuoteIndex(prev => (prev + 1) % profile.quotes.length);
        setFadeClass('opacity-100');
      }, 700);
    }, 8000);

    return () => clearInterval(interval);
  }, [profile?.quotes]);

  // Prefetch feature analysis data when profile loads
  useEffect(() => {
    if (profile?.name && !featureAnalysis && !featureAnalysisLoading) {
      console.log('Fetching feature analysis for:', profile.name);
      setFeatureAnalysisLoading(true);
      apiService.getFeatureAnalysis(profile.name)
        .then(response => {
          console.log('Feature analysis response:', response);
          if (response.success && response.data) {
            setFeatureAnalysis(response.data);
            console.log('Feature analysis data loaded:', response.data);
          } else {
            console.error('Feature analysis response not successful:', response);
          }
        })
        .catch(error => {
          console.error('Failed to fetch feature analysis:', error);
        })
        .finally(() => {
          setFeatureAnalysisLoading(false);
        });
    }
  }, [profile?.name, featureAnalysis, featureAnalysisLoading]);

  useEffect(() => {
    if (showRecommendationsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRecommendationsModal]);

  // Handle scroll detection for signature features box
  useEffect(() => {
    const handleScroll = () => {
      if (signatureFeaturesRef.current && showScrollIndicator) {
        const scrollTop = signatureFeaturesRef.current.scrollTop;
        if (scrollTop > 10) {
          setShowScrollIndicator(false);
        }
      }
    };

    const element = signatureFeaturesRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [showScrollIndicator]);

  useEffect(() => {
    const calculateDynamicPadding = () => {
      if (leftBoxRef.current && signatureFeaturesRef.current && !isDescriptionExpanded) {
        const leftBoxHeight = leftBoxRef.current.offsetHeight;
        const signatureFeaturesHeight = signatureFeaturesRef.current.scrollHeight;
        
        const heightDifference = leftBoxHeight - signatureFeaturesHeight;
        if (heightDifference > 0) {
          setDynamicPaddingBottom(heightDifference + 32); // Add some base padding
        } else {
          setDynamicPaddingBottom(32); // Minimum padding
        }
      }
    };

    // Calculate on mount and when content changes
    const timer = setTimeout(calculateDynamicPadding, 100);
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateDynamicPadding);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateDynamicPadding);
    };
  }, [profile, isDescriptionExpanded]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col min-h-screen pt-16 px-32 pb-4 gap-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading archetype profile...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="flex flex-col min-h-screen pt-16 px-32 pb-4 gap-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading archetype profile: {error}</div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex flex-col min-h-screen pt-26 px-32 pb-4 gap-6">
        {/* Back Button */}
        <div>
          <Link href="/students">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
              <ArrowLeft size={20} /> Back to Students
            </button>
          </Link>
        </div>

        {/* Headline */}
        <div className="w-full">
          <h1 className="font-montserrat text-3xl font-semibold text-gray-900 flex items-center gap-8">
            {profile.name}:
            <span className="flex items-center gap-2">
              <span className="font-semibold text-3xl">
                {profile.retention_rate_difference !== undefined 
                  ? `${profile.retention_rate_difference >= 0 ? '+' : ''}${profile.retention_rate_difference.toFixed(1)}%`
                  : '0.0%'}
              </span>
              {profile.retention_rate_difference !== undefined && profile.retention_rate_difference >= 0 ? (
                <TrendingUp className="text-green-600" size={24} />
              ) : (
                <TrendingDown className="text-red-600" size={24} />
              )}
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-row flex-1 gap-20 items-start">
          {/* Left Box */}
          <div ref={leftBoxRef} className="w-4/10 flex flex-col gap-6 flex-shrink-0">
            {/* User Info */}
            <div className="flex flex-row items-center p-6 gap-8">
              <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={getArchetypeImage(profile?.name || archetypeName)}
                  alt={`${profile?.name || 'Student'} Avatar`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
              <div className="flex flex-col justify-between h-[150px]">
                <button 
                  onClick={() => setShowStudentIdsModal(true)}
                  className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  {profile.percentage_of_all_students?.toFixed(1) || '0.0'}% of all students
                  {profile.student_ids && ` (${profile.student_ids.length} students)`}
                </button>
                <button
                  onClick={() => setShowFeaturesModal(true)}
                  className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  {profile.features.length} signature features
                </button>
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-full font-semibold hover:bg-gray-50 transition-colors">{profile.quotes.length} example quotes</p>
              </div>
            </div>

            {/* Progression Cards */}
            <div className="grid grid-cols-2 pb-7">
              {/* First Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4 font-quicksand">
                <p className="font-montserrat font-semibold text-base mb-3 ml-6">Retention Rate</p>
                <div className="flex items-center gap-10 ml-6">
                  <div>
                    <p className="text-2xl font-bold">{profile.retention_rate?.toFixed(1) || '0.0'}%</p>
                    <p className="text-black-500 font-semibold text-sm">No withdrawal</p>
                  </div>
                  <div className="relative">
                    <PieChart width={60} height={60}>
                      <Pie
                        data={[
                          { name: "Retention", value: profile.retention_rate || 0 },
                          { name: "Remaining", value: 100 - (profile.retention_rate || 0) },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={21}
                        outerRadius={28}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        <Cell fill="#ff8a00" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-xs">{profile.retention_rate?.toFixed(0) || '0'}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4 font-quicksand">
                <p className="font-montserrat font-semibold text-base mb-3 ml-6">Enrollment Rate</p>
                <div className="flex items-center gap-10 ml-6">
                  <div>
                    <p className="text-2xl font-bold">{profile.enrollment_rate?.toFixed(1) || '0.0'}%</p>
                    <p className="text-black-500 font-semibold text-sm">No dropoff</p>
                  </div>
                  <div className="relative">
                    <PieChart width={60} height={60}>
                      <Pie
                        data={[
                          { name: "Enrollment", value: profile.enrollment_rate || 0 },
                          { name: "Remaining", value: 100 - (profile.enrollment_rate || 0) },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={21}
                        outerRadius={28}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        <Cell fill="#ff8a00" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-xs">{profile.enrollment_rate?.toFixed(0) || '0'}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next-best Interaction Behaviours */}
            <div className="p-4 bg-white border border-gray-200 rounded-[2px] flex-1 flex flex-col font-quicksand">
              <h3 className="font-montserrat text-xl font-semibold mb-4">Next-best interaction behaviours</h3>
              <div className="space-y-2">
                {profile.recommendations && profile.recommendations.length > 0 ? (
                  profile.recommendations.slice(0, 3).map((recommendation) => (
                    <div key={recommendation.headline} className="flex items-center gap-4">
                      <p className="text-gray-700 text-sm font-semibold flex-1 bg-gray-50 rounded-[2px] py-3 px-4">
                        {recommendation.headline}
                      </p>
                      <span className="w-[140px] bg-[#abd5ce] text-gray-700 py-3 px-4 rounded-[2px] text-sm whitespace-nowrap font-semibold flex items-center justify-center">
                          Enrollment: {formatPercentage(recommendation.impact_score)}
                      </span>

                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm p-4">No recommendations available</div>
                )}
              </div>
              <div className="mt-auto pt-4">
                <button 
                  onClick={() => setShowRecommendationsModal(true)}
                  className="text-gray-500 text-sm hover:text-[#ff8a00] transition-colors float-right underline"
                >
                  View more
                </button>
              </div>
            </div>
          </div>

          {/* Signature Features */}
          <div className="relative w-6/10 flex-shrink-0">
            <div 
              ref={signatureFeaturesRef}
              className="p-8 bg-white border border-gray-200 rounded-[2px] flex flex-col font-quicksand h-[670px] overflow-y-auto scrollbar-hide"
              style={{ paddingBottom: `${dynamicPaddingBottom}px` }}
            >
            <h2 className="font-montserrat text-2xl font-semibold text-gray-900 mb-6">Signature features:</h2>
            <div className="text-gray-700 text-lg leading-relaxed mb-8 font-semibold">
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isDescriptionExpanded ? 'max-h-96' : 'max-h-20'}`}>
                <p>{profile.description}</p>
              </div>
              {profile.description && profile.description.length > 200 && (
                <button
                  onClick={() => {
                    setIsDescriptionExpanded(!isDescriptionExpanded);
                    if (!isDescriptionExpanded) {
                      setShowScrollIndicator(true);
                    } else {
                      setShowScrollIndicator(false);
                    }
                  }}
                  className="text-gray-500 text-sm hover:text-[#ff8a00] transition-colors mt-2 underline"
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {profile.features.slice(0, 6).map((feature) => (
                <button 
                  key={feature.name}
                  onClick={() => handleFeatureClick(feature.name)}
                  className={`px-3 py-1.5 text-xs text-gray-700 border-2 rounded-[2px] font-semibold cursor-pointer transition-all ${
                    feature.importance > 95 ? 'border-[#B6DBD5] hover:bg-[#abd5ce]/20' : feature.importance < 70 ? "border-[#b9b9b9] hover:bg-[#abd5ce]/20" : 'border-[#ff8a00] hover:bg-[#abd5ce]/20'
                  }`}
                >
                  {feature.name.replace(/_/g, ' ')}
                  {/* {feature.name.replace("(Count)", "")}                  */}
                  {/* ({feature.importance}%) */}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Quote Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="font-montserrat font-semibold text-lg mb-6 ">Example Quote:</h3>
              
              {/* Quote with gradient border */}
              <div className={`relative pl-4 mb-6 ml-6 transition-opacity duration-300 ${fadeClass}`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{background: 'linear-gradient(to bottom, #efefef, #ff8a00, #ff8a00)'}}></div>
                <p className="font-raleway text-gray-600 text-base leading-relaxed font-semibold">
                  "{profile.quotes[currentQuoteIndex]?.content.slice(0, 200)}..."
                </p>
              </div>

              <p className={`text-gray-600 text-base mb-8 font-semibold flex-1 transition-opacity duration-300 ${fadeClass}`}>
                {profile.quotes[currentQuoteIndex]?.justification}
              </p>
            </div>
            </div>
            
            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-4 right-4 animate-bounce bg-white rounded-full p-2 shadow-lg">
                <ChevronsDown className="w-6 h-6 text-[#FF8a00]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Modal */}
      {showRecommendationsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowRecommendationsModal(false)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-300 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header - Sticky */}
            <div className="border-b border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="font-montserrat text-2xl font-semibold text-gray-900">
                  Next-best interaction behaviours
                </h2>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowRecommendationsModal(false);
                  }}
                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mt-2 font-quicksand">
                Detailed recommendations for {profile?.name}
              </p>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {profile?.recommendations && profile.recommendations.length > 0 ? (
                <div className="space-y-6">
                  {profile.recommendations.map((recommendation, index) => (
                    <div key={index} className="border border-gray-200 p-6">
                      {/* Headline */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-montserrat font-semibold text-lg text-gray-900 flex-1">
                          {recommendation.headline}
                        </h3>
                        <span className="bg-[#abd5ce] text-gray-700 px-4 py-2 text-sm font-semibold ml-4 whitespace-nowrap">
                          Enrollment: {formatPercentage(recommendation.impact_score)}
                        </span>
                      </div>

                      {/* Full Content */}
                      <p className="text-gray-700 leading-relaxed font-quicksand mb-4">
                        {recommendation.content}
                      </p>

                      {/* Quotes Section */}
                      {recommendation.quotes && recommendation.quotes.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="font-montserrat font-semibold text-sm text-gray-700 mb-3">Example Quotes:</h4>
                          <div className="space-y-2">
                            {recommendation.quotes.map((quote, quoteIndex) => (
                              <div key={quoteIndex} className="relative pl-4">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF8a00] via-[#FF8a00]/50 to-gray-200 rounded-full"></div>
                                <p className="text-gray-600 text-sm italic font-quicksand">
                                  "{quote}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No recommendations available
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Student IDs Modal */}
      {showStudentIdsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowStudentIdsModal(false)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-300 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header - Sticky */}
            <div className="border-b border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-gray-900">
                    Student IDs for {profile?.name}
                  </h2>
                  <p className="text-gray-600 mt-2 font-quicksand">
                    Total: {profile?.student_ids?.length || 0} students ({profile?.percentage_of_all_students?.toFixed(1) || '0.0'}% of all students)
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowStudentIdsModal(false);
                    setStudentIdSearchQuery("");
                  }}
                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Search Bar and Download Button */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search student IDs..."
                    value={studentIdSearchQuery}
                    onChange={(e) => setStudentIdSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF8a00] transition-colors"
                  />
                </div>
                <button
                  onClick={() => {

                    // Create CSV content
                    const headers = "Count,Student ID"; 

                    const rows = (profile?.student_ids || [])
                      .map((id, index) => `${index + 1},${id}`) // index starts at 0, so +1
                      .join("\n");

                    // Include title, headers, and rows
                    const csvContent =
                      `Student IDs of ${profile.name} students\n` + // title line
                      `${headers}\n` + // header row
                      rows;
                    
                    // Create blob and download
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement("a");
                    const url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", `${profile?.name?.replace(/\s+/g, '_')}_student_ids.csv`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2.5 bg-[#FF8a00] text-white rounded-lg hover:bg-[#E67900] transition-colors flex items-center gap-2 font-semibold"
                >
                  <Download size={20} />
                  Download CSV
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {(() => {
                const filteredStudentIds = profile?.student_ids?.filter(id => 
                  id.toLowerCase().includes(studentIdSearchQuery.toLowerCase())
                ) || [];
                
                if (profile?.student_ids && profile.student_ids.length > 0) {
                  if (filteredStudentIds.length > 0) {
                    return (
                      <>
                        {studentIdSearchQuery && (
                          <p className="text-sm text-gray-600 mb-4">
                            Showing {filteredStudentIds.length} of {profile.student_ids.length} student IDs
                          </p>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {filteredStudentIds.map((studentId, index) => (
                            <div 
                              key={index} 
                              className="bg-gray-50 px-3 py-2 rounded text-sm font-mono text-gray-700 hover:bg-gray-100 transition-colors"
                              title={`Student ID: ${studentId}`}
                            >
                              {studentId}
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <div className="text-center text-gray-500 py-8">
                        No student IDs match "{studentIdSearchQuery}"
                      </div>
                    );
                  }
                } else {
                  return (
                    <div className="text-center text-gray-500 py-8">
                      No student IDs available
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Features List Modal */}
      {showFeaturesModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowFeaturesModal(false)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-300 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header - Sticky */}
            <div className="border-b border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-gray-900">
                    Signature Features for {profile?.name}
                  </h2>
                  <p className="text-gray-600 mt-2 font-quicksand">
                    Total: {profile?.features?.length || 0} signature features
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFeaturesModal(false);
                    setFeatureSearchQuery("");
                  }}
                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Search Bar and Download Button */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search features..."
                    value={featureSearchQuery}
                    onChange={(e) => setFeatureSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF8a00] transition-colors"
                  />
                </div>
                <button
                  onClick={() => {
                    // Create CSV content for features
                    const headers = "Count,Feature Name,Importance Score";
                    
                    const rows = (profile?.features || [])
                      .map((feature, index) => `${index + 1},"${feature.name.replace(/_/g, ' ')}",${feature.importance}%`)
                      .join("\n");
                    
                    // Include title, headers, and rows
                    const csvContent =
                      `Signature Features for ${profile?.name}\n` +
                      `${headers}\n` +
                      rows;
                    
                    // Create blob and download
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement("a");
                    const url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", `${profile?.name?.replace(/\s+/g, '_')}_features.csv`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2.5 bg-[#FF8a00] text-white rounded-lg hover:bg-[#E67900] transition-colors flex items-center gap-2 font-semibold"
                >
                  <Download size={20} />
                  Download CSV
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {(() => {
                const filteredFeatures = profile?.features?.filter(feature => 
                  feature.name.toLowerCase().replace(/_/g, ' ').includes(featureSearchQuery.toLowerCase())
                ) || [];
                
                if (profile?.features && profile.features.length > 0) {
                  if (filteredFeatures.length > 0) {
                    return (
                      <>
                        {featureSearchQuery && (
                          <p className="text-sm text-gray-600 mb-4">
                            Showing {filteredFeatures.length} of {profile.features.length} features
                          </p>
                        )}
                        <div className="space-y-3">
                          {filteredFeatures.map((feature, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">
                                  {feature.name.replace(/_/g, ' ')}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 text-sm font-semibold rounded ${
                                  feature.importance > 95 
                                    ? 'bg-[#B6DBD5] text-gray-700' 
                                    : 'bg-[#FFE5D0] text-[#FF8a00]'
                                }`}>
                                  Importance: {feature.importance}%
                                </span>
                                <button
                                  onClick={() => {
                                    setSelectedFeature(feature.name);
                                    setShowFeatureModal(true);
                                    setShowFeaturesModal(false);
                                  }}
                                  className="text-sm text-[#FF8a00] hover:text-[#E67900] underline"
                                >
                                  View Analysis
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <div className="text-center text-gray-500 py-8">
                        No features match "{featureSearchQuery}"
                      </div>
                    );
                  }
                } else {
                  return (
                    <div className="text-center text-gray-500 py-8">
                      No features available
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Feature Analysis Modal */}
      {showFeatureModal && selectedFeature && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowFeatureModal(false)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-300 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header - Sticky */}
            <div className="border-b border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-gray-900">
                    Feature Analysis: {selectedFeature.replace(/_/g, ' ')}
                  </h2>
                  {(() => {
                    const featureData = getFeatureData(selectedFeature);
                    return featureData && (
                      <p className="text-gray-600 mt-2 font-quicksand">
                        Importance Score: {featureData.importance}%
                      </p>
                    );
                  })()}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFeatureModal(false);
                  }}
                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {featureAnalysisLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-4 text-gray-600">Loading feature analysis...</p>
                </div>
              ) : (() => {
                const featureData = getFeatureData(selectedFeature);
                if (!featureData) {
                  return (
                    <div className="text-center text-gray-500 py-8">
                      No analysis data available for this feature
                    </div>
                  );
                }
                
                return (
                  <div className="space-y-6">
                    {/* Explanation */}
                    <div className="bg-gray-50 p-6 rounded">
                      <h3 className="font-montserrat font-semibold text-lg mb-3">Explanation</h3>
                      <p className="text-gray-700 leading-relaxed font-quicksand">
                        {featureData.explanation}
                      </p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 p-4 rounded">
                        <h4 className="font-semibold text-sm text-gray-600 mb-2">Students with Feature</h4>
                        <p className="text-2xl font-bold text-gray-900">{featureData.students_with_feature}</p>
                        <p className="text-sm text-gray-500">{featureData.percentage_with_feature.toFixed(1)}% of archetype</p>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-4 rounded">
                        <h4 className="font-semibold text-sm text-gray-600 mb-2">Students without Feature</h4>
                        <p className="text-2xl font-bold text-gray-900">{featureData.students_without_feature}</p>
                        <p className="text-sm text-gray-500">{featureData.percentage_without_feature.toFixed(1)}% of archetype</p>
                      </div>
                    </div>

                    {/* Retention Rates */}
                    <div className="bg-white border border-gray-200 p-6 rounded">
                      <h3 className="font-montserrat font-semibold text-lg mb-4">Retention Impact</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">With Feature:</span>
                          <span className="font-semibold text-lg">{featureData.retention_rate_with_feature.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Without Feature:</span>
                          <span className="font-semibold text-lg">{featureData.retention_rate_without_feature.toFixed(1)}%</span>
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Retention Difference:</span>
                            <span className={`font-bold text-lg ${
                              featureData.retention_difference >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {featureData.retention_difference >= 0 ? '+' : ''}{featureData.retention_difference.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Representation */}
                    <div className="bg-gray-50 p-6 rounded">
                      <h3 className="font-montserrat font-semibold text-lg mb-4">Distribution</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                            <div 
                              className="bg-[#FF8a00] h-full rounded-full transition-all duration-500"
                              style={{ width: `${featureData.percentage_with_feature}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-600">Has feature ({featureData.percentage_with_feature.toFixed(1)}%)</span>
                            <span className="text-gray-600">No feature ({featureData.percentage_without_feature.toFixed(1)}%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}


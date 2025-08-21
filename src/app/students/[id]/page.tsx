"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowLeft, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import ArchetypeCharts from "@/components/ArchetypeCharts";
import { PieChart, Pie, Cell } from "recharts";
import { useArchetypeProfile } from "@/hooks/useArchetypes";

interface StudentProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StudentProfile({ params }: StudentProfileProps) {
  const resolvedParams = React.use(params);
  const archetypeName = resolvedParams.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const { profile, loading, error } = useArchetypeProfile(archetypeName);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [dynamicPaddingBottom, setDynamicPaddingBottom] = useState(68); // Default pb-17
  
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const signatureFeaturesRef = useRef<HTMLDivElement>(null);

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
              <span className="font-semibold text-3xl">{profile.percentage_of_all_students?.toFixed(1) || '0.0'}%</span>
              <TrendingUp className="text-green-600" size={24} />
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-row flex-1 gap-20 items-start">
          {/* Left Box */}
          <div ref={leftBoxRef} className="w-1/3 flex flex-col gap-6 flex-shrink-0">
            {/* User Info */}
            <div className="flex flex-row items-center p-6 gap-8">
              <Image
                src="/profile.jpg"
                alt="Student Avatar"
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col justify-between h-[150px]">
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">{profile.percentage_of_all_students?.toFixed(1) || '0.0'}% of all students</p>
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">{profile.features.length} signature features</p>
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">{profile.quotes.length} example quotes</p>
              </div>
            </div>

            {/* Progression Cards */}
            <div className="grid grid-cols-2 pb-7">
              {/* First Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4 font-quicksand">
                <p className="font-montserrat font-semibold text-base mb-3 ml-6">Retention Rate</p>
                <div className="flex items-center gap-10 ml-6">
                  <div>
                    <p className="text-2xl font-bold">70.0%</p>
                    <p className="text-black-500 font-semibold text-sm">No withdrawal</p>
                  </div>
                  <div className="relative">
                    <PieChart width={60} height={60}>
                      <Pie
                        data={[
                          { name: "Retention", value: 90 },
                          { name: "Remaining", value: 10 },
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
                        <Cell fill="#C58E02" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-xs">+90%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4 font-quicksand">
                <p className="font-montserrat font-semibold text-base mb-3 ml-6">Enrollment Rate</p>
                <div className="flex items-center gap-10 ml-6">
                  <div>
                    <p className="text-2xl font-bold">70.0%</p>
                    <p className="text-black-500 font-semibold text-sm">No withdrawal</p>
                  </div>
                  <div className="relative">
                    <PieChart width={60} height={60}>
                      <Pie
                        data={[
                          { name: "Retention", value: 90 },
                          { name: "Remaining", value: 10 },
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
                        <Cell fill="#C58E02" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-xs">+90%</span>
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
                      <span className="bg-[#abd5ce] text-gray-700 py-3 px-4 rounded-[2px] text-sm whitespace-nowrap font-semibold flex items-center">
                        Enrollment: +{recommendation.impact_score}%
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
                  className="text-gray-500 text-sm hover:text-[#C58E02] transition-colors float-right underline"
                >
                  View more
                </button>
              </div>
            </div>
          </div>

          {/* Signature Features */}
          <div 
            ref={signatureFeaturesRef}
            className="w-2/3 flex-shrink-0 p-8 bg-white border border-gray-200 rounded-[2px] flex flex-col font-quicksand min-h-full"
            style={{ paddingBottom: `${dynamicPaddingBottom}px` }}
          >
            <h2 className="font-montserrat text-2xl font-semibold text-gray-900 mb-6">Signature features:</h2>
            <div className="text-gray-700 text-lg leading-relaxed mb-8 font-semibold">
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isDescriptionExpanded ? 'max-h-96' : 'max-h-20'}`}>
                <p>{profile.description}</p>
              </div>
              {profile.description && profile.description.length > 200 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-gray-500 text-sm hover:text-[#C58E02] transition-colors mt-2 underline"
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {profile.features.slice(0, 6).map((feature, index) => (
                <span 
                  key={feature.name} 
                  className={`px-4 py-2 text-sm text-gray-700 border-2 rounded-[2px] font-semibold ${
                    feature.importance > 80 ? 'border-[#abd5ce]' : 'border-(--brand-light)'
                  }`}
                >
                  {feature.name.replace(/_/g, ' ')} ({feature.importance}%)
                </span>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Quote Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="font-montserrat font-semibold text-lg mb-6 ">Example Quote:</h3>
              
              {/* Quote with gradient border */}
              <div className={`relative pl-4 mb-6 ml-6 transition-opacity duration-300 ${fadeClass}`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{background: 'linear-gradient(to bottom, #efefef, #dbcca7, #d0ad5b, #caa03c, #c49525, #ba8e29)'}}></div>
                <p className="font-raleway text-gray-600 text-base leading-relaxed font-semibold">
                  "{profile.quotes[currentQuoteIndex]?.content.slice(0, 200)}..."
                </p>
              </div>

              <p className={`text-gray-600 text-base mb-8 font-semibold flex-1 transition-opacity duration-300 ${fadeClass}`}>
                {profile.quotes[currentQuoteIndex]?.justification}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Modal */}
      {showRecommendationsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300"
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
                          Enrollment: +{recommendation.impact_score}%
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
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-300 to-gray-200 rounded-full"></div>
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
    </Layout>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ArrowUp, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { StudentCard } from '@/components/molecules';
import { useArchetypes } from '@/hooks/useArchetypes';
import { apiService } from '@/services/api';
import './students.css';

export default function StudentsContent() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [totalStudents, setTotalStudents] = useState(79);

  const { archetypeCards, loading, error } = useArchetypes();

  useEffect(() => {
    if (archetypeCards.length > 0) {
      // Use total_students from the first archetype card
      setTotalStudents(archetypeCards[0].total_students);
    }
  }, [archetypeCards]);

  const handleCardHover = (cardIndex: number) => {
    setHasInteracted(true);
    setHoveredCard(cardIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <LeftSidebar />
        <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-14 lg:pt-24 pb-4 overflow-hidden">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading student data...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <LeftSidebar />
        <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-14 lg:pt-24 pb-4 overflow-hidden">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading data: {error}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-14 lg:pt-24 pb-4 overflow-hidden">
        {/* Header Row - Stack on mobile, grid on desktop */}
        <div className="flex flex-col space-y-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0 mb-14 items-start">
          {/* Left: Stats */}
          <div className="w-full">
            <h2 className="font-montserrat font-semibold text-2xl lg:text-3xl flex flex-wrap items-center gap-6 lg:gap-24 mb-2">
              <span>MOL TP1 2025:</span>
              <span className="flex items-center gap-2 text-black">
                <span className="text-3xl lg:text-4xl font-semibold">{totalStudents}</span>
                <ArrowUp color="green" size={28} />
              </span>
            </h2>
            <p className="font-montserrat text-gray-500 text-base font-normal">Student intelligence</p>
          </div>

          {/* Center: Change Period */}
          <div className="w-full flex justify-start lg:justify-center">
            <div>
              <button className="font-montserrat inline-flex items-center gap-2 text-gray-600 font-medium text-base relative group">
                <span className="relative">
                  Change teaching period
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gray-300 transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#ff8a00] group-hover:via-[#ff8a00]/50 group-hover:to-white"></span>
                </span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Right: Toggle Stats */}
          <div className="w-full flex justify-start lg:justify-end">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-[#ff8a00] transition-colors font-medium text-base"
            >
              {showSidebar ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
              <span className="font-montserrat">{showSidebar ? '' : 'See retention stats'} </span>
            </button>
          </div>
        </div>

        {/* Filter Tags - Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-14">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 bg-(--brand-light)" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
            </svg>
            <span className="font-montserrat font-semibold text-gray-800 text-lg">Successful students</span>
          </div>
          
          <div className="flex items-center gap-3 opacity-50">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <span className="font-montserrat font-bold text-gray-500 text-lg">High-risk students</span>
          </div>
        </div>

        {/* Student Cards - Horizontal scroll */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {archetypeCards.map((archetype, index) => (
            <StudentCard
              key={archetype.name}
              tier={archetype.retention_rate > 75 ? 1 : archetype.retention_rate > 50 ? 2 : 3}
              rank={String(index + 1).padStart(2, '0')}
              heading={archetype.name.replace(' ', '<br/>')}
              profileImage="/profile.jpg"
              successRate={`${archetype.retention_rate.toFixed(1)}%`}
              studentRate={`${archetype.percentage_of_all.toFixed(1)}%`}
              progressionRate={Math.round(archetype.retention_rate)}
              quote={archetype.example_quotes[0] || "No quote available"}
              studentId={archetype.name.toLowerCase().replace(/\s+/g, '-')}
              isActive={activeCard === index && hoveredCard === null && !hasInteracted}
              isHovered={hoveredCard === index}
              onClick={() => setActiveCard(index)}
              archetypeName={archetype.name}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ArrowUp, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { StudentCard } from '@/components/molecules';
import './students.css';

export default function StudentsContent() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleCardHover = (cardIndex: number) => {
    setHasInteracted(true);
    setHoveredCard(cardIndex);
  };

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
              <span>MOL TP5 2025:</span>
              <span className="flex items-center gap-2 text-black">
                <span className="text-3xl lg:text-4xl font-semibold">79</span>
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
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gray-300 transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-orange-300 group-hover:to-white"></span>
                </span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Right: Toggle Stats */}
          <div className="w-full flex justify-start lg:justify-end">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors font-medium text-base"
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
          <StudentCard
            tier={2}
            rank="01"
            heading="Supported<br/>Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0439"
            isActive={activeCard === 0 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 0}
            onClick={() => setActiveCard(0)}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={2}
            rank="02"
            heading="Supported<br/>Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0440"
            isActive={activeCard === 1 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 1}
            onClick={() => setActiveCard(1)}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={2}
            rank="03"
            heading="Supported<br/>Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0441"
            isActive={activeCard === 2 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 2}
            onClick={() => setActiveCard(2)}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={2}
            rank="04"
            heading="Supported<br/>Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0442"
            isActive={activeCard === 3 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 3}
            onClick={() => setActiveCard(3)}
            onMouseEnter={() => handleCardHover(3)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={2}
            rank="05"
            heading="Supported<br/>Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0443"
            isActive={activeCard === 4 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 4}
            onClick={() => setActiveCard(4)}
            onMouseEnter={() => handleCardHover(4)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={1}
            rank="06"
            heading="Confident Achiever"
            profileImage="/profile.jpg"
            successRate="12.5%"
            studentRate="4.8%"
            progressionRate={85}
            quote="I've always been good at managing my time and staying organized with my studies."
            studentId="0444"
            isActive={activeCard === 5 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 5}
            onClick={() => setActiveCard(5)}
            onMouseEnter={() => handleCardHover(5)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={3}
            rank="07"
            heading="Struggling Newcomer"
            profileImage="/profile.jpg"
            successRate="5.2%"
            studentRate="2.1%"
            progressionRate={45}
            quote="English is my second language and sometimes I find it hard to keep up with lectures."
            studentId="0445"
            isActive={activeCard === 6 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 6}
            onClick={() => setActiveCard(6)}
            onMouseEnter={() => handleCardHover(6)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={1}
            rank="08"
            heading="Tech-Savvy Learner"
            profileImage="/profile.jpg"
            successRate="15.3%"
            studentRate="5.5%"
            progressionRate={92}
            quote="I love using online resources and tools to enhance my learning experience."
            studentId="0446"
            isActive={activeCard === 7 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 7}
            onClick={() => setActiveCard(7)}
            onMouseEnter={() => handleCardHover(7)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={2}
            rank="09"
            heading="Collaborative Student"
            profileImage="/profile.jpg"
            successRate="9.7%"
            studentRate="3.9%"
            progressionRate={78}
            quote="Study groups have been essential for my success - we help each other understand difficult concepts."
            studentId="0447"
            isActive={activeCard === 8 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 8}
            onClick={() => setActiveCard(8)}
            onMouseEnter={() => handleCardHover(8)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={3}
            rank="10"
            heading="Part-time Struggler"
            profileImage="/profile.jpg"
            successRate="4.1%"
            studentRate="1.8%"
            progressionRate={38}
            quote="Balancing work and study is tough, especially when I have to miss classes for my job."
            studentId="0448"
            isActive={activeCard === 9 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 9}
            onClick={() => setActiveCard(9)}
            onMouseEnter={() => handleCardHover(9)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <StudentCard
            tier={1}
            rank="11"
            heading="High Performer"
            profileImage="/profile.jpg"
            successRate="18.2%"
            studentRate="6.3%"
            progressionRate={95}
            quote="I've developed a solid study routine that helps me stay ahead of the coursework."
            studentId="0449"
            isActive={activeCard === 10 && hoveredCard === null && !hasInteracted}
            isHovered={hoveredCard === 10}
            onClick={() => setActiveCard(10)}
            onMouseEnter={() => handleCardHover(10)}
            onMouseLeave={() => setHoveredCard(null)}
          />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
}
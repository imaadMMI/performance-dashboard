"use client";

import React, { useState } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowUp, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { StudentCard } from '@/components/molecules';

export default function StudentsContent() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      <main className="flex-1 px-8 py-12 lg:px-16 lg:py-16 overflow-hidden">
        {/* Header Row - Stack on mobile, grid on desktop */}
        <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0 mb-12 items-start">
          {/* Left: Stats */}
          <div className="w-full">
            <h2 className="font-semibold text-2xl lg:text-3xl flex flex-wrap items-center gap-6 lg:gap-24 mb-2">
              <span>MOL TP5 2025:</span>
              <span className="flex items-center gap-2 text-black">
                <span className="text-3xl lg:text-4xl font-semibold">79</span>
                <ArrowUp color="green" size={28} />
              </span>
            </h2>
            <p className="text-gray-500 text-base font-normal">Student intelligence</p>
          </div>

          {/* Center: Change Period */}
          <div className="w-full flex justify-start lg:justify-center">
            <div>
              <button className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors font-medium text-base">
                Change teaching period
                <ChevronDown size={16} />
              </button>
              <hr className="mt-2 w-56 border-gray-300" />
            </div>
          </div>

          {/* Right: Toggle Stats */}
          <div className="w-full flex justify-start lg:justify-end">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors font-medium text-base"
            >
              {showSidebar ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
              {showSidebar ? 'Hide' : 'See'} retention stats
            </button>
          </div>
        </div>

        {/* Filter Tags - Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-10">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
            </svg>
            <span className="font-semibold text-gray-800 text-lg">Successful students</span>
          </div>
          
          <div className="flex items-center gap-3 opacity-50">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <span className="font-semibold text-gray-500 text-lg">High-risk students</span>
          </div>
        </div>

        {/* Student Cards - Horizontal scroll */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ width: 'calc(100vw - 200px)', maxWidth: '1600px' }}>
          <StudentCard
            tier={2}
            rank="01"
            heading="Supported Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0439"
          />
          <StudentCard
            tier={2}
            rank="02"
            heading="Supported Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0440"
          />
          <StudentCard
            tier={2}
            rank="03"
            heading="Supported Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0441"
          />
          <StudentCard
            tier={2}
            rank="04"
            heading="Supported Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0442"
          />
          <StudentCard
            tier={2}
            rank="05"
            heading="Supported Problem-Solver"
            profileImage="/profile.jpg"
            successRate="8.4%"
            studentRate="3.1%"
            progressionRate={70}
            quote="My wife is really encouraging me to do this and said she'll take on more of the household responsibilities."
            studentId="0443"
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
          />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-gray-100 p-4 sm:p-6 shadow-lg transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'} z-50 border-l border-gray-300 overflow-y-auto`}>
        <div className="text-right mb-6">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-yellow-600 font-semibold text-sm hover:text-yellow-700"
          >
            Collapse retention stats »
          </button>
        </div>

        <div className="mb-8">
          <h6 className="font-bold mb-4 text-gray-800">
            Retention stats <span className="text-gray-500 text-sm font-normal">Monash TP5 2025</span>
          </h6>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">Students</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">103</h5>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">Enrolled</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">56</h5>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">Retained</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">35</h5>
            </div>
          </div>
          <div className="bg-white p-4 rounded mt-3 text-center shadow-sm">
            <small className="font-semibold text-gray-700 text-xs">Successful progression</small>
            <h5 className="text-xl sm:text-2xl font-bold mb-0 text-gray-800">70.0%</h5>
            <small className="text-gray-500 text-xs">census retention</small>
            <span className="inline-block bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-medium mt-2">+Avg</span>
          </div>
        </div>

        <div>
          <h6 className="font-bold mb-4 text-gray-800">
            Archetype stats <span className="text-gray-500 text-sm font-normal">Monash TP5 2025</span>
          </h6>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">Total</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">13</h5>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">Success</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">06</h5>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded text-center shadow-sm">
              <small className="text-gray-600 text-xs">High-risk</small>
              <h5 className="text-lg sm:text-xl font-bold text-gray-800">07</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
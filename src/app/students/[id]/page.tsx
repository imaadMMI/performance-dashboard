"use client";

import React from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import Link from "next/link";
import { ChevronLeft, ArrowUp } from "lucide-react";
import Image from "next/image";

export default function StudentProfile() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      <main className="flex-1 px-12 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/students">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
              <ChevronLeft size={16} />
              Dashboard / Successful archetypes
            </button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <h1 className="font-montserrat text-3xl font-bold text-gray-900">
            Time-stretched skeptic:
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">79</span>
            <ArrowUp className="text-green-600" size={24} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="flex items-start gap-8">
              <Image
                src="/profile.jpg"
                alt="Student Avatar"
                width={140}
                height={140}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-3 pt-4">
                <div className="text-gray-700 font-semibold border border-gray-300 rounded px-4 py-2 w-fit">33% of all students</div>
                <div className="text-gray-700 font-semibold border border-gray-300 rounded px-4 py-2 w-fit">33% of high-risk students</div>
                <div className="text-gray-700 font-semibold border border-gray-300 rounded px-4 py-2 w-fit">334 total students</div>
              </div>
            </div>

            {/* Successful Progression Cards */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-white p-6 border-r border-gray-300">
                  <p className="text-sm text-gray-600 mb-4">Successful progression</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">70.0%</p>
                      <p className="text-sm text-gray-600">No withdrawal</p>
                    </div>
                    <div className="relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="90 10"
                          strokeDashoffset="25"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium">+90%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <p className="text-sm text-gray-600 mb-4">Successful progression</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">70.0%</p>
                      <p className="text-sm text-gray-600">No withdrawal</p>
                    </div>
                    <div className="relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="90 10"
                          strokeDashoffset="25"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium">+90%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next-best Interaction Behaviours */}
            <div className="border border-gray-300 rounded-lg p-6 max-w-[500px]">
              <h3 className="font-montserrat text-xl font-bold mb-6">Next-best interaction behaviours</h3>
              <div className="space-y-0">
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50">
                  <p className="text-gray-700 text-sm">Objection Flip: Show Realistic Success Blueprints to</p>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-medium">Enrolment: +7%</span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 border-t border-b border-gray-200">
                  <p className="text-gray-700 text-sm">This shows systematic leveraging of prior</p>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-medium">Enrolment: +7%</span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50">
                  <p className="text-gray-700 text-sm">This shows systematic leveraging of prior</p>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-medium">Enrolment: +7%</span>
                </div>
              </div>
              <button className="mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors">view more</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Signature Features Section */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h2 className="font-montserrat text-2xl font-bold mb-6">Signature features:</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Students who build systematic educational portfolios through logical credential progression while demonstrating immediate action-taking behaviors. They engage in thoughtful exploration of options, maintain realistic self-assessment, and demonstrate emotional maturity in balancing excitement with practical concerns.
              </p>

              {/* Tags */}
              <div className="flex gap-4 mb-8">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded">Overwhelmed indicator</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded">Professional network support</span>
              </div>

              <div className="flex gap-4 mb-8">
                <span className="px-4 py-2 border border-gray-300 text-gray-700 rounded">Professional network support</span>
                <span className="px-4 py-2 border border-gray-300 text-gray-700 rounded">Emotional maturity</span>
              </div>

              {/* Divider Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="w-8"></div>
              </div>

              {/* Numbered Section */}
              <div>
                <h3 className="font-montserrat font-bold mb-4">1. Overwhelmed indicator</h3>
                <div className="border-l-4 border-yellow-400 pl-6 mb-8">
                  <p className="text-gray-700 italic mb-4">
                    "I did my Certificate IV in training and assessment as well... I have a diploma in leadership and management and a diploma in outdoor leadership... I do have 25 years of industry experience, and I have a graduate certificate in adult education"
                  </p>
                  <p className="text-gray-600 text-sm">
                    This shows systematic leveraging of prior institutional relationships and strategic planning for educational advancement.
                  </p>
                </div>
                <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">view more</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


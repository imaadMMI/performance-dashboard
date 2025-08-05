"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Image from "next/image";
import ArchetypeCharts from "@/components/ArchetypeCharts";
import { PieChart, Pie, Cell } from "recharts";

export default function StudentProfile() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen pt-10 px-32 pb-8 gap-4">
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
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-8">
            Time-Stretched Skeptic:
            <span className="flex items-center gap-2">
              <span className="font-semibold text-3xl">79</span>
              <TrendingUp className="text-green-600" size={24} />
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-row flex-1 gap-4">
          {/* Left Box */}
          <div className="w-1/2 flex flex-col gap-4">
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
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">33% of all students</p>
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">9% of high-risk students</p>
                <p className="text-base text-gray-800 border border-gray-200 px-4 py-2.5 w-fit font-semibold">334 total students</p>
              </div>
            </div>

            {/* Progression Cards */}
            <div className="grid grid-cols-2 " style={{width: '80%'}}>
              {/* First Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4">
                <p className="font-semibold text-base mb-3 ml-6">Successful progression</p>
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
                        innerRadius={18}
                        outerRadius={28}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#C58E02" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-sm">+90%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <div className="bg-white border border-[#f1f1f1] rounded-[2px] p-4">
                <p className="font-semibold text-base mb-3 ml-6">Successful progression</p>
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
                        innerRadius={18}
                        outerRadius={28}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#C58E02" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-sm">+90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next-best Interaction Behaviours */}
            <div className="p-4 bg-white border border-gray-200 rounded-[2px]" style={{width: '80%'}}>
              <h3 className="text-xl font-semibold mb-4">Next-best interaction behaviours</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 text-sm font-semibold flex-1 bg-gray-50 rounded-[2px] py-3 px-4">Objection Flip: Show Realistic Success Blueprints to</p>
                  <span className="bg-[#abd5ce] text-gray-700 py-3 px-4 rounded-[2px] text-sm whitespace-nowrap font-semibold flex items-center">Enrolment: +7%</span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 text-sm font-semibold flex-1 bg-gray-50 rounded-[2px] py-3 px-4">This shows systematic leveraging of prior</p>
                  <span className="bg-[#abd5ce] text-gray-700 py-3 px-4 rounded-[2px] text-sm whitespace-nowrap font-semibold flex items-center">Enrolment: +7%</span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 text-sm font-semibold flex-1 bg-gray-50 rounded-[2px] py-3 px-4">This shows systematic leveraging of prior</p>
                  <span className="bg-[#abd5ce] text-gray-700 py-3 px-4 rounded-[2px] text-sm whitespace-nowrap font-semibold flex items-center">Enrolment: +7%</span>
                </div>
              </div>
              <button className="mt-4 text-gray-500 text-sm hover:text-[#C58E02] transition-colors float-right underline">view more</button>
            </div>
          </div>

          {/* Signature Features */}
          <div className="w-1/2 -ml-8 p-8 bg-white border border-gray-200 rounded-[2px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Signature features:</h2>
            <p className="text-gray-700 text-base leading-relaxed mb-6 font-semibold">
              Students who build systematic educational portfolios through logical credential progression while demonstrating immediate action-taking behaviors. They engage in thoughtful exploration of options, maintain realistic self-assessment, and demonstrate emotional maturity in balancing excitement with practical concerns.
            </p>

            {/* Tags - First Row */}
            <div className="flex gap-3 mb-3">
              <span className="px-4 py-2 text-sm text-gray-700 border-2 border-(--brand-light) rounded-[2px] font-semibold">Overwhelmed indicator</span>
              <span className="px-4 py-2 text-sm text-gray-700 border-2 border-(--brand-light) rounded-[2px] font-semibold">Professional network support</span>
            </div>

            {/* Tags - Second Row */}
            <div className="flex gap-3 mb-8">
              <span className="px-4 py-2 text-sm text-gray-700 border-2 border-(--brand-light) rounded-[2px] font-semibold">Professional network support</span>
              <span className="px-4 py-2 text-sm text-gray-700 border-2 border-[#abd5ce] rounded-[2px] font-semibold">Emotional maturity</span>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Numbered Section */}
            <div>
              <h3 className="font-semibold text-base mb-4 ">1. Overwhelmed indicator</h3>
              
              {/* Quote with gradient border */}
              <div className="relative pl-4 mb-4 ml-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{background: 'linear-gradient(to bottom, #F5F5F5, #ad8f40, #c4961f, #C58E02)'}}></div>
                <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                  "I did my Certificate IV in training and assessment as well... <span className="text-[#C58E02]">I have a diploma in leadership and management and a diploma in outdoor leadership...</span> I do have 25 years of industry experience, and I have a graduate certificate in adult education"
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-6 font-semibold">
                This shows systematic leveraging of prior institutional relationships and strategic planning for educational advancement.
              </p>

              <button className="text-gray-500 text-sm hover:text-[#C58E02] transition-colors float-right underline">view more</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


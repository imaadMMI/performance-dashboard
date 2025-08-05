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
      <div className="flex flex-col min-h-screen p-32 gap-6">
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
        <div className="flex flex-row flex-1 gap-16">
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
              <div className="bg-white border border-[#f1f1f1] rounded p-6">
                <p className="font-semibold text-base mb-4 ml-6">Successful progression</p>
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
                        <Cell fill="#f59e0b" />
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
              <div className="bg-white border border-[#f1f1f1] rounded p-6">
                <p className="font-semibold text-base mb-4 ml-6">Successful progression</p>
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
                        <Cell fill="#f59e0b" />
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

            {/* Charts or Visual Summary */}
            <div className="flex-1 p-6 border-3 border-(--brand-light)">
              <ArchetypeCharts retention={79} />
            </div>
          </div>

          {/* Archetype Description */}
          <div className="w-1/2 p-12 border-3 border-(--brand-light) overflow-y-auto flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-700">Signature Features</h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis massa ut ligula elementum, vitae gravida massa mattis. 
              Curabitur nec sapien ac eros facilisis placerat. Nulla facilisi. Integer non dapibus nisi. Suspendisse potenti. Praesent vel enim ac 
              lacus convallis pulvinar. Sed at dictum nisl, a scelerisque magna. Pellentesque habitant morbi tristique senectus et netus et 
              malesuada fames ac turpis egestas. Duis id semper nisi. Fusce nec lorem sed odio rutrum convallis. Vivamus nec feugiat tellus. 
              Cras vel sodales mi. Curabitur viverra lectus vitae lorem lacinia congue.
            </p>

            {/* Tags */}
            <div className="flex gap-3 flex-wrap mt-2">
              {["Analytical", "Time-Constrained", "Skeptical", "Self-Reliant"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 text-sm text-gray-700 border-2 border-(--brand-gold)"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Separator */}
            <hr className="my-4 border-gray-300 border-3" />

            {/* Quote */}
            <blockquote className="italic text-gray-600 border-l-4 border-(--brand-gold) pl-4">
              “I don't just take things at face value. I need time to be sure something works for me before I commit.”
            </blockquote>
          </div>
        </div>
      </div>
    </Layout>
  );
}


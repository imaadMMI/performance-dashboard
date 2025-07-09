"use client";

import React from "react";
import Layout from "@/components/Layout";
import ScoreCard from "@/components/ScoreCard";
import RequirementsList from "@/components/RequirementsList";
import TriggerMoment from "@/components/TriggerMoment";
import CategoryList from "@/components/CategoryList";
import dashboardData from "@/data/dashboard-data.json";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Score Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <ScoreCard
            score={dashboardData.overallScore}
            subtitle="weighted scoring system across six performance categories"
          />
        </div>

        {/* Requirements and Categories Row */}
        <div className="grid grid-cols-3 gap-8">
          {/* Compliance Requirements */}
          <div className="bg-white pt-12 px-8 pb-8 rounded-xl shadow-sm border border-gray-100 h-full">
            <RequirementsList
              title="Compliance requirement met"
              header={dashboardData.complianceRequirements.header}
              items={dashboardData.complianceRequirements.items}
              type="compliance"
            />
          </div>

          {/* Best Practices */}
          <div className="bg-white pt-12 px-8 pb-8 rounded-xl shadow-sm border border-gray-100 h-full">
            <RequirementsList
              title="Best-practices missed"
              header={dashboardData.bestPractices.header}
              items={dashboardData.bestPractices.items}
              type="practices"
            />
          </div>

          {/* Performance Categories */}
          <div className="space-y-4">
            {dashboardData.performanceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <CategoryList categories={[category]} />
              </div>
            ))}
          </div>
        </div>

        {/* Key Trigger Moments */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <TriggerMoment
            category={dashboardData.keyTriggerMoments[0].category}
            customerTrigger={dashboardData.keyTriggerMoments[0].customerTrigger}
            actualResponse={dashboardData.keyTriggerMoments[0].actualResponse}
            optimalResponse={dashboardData.keyTriggerMoments[0].optimalResponse}
          />
        </div>

        {/* Practice Session */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-8">
            <p className="font-sans text-lg text-[#58595b] font-medium">
              Start a focused practice session on:
            </p>
            <button className="bg-[#b68d2e] text-white px-8 py-3 rounded-lg hover:bg-[#a67d29] transition-colors duration-200 font-sans font-medium shadow-sm">
              Retention strategies
            </button>
            <button className="bg-[#58595b] text-white px-8 py-3 rounded-lg hover:bg-[#6a6b6d] transition-colors duration-200 font-sans font-medium shadow-sm">
              General session
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

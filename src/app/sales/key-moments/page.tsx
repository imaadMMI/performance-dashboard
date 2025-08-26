"use client";

import React, { useState, useEffect } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import KeyMomentsComponent from "./KeyMomentsComponent";
import tpCombinedData from '../dashboardJson/tp-combined.json';

export default function KeyMomentsPage() {
  const router = useRouter();
  
  // Data for KeyMomentsComponent
  const [consultants, setConsultants] = useState<{ id: string; name: string}[]>([]);
  const [behaviors, setBehaviors] = useState<{ id: string; title: string }[]>([]);
  
  // Extract consultant and behavior data from JSON
  useEffect(() => {
    const individualPerformance = tpCombinedData.individual_consultant_performance as Record<string, any>;
    const consultantList = Object.entries(individualPerformance).map(([id, data]) => ({
      id,
      name: data.consultant_name.replace(/-/g, ' '),
    })).sort((a, b) => a.name.localeCompare(b.name));
    
    setConsultants(consultantList);
    
    // Extract behaviors from overall_behavioral_effects
    const behavioralEffects = tpCombinedData.overall_behavioral_effects as Record<string, any>;
    const behaviorList = Object.entries(behavioralEffects)
      .map(([id, data]) => ({
        id,
        title: data.taxonomy_info.title
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    
    setBehaviors(behaviorList);
  }, []);

  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/sales/placeholder')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Sales Center</span>
          </button>
        </div>

        {/* Key Moments Component */}
        <KeyMomentsComponent 
          consultants={consultants}
          behaviors={behaviors}
        />
      </main>
    </div>
  );
}
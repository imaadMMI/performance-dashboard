"use client";

import React from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NewKeyMoment from "./NewKeyMoment";

export default function KeyMomentsAlyssaPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#f9fafb]">
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

        {/* New Key Moments Component for Alyssa */}
        <NewKeyMoment />
      </main>
    </div>
  );
}
"use client";

import React from "react";
import { LeftSidebar } from "@/components/NADALeftSidebar";
import { MainContent } from "@/components/NADAMainContent";

export default function LeaderBoard() {
  return (
    <div className="h-screen flex bg-brand-white">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      {/* Main Content Area */}
      <MainContent />
    </div>
  );
}


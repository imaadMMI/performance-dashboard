"use client";

import React from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { MainContent } from "./StudentsContent";

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


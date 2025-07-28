"use client";

import React from "react";
import { LeftSidebar } from "@/components/NADALeftSidebar";
import { MainContent } from "@/components/NADAMainContent";
import { RightSidebar } from "@/components/NADARightSidebar";

export default function Home() {
  return (
    <div className="h-screen flex bg-brand-white">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      {/* Main Content Area */}
      <MainContent />

      {/* Right Sidebar - Speak to NADA */}
      <RightSidebar />
    </div>
  );
}

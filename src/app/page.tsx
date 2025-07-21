"use client";

import React from "react";
import { NADALeftSidebar } from "@/components/NADALeftSidebar";
import { NADAMainContent } from "@/components/NADAMainContent";
import { NADARightSidebar } from "@/components/NADARightSidebar";

export default function Home() {
  return (
    <div className="h-screen flex">
      {/* Left Navigation Sidebar */}
      <NADALeftSidebar />

      {/* Main Content Area */}
      <NADAMainContent />

      {/* Right Sidebar - Speak to NADA */}
      <NADARightSidebar />
    </div>
  );
}

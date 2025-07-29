"use client";

import React from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ArrowUp } from 'lucide-react';
import { StudentCard } from '@/components/molecules';
import FilterSelect from "@/components/molecules/FilterSelector";

export default function StudentsContent() {
  return (
    <div className="h-screen flex bg-brand-white">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      <main className="p-20 w-11/12 flex flex-col space-y-16">
        {/* First Row */}
        <section className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col justify-between h-18">
            <h2 className="font-bold text-3xl flex flex-row items-center justify-center">
              MOL TP5 2025:
              <span className="text-bold text-4xl ml-16 flex flex-row items-center justify-center">
                79 <ArrowUp color="green" size={40} />
              </span>
            </h2>
            <p className="font-medium text-gray-400">Student intelligence</p>
          </div>
        </section>

        <FilterSelect />

        {/* Third Row: Student Cards */}
        <section className="flex flex-row gap-6 h-full overflow-x-auto no-scrollbar scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="flex flex-nowrap gap-6">
            <StudentCard
              tier={1}
              heading="Supported Problem Solver"
              profileImage="/profile.jpg"
              successRate="92%"
              secondaryRate="Stable over 6 months"
              retentionRate={87}
              quote="I feel confident working through problems now that I’ve got the support I need."
            />
            <StudentCard
              tier={2}
              heading="Emerging Collaborator"
              profileImage="/profile.jpg"
              successRate="78%"
              secondaryRate="Inconsistent but improving"
              retentionRate={61}
              quote="Teamwork used to scare me. Now, I enjoy tackling group assignments!"
            />
            <StudentCard
              tier={2}
              heading="Emerging Collaborator"
              profileImage="/profile.jpg"
              successRate="78%"
              secondaryRate="Inconsistent but improving"
              retentionRate={61}
              quote="Teamwork used to scare me. Now, I enjoy tackling group assignments!"
            />
            <StudentCard
              tier={2}
              heading="Emerging Collaborator"
              profileImage="/profile.jpg"
              successRate="78%"
              secondaryRate="Inconsistent but improving"
              retentionRate={61}
              quote="Teamwork used to scare me. Now, I enjoy tackling group assignments!"
            />
            <StudentCard
              tier={2}
              heading="Emerging Collaborator"
              profileImage="/profile.jpg"
              successRate="78%"
              secondaryRate="Inconsistent but improving"
              retentionRate={61}
              quote="Teamwork used to scare me. Now, I enjoy tackling group assignments!"
            />
          </div>
        </section>
      </main>
    </div>
  );
}


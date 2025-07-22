"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { NADALeftSidebar } from "@/components/NADALeftSidebar";

export default function CallTranscriptPage() {
  const params = useParams();
  const callId = params.id;

  return (
    <div className="h-screen flex">
      <NADALeftSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-auto">
        <div className="pl-35 pr-28 py-14 max-w-[1600px] mx-auto">
          {/* Header Navigation */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book mb-8">
            <Link
              href="/"
              className="hover:text-[var(--color-nb-gold)] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span>Call #{callId}</span>
          </div>

          {/* Conversation Score Header */}
          <div className="mb-9">
            <div className="flex items-center gap-5 mb-2">
              <span className="text-lg text-[var(--color-nb-nickel)] font-gotham-bold">
                Your average conversation score:
              </span>
              <span className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                79
              </span>
              <div className="flex items-center text-green-500">
                <span className="text-2xl">↑</span>
              </div>
            </div>

            {/* Feedback Description */}
            <div className="max-w-[1200px] mb-2">
              <p className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book leading-relaxed">
                Early in the call, the customer expressed concern about pricing
                compared to a competitor. You acknowledged the concern and
                quickly pivoted to highlight long-term ROI. While the response
                was clear and professional, the emotional tone lacked warmth. A
                stronger personal reassurance could further build trust in
                high-stakes pricing discussions.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-9">
            <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] mb-5 text-base">
              Stats
            </h3>
            <div className="flex gap-5">
              <div className="w-56 bg-[var(--color-nb-cream)] p-5 h-35 flex flex-col justify-between">
                <div className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                  Opportunities
                </div>
                <div className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                  03
                </div>
              </div>
              <div className="w-80 bg-[var(--color-nb-cream)] p-5 h-35 flex flex-col justify-between">
                <div className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                  Opportunities taken
                </div>
                <div className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                  01
                </div>
              </div>
              <div className="w-49 bg-[var(--color-nb-cream)] p-5 h-35 flex flex-col justify-between">
                <div className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                  Compliance
                </div>
                <div className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                  03
                </div>
              </div>
            </div>
          </div>

          {/* Identified Strengths */}
          <div className="mb-9">
            <div className="flex items-center justify-between mb-5 max-w-[1200px]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[var(--color-nb-green)] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-base">
                  Identified strengths
                </h3>
              </div>
              <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book flex items-center gap-2">
                See all <span>{">"}</span>
              </button>
            </div>

            <div className="bg-[var(--color-nb-cream)] p-5 max-w-[1200px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-gotham-book text-[var(--color-nb-nickel)] opacity-75">
                  Call #1013
                </div>
                <div className="bg-[var(--color-nb-green)] text-white px-3 py-1 rounded text-xs font-gotham-book">
                  Enrolment: +7%
                </div>
              </div>
              <h4 className="font-gotham-bold text-[var(--color-nb-nickel)] mb-3 text-sm">
                Opportunity:
              </h4>
              <p className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book mb-4 leading-relaxed">
                This is a 2-3 sentence summary of what was practiced in that
                session: the key opportunity, the consultant response and
                NADA&apos;s feedback delving into all the key details to do
                everything they need to do...
              </p>
              <div className="flex justify-end">
                <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book">
                  View more {">"}
                </button>
              </div>
            </div>
          </div>

          {/* Opportunities */}
          <div className="mb-9">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-base">
                Opportunities
              </h3>
            </div>

            <div className="bg-[var(--color-nb-cream)] p-5 max-w-[1200px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-gotham-book text-[var(--color-nb-nickel)] opacity-75">
                  Call #1013
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded text-xs font-gotham-book">
                  Satisfaction: -3%
                </div>
              </div>
              <h4 className="font-gotham-bold text-[var(--color-nb-nickel)] mb-3 text-sm">
                Opportunity:
              </h4>
              <p className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book mb-4 leading-relaxed">
                This is a 2-3 sentence summary of what was practiced in that
                session: the key opportunity, the consultant response and
                NADA&apos;s feedback delving into all the key details to do
                everything they need to do...
              </p>
              <div className="flex justify-end">
                <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book">
                  View more {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <div className="w-208 bg-[var(--color-nb-cream)] p-12 flex flex-col">
        {/* Call Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
            Call #1013
          </h3>
          <div className="text-sm font-gotham-book text-[var(--color-nb-nickel)]/60">
            Sarrah Tambawala
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Customer message - left aligned */}
            <div className="flex flex-col items-start">
              <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                Customer
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 w-[60%]">
                <p className="text-sm text-[var(--color-nb-nickel)] font-gotham-book">
                  Hi, I&apos;m interested in opening a National Bonds account.
                  Can you help me with that?
                </p>
              </div>
            </div>

            {/* Agent message - right aligned */}
            <div className="flex flex-col items-end">
              <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                Agent
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 w-[60%]">
                <p className="text-sm text-[var(--color-nb-nickel)] font-gotham-book">
                  Absolutely! I&apos;d be happy to help you open a National
                  Bonds account. First, I&apos;ll need to verify your identity
                  through our KYC process.
                </p>
              </div>
            </div>

            {/* Customer message - left aligned */}
            <div className="flex flex-col items-start">
              <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                Customer
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 w-[60%]">
                <p className="text-sm text-[var(--color-nb-nickel)] font-gotham-book">
                  Sure, what information do you need from me? I heard that your
                  rates are higher than competitors. Is that true?
                </p>
              </div>
            </div>

            {/* Agent message - right aligned */}
            <div className="flex flex-col items-end">
              <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                Agent
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 w-[60%]">
                <p className="text-sm text-[var(--color-nb-nickel)] font-gotham-book">
                  I understand your concern about pricing. While our rates might
                  seem higher initially, our long-term ROI is significantly
                  better.
                </p>
              </div>
            </div>

            {/* Customer message - left aligned */}
            <div className="flex flex-col items-start">
              <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                Customer
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200 w-[60%]">
                <p className="text-sm text-[var(--color-nb-nickel)] font-gotham-book">
                  That sounds reasonable. Can you walk me through the account
                  opening process?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

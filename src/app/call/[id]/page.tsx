"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { NADALeftSidebar } from "@/components/NADALeftSidebar";

export default function CallTranscriptPage() {
  const params = useParams();
  const callId = params.id;

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <NADALeftSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-nb-nickel/60">
              <Link href="/" className="hover:text-nb-gold transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span>Call #{callId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-1 space-y-6">
              {/* Overall Score */}
              <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-medium text-nb-nickel">
                  Your overall conversation score:
                </h1>
                <span className="text-2xl font-medium text-nb-nickel">79</span>
                <span className="text-nb-secondary-green text-xl">↑</span>
              </div>

              {/* Feedback Text */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-nb-nickel leading-relaxed">
                  Early in the call, the customer expressed concern about
                  pricing compared to a competitor. You acknowledged the concern
                  and quickly pivoted to highlight long- term ROI. While the
                  response was clear and professional, the emotional tone lacked
                  warmth. A stronger personal reassurance could further build
                  trust in high- stakes pricing discussions.
                </p>
              </div>

              {/* Opportunities Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-nb-nickel/60 mb-1">
                      Opportunities
                    </div>
                    <div className="text-2xl font-bold text-nb-nickel">6</div>
                  </CardContent>
                </Card>
                <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-nb-nickel/60 mb-1">
                      Opportunities Taken
                    </div>
                    <div className="text-2xl font-bold text-nb-nickel">4</div>
                  </CardContent>
                </Card>
              </div>

              {/* Identified Strengths */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium text-nb-nickel">
                    Identified Strengths
                  </h2>
                </div>

                <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-nb-nickel mb-2">
                      KYC Verification Protocol
                    </h3>
                    <p className="text-sm text-nb-nickel/80 mb-4">
                      You clearly outlined the KYC steps and set expectations
                      confidently. The customer followed without confusion,
                      showing strong clarity and delivery.
                    </p>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-nb-nickel/60 hover:text-nb-gold"
                      >
                        Show in transcript {">"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Missed Opportunities */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.09 8.26L22 9L16 14.74L17.18 22.5L12 19.77L6.82 22.5L8 14.74L2 9L9.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium text-nb-nickel">
                    Missed Opportunities
                  </h2>
                </div>

                <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-nb-nickel mb-2">
                      KYC Verification Protocol
                    </h3>
                    <p className="text-sm text-nb-nickel/80 mb-4">
                      You clearly outlined the KYC steps and set expectations
                      confidently. The customer followed without confusion,
                      showing strong clarity and delivery.
                    </p>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-nb-nickel/60 hover:text-nb-gold"
                      >
                        Show in transcript {">"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar - Transcript */}
            <div className="lg:col-span-1">
              <div className="bg-nb-nickel/5 rounded-lg p-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="font-medium text-nb-nickel text-lg">
                    Call #{callId} Transcript
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {/* Customer Message - Left */}
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1">
                          Customer
                        </div>
                        <div className="bg-nb-secondary-green/10 rounded-lg p-4 text-sm text-nb-nickel">
                          Hi, I&apos;m interested in opening a National Bonds
                          account. Can you help me with that?
                        </div>
                      </div>
                    </div>

                    {/* Agent Message - Right */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1 text-right">
                          Agent
                        </div>
                        <div className="bg-nb-gold/10 rounded-lg p-4 text-sm text-nb-nickel">
                          Absolutely! I&apos;d be happy to help you open a
                          National Bonds account. First, I&apos;ll need to
                          verify your identity through our KYC process.
                        </div>
                      </div>
                    </div>

                    {/* Customer Message - Left */}
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1">
                          Customer
                        </div>
                        <div className="bg-nb-secondary-green/10 rounded-lg p-4 text-sm text-nb-nickel">
                          Sure, what information do you need from me?
                        </div>
                      </div>
                    </div>

                    {/* Agent Message - Right */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1 text-right">
                          Agent
                        </div>
                        <div className="bg-nb-gold/10 rounded-lg p-4 text-sm text-nb-nickel">
                          I&apos;ll need your full name, Emirates ID number, and
                          proof of address. This is standard procedure for all
                          new accounts.
                        </div>
                      </div>
                    </div>

                    {/* Customer Message - Left */}
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1">
                          Customer
                        </div>
                        <div className="bg-nb-secondary-green/10 rounded-lg p-4 text-sm text-nb-nickel">
                          I have all those documents ready. One question though
                          - I heard that your rates are higher than competitors.
                          Is that true?
                        </div>
                      </div>
                    </div>

                    {/* Agent Message - Right */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1 text-right">
                          Agent
                        </div>
                        <div className="bg-nb-gold/10 rounded-lg p-4 text-sm text-nb-nickel">
                          I understand your concern about pricing. While our
                          rates might seem higher initially, our long-term ROI
                          is significantly better. Plus, we offer
                          Sharia-compliant products with guaranteed returns.
                        </div>
                      </div>
                    </div>

                    {/* Customer Message - Left */}
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1">
                          Customer
                        </div>
                        <div className="bg-nb-secondary-green/10 rounded-lg p-4 text-sm text-nb-nickel">
                          That sounds good. Can you explain more about the
                          guaranteed returns?
                        </div>
                      </div>
                    </div>

                    {/* Agent Message - Right */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%]">
                        <div className="text-sm text-nb-nickel/70 mb-1 text-right">
                          Agent
                        </div>
                        <div className="bg-nb-gold/10 rounded-lg p-4 text-sm text-nb-nickel">
                          Certainly! Our bonds offer guaranteed returns ranging
                          from 3-7% annually, depending on the term you choose.
                          This is backed by the UAE government.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

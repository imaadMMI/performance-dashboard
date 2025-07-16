"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-medium text-nb-gold">
                  Your average conversation score:
                </h1>
                <span className="text-2xl font-medium text-nb-gold">79</span>
                <span className="text-nb-secondary-green text-xl">↑</span>
              </div>
              <Link
                href="#"
                className="text-sm text-nb-nickel/80 hover:text-nb-gold transition-colors"
              >
                See the breakdown
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-lg font-medium text-nb-nickel mb-4">Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-nb-nickel/60 mb-1">Calls</div>
                  <div className="text-2xl font-bold text-nb-nickel">103</div>
                </CardContent>
              </Card>
              <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-nb-nickel/60 mb-1">
                    Customers
                  </div>
                  <div className="text-2xl font-bold text-nb-nickel">56</div>
                </CardContent>
              </Card>
              <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-nb-nickel/60 mb-1">
                    Opportunities
                  </div>
                  <div className="text-2xl font-bold text-nb-nickel">35</div>
                </CardContent>
              </Card>
              <Card className="bg-nb-nickel/5 border-nb-nickel/10">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-nb-nickel/60 mb-1">
                    Opportunities Taken
                  </div>
                  <div className="text-2xl font-bold text-nb-nickel">13</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Behaviours Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-nb-nickel">Behaviours</h2>
              <Link
                href="#"
                className="text-sm text-nb-nickel/80 hover:text-nb-gold transition-colors"
              >
                See all {">"}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Empathy Card */}
              <div className="bg-gray-100 rounded-lg p-4 h-32 flex flex-col justify-between">
                <div>
                  <span className="text-sm text-nb-nickel font-medium">
                    Empathy
                  </span>
                </div>
                <div className="w-full h-2 bg-green-500 rounded-full"></div>
              </div>

              {/* Compliance Card */}
              <div className="bg-gray-100 rounded-lg p-4 h-32 flex flex-col justify-between">
                <div>
                  <span className="text-sm text-nb-nickel font-medium">
                    Compliance
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full"></div>
              </div>

              {/* Product Knowledge Card */}
              <div className="bg-gray-100 rounded-lg p-4 h-32 flex flex-col justify-between">
                <div>
                  <span className="text-sm text-nb-nickel font-medium">
                    Product Knowledge
                  </span>
                </div>
                <div className="w-full h-2 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Call / Session History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-nb-nickel">
                Call / Session History
              </h2>
              <Link
                href="#"
                className="text-sm text-nb-nickel/80 hover:text-nb-gold transition-colors"
              >
                See all {">"}
              </Link>
            </div>
            <Link href="/call/1013">
              <Card className="bg-nb-nickel/5 border-nb-nickel/10 hover:bg-nb-gold/10 hover:border-nb-gold/20 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-nb-nickel">
                        Call #1013
                      </span>
                      <span className="text-xs text-nb-nickel/60">
                        July 3, 2025
                      </span>
                    </div>
                    <Badge className="bg-nb-secondary-red text-white">73</Badge>
                  </div>
                  <p className="text-xs text-nb-nickel/80 mb-2">
                    This is a 2-3 sentence summary of what was practiced in that
                    session: the key opportunity, the consultant response, and
                    NADA&apos;s feedback
                  </p>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-nb-nickel/60 hover:text-nb-gold"
                    >
                      {">"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Right Sidebar - Speak to NADA */}
        <div className="lg:col-span-1 space-y-6">
          <div className="text-center space-y-6">
            <h2 className="text-xl font-medium text-nb-nickel">
              Speak to NADA
            </h2>

            {/* Voice Orb Circle */}
            <div className="flex justify-center">
              <Link href="/conversation?scene=No preference. Let's just talk.">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-nb-gold to-nb-gold-hover shadow-lg shadow-nb-gold/40 flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-nb-gold/50">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="space-y-4">
              <Link
                href="/conversation?scene=No preference. Let's just talk."
                className="block text-nb-nickel hover:text-nb-gold transition-colors"
              >
                Start a general session {">"}
              </Link>

              <div className="text-sm text-nb-nickel/60">OR</div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-nb-nickel">
                  Practice a scene:
                </h3>

                <div className="mt-4">
                  <Link
                    href="/conversation?scene=Objection Handling"
                    className="block mb-6"
                  >
                    <Card className="bg-nb-nickel/5 border-nb-nickel/10 p-4 hover:bg-nb-gold/10 hover:border-nb-gold/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-nb-nickel/60 mb-1">
                            RECOMMENDED
                          </div>
                          <div className="text-sm font-medium text-nb-nickel">
                            Objection Handling
                          </div>
                          <div className="text-xs text-nb-nickel/80 mt-1">
                            Respond to a customer questioning cost vs.
                            competitors
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Button>
                      </div>
                    </Card>
                  </Link>

                  <Link
                    href="/conversation?scene=Compliance Training"
                    className="block mb-6"
                  >
                    <Card className="bg-nb-nickel/5 border-nb-nickel/10 p-4 hover:bg-nb-gold/10 hover:border-nb-gold/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-nb-nickel/60 mb-1">
                            RECOMMENDED
                          </div>
                          <div className="text-sm font-medium text-nb-nickel">
                            Compliance Training
                          </div>
                          <div className="text-xs text-nb-nickel/80 mt-1">
                            Walk a customer through the mandatory information
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Button>
                      </div>
                    </Card>
                  </Link>

                  <Link
                    href="/conversation?scene=Upselling"
                    className="block mb-6"
                  >
                    <Card className="bg-nb-nickel/5 border-nb-nickel/10 p-4 hover:bg-nb-gold/10 hover:border-nb-gold/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-nb-nickel/60 mb-1">
                            RECOMMENDED
                          </div>
                          <div className="text-sm font-medium text-nb-nickel">
                            Upselling
                          </div>
                          <div className="text-xs text-nb-nickel/80 mt-1">
                            Inform a customer about upgrades without introducing
                            pressure
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Button>
                      </div>
                    </Card>
                  </Link>

                  <Link
                    href="/conversation?scene=Customer Retention"
                    className="block"
                  >
                    <Card className="bg-nb-nickel/5 border-nb-nickel/10 p-4 hover:bg-nb-gold/10 hover:border-nb-gold/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-nb-nickel/60 mb-1">
                            RECOMMENDED
                          </div>
                          <div className="text-sm font-medium text-nb-nickel">
                            Customer Retention
                          </div>
                          <div className="text-xs text-nb-nickel/80 mt-1">
                            Handle a customer who wants to cancel their policy
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

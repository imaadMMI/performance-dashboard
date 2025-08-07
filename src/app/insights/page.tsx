"use client";

import React from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { TrendingDown, AlertTriangle, Calendar, School, BarChart3, AlertCircle, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Generate mock weekly data points for the rolling 12-week chart
const generateRolling12WeekData = () => {
  const data = [
    { week: "Jan W1", monash: 24.5, sol: 25.2, monashTotal: 820, monashOver1: 201, monashUnder1: 619, solTotal: 743, solOver1: 187, solUnder1: 556 },
    { week: "Jan W2", monash: 24.3, sol: 25.1, monashTotal: 798, monashOver1: 194, monashUnder1: 604, solTotal: 721, solOver1: 181, solUnder1: 540 },
    { week: "Jan W3", monash: 24.1, sol: 25.0, monashTotal: 833, monashOver1: 201, monashUnder1: 632, solTotal: 756, solOver1: 189, solUnder1: 567 },
    { week: "Jan W4", monash: 23.9, sol: 25.1, monashTotal: 791, monashOver1: 189, monashUnder1: 602, solTotal: 698, solOver1: 175, solUnder1: 523 },
    { week: "Feb W1", monash: 23.6, sol: 25.0, monashTotal: 844, monashOver1: 199, monashUnder1: 645, solTotal: 732, solOver1: 183, solUnder1: 549 },
    { week: "Feb W2", monash: 23.3, sol: 24.9, monashTotal: 812, monashOver1: 189, monashUnder1: 623, solTotal: 714, solOver1: 178, solUnder1: 536 },
    { week: "Feb W3", monash: 23.0, sol: 25.0, monashTotal: 826, monashOver1: 190, monashUnder1: 636, solTotal: 748, solOver1: 187, solUnder1: 561 },
    { week: "Feb W4", monash: 22.8, sol: 24.9, monashTotal: 858, monashOver1: 196, monashUnder1: 662, solTotal: 693, solOver1: 173, solUnder1: 520 },
    { week: "Mar W1", monash: 22.5, sol: 24.8, monashTotal: 802, monashOver1: 180, monashUnder1: 622, solTotal: 725, solOver1: 180, solUnder1: 545 },
    { week: "Mar W2", monash: 22.2, sol: 24.7, monashTotal: 839, monashOver1: 186, monashUnder1: 653, solTotal: 701, solOver1: 173, solUnder1: 528 },
    { week: "Mar W3", monash: 21.9, sol: 24.6, monashTotal: 817, monashOver1: 179, monashUnder1: 638, solTotal: 739, solOver1: 182, solUnder1: 557 },
    { week: "Mar W4", monash: 21.7, sol: 24.5, monashTotal: 776, monashOver1: 168, monashUnder1: 608, solTotal: 688, solOver1: 168, solUnder1: 520 },
    { week: "Apr W1", monash: 21.4, sol: 24.3, monashTotal: 854, monashOver1: 183, monashUnder1: 671, solTotal: 716, solOver1: 174, solUnder1: 542 },
    { week: "Apr W2", monash: 21.1, sol: 24.0, monashTotal: 832, monashOver1: 176, monashUnder1: 656, solTotal: 752, solOver1: 180, solUnder1: 572 },
    { week: "Apr W3", monash: 20.8, sol: 23.8, monashTotal: 789, monashOver1: 164, monashUnder1: 625, solTotal: 734, solOver1: 175, solUnder1: 559 },
    { week: "Apr W4", monash: 20.5, sol: 23.5, monashTotal: 863, monashOver1: 177, monashUnder1: 686, solTotal: 697, solOver1: 164, solUnder1: 533 },
    { week: "May W1", monash: 20.6, sol: 23.3, monashTotal: 824, monashOver1: 170, monashUnder1: 654, solTotal: 728, solOver1: 170, solUnder1: 558 },
    { week: "May W2", monash: 20.8, sol: 23.1, monashTotal: 796, monashOver1: 166, monashUnder1: 630, solTotal: 713, solOver1: 165, solUnder1: 548 },
    { week: "May W3", monash: 21.0, sol: 22.9, monashTotal: 841, monashOver1: 177, monashUnder1: 664, solTotal: 745, solOver1: 171, solUnder1: 574 },
    { week: "May W4", monash: 21.2, sol: 22.8, monashTotal: 808, monashOver1: 171, monashUnder1: 637, solTotal: 692, solOver1: 158, solUnder1: 534 },
    { week: "Jun W1", monash: 21.3, sol: 22.7, monashTotal: 877, monashOver1: 187, monashUnder1: 690, solTotal: 721, solOver1: 164, solUnder1: 557 },
    { week: "Jun W2", monash: 21.4, sol: 22.6, monashTotal: 829, monashOver1: 177, monashUnder1: 652, solTotal: 738, solOver1: 167, solUnder1: 571 },
    { week: "Jun W3", monash: 21.5, sol: 22.6, monashTotal: 806, monashOver1: 173, monashUnder1: 633, solTotal: 704, solOver1: 159, solUnder1: 545 },
    { week: "Jun W4", monash: 21.6, sol: 22.6, monashTotal: 854, monashOver1: 184, monashUnder1: 670, solTotal: 726, solOver1: 164, solUnder1: 562 },
  ];
  return data;
};

export default function PickupRateDashboard() {
  const chartData = generateRolling12WeekData();

  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">
        <div className="mb-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl lg:text-4xl text-[#58595b] mb-2">
              Pickup Rate Analysis Dashboard
            </h1>
            <p className="font-quicksand text-[#58595b] text-lg">
              Call tracking metrics showing customer answer rates (calls over 1 minute)
            </p>
          </div>

          {/* LLM Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="group bg-white rounded-lg shadow-sm border border-[#f1f1f1] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">
                  Trend Analysis
                  <div className="my-1 w-35 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h3>
                
                <div className="bg-[#EEE4C8] rounded-full p-2">
                  <TrendingDown size={20} className="text-[#C58E02]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#C58E02] uppercase tracking-wide mb-1">
                    Insight
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Pickup rates are declining at a statistically significant rate across all measured timeframes
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#8BAF20] uppercase tracking-wide mb-1">
                    Evidence
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Weekly decline of -20.5% (p=0.001), monthly decline of -11.0% (p=0.000), indicating non-random patterns
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#FF8A00] uppercase tracking-wide mb-1">
                    Explanation
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    The decline persists even after removing anomalies, suggesting systematic factors beyond seasonality
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-sm border border-[#f1f1f1] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">
                  Impact Assessment
                  <div className="my-1 w-46 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h3>
                <div className="bg-[#EEE4C8] rounded-full p-2">
                  <AlertTriangle size={20} className="text-[#C58E02]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#C58E02] uppercase tracking-wide mb-1">
                    Insight
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Both universities show similar declining patterns, indicating broader systematic issues
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#8BAF20] uppercase tracking-wide mb-1">
                    Evidence
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Monash (-11.6%) and SOL (-10.1%) both show significant declines over the 12-week period
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#FF8A00] uppercase tracking-wide mb-1">
                    Explanation
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Parallel trends suggest shared operational or market factors rather than institution-specific problems
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-sm border border-[#f1f1f1] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">
                  Recommendation
                  <div className="my-1 w-42 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h3>
                <div className="bg-[#EEE4C8] rounded-full p-2">
                  <AlertCircle size={20} className="text-[#C58E02]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#C58E02] uppercase tracking-wide mb-1">
                    Insight
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Immediate intervention required to address the consistent downward trajectory
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#8BAF20] uppercase tracking-wide mb-1">
                    Evidence
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    High confidence levels (p&lt;0.001) indicate these are not temporary fluctuations
                  </p>
                </div>
                
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-[#FF8A00] uppercase tracking-wide mb-1">
                    Explanation
                  </h4>
                  <p className="font-quicksand text-sm text-[#58595b]">
                    Investigation into call timing, lead quality, and outreach strategies should be prioritized
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* University Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Monash Card */}
            <div className="group bg-white rounded-lg shadow-sm border border-red-200 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">Monash Performance
                  <div className="my-1 w-48 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h3>
                <School className="text-red-500" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-quicksand text-sm text-[#58595b]">Latest rate:</span>
                  <span className="font-montserrat text-2xl font-bold text-red-600">21.6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-quicksand text-sm text-[#58595b]">12-week decline:</span>
                  <span className="font-montserrat text-lg font-bold text-red-700">-11.6%</span>
                </div>
              </div>
            </div>

            {/* SOL Card */}
            <div className="group bg-white rounded-lg shadow-sm border border-blue-200 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">SOL Performance
                  <div className="my-1 w-40 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h3>
                <School className="text-blue-500" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-quicksand text-sm text-[#58595b]">Latest rate:</span>
                  <span className="font-montserrat text-2xl font-bold text-blue-600">22.6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-quicksand text-sm text-[#58595b]">12-week decline:</span>
                  <span className="font-montserrat text-lg font-bold text-blue-700">-10.1%</span>
                </div>
              </div>
            </div>
          </div>


          {/* 12-Week Trend Chart */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#f1f1f1] p-6 mb-6 hover:shadow-md transition-all duration-200">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-8">
                <BarChart3 className="text-[#C58E02]" size={20} />
                <h2 className="font-montserrat text-xl font-bold text-[#58595b]">
                  12-Week Pickup Rate Trend
                  <div className="my-1 w-70 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
                </h2>
              </div>
              <div className="flex gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-quicksand text-[#58595b]">Monash</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-quicksand text-[#58595b]">SOL</span>
                </div>
              </div>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 40, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="week" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 11, fill: '#58595b', fontFamily: 'Quicksand' }}
                    interval={0}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Pickup Rate (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: 10,
                      style: { 
                        fontFamily: 'Montserrat', 
                        fill: '#58595b',
                        fontSize: 14,
                        fontWeight: 600
                      } 
                    }}
                    domain={[19, 26]}
                    ticks={[19, 20, 21, 22, 23, 24, 25, 26]}
                    tick={{ fontSize: 12, fill: '#58595b', fontFamily: 'Quicksand' }}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length && label) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border border-[#f1f1f1] rounded-lg p-4 shadow-lg font-quicksand">
                            <p className="font-montserrat font-semibold text-[#58595b] mb-3">{label}</p>
                            
                            {/* Monash Data */}
                            <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="font-semibold text-red-700">Monash</span>
                                <span className="text-red-600 font-bold">{data.monash.toFixed(1)}%</span>
                              </div>
                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total calls:</span>
                                  <span className="font-semibold text-gray-800">{data.monashTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-green-700">Calls over 1 min:</span>
                                  <span className="font-semibold text-green-800">{data.monashOver1}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Calls under 1 min:</span>
                                  <span className="font-semibold text-gray-800">{data.monashUnder1}</span>
                                </div>
                              </div>
                            </div>

                            {/* SOL Data */}
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="font-semibold text-blue-700">SOL</span>
                                <span className="text-blue-600 font-bold">{data.sol.toFixed(1)}%</span>
                              </div>
                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total calls:</span>
                                  <span className="font-semibold text-gray-800">{data.solTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-green-700">Calls over 1 min:</span>
                                  <span className="font-semibold text-green-800">{data.solOver1}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Calls under 1 min:</span>
                                  <span className="font-semibold text-gray-800">{data.solUnder1}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="monash" 
                    stroke="#ef4444" 
                    strokeWidth={2.5}
                    name="Monash"
                    dot={{ fill: '#ef4444', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sol" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5}
                    name="SOL"
                    dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <p className="font-quicksand text-xs text-[#58595b]">
                <span className="font-semibold">Chart shows:</span> 24-week pickup rate data from January to June 2025. 
                Both universities demonstrate declining trends with statistical significance (p&lt;0.001).
              </p>
            </div>
          </div>

          {/* SECTION 4: Statistical Summary */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#f1f1f1] p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="text-[#C58E02]" size={20} />
              <h2 className="font-montserrat text-xl font-bold text-[#58595b]">
                Statistical Summary
                <div className="my-1 w-50 h-1 bg-gradient-to-r from-black to-white group-hover:from-[#FF8A00] group-hover:to-white transition-all duration-200"></div>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Quarterly Change */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-montserrat font-semibold text-sm text-[#58595b]">Quarterly Change</h3>
                  <ChevronDown className="text-red-500" size={16} />
                </div>
                <p className="font-montserrat text-2xl font-bold text-red-600 mb-1">-10.7%</p>
                <p className="font-quicksand text-xs text-gray-600">p-value: 0.000</p>
                <div className="mt-2 pt-2 border-t border-red-100">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Highly Significant
                  </span>
                </div>
              </div>

              {/* Monthly Change */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-montserrat font-semibold text-sm text-[#58595b]">Monthly Change</h3>
                  <ChevronDown className="text-orange-500" size={16} />
                </div>
                <p className="font-montserrat text-2xl font-bold text-orange-600 mb-1">-11.0%</p>
                <p className="font-quicksand text-xs text-gray-600">p-value: 0.000</p>
                <div className="mt-2 pt-2 border-t border-orange-100">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                    Highly Significant
                  </span>
                </div>
              </div>

              {/* Weekly Change */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-montserrat font-semibold text-sm text-[#58595b]">Weekly Change</h3>
                  <ChevronDown className="text-yellow-600" size={16} />
                </div>
                <p className="font-montserrat text-2xl font-bold text-yellow-700 mb-1">-20.5%</p>
                <p className="font-quicksand text-xs text-gray-600">p-value: 0.001</p>
                <div className="mt-2 pt-2 border-t border-yellow-100">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Statistically Significant
                  </span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C58E02] mt-1.5 flex-shrink-0"></div>
                <p className="font-quicksand text-sm text-[#58595b]">
                  Both Monash and SOL show <span className="font-semibold">similar declining trends</span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C58E02] mt-1.5 flex-shrink-0"></div>
                <p className="font-quicksand text-sm text-[#58595b]">
                  Decline persists even after <span className="font-semibold">removing anomalous data points</span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF8A00] mt-1.5 flex-shrink-0"></div>
                <p className="font-quicksand text-sm text-[#58595b]">
                  All timeframes show <span className="font-semibold">statistically significant negative trends</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
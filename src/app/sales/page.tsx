"use client";

import React, { useState } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { TrendingUp, Phone, Clock, AlertTriangle, TrendingDown, Gauge, MessageSquare } from "lucide-react";

interface Emotion {
  emotion: string;
  score: number;
  negative: boolean;
}

interface HesitancyData {
  rate: number;
  teamAverage: number;
  bestPerformer: number;
  performerName: string;
}

interface SpeechPaceData {
  wordsPerMinute: number;
  teamAverage: number;
}

interface PeakMomentData {
  quote: string;
  emotions: string[];
  timestamp: string;
  impact: string;
}

interface AgentInfo {
  name: string;
  topEmotions: Emotion[];
  hesitancy: HesitancyData;
  speechPace: SpeechPaceData;
  peakMoment: PeakMomentData;
}

export default function SalesPage() {
  const [selectedAgent, setSelectedAgent] = useState<"james" | "elisha">("james");
  
  const insightCards = [
    {
      title: "Call Success Rate",
      insight: "High-performing sales reps show 35% better objection handling",
      evidence: "78% conversion rate across 2,456 analyzed calls with consistent improvement pattern",
      explanation: "Top performers use empathetic language and ask clarifying questions 2.3x more frequently than average performers",
      icon: TrendingUp,
    },
    {
      title: "Average Call Duration",
      insight: "Optimal call length correlates with higher close rates",
      evidence: "Successful calls average 6:42 minutes, 1:15 longer than previous quarter",
      explanation: "Calls between 6-8 minutes have 42% higher conversion due to adequate rapport building and needs discovery phases",
      icon: Clock,
    },
    {
      title: "Total Calls Analyzed",
      insight: "Comprehensive dataset enables accurate pattern recognition",
      evidence: "2,456 calls processed with 98.7% transcription accuracy",
      explanation: "Large sample size across diverse customer segments provides statistically significant insights for training recommendations",
      icon: Phone,
    },
  ];

  const agentData: Record<"james" | "elisha", AgentInfo> = {
    james: {
      name: "James",
      topEmotions: [
        { emotion: "Satisfaction", score: 0.185692, negative: false },
        { emotion: "Tiredness", score: 0.181420, negative: true },
        { emotion: "Disappointment", score: 0.180616, negative: true },
        { emotion: "Boredom", score: 0.177527, negative: true },
        { emotion: "Distress", score: 0.169016, negative: true },
        { emotion: "Doubt", score: 0.155286, negative: true },
        { emotion: "Awkwardness", score: 0.138246, negative: true },
        { emotion: "Desire", score: 0.131749, negative: false },
        { emotion: "Amusement", score: 0.127804, negative: false },
        { emotion: "Contempt", score: 0.121648, negative: true },
      ],
      hesitancy: {
        rate: 0.45,
        teamAverage: 0.38,
        bestPerformer: 0.12,
        performerName: "Alyssa P."
      },
      speechPace: {
        wordsPerMinute: 145,
        teamAverage: 165
      },
      peakMoment: {
        quote: "It's, it's just it's, it's our last day today, or I wouldn't be calling you. So yeah, um.",
        emotions: ["Rushed", "Apologetic", "Uncertain"],
        timestamp: "00:15",
        impact: "negative"
      }
    },
    elisha: {
      name: "Elisha",
      topEmotions: [
        { emotion: "Interest", score: 0.244672, negative: false },
        { emotion: "Doubt", score: 0.243218, negative: true },
        { emotion: "Concentration", score: 0.189242, negative: false },
        { emotion: "Satisfaction", score: 0.177522, negative: false },
        { emotion: "Calmness", score: 0.171612, negative: false },
        { emotion: "Confusion", score: 0.167925, negative: true },
        { emotion: "Contemplation", score: 0.150000, negative: false },
        { emotion: "Amusement", score: 0.144717, negative: false },
        { emotion: "Realization", score: 0.140995, negative: false },
        { emotion: "Boredom", score: 0.129043, negative: true },
      ],
      hesitancy: {
        rate: 0.81,
        teamAverage: 0.38,
        bestPerformer: 0.12,
        performerName: "Alyssa P."
      },
      speechPace: {
        wordsPerMinute: 152,
        teamAverage: 165
      },
      peakMoment: {
        quote: "if you're looking at fundamentals and all that stuff in the grad certificate, you probably, I mean with the graduate certificate, you can always do that and then articulate into um. Into the um graduate diploma if you want to.",
        emotions: ["Hesitant", "Uncertain", "Disorganized"],
        timestamp: "02:05",
        impact: "negative"
      }
    }
  };

  const currentAgent = agentData[selectedAgent];
  const negativeEmotions = currentAgent.topEmotions.filter(e => e.negative);

  return (
    <div className="flex h-screen bg-brand-white">
      <LeftSidebar />
      
      <main className="flex-1 pl-16 lg:pl-32 pr-4 lg:pr-8 pt-6 lg:pt-10 pb-4 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl text-[#58595b] mb-8">
            LLM insights
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {insightCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-montserrat text-lg font-semibold text-[#58595b]">
                      {card.title}
                      <div className="my-1 w-32 h-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                      </div>
                    </h3>
                    <div className="bg-[#EEE4C8] rounded-full p-2">
                      <Icon size={20} className="text-[#C58E02]" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-montserrat text-sm font-semibold text-[#C58E02] uppercase tracking-wide mb-1">
                        Insight
                      </h4>
                      <p className="font-quicksand text-sm text-[#58595b]">
                        {card.insight}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-montserrat text-sm font-semibold text-[#8BAF20] uppercase tracking-wide mb-1">
                        Evidence
                      </h4>
                      <p className="font-quicksand text-sm text-[#58595b]">
                        {card.evidence}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-montserrat text-sm font-semibold text-[#FF8A00] uppercase tracking-wide mb-1">
                        Explanation
                      </h4>
                      <p className="font-quicksand text-sm text-[#58595b]">
                        {card.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Agent Selector */}
          <div className="mt-12 mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedAgent("james")}
                className={`font-montserrat px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedAgent === "james"
                    ? "bg-[#C58E02] text-white shadow-md hover:bg-[#FF8A00]"
                    : "bg-white border border-[#C58E02] text-[#C58E02] hover:bg-[#C58E02] hover:text-white"
                }`}
              >
                James
              </button>
              <button
                onClick={() => setSelectedAgent("elisha")}
                className={`font-montserrat px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedAgent === "elisha"
                    ? "bg-[#C58E02] text-white shadow-md hover:bg-[#FF8A00]"
                    : "bg-white border border-[#C58E02] text-[#C58E02] hover:bg-[#C58E02] hover:text-white"
                }`}
              >
                Elisha
              </button>
            </div>
          </div>

          {/* Top 10 Emotions */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 mb-6 hover:shadow-md transition-all duration-200">
            <h2 className="font-montserrat text-xl font-semibold text-[#58595b] mb-4">Top 10 Emotions - {currentAgent.name}
              <div className="my-1 w-60 h-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {currentAgent.topEmotions.map((item: Emotion, index: number) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer ${
                    item.negative 
                      ? "bg-red-50 border border-red-200 hover:shadow-md" 
                      : "bg-[#F5F5F5] border border-[#F0F0F0] hover:shadow-md"
                  }`}
                >
                  <p className={`font-montserrat font-medium text-sm ${
                    item.negative ? "text-red-700" : "text-[#58595b]"
                  }`}>
                    {item.emotion}
                  </p>
                  <p className={`font-montserrat text-lg font-bold ${
                    item.negative ? "text-red-800" : "text-[#C58E02]"
                  }`}>
                    {(item.score * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hesitancy Occurrences */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 mb-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-[#FF8A00]" size={20} />
              <h2 className="font-montserrat text-xl font-semibold text-[#58595b]">Hesitancy Analysis
                <div className="my-1 w-45 h-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                </div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-quicksand text-sm text-[#58595b] mb-1">Current Rate</p>
                <p className="font-montserrat text-3xl font-bold text-[#58595b]">
                  {currentAgent.hesitancy.rate} <span className="text-sm font-normal">per min</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Hesitant utterances (umm, uhh)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">vs Team Average</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-montserrat text-2xl font-bold text-[#FF8A00]">
                    +{((currentAgent.hesitancy.rate - currentAgent.hesitancy.teamAverage) * 100 / currentAgent.hesitancy.teamAverage).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500">({currentAgent.hesitancy.teamAverage}/min)</p>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8A00]"
                    style={{ width: `${Math.min((currentAgent.hesitancy.rate / currentAgent.hesitancy.teamAverage) * 50, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">vs Best Performer</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-montserrat text-2xl font-bold text-[#C58E02]">
                    +{((currentAgent.hesitancy.rate - currentAgent.hesitancy.bestPerformer) * 100 / currentAgent.hesitancy.bestPerformer).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500">({currentAgent.hesitancy.performerName}: {currentAgent.hesitancy.bestPerformer}/min)</p>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C58E02]"
                    style={{ width: `${Math.min((currentAgent.hesitancy.rate / currentAgent.hesitancy.bestPerformer) * 20, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pace of Speech */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 mb-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="text-[#abd5ce]" size={20} />
              <h2 className="font-montserrat text-xl font-semibold text-[#58595b]">Speech Pace Analysis
                <div className="my-1 w-50 h-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                </div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Speed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {currentAgent.speechPace.wordsPerMinute} <span className="text-sm font-normal">words/min</span>
                </p>
                <p className={`text-sm mt-2 ${
                  currentAgent.speechPace.wordsPerMinute < currentAgent.speechPace.teamAverage 
                    ? "text-orange-600" 
                    : "text-green-600"
                }`}>
                  {currentAgent.speechPace.wordsPerMinute < currentAgent.speechPace.teamAverage ? "Below" : "Above"} optimal range
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Average</p>
                <p className="text-2xl font-bold text-gray-600">
                  {currentAgent.speechPace.teamAverage} <span className="text-sm font-normal">words/min</span>
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <TrendingDown className={`${
                    currentAgent.speechPace.wordsPerMinute < currentAgent.speechPace.teamAverage 
                      ? "text-orange-600" 
                      : "text-green-600"
                  }`} size={16} />
                  <p className="text-sm text-gray-600">
                    {Math.abs(currentAgent.speechPace.wordsPerMinute - currentAgent.speechPace.teamAverage)} words/min 
                    {currentAgent.speechPace.wordsPerMinute < currentAgent.speechPace.teamAverage ? " slower" : " faster"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Negative Emotions Detail */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 mb-6 hover:shadow-md transition-all duration-200">
            <h2 className="font-montserrat text-xl font-semibold text-[#58595b] mb-4">Negative Emotions Analysis
              <div className="my-1 w-65 h-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="font-montserrat text-left py-2 px-3 text-sm font-medium text-[#58595b]">Emotion</th>
                    <th className="font-montserrat text-left py-2 px-3 text-sm font-medium text-[#58595b]">Average Score</th>
                    <th className="font-montserrat text-left py-2 px-3 text-sm font-medium text-[#58595b]">Significance</th>
                    <th className="font-montserrat text-left py-2 px-3 text-sm font-medium text-[#58595b]">Overall Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {negativeEmotions.map((item: Emotion, index: number) => {
                    const rank = currentAgent.topEmotions.findIndex((e: Emotion) => e.emotion === item.emotion) + 1;
                    const isSignificant = item.score > 0.15;
                    return (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-3 text-sm font-medium text-red-700">{item.emotion}</td>
                        <td className="py-3 px-3 text-sm text-gray-900">{(item.score * 100).toFixed(2)}%</td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            isSignificant 
                              ? "bg-red-100 text-red-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {isSignificant ? "High" : "Moderate"}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600">#{rank}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Peak Emotional Moments */}
          <div className="group bg-white rounded-lg shadow-sm border border-[#F0F0F0] p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-[#C58E02]" size={20} />
              <h2 className="font-montserrat text-xl font-semibold text-[#58595b]">Peak Emotional Moment
                <div className="my-1 w-60 h-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                </div>
              </h2>
            </div>
            <div className="bg-[#F5F5F5] rounded-lg p-5 mb-3 border border-[#F0F0F0]">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xs text-[#58595b] font-mono bg-white px-2 py-1 rounded border border-[#C58E02]">
                  {currentAgent.peakMoment.timestamp}
                </span>
                <blockquote className="flex-1 font-raleway font-semibold text-base">
                  <span className="text-[#cc9900]">"{currentAgent.peakMoment.quote.substring(0, 30)}</span>
                  {currentAgent.peakMoment.quote.substring(30)}<span className="text-[#ffc107]">"</span>
                </blockquote>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs font-medium text-gray-500">Emotions detected:</span>
                {currentAgent.peakMoment.emotions.map((emotion: string, index: number) => (
                  <span 
                    key={index}
                    className={`font-quicksand inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      currentAgent.peakMoment.impact === "negative"
                        ? "bg-red-100 text-red-700"
                        : "bg-[#8BAF20] bg-opacity-20 text-[#8BAF20]"
                    }`}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-quicksand text-sm text-[#58595b]">
              Impact: <span className={`font-montserrat font-semibold ${
                currentAgent.peakMoment.impact === "negative" ? "text-[#FF8A00]" : "text-[#8BAF20]"
              }`}>
                {currentAgent.peakMoment.impact === "negative" ? "Negative" : "Positive"} - Requires coaching intervention
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
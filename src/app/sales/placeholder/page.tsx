"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, Zap, TrendingUp } from "lucide-react";

export default function SalesPlaceholderPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const salesOptions = [
    {
      title: "LLM Insights & Analytics",
      description: "View AI-powered analysis of sales calls, emotion tracking, and performance metrics",
      icon: BarChart3,
      route: "/sales/llm-insights",
      color: "#FF8A00",
    },
    {
      title: "Key Moments",
      description: "Explore critical moments in sales conversations with detailed behavioral analysis",
      icon: Zap,
      route: "/sales/key-moments",
      color: "#8BAF20",
    },
    {
      title: "Performance Dashboard",
      description: "Track behavioral patterns and their impact on retention rates",
      icon: TrendingUp,
      route: "/sales/dashboard-page",
      color: "#C58E02",
    },
  ];

  const handleNavigation = (option: any) => {
    router.push(option.route);
  };

  return (
    <Layout>
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-montserrat">
              Sales Coaching Center
            </h1>
            <p className="text-lg text-gray-600 font-quicksand">
              Select a tool to analyze and improve sales performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salesOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleNavigation(option)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    borderTop: `4px solid ${option.color}`,
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${option.color}20` }}
                      >
                        <Icon size={24} style={{ color: option.color }} />
                      </div>
                      <ArrowRight
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${
                          hoveredCard === index ? "translate-x-1" : ""
                        }`}
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-montserrat">
                      {option.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm font-quicksand flex-grow">
                      {option.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: option.color }}
                      >
                        Access Tool →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </Layout>
  );
}
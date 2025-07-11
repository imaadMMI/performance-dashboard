"use client";

import React from "react";

interface ScoreCardProps {
  score: number;
  subtitle: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, subtitle }) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#b68d2e]">
          Your overall conversation score:
        </h2>
        <p className="text-sm text-[#58595b]/80 mt-2 font-light">{subtitle}</p>
      </div>
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-3 border-[#b68d2e] flex items-center justify-center bg-[#b68d2e]/5">
          <span className="text-xl font-bold text-[#b68d2e]">{score}%</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

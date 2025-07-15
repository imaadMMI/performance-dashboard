"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ScoreCardProps {
  score: number;
  subtitle: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, subtitle }) => {
  return (
    <Card className="bg-transparent border-none shadow-none p-0">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-nb-gold">
              Your overall conversation score:
            </h2>
            <p className="text-sm text-nb-nickel/80 mt-2 font-light">
              {subtitle}
            </p>
          </div>
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-3 border-nb-gold flex items-center justify-center bg-nb-gold/5">
              <span className="text-xl font-bold text-nb-gold">{score}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;

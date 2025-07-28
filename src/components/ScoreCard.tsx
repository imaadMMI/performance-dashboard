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
            <h2 className="text-2xl font-bold text-brand-gold">
              Your overall conversation score:
            </h2>
            <p className="text-sm font-light text-brand-black opacity-80 mt-2">
              {subtitle}
            </p>
          </div>
          <div className="relative">
            <div className="rounded-full flex items-center justify-center w-16 h-16 border-3 border-brand-gold bg-brand-gold bg-opacity-5">
              <span className="text-xl font-bold text-brand-gold">
                {score}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;

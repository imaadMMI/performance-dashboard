"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TriggerMomentProps {
  category: string;
  actualResponse: string;
  optimalResponse: string;
}

const TriggerMoment: React.FC<TriggerMomentProps> = ({
  category,
  actualResponse,
  optimalResponse,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 
          className="font-bold text-lg text-brand-black"
        >
          Key trigger moments
        </h3>
        <p 
          className="text-sm font-light"
          style={{ color: "#000000CC" }} // 80% opacity
        >
          The key compliance requirements and best-practices you fulfilled on
          the call
        </p>
      </div>

      <Card 
        className="shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#0000001A" // 10% opacity
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-6">
            <Badge 
              className="text-sm font-medium hover:opacity-90"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#10B981",
                color: "#FFFFFF"
              }}
            >
              {category}
            </Badge>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span 
                  className="font-medium whitespace-nowrap text-sm text-brand-black"
                >
                  Customer trigger:
                </span>
                <span 
                  className="font-light text-sm"
                  style={{ color: "#000000CC" }} // 80% opacity
                >
                  Can I transfer from 70 to [Trump Suku product]?
                </span>
              </div>
            </div>
            <div 
              className="text-xs font-light whitespace-nowrap"
              style={{ color: "#000000B3" }} // 70% opacity
            >
              1/7 trigger opportunities
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2 pl-3">
              <span className="font-medium whitespace-nowrap text-sm text-brand-black opacity-80">
                Actual response:
              </span>
              <span className="font-light text-sm text-brand-black opacity-80">
                {actualResponse}
              </span>
            </div>

            <div className="flex items-start gap-2 pl-3">
              <span className="font-medium whitespace-nowrap text-sm text-brand-gold">
                Optimal response:
              </span>
              <span className="font-light text-sm text-brand-gold">
                {optimalResponse}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-right">
        <Button
          variant="link"
          className="text-sm font-medium p-0 transition-colors text-brand-gold hover:text-brand-orange duration-200"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default TriggerMoment;

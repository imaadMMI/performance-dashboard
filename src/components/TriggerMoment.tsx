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
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg text-nb-nickel">
          Key trigger moments
        </h3>
        <p className="text-sm text-nb-nickel/80 font-light">
          The key compliance requirements and best-practices you fulfilled on
          the call
        </p>
      </div>

      <Card className="bg-white border-nb-nickel/10 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-6">
            <Badge className="px-6 py-3 bg-nb-secondary-green text-white text-sm font-medium hover:bg-nb-secondary-green">
              {category}
            </Badge>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-nb-nickel font-medium whitespace-nowrap text-sm">
                  Customer trigger:
                </span>
                <span className="text-nb-nickel/80 font-light text-sm">
                  Can I transfer from 70 to [Trump Suku product]?
                </span>
              </div>
            </div>
            <div className="text-xs text-nb-nickel/70 font-light whitespace-nowrap">
              1/7 trigger opportunities
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-2 pl-4">
              <span className="text-nb-nickel/80 font-medium whitespace-nowrap text-sm">
                Actual response:
              </span>
              <span className="text-nb-nickel/80 font-light text-sm">
                {actualResponse}
              </span>
            </div>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-nb-gold font-medium whitespace-nowrap text-sm">
                Optimal response:
              </span>
              <span className="text-nb-gold font-light text-sm">
                {optimalResponse}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-right">
        <Button
          variant="link"
          className="text-nb-gold text-sm font-medium hover:text-nb-gold-hover transition-colors duration-200 p-0"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default TriggerMoment;

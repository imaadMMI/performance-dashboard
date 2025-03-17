"use client";

import React from "react";

interface TriggerMomentProps {
  category: string;
  customerTrigger: string;
  actualResponse: string;
  optimalResponse: string;
}

const TriggerMoment: React.FC<TriggerMomentProps> = ({
  category,
  customerTrigger,
  actualResponse,
  optimalResponse,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-architects-daughter text-xl">
          Key trigger moments
        </h3>
        <p className="text-sm font-architects-daughter text-[#868e96]">
          The key compliance requirements and best-practices you fulfilled on
          the call
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center gap-6 mb-6">
          <button className="px-6 py-3 rounded-lg bg-[#91cdc5] text-white font-architects-daughter">
            {category}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-architects-daughter text-[#868e96] text-lg whitespace-nowrap">
                Customer trigger:
              </span>
              <span className="font-architects-daughter text-[#868e96] text-lg">
                {customerTrigger}
              </span>
            </div>
          </div>
          <div className="text-sm text-[#868e96] font-architects-daughter whitespace-nowrap">
            1/7 trigger opportunities
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2 pl-[120px]">
            <span className="font-architects-daughter text-[#868e96] whitespace-nowrap">
              Actual response:
            </span>
            <span className="font-architects-daughter text-[#868e96]">
              {actualResponse}
            </span>
          </div>

          <div className="flex items-start gap-2 pl-[120px]">
            <span className="font-architects-daughter text-[#c68f00] whitespace-nowrap">
              Optimal response:
            </span>
            <span className="font-architects-daughter text-[#c68f00]">
              {optimalResponse}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="text-[#c68f00] text-sm font-architects-daughter hover:underline">
          view more
        </button>
      </div>
    </div>
  );
};

export default TriggerMoment;

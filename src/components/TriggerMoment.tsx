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
        <h3 className="font-sans text-2xl">Key trigger moments</h3>
        <p className="text-base font-sans text-[#868e96]">
          The key compliance requirements and best-practices you fulfilled on
          the call
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center gap-6 mb-6">
          <button className="px-8 py-4 rounded-lg bg-[#91cdc5] text-white font-sans text-lg">
            {category}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-sans text-black text-2xl whitespace-nowrap">
                Customer trigger:
              </span>
              <span className="font-sans text-[#868e96] text-2xl">
                {customerTrigger}
              </span>
            </div>
          </div>
          <div className="text-sm text-[#868e96] font-sans whitespace-nowrap">
            1/7 trigger opportunities
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2 pl-4">
            <span className="font-sans text-[#868e96] whitespace-nowrap">
              Actual response:
            </span>
            <span className="font-sans text-[#868e96]">{actualResponse}</span>
          </div>

          <div className="flex items-start gap-2 pl-4">
            <span className="font-sans text-[#c68f00] whitespace-nowrap">
              Optimal response:
            </span>
            <span className="font-sans text-[#c68f00]">{optimalResponse}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="text-[#c68f00] text-base font-sans hover:underline">
          view more
        </button>
      </div>
    </div>
  );
};

export default TriggerMoment;

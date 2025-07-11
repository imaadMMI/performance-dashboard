"use client";

import React from "react";

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
        <h3 className="font-bold text-lg text-[#58595b]">
          Key trigger moments
        </h3>
        <p className="text-sm text-[#58595b]/80 font-light">
          The key compliance requirements and best-practices you fulfilled on
          the call
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#58595b]/10 shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <button className="px-6 py-3 rounded-lg bg-[#4db892] text-white text-sm font-medium">
            {category}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[#58595b] font-medium whitespace-nowrap text-sm">
                Customer trigger:
              </span>
              <span className="text-[#58595b]/80 font-light text-sm">
                Can I transfer from 70 to [Trump Suku product]?
              </span>
            </div>
          </div>
          <div className="text-xs text-[#58595b]/70 font-light whitespace-nowrap">
            1/7 trigger opportunities
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2 pl-4">
            <span className="text-[#58595b]/80 font-medium whitespace-nowrap text-sm">
              Actual response:
            </span>
            <span className="text-[#58595b]/80 font-light text-sm">
              {actualResponse}
            </span>
          </div>

          <div className="flex items-start gap-2 pl-4">
            <span className="text-[#b68d2e] font-medium whitespace-nowrap text-sm">
              Optimal response:
            </span>
            <span className="text-[#b68d2e] font-light text-sm">
              {optimalResponse}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="text-[#b68d2e] text-sm font-medium hover:text-[#a67d29] transition-colors duration-200">
          view more
        </button>
      </div>
    </div>
  );
};

export default TriggerMoment;

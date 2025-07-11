"use client";

import React from "react";

interface Header {
  title: string;
  description: string;
}

interface Requirement {
  name: string;
  status?: boolean;
  description?: string;
}

interface RequirementsListProps {
  title: string;
  header: Header;
  items: Requirement[];
  type: "compliance" | "practices";
}

const RequirementsList: React.FC<RequirementsListProps> = ({
  title,
  header,
  items,
  type,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative -mt-10 mb-6">
        <div className="bg-[#58595b]/5 p-3 rounded-lg w-11/12 mx-auto border border-[#58595b]/10">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-[#58595b]">
              {header.title}
            </span>
            <span className="text-[#58595b]/60 text-xs">▲</span>
          </div>
          <p className="text-xs mt-2 text-[#58595b]/80 font-light">
            {header.description}
          </p>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-6 text-[#58595b]">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              type === "compliance" ? "bg-[#4db892]" : "bg-[#ff7084]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">
                {item.name}
              </span>
              {type === "compliance" ? (
                <span className="text-white text-lg font-bold">✓</span>
              ) : (
                <span className="text-white text-lg font-bold">✕</span>
              )}
            </div>
            {item.description && (
              <p className="text-xs text-white/90 mt-3 leading-relaxed font-light">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 text-right">
        <button className="text-[#b68d2e] text-sm font-medium hover:text-[#a67d29] transition-colors duration-200">
          view more
        </button>
      </div>
    </div>
  );
};

export default RequirementsList;

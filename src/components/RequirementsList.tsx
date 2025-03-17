"use client";

import React from "react";

interface Requirement {
  name: string;
  status?: boolean;
  description?: string;
}

interface RequirementsListProps {
  title: string;
  items: Requirement[];
  type: "compliance" | "practices";
}

const RequirementsList: React.FC<RequirementsListProps> = ({
  title,
  items,
  type,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-architects-daughter text-lg">{title}</h3>
        <button className="text-[#c68f00] text-sm font-architects-daughter hover:underline">
          view more
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded ${
              type === "compliance" ? "bg-[#91cdc5]" : "bg-[#e8878b]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-architects-daughter text-white">
                {item.name}
              </span>
              {type === "compliance" ? (
                <span className="text-white text-xl">✓</span>
              ) : (
                <span className="text-white text-xl">✕</span>
              )}
            </div>
            {item.description && (
              <p className="text-sm font-architects-daughter text-white mt-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RequirementsList;

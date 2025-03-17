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
    <>
      <div className="relative -mt-10 mb-6">
        <div className="bg-gray-100 p-3 rounded-lg w-11/12 mx-auto">
          <div className="flex items-center justify-between">
            <span className="font-architects-daughter text-base">
              {header.title}
            </span>
            <span className="text-gray-500">▲</span>
          </div>
          <p className="text-xs font-architects-daughter mt-1 text-gray-600">
            {header.description}
          </p>
        </div>
      </div>
      <h3 className="font-architects-daughter text-lg mb-4">{title}</h3>
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
      <div className="mt-4 text-right">
        <button className="text-[#c68f00] text-sm font-architects-daughter hover:underline">
          view more
        </button>
      </div>
    </>
  );
};

export default RequirementsList;

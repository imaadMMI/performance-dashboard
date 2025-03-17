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
            <span className="font-sans text-lg">{header.title}</span>
            <span className="text-gray-500">▲</span>
          </div>
          <p className="text-sm font-sans mt-2 text-gray-600">
            {header.description}
          </p>
        </div>
      </div>
      <h3 className="font-sans text-xl mb-6">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              type === "compliance" ? "bg-[#91cdc5]" : "bg-[#e8878b]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-sans text-white text-lg">{item.name}</span>
              {type === "compliance" ? (
                <span className="text-white text-xl">✓</span>
              ) : (
                <span className="text-white text-xl">✕</span>
              )}
            </div>
            {item.description && (
              <p className="text-sm font-sans text-white mt-3 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <button className="text-[#c68f00] text-base font-sans hover:underline">
          view more
        </button>
      </div>
    </>
  );
};

export default RequirementsList;

"use client";

import React, { useState } from "react";

interface Category {
  name: string;
  expanded: boolean;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories: initialCategories,
}) => {
  const [categories, setCategories] = useState(initialCategories);

  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "identified strengths":
        return "💪";
      case "suggested focus":
        return "🎯";
      case "emotional trends":
        return "📈";
      case "communication style":
        return "💬";
      default:
        return "•";
    }
  };

  const getContent = (name: string) => {
    switch (name) {
      case "identified strengths":
        return "You demonstrate strong self-awareness and consistently show dedication to personal growth, you will be successful in your journey.";
      case "suggested focus":
        return "Focus on improving customer retention strategies and compliance protocols.";
      case "emotional trends":
        return "Your emotional intelligence shows steady improvement over time.";
      case "communication style":
        return "Your communication style is clear and professional.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleCategory(index)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getIcon(category.name)}</span>
              <span className="font-sans text-[#868e96] text-lg">
                {category.name}
              </span>
            </div>
            <span
              className={`transform transition-transform text-[#868e96]/70 ${
                category.expanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>
          {category.expanded && (
            <div className="mt-4 pl-10 border-l-2 border-[#e9ecef]">
              <p className="font-sans text-[#868e96] text-base leading-relaxed">
                {getContent(category.name)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

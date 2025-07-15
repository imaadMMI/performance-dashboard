"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4l-1.41 1.41C7.88 8.12 6 10.28 6 12.5c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.22-1.88-4.38-4.59-7.09L12 4z"
              fill="currentColor"
            />
          </svg>
        );
      case "suggested focus":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="8" fill="currentColor" />
          </svg>
        );
      case "emotional trends":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="12" width="4" height="8" fill="currentColor" />
            <rect x="10" y="8" width="4" height="12" fill="currentColor" />
            <rect x="16" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        );
      case "communication style":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-2l-4 4-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"
              fill="currentColor"
            />
          </svg>
        );
      default:
        return null;
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
    <div className="space-y-3">
      {categories.map((category, index) => (
        <Collapsible
          key={index}
          open={category.expanded}
          onOpenChange={() => toggleCategory(index)}
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-nb-gold/5 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <span className="text-nb-gold">{getIcon(category.name)}</span>
                <span className="font-medium text-nb-nickel text-sm">
                  {category.name}
                </span>
              </div>
              <span
                className={`transform transition-transform text-nb-nickel/60 ${
                  category.expanded ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-4 pl-10 border-l-2 border-nb-gold/20">
              <p
                className={`text-xs leading-relaxed font-light ${
                  category.name === "identified strengths"
                    ? "text-nb-nickel"
                    : "text-nb-nickel/80"
                }`}
              >
                {getContent(category.name)}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default CategoryList;

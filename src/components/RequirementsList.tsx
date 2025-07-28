"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const getBackgroundColor = () => {
    return type === "compliance" 
      ? "#10B981" 
      : "#EF4444";
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        className="relative w-11/12 mx-auto"
        style={{ 
          marginTop: "-2.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <Card 
          className="border-none"
          style={{
            backgroundColor: "#0000000D", // 5% opacity
            borderColor: "#0000001A" // 10% opacity
          }}
        >
          <CardHeader className="p-3">
            <div className="flex items-center justify-between">
              <CardTitle 
                className="font-medium text-sm text-brand-black"
              >
                {header.title}
              </CardTitle>
              <span 
                className="text-xs"
                style={{ color: "#00000099" }} // 60% opacity
              >
                ▲
              </span>
            </div>
            <CardDescription 
              className="text-xs font-light mt-2"
              style={{ 
                color: "#000000CC" // 80% opacity
              }}
            >
              {header.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h3 className="font-bold text-lg mb-6 text-brand-black">
        {title}
      </h3>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            className="border-none"
            style={{ backgroundColor: getBackgroundColor() }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">
                  {item.name}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-transparent border-none text-lg font-bold p-0 text-white"
                >
                  {type === "compliance" ? "✓" : "✕"}
                </Badge>
              </div>
              {item.description && (
                <p 
                  className="text-xs leading-relaxed font-light mt-3"
                  style={{ 
                    color: "#FFFFFFE6" // 90% opacity
                  }}
                >
                  {item.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-auto text-right pt-4">
        <Button
          variant="link"
          className="text-sm font-medium p-0 transition-colors"
          style={{
            color: "#C58E02"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FF8A00"; // Hover color
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#C58E02";
          }}
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default RequirementsList;

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
  return (
    <div className="flex flex-col h-full">
      <div className="relative -mt-10 mb-6">
        <Card className="bg-nb-nickel/5 border-nb-nickel/10 w-11/12 mx-auto">
          <CardHeader className="p-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-medium text-sm text-nb-nickel">
                {header.title}
              </CardTitle>
              <span className="text-nb-nickel/60 text-xs">▲</span>
            </div>
            <CardDescription className="text-xs mt-2 text-nb-nickel/80 font-light">
              {header.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h3 className="font-bold text-lg mb-6 text-nb-nickel">{title}</h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card
            key={index}
            className={`border-none ${
              type === "compliance"
                ? "bg-nb-secondary-green"
                : "bg-nb-secondary-red"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm font-medium">
                  {item.name}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-transparent border-none text-white text-lg font-bold p-0"
                >
                  {type === "compliance" ? "✓" : "✕"}
                </Badge>
              </div>
              {item.description && (
                <p className="text-xs text-white/90 mt-3 leading-relaxed font-light">
                  {item.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-auto pt-4 text-right">
        <Button
          variant="link"
          className="text-nb-gold text-sm font-medium hover:text-nb-gold-hover transition-colors duration-200 p-0"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default RequirementsList;

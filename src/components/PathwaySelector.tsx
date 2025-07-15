"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface PathwayOption {
  id: string;
  text: string;
}

interface PathwaySelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectScenario: (option?: PathwayOption) => void;
}

const PathwaySelector: React.FC<PathwaySelectorProps> = ({
  open,
  onClose,
  onSelectScenario,
}) => {
  const handleSelection = (option?: PathwayOption) => {
    onSelectScenario(option);
    onClose();
  };

  const pathwayOptions: PathwayOption[] = [
    {
      id: "career_journey",
      text: "Explore your career journey so far.",
    },
    {
      id: "recent_challenge",
      text: "Talk about a recent challenge you overcame.",
    },
    {
      id: "proud_project",
      text: "Share a project you're proud of.",
    },
    {
      id: "goal_discussion",
      text: "Discuss a goal you're working towards.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-bold text-nb-nickel mb-2">
            Pick a pathway
          </DialogTitle>
          <DialogDescription className="text-xs text-nb-nickel/80 font-light">
            If there&apos;s something on your mind, then choose an option to
            help me guide our conversation.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-3">
          {pathwayOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full text-left p-4 h-auto text-nb-nickel bg-nb-nickel/5 hover:bg-nb-gold/10 rounded-lg transition-colors duration-200 border border-nb-nickel/10 hover:border-nb-gold/30 hover:text-nb-nickel font-medium text-sm justify-start"
              onClick={() => handleSelection(option)}
            >
              {option.text}
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4">
          <Separator className="mb-4" />
          <div className="text-center mb-3">
            <span className="text-xs text-nb-nickel/60 font-medium">OR</span>
          </div>
          <Button
            variant="outline"
            className="w-full p-4 h-auto text-nb-nickel bg-nb-nickel/5 hover:bg-nb-gold/10 rounded-lg transition-colors duration-200 border border-nb-nickel/10 hover:border-nb-gold/30 hover:text-nb-nickel font-medium text-sm justify-start"
            onClick={() => handleSelection()}
          >
            No preference. Let&apos;s just talk.
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PathwaySelector;

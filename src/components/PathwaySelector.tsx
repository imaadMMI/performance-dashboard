"use client";

import React from "react";

interface PathwayOption {
  id: string;
  text: string;
}

interface PathwaySelectorProps {
  onClose: () => void;
  onSelectScenario: (option?: PathwayOption) => void;
}

const PathwaySelector: React.FC<PathwaySelectorProps> = ({
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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 text-center">
          <h2 className="text-lg font-bold text-[#58595b] mb-2">
            Pick a pathway
          </h2>
          <p className="text-xs text-[#58595b]/80 font-light">
            If there&apos;s something on your mind, then choose an option to
            help me guide our conversation.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {pathwayOptions.map((option) => (
              <button
                key={option.id}
                className="w-full text-left p-4 text-[#58595b] bg-[#58595b]/5 hover:bg-[#b68d2e]/10 rounded-lg transition-colors duration-200 border border-[#58595b]/10 hover:border-[#b68d2e]/30 hover:text-[#58595b] font-medium text-sm"
                onClick={() => handleSelection(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#58595b]/10">
          <div className="text-center">
            <span className="text-xs text-[#58595b]/60 font-medium">OR</span>
          </div>
          <button
            className="w-full mt-3 p-4 text-[#58595b] bg-[#58595b]/5 hover:bg-[#b68d2e]/10 rounded-lg transition-colors duration-200 text-left border border-[#58595b]/10 hover:border-[#b68d2e]/30 hover:text-[#58595b] font-medium text-sm"
            onClick={() => handleSelection()}
          >
            No preference. Let&apos;s just talk.
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathwaySelector;

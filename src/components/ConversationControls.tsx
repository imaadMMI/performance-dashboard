"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConversationControlsProps {
  onEndConversation: () => void;
  onStartConversation: () => void;
  onToggleMute: () => void;
  isActive: boolean;
}

const ConversationControls: React.FC<ConversationControlsProps> = ({
  onEndConversation,
  onStartConversation,
  onToggleMute,
  isActive,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    onToggleMute();
  };

  return (
    <div className="flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 w-fit mx-auto">
      {/* Mute/Unmute Button */}
      <Button
        onClick={handleToggleMute}
        variant="secondary"
        size="icon"
        className={`
          p-3 rounded-full transition-all duration-200 shadow-md
          ${
            isMuted
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-nb-nickel"
          }
        `}
        aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H10.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
            {/* Cross line */}
            <line
              x1="4"
              y1="4"
              x2="16"
              y2="16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H10.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
          </svg>
        )}
      </Button>

      {/* Call Action Button */}
      <Button
        onClick={isActive ? onEndConversation : onStartConversation}
        variant="secondary"
        size="icon"
        className={`
          p-3 rounded-full text-white transition-all duration-200 shadow-md
          ${
            isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }
        `}
        aria-label={isActive ? "End conversation" : "Start conversation"}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </Button>
    </div>
  );
};

export default ConversationControls;

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
    <div className="flex items-center justify-center rounded-full w-fit mx-auto gap-4 bg-brand-light px-6 py-3 shadow-lg">
      {/* Phone/Call Button */}
      <Button
        onClick={isActive ? onEndConversation : onStartConversation}
        variant="secondary"
        size="icon"
        className="rounded-full border-0 flex items-center justify-center transition-all bg-brand-white text-red-500 w-16 h-16 shadow-md hover:text-red-600 duration-200"
        aria-label={isActive ? "End conversation" : "Start conversation"}
      >
        <svg
          className="w-9 h-9"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
      </Button>

      {/* Microphone Button */}
      <Button
        onClick={handleToggleMute}
        variant="secondary"
        size="icon"
        className="rounded-full border-0 flex items-center justify-center transition-all bg-brand-white text-gray-400 w-16 h-16 shadow-md hover:text-gray-600 duration-200"
        aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
      >
        <svg
          className="w-9 h-9"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </Button>

      {/* User/Chat Button */}
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full border-0 flex items-center justify-center transition-all bg-brand-white text-brand-green w-16 h-16 shadow-md hover:text-green-600 duration-200"
        aria-label="User options"
      >
        <svg
          className="w-9 h-9"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
        </svg>
      </Button>
    </div>
  );
};

export default ConversationControls;

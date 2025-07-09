"use client";

import React, { useState } from "react";

interface ConversationControlsProps {
  onEndConversation: () => void;
  onStartConversation: () => void;
  onToggleMute: () => void;
  onShowTranscript: () => void;
  isActive: boolean;
}

const ConversationControls: React.FC<ConversationControlsProps> = ({
  onEndConversation,
  onStartConversation,
  onToggleMute,
  onShowTranscript,
  isActive,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    onToggleMute();
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-200">
      {/* Mute/Unmute Button */}
      <button
        onClick={handleToggleMute}
        className={`
          p-3 rounded-full transition-all duration-200 shadow-md
          ${
            isMuted
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-[#58595b]"
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
      </button>

      {/* Call Action Button */}
      <button
        onClick={isActive ? onEndConversation : onStartConversation}
        className={`
          p-3 rounded-full text-white transition-all duration-200 shadow-md
          ${
            isActive
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }
        `}
        aria-label={isActive ? "End conversation" : "Start conversation"}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </button>

      {/* Transcript Button - Only show when call is finished */}
      {!isActive && (
        <button
          onClick={onShowTranscript}
          className="p-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200 shadow-md"
          aria-label="Show conversation transcript"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ConversationControls;

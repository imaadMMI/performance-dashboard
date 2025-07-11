"use client";

import React, { useEffect, useState } from "react";

interface VoiceOrbProps {
  audioLevel: number;
  isListening: boolean;
  isActive: boolean;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({
  audioLevel,
  isListening,
  isActive,
}) => {
  const [orbSize, setOrbSize] = useState(200);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Calculate orb size based on audio level
  useEffect(() => {
    if (isActive && !isListening) {
      // User is speaking - modulate size based on audio
      const baseSize = 200;
      const maxIncrease = 100; // Increased from 60 for more dramatic size changes
      const normalizedLevel = Math.min(audioLevel / 30, 1); // Reduced from 100 to 30 for higher sensitivity
      const newSize = baseSize + normalizedLevel * maxIncrease;
      setOrbSize(newSize);
    } else if (isListening) {
      // AI is speaking - gentle pulse animation
      setPulseAnimation(true);
      setOrbSize(220);
    } else {
      // Default state
      setOrbSize(200);
      setPulseAnimation(false);
    }
  }, [audioLevel, isListening, isActive]);

  const getOrbColor = () => {
    if (!isActive) {
      return "bg-gradient-to-br from-gray-300 to-gray-400";
    } else if (isListening) {
      return "bg-gradient-to-br from-[#58595b] to-[#6a6b6d]";
    } else {
      // User is speaking
      return `bg-gradient-to-br from-[#b68d2e] to-[#a67d29]`;
    }
  };

  const getGlowEffect = () => {
    if (!isActive) return "";

    if (isListening) {
      return "shadow-lg shadow-[#58595b]/20";
    } else {
      return `shadow-lg shadow-[#b68d2e]/40`;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          rounded-full transition-all duration-200 ease-in-out
          ${getOrbColor()}
          ${getGlowEffect()}
          ${pulseAnimation ? "animate-pulse" : ""}
          flex items-center justify-center
        `}
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
        }}
      >
        {/* Inner circle with subtle animation */}
        <div
          className={`
            rounded-full bg-white/10 transition-all duration-300
            ${isActive ? "opacity-100" : "opacity-50"}
          `}
          style={{
            width: `${orbSize * 0.6}px`,
            height: `${orbSize * 0.6}px`,
          }}
        >
          {/* Core */}
          <div className="rounded-full bg-white/20 w-full h-full flex items-center justify-center">
            {/* Microphone icon or status indicator */}
            <div className="text-white/80 text-2xl">
              {!isActive ? (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H10.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              ) : isListening ? (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5. 943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H10.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Audio visualization rings for active speaking */}
        {isActive && !isListening && audioLevel > 5 && (
          <>
            <div
              className="absolute rounded-full border-2 border-white/30 animate-ping"
              style={{
                width: `${orbSize + 20}px`,
                height: `${orbSize + 20}px`,
              }}
            />
            <div
              className="absolute rounded-full border border-white/20 animate-ping"
              style={{
                width: `${orbSize + 40}px`,
                height: `${orbSize + 40}px`,
                animationDelay: "0.2s",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceOrb;

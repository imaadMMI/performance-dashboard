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

  // Calculate orb size based on audio level - only when active
  useEffect(() => {
    if (!isActive) {
      // When inactive, set static state and don't respond to changes
      setOrbSize(200);
      setPulseAnimation(false);
      return;
    }

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
      // Default active state
      setOrbSize(200);
      setPulseAnimation(false);
    }
  }, [audioLevel, isListening, isActive]);

  const getOrbColor = () => {
    if (!isActive) {
      return "bg-gradient-to-br from-gray-300 to-gray-400";
    } else {
      // When call is active, always stay gold regardless of listening state
      return `bg-gradient-to-br from-[#b68d2e] to-[#a67d29]`;
    }
  };

  const getGlowEffect = () => {
    if (!isActive) return "";

    // When call is active, always show gold glow
    return `shadow-lg shadow-[#b68d2e]/40`;
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          rounded-full ${
            isActive ? "transition-all duration-200 ease-in-out" : ""
          }
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
            rounded-full bg-white/10 ${
              isActive ? "transition-all duration-300" : ""
            }
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

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
  const [testMode, setTestMode] = useState(false);

  // Test mode - click orb to test wave animation
  const handleOrbClick = () => {
    setTestMode(!testMode);
    console.log("Test mode:", !testMode);
  };

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

  // Generate wave heights based only on audio volume
  const getWaveHeight = (baseHeight: number, sensitivity: number = 1) => {
    // Debug: log audio levels (remove this later)
    if (audioLevel > 0) {
      console.log(
        "Audio Level:",
        audioLevel,
        "Active:",
        isActive,
        "Listening:",
        isListening
      );
    }

    // Test mode - simulate audio levels
    if (testMode) {
      const testLevel = Math.sin(Date.now() * 0.01) * 30 + 30;
      const audioMultiplier = (testLevel / 50) * 40 * sensitivity;
      return Math.min(baseHeight + audioMultiplier, baseHeight * 3);
    }

    if (!isActive) return baseHeight;

    // More sensitive to any audio input
    if (audioLevel <= 0.5) return baseHeight;

    // Much more sensitive scaling - respond to very low audio levels
    const audioMultiplier = (audioLevel / 30) * 50 * sensitivity; // Even more sensitive
    return Math.min(baseHeight + audioMultiplier, baseHeight * 4); // Allow taller waves
  };

  const getOrbColor = () => {
    // Match the "Speak to NADA" circle from left sidebar
    return "rounded-full shadow-xl";
  };

  const getGlowEffect = () => {
    // Match the exact shadow from the sidebar circle
    return {
      backgroundColor: "#EEE4C8",
      boxShadow: "0 8px 16px rgba(139, 69, 19, 0.6)",
    };
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${getOrbColor()}
          ${pulseAnimation ? "animate-pulse" : ""}
          flex items-center justify-center relative cursor-pointer
        `}
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          ...getGlowEffect(),
        }}
        onClick={handleOrbClick}
        title="Click to test wave animation"
      >
        {/* Audio-Responsive Sound Wave Bars */}
        <div className="flex items-center justify-center space-x-2">
          {/* Wave Bar 1 - Low sensitivity */}
          <div
            className="bg-amber-700 rounded-full"
            style={{
              width: "4px",
              height: `${getWaveHeight(20, 0.6)}px`,
            }}
          />
          {/* Wave Bar 2 - Medium sensitivity */}
          <div
            className="bg-amber-700 rounded-full"
            style={{
              width: "4px",
              height: `${getWaveHeight(35, 0.8)}px`,
            }}
          />
          {/* Wave Bar 3 - Center (highest sensitivity) */}
          <div
            className="bg-amber-700 rounded-full"
            style={{
              width: "4px",
              height: `${getWaveHeight(50, 1.0)}px`,
            }}
          />
          {/* Wave Bar 4 - Medium sensitivity */}
          <div
            className="bg-amber-700 rounded-full"
            style={{
              width: "4px",
              height: `${getWaveHeight(35, 0.8)}px`,
            }}
          />
          {/* Wave Bar 5 - Low sensitivity */}
          <div
            className="bg-amber-700 rounded-full"
            style={{
              width: "4px",
              height: `${getWaveHeight(20, 0.6)}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceOrb;

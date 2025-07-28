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

  useEffect(() => {
    if (!isActive) {
      setOrbSize(200);
      setPulseAnimation(false);
      return;
    }

    if (isActive && !isListening) {
      const baseSize = 200;
      const maxIncrease = 100;
      const normalizedLevel = Math.min(audioLevel / 30, 1);
      const newSize = baseSize + normalizedLevel * maxIncrease;
      setOrbSize(newSize);
    } else if (isListening) {
      setPulseAnimation(true);
      setOrbSize(220);
    } else {
      setOrbSize(200);
      setPulseAnimation(false);
    }
  }, [audioLevel, isListening, isActive]);

  const getWaveHeight = (baseHeight: number, sensitivity: number = 1) => {
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


    if (!isActive) return baseHeight;

    if (audioLevel <= 0.5) return baseHeight;

    const audioMultiplier = (audioLevel / 30) * 50 * sensitivity;
    return Math.min(baseHeight + audioMultiplier, baseHeight * 4);
  };

  const orbStyles = {
    backgroundColor: "#F5F5F5",
    boxShadow: "0 8px 16px rgba(139, 69, 19, 0.6)",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          rounded-full shadow-xl
          ${pulseAnimation ? "animate-pulse" : ""}
          flex items-center justify-center relative cursor-pointer
        `}
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          ...orbStyles,
        }}
      >
        <div className="flex items-center justify-center gap-2">
          {[0.6, 0.8, 1.0, 0.8, 0.6].map((sensitivity, index) => (
            <div
              key={index}
              className="rounded-full"
              style={{
                width: "0.25rem",
                height: `${getWaveHeight(
                  index === 2 ? 50 : index === 1 || index === 3 ? 35 : 20,
                  sensitivity
                )}px`,
                backgroundColor: "#C58E02",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceOrb;
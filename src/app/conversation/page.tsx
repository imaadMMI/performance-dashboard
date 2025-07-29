"use client";

import React, { useState, useRef, Suspense } from "react";
import VoiceOrb from "@/components/VoiceOrb";
import { LeftSidebar } from "@/components/LeftSidebar";
import ConversationControls from "@/components/ConversationControls";
import { useSearchParams } from "next/navigation";

function ConversationContent() {
  const searchParams = useSearchParams();
  const selectedScene =
    searchParams.get("scene") || "No preference. Let's just talk.";

  const [isConversationActive, setIsConversationActive] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript] = useState("");
  const [currentMessage] = useState(`Building the conversation.`);

  // Audio context for microphone input
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize microphone access
  const initMicrophone = React.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Start monitoring audio levels
      monitorAudioLevel();
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  }, []);

  // Monitor audio level for voice orb animation
  const monitorAudioLevel = React.useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLevel = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      // Amplify the audio level for better sensitivity (multiply by 2.5)
      const amplifiedLevel = Math.min(average * 2.5, 255);
      setAudioLevel(amplifiedLevel);

      // Set listening state based on audio level
      // When user speaks (audio level > 0.1), user is speaking so isListening = false
      // When no audio input, AI might be speaking so isListening = true
      setIsListening(amplifiedLevel <= 0.1);

      requestAnimationFrame(updateLevel);
    };

    updateLevel();
  }, []);

  // Initialize microphone on mount
  React.useEffect(() => {
    initMicrophone();

    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [initMicrophone]);

  const endConversation = () => {
    setIsConversationActive(false);
    setIsListening(false);
  };

  const startConversation = () => {
    setIsConversationActive(true);
    initMicrophone();
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebar />

      <main className="flex-1 flex">
        {/* Main Content - Left Side */}
        <div className="flex-1 relative bg-white">
          {/* Absolutely positioned header text - stable */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-full text-center">
            <h2 className="text-lg font-medium text-[#58595b]">
              Designing the scenes...
            </h2>
          </div>

          {/* Centered Voice Orb Area */}
          <div className="h-full flex flex-col items-center justify-center">
            {/* Voice Orb */}
            <VoiceOrb
              audioLevel={audioLevel}
              isListening={isListening}
              isActive={isConversationActive}
            />

            {/* Live Transcript - only show if there's actual content */}
            {transcript && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto mt-8">
                <p className="text-[#58595b] leading-relaxed">{transcript}</p>
              </div>
            )}

            {/* Current AI Message - only show if there's actual content */}
            {currentMessage &&
              currentMessage !== "Building the conversation." && (
                <div className="bg-[#b68d2e]/5 p-6 rounded-xl border border-[#b68d2e]/20 max-w-lg mx-auto mt-8">
                  <p className="text-[#58595b] leading-relaxed text-sm">
                    {currentMessage}
                  </p>
                  <p className="text-[#58595b] leading-relaxed text-sm mt-2">
                    The chosen scene is:
                  </p>
                  <p className="text-[#58595b] leading-relaxed text-sm font-extrabold">
                    {selectedScene}
                  </p>
                </div>
              )}
          </div>

          {/* Absolutely positioned bottom controls - stable */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-full text-center">
            <ConversationControls
              onEndConversation={endConversation}
              onStartConversation={startConversation}
              onToggleMute={toggleMute}
              isActive={isConversationActive}
            />
          </div>
        </div>

        {/* Right Sidebar - Match main page design */}
        <div className="w-208 bg-[var(--color-nb-cream)] p-12 flex flex-col">
          {/* Timer */}
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-[var(--color-nb-nickel)] font-mono text-sm">
                00:43
              </span>
            </div>
          </div>

          {/* Live Transcript Section */}
          <div className="mb-8">
            <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-sm mb-4">
              Live transcript:
            </h3>
            <p className="text-xs text-[var(--color-nb-nickel)] opacity-75 font-gotham-book mb-4">
              You can read the conversation, along with your emotion
              measurements, as it unfolds here...
            </p>

            {/* Conversation bubbles */}
            <div className="space-y-4">
              {/* Customer message - left aligned */}
              <div className="flex flex-col items-start">
                <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                  Customer
                </p>
                <div className="bg-white p-6 rounded-lg h-20 border border-gray-200 w-[60%]">
                  {/* Empty white box */}
                </div>
              </div>

              {/* Agent message - right aligned */}
              <div className="flex flex-col items-end">
                <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                  Agent
                </p>
                <div className="bg-white p-6 rounded-lg h-20 border border-gray-200 w-[60%]">
                  {/* Empty white box */}
                </div>
              </div>

              {/* Another customer message - left aligned */}
              <div className="flex flex-col items-start">
                <p className="text-xs text-[var(--color-nb-nickel)] opacity-60 font-gotham-book mb-2">
                  Customer
                </p>
                <div className="bg-white p-6 rounded-lg h-20 border border-gray-200 w-[60%]">
                  {/* Empty white box */}
                </div>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-300 mb-8"></div>

          {/* NADA's corner section */}
          <div className="flex-1">
            <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-sm mb-4">
              NADA&apos;s corner:
            </h3>
            <p className="text-xs text-[var(--color-nb-nickel)] opacity-75 font-gotham-book mb-4">
              Read helpful advice, and special reminders from Nada as you walk
              through the scene...
            </p>

            {/* NADA's advice area */}
            <div className="bg-white p-6 rounded-lg min-h-[200px] flex items-center justify-center">
              <p className="text-sm text-[var(--color-nb-nickel)] opacity-60 font-gotham-book text-center">
                NADA&apos;s advice will appear here during the conversation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ConversationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConversationContent />
    </Suspense>
  );
}

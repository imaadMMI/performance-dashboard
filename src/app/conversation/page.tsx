"use client";

import React, { useState, useRef, Suspense } from "react";
import VoiceOrb from "@/components/VoiceOrb";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
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

  const getScenarioDescription = (scene: string) => {
    switch (scene) {
      case "Objection Handling":
        return "Respond to a customer questioning cost vs. competitors";
      case "Compliance Training":
        return "Walk a customer through the mandatory information";
      case "Upselling":
        return "Inform a customer about upgrades without introducing pressure";
      case "Customer Retention":
        return "Handle a customer who wants to cancel their policy";
      default:
        return "Open conversation practice session";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <CollapsibleSidebar />

      <main className="flex-1 flex">
        {/* Main Content - Left Side */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-[#58595b]">
                  Set the direction
                </h2>
                <p className="text-sm text-[#58595b]/80">
                  If there&apos;s something on your mind, then choose an option
                  to help me guide our <strong>conversation</strong>
                </p>
              </div>

              {/* Voice Orb */}
              <VoiceOrb
                audioLevel={audioLevel}
                isListening={isListening}
                isActive={isConversationActive}
              />

              {/* Conversation Controls */}
              <ConversationControls
                onEndConversation={endConversation}
                onStartConversation={startConversation}
                onToggleMute={toggleMute}
                isActive={isConversationActive}
              />

              {/* Live Transcript */}
              {transcript && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
                  <p className="text-[#58595b] leading-relaxed">{transcript}</p>
                </div>
              )}

              {/* Current AI Message */}
              {currentMessage && (
                <div className="bg-[#b68d2e]/5 p-6 rounded-xl border border-[#b68d2e]/20 max-w-lg mx-auto">
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
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[576px] bg-white p-6 shadow-lg border-l border-gray-200 flex flex-col">
          {/* Grey Container Wrapper */}
          <div className="bg-gray-100 p-4 rounded-lg flex-1">
            {/* Timer */}
            <div className="flex items-center justify-end mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 font-mono text-sm">00:00</span>
              </div>
            </div>

            {/* Scenario Info */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {selectedScene === "No preference. Let's just talk."
                  ? "General Session"
                  : selectedScene}
              </h2>
              <p className="text-sm text-gray-600">
                {getScenarioDescription(selectedScene)}
              </p>
            </div>

            {/* Best Practices */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Best Practices
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg h-20"></div>
                <div className="bg-white p-3 rounded-lg h-20"></div>
              </div>
            </div>

            {/* Live Transcript */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">
                LIVE TRANSCRIPT:
              </h3>
              <div className="bg-white p-3 rounded-lg min-h-[200px]">
                <p className="text-sm text-gray-600">
                  You can read the transcript of the conversation here once it
                  begins
                </p>
                {transcript && (
                  <div className="mt-3 text-sm text-gray-800">{transcript}</div>
                )}
              </div>
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

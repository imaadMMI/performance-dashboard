"use client";

import React, { useState, useRef } from "react";
import VoiceOrb from "@/components/VoiceOrb";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import ConversationControls from "@/components/ConversationControls";
import PathwaySelector from "@/components/PathwaySelector";

export default function ConversationPage() {
  const [isConversationActive, setIsConversationActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showPathwaySelector, setShowPathwaySelector] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript] = useState("");
  const [currentMessage] = useState(
    "Welcome to your general practice session. I'm here to help guide our conversation."
  );

  // Audio context for microphone input
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize microphone on component mount (since we start in conversation mode)
  React.useEffect(() => {
    initMicrophone();
  }, []);

  // Initialize microphone access
  const initMicrophone = async () => {
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
  };

  // Monitor audio level for voice orb animation
  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      // Amplify the audio level for better sensitivity (multiply by 2.5)
      const amplifiedLevel = Math.min(average * 2.5, 255);
      setAudioLevel(amplifiedLevel);
      requestAnimationFrame(updateLevel);
    };

    updateLevel();
  };

  // Start conversation
  const startConversation = async () => {
    setIsConversationActive(true);
    await initMicrophone();
  };

  // End conversation
  const endConversation = () => {
    setIsConversationActive(false);
    setIsListening(false);

    // Clean up audio resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <CollapsibleSidebar />

      <main className="flex-1 p-8 flex flex-col items-center justify-center relative">
        {/* Chat Icon for Pathway Selection */}
        <button
          onClick={() => setShowPathwaySelector(true)}
          className="fixed bottom-8 right-8 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 z-20"
          aria-label="Set conversation direction"
        >
          <svg
            className="w-6 h-6 text-[#58595b]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Main Content */}
        <div className="text-center space-y-8 max-w-2xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-[#58595b]">
                Set the direction
              </h2>
              <p className="text-lg text-[#58595b]/80">
                If there&apos;s something on your mind, then choose an option to
                help me guide our <strong>conversation</strong>
              </p>
            </div>

            {/* Voice Orb */}
            <VoiceOrb
              audioLevel={audioLevel}
              isListening={isListening}
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
                <p className="text-[#58595b] leading-relaxed">
                  {currentMessage}
                </p>
              </div>
            )}

            {/* Conversation Controls */}
            <ConversationControls
              onEndConversation={endConversation}
              onStartConversation={startConversation}
              onToggleMute={toggleMute}
              onShowTranscript={() => setShowTranscript(true)}
              isActive={isConversationActive}
            />
          </div>
        </div>

        {/* Pathway Selector Modal */}
        {showPathwaySelector && (
          <PathwaySelector
            onClose={() => setShowPathwaySelector(false)}
            onSelectScenario={() => {
              setShowPathwaySelector(false);
              startConversation();
            }}
          />
        )}

        {/* Transcript Modal */}
        {showTranscript && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Call In Progress - 00:32
                </h2>
                <button
                  onClick={() => setShowTranscript(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  aria-label="Close transcript"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {/* Transcript Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Transcript
                      </h3>
                      <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* Conversation Messages */}
                  <div className="space-y-4">
                    {/* AI Message */}
                    <div className="text-sm text-gray-500 mb-1">
                      AUGUST 15TH, FEBRUARY 2024 ● 00:32
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-blue-700">
                          AI/NADA
                        </span>
                      </div>
                      <p className="text-gray-800">
                        I&apos;m not sure whether this is the best scenario, but
                        I just completed a challenging project that really
                        pushed me out of my depth at first but ended up showing
                        a lot, even if it wasn&apos;t my best work.
                      </p>
                    </div>

                    {/* User Response */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-yellow-700">
                          USER/STAFF
                        </span>
                      </div>
                      <p className="text-gray-800">
                        That sounds like a great place to start the
                        conversation. Tell me more!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

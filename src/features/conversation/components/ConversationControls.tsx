"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Flex } from "@/components/templates/Layout";

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

  const controlsContainerStyles = {
    backgroundColor: '#F5F5F5',
    padding: '12px 24px',
    borderRadius: '9999px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  const iconButtonStyles = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: 'none',
  };

  return (
    <div className="mx-auto w-fit" style={controlsContainerStyles}>
      <Flex align="center" justify="center" gap="lg">
        <Button
          onClick={isActive ? onEndConversation : onStartConversation}
          variant="ghost"
          size="icon"
          className="text-error hover:text-error/80"
          style={iconButtonStyles}
          aria-label={isActive ? "End conversation" : "Start conversation"}
        >
          <Icon size="xl" color="error">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
          </Icon>
        </Button>

        <Button
          onClick={handleToggleMute}
          variant="ghost"
          size="icon"
          className="text-text-muted hover:text-text-secondary"
          style={iconButtonStyles}
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
        >
          <Icon size="xl" color="muted">
            {isMuted ? (
              <>
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-1a2 2 0 0 1 2-2M19 11v-1a2 2 0 0 0-2-2h-1" />
              </>
            ) : (
              <>
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </>
            )}
          </Icon>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-green hover:text-primary-green/80"
          style={iconButtonStyles}
          aria-label="User options"
        >
          <Icon size="xl" color="success">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
          </Icon>
        </Button>
      </Flex>
    </div>
  );
};

export default ConversationControls;
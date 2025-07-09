# National Bonds Voice Agent Implementation Plan

## Overview

Building an AI voice agent interface for National Bonds employees to practice customer interaction skills through roleplay scenarios. The interface will provide real-time feedback and coaching.

## Key Features from Requirements

### 1. Voice Agent Entry Point

- **Trigger**: "Speak to Nada" button (currently "Start Session")
- **Purpose**: Enter conversation with AI voice agent for roleplay training
- **Current State**: No AI implemented yet - simulate with microphone + hardcoded dialogs

### 2. Core UI Components

#### Collapsible Sidebar

- **Icon-based navigation** when collapsed
- **Full sidebar** when expanded
- **Toggle behavior**: Click icon to expand/collapse
- **National Bonds branding** and navigation maintained

#### Voice Orb (Central Element)

- **Location**: Center of conversation interface
- **Behavior**: Modulates size based on user speech
- **Input**: Microphone audio levels
- **Design**: Circular, responsive to audio input
- **Colors**: Adapt to National Bonds brand (gold/nickel)

#### Pathway Selection

- **Trigger**: Message icon in bottom right
- **Purpose**: Choose roleplay/coaching scenarios
- **Content**: Pre-defined training scenarios for employees
- **Design**: Modal or overlay with scenario options

### 3. Conversation States

#### Speaking State (User Talking)

- **Voice Orb**: Changes color slightly
- **Waveform**: Audio visualization of user speech
- **UI**: Different visual treatment when user is active
- **Reference**: Use existing Elara application implementation

#### Listening State (AI/Agent Talking)

- **Voice Orb**: Different color/animation
- **Transcript**: Live text display under orb
- **UI**: Visual indication that user should listen

### 4. Advanced Features

#### Live Transcript

- **Location**: Under voice orb during conversation
- **Content**: Real-time speech-to-text display
- **Update**: Dynamic as conversation progresses

#### Emotion Measurements

- **Tracking**: Monitor emotional metrics during conversation
- **Display**: Available via message icon during conversation
- **Metrics**: TBD - likely tone, pace, sentiment analysis

#### Conversation Summary

- **Trigger**: After conversation ends
- **Content**: Performance analysis and feedback
- **Access**: Via message icon post-conversation
- **Format**: Structured feedback with improvement suggestions

## Technical Implementation Plan

### Phase 1: Core Infrastructure

1. **Update Navigation**: Modify "Start Session" → "Speak to Nada"
2. **Create Conversation Route**: `/conversation` or `/speak-to-nada`
3. **Collapsible Sidebar Component**: Icon/full view toggle
4. **Basic Voice Orb**: Static circular component

### Phase 2: Audio Integration

1. **Microphone Access**: Web Audio API integration
2. **Audio Level Detection**: Real-time volume monitoring
3. **Voice Orb Animation**: Size modulation based on audio
4. **Waveform Visualization**: Audio wave display component

### Phase 3: Dialog System

1. **JSON Dialog Files**: Hardcoded conversation scenarios
2. **Pathway Selection Modal**: Choose training scenarios
3. **Dialog Playback**: Simulate AI responses
4. **State Management**: Track conversation progress

### Phase 4: Advanced Features

1. **Speech-to-Text**: Live transcript display
2. **Conversation States**: Speaking vs Listening UI
3. **Emotion Tracking**: Basic sentiment analysis
4. **Summary Generation**: Post-conversation feedback

## Data Structures

### Sample Dialog JSON Structure

```json
{
  "scenario": {
    "id": "retention_strategy_1",
    "title": "Customer Retention - Account Closure",
    "description": "Customer wants to close their account",
    "difficulty": "intermediate"
  },
  "conversation": [
    {
      "speaker": "ai",
      "message": "I'd like to close my National Bonds account today.",
      "emotion": "frustrated",
      "pause": 2000
    },
    {
      "speaker": "user",
      "expected_response": "I understand your concern. May I ask what's prompting this decision?",
      "hints": ["Show empathy", "Gather information", "Don't be defensive"]
    }
  ]
}
```

### Emotion Tracking Structure

```json
{
  "metrics": {
    "confidence": 8.5,
    "tone_appropriateness": 7.2,
    "response_timing": 9.1,
    "empathy_level": 6.8
  },
  "feedback": [
    "Great job showing empathy in your response",
    "Consider pausing before responding to show you're listening"
  ]
}
```

## Design Adaptations

### National Bonds Brand Integration

- **Primary Colors**: Use #b68d2e (gold) and #58595b (nickel)
- **Voice Orb**: Gold gradient with nickel accents
- **Speaking State**: Brighter gold animation
- **Listening State**: Softer nickel tones
- **Typography**: Maintain Strangeways font family
- **Buttons**: Apply brand button styles throughout

### Responsive Considerations

- **Desktop Primary**: Full sidebar and large voice orb
- **Mobile Adaptation**: Collapsible sidebar essential
- **Touch Interactions**: Large tap targets for mobile

## Success Metrics

- **User Engagement**: Time spent in conversation mode
- **Scenario Completion**: Users completing full roleplay sessions
- **Feedback Quality**: Meaningful post-conversation insights
- **Performance Improvement**: Measurable skill development

## Next Immediate Steps

1. Update main dashboard "Start Session" button
2. Create conversation page route and basic layout
3. Implement collapsible sidebar component
4. Build basic voice orb with microphone integration
5. Create sample dialog JSON files for testing

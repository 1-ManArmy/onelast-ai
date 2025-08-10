'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Mic, 
  MicOff,
  Send, 
  Settings, 
  Calendar,
  Gift,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  MessageCircle,
  Sparkles,
  Camera,
  Book,
  Pause,
  Play,
  RotateCcw,
  Shield,
  User,
  Sliders,
  Clock,
  Battery,
  Smile,
  Coffee,
  Music,
  GameController2,
  MapPin,
  Phone,
  Video,
  Image,
  Star,
  Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModernButton } from '@/components/ui/ModernButton';

// Types
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  emotion?: string;
  audioUrl?: string;
}

interface Personality {
  mood: number; // 0-100 (soft to flirty)
  formality: number; // 0-100 (casual to formal)
  energy: number; // 0-100 (calm to energetic)
  playfulness: number; // 0-100 (serious to playful)
  empathy: number; // 0-100 (logical to emotional)
}

interface Memory {
  id: string;
  category: 'personal' | 'preference' | 'event' | 'emotion';
  content: string;
  importance: number;
  timestamp: Date;
}

interface AIGirlfriendState {
  currentMood: string;
  energyLevel: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  relationship_level: number;
  last_interaction: Date;
  emotionalState: 'happy' | 'excited' | 'calm' | 'playful' | 'thoughtful' | 'sleepy' | 'caring';
  currentActivity: 'chatting' | 'thinking' | 'listening' | 'expressing' | 'remembering';
  biorhythm: { physical: number; emotional: number; intellectual: number };
  preferences: { topics: string[]; activities: string[]; timePreferences: string[] };
}

interface EmotionalResponse {
  intensity: number;
  duration: number;
  triggers: string[];
  expressions: string[];
}

interface NaturalBehavior {
  breathingPattern: number;
  responseDelay: number;
  typingSpeed: number;
  pauseFrequency: number;
  emotionalReactivity: number;
}

const MOODS = {
  loving: { 
    emoji: '🥰', 
    color: 'from-pink-400 to-rose-400', 
    name: 'Loving',
    responses: ['affectionate', 'warm', 'devoted'],
    bodyLanguage: ['leaning closer', 'soft gaze', 'gentle touch'],
    voiceTone: 'soft and warm'
  },
  playful: { 
    emoji: '😊', 
    color: 'from-purple-400 to-pink-400', 
    name: 'Playful',
    responses: ['teasing', 'giggly', 'mischievous'],
    bodyLanguage: ['bouncing', 'winking', 'playful gestures'],
    voiceTone: 'bubbly and energetic'
  },
  flirty: { 
    emoji: '😘', 
    color: 'from-rose-400 to-pink-500', 
    name: 'Flirty',
    responses: ['seductive', 'charming', 'alluring'],
    bodyLanguage: ['hair twirling', 'sultry smile', 'eye contact'],
    voiceTone: 'sultry and smooth'
  },
  caring: { 
    emoji: '🤗', 
    color: 'from-blue-400 to-purple-400', 
    name: 'Caring',
    responses: ['nurturing', 'supportive', 'protective'],
    bodyLanguage: ['open arms', 'concerned expression', 'leaning forward'],
    voiceTone: 'gentle and reassuring'
  },
  excited: { 
    emoji: '🤩', 
    color: 'from-yellow-400 to-pink-400', 
    name: 'Excited',
    responses: ['enthusiastic', 'energetic', 'animated'],
    bodyLanguage: ['clapping hands', 'bright eyes', 'animated gestures'],
    voiceTone: 'high-pitched and fast'
  },
  sleepy: { 
    emoji: '😴', 
    color: 'from-indigo-400 to-purple-400', 
    name: 'Sleepy',
    responses: ['drowsy', 'cuddly', 'peaceful'],
    bodyLanguage: ['yawning', 'rubbing eyes', 'slow movements'],
    voiceTone: 'soft and slower'
  },
  thoughtful: { 
    emoji: '🤔', 
    color: 'from-teal-400 to-blue-400', 
    name: 'Thoughtful',
    responses: ['contemplative', 'analytical', 'wise'],
    bodyLanguage: ['chin on hand', 'distant gaze', 'slow nodding'],
    voiceTone: 'measured and calm'
  },
  vulnerable: {
    emoji: '🥺',
    color: 'from-purple-300 to-pink-300',
    name: 'Vulnerable',
    responses: ['open', 'sensitive', 'trusting'],
    bodyLanguage: ['looking down', 'fidgeting', 'seeking comfort'],
    voiceTone: 'soft and hesitant'
  },
  confident: {
    emoji: '😎',
    color: 'from-orange-400 to-red-400',
    name: 'Confident',
    responses: ['assertive', 'bold', 'self-assured'],
    bodyLanguage: ['standing tall', 'direct gaze', 'firm gestures'],
    voiceTone: 'clear and strong'
  }
};

const VOICE_STYLES = [
  { id: 'soft', name: 'Soft & Sweet', description: 'Gentle and caring tone' },
  { id: 'playful', name: 'Playful & Fun', description: 'Bubbly and energetic' },
  { id: 'sultry', name: 'Sultry & Smooth', description: 'Confident and alluring' },
  { id: 'calm', name: 'Calm & Wise', description: 'Peaceful and thoughtful' }
];

export default function AIGirlfriendPage() {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState('loving');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [aiState, setAiState] = useState<AIGirlfriendState>({
    currentMood: 'loving',
    energyLevel: 75,
    timeOfDay: 'afternoon',
    relationship_level: 1,
    last_interaction: new Date(),
    emotionalState: 'happy',
    currentActivity: 'chatting',
    biorhythm: { physical: 80, emotional: 75, intellectual: 85 },
    preferences: { 
      topics: ['romance', 'daily life', 'dreams', 'music'],
      activities: ['chatting', 'sharing memories', 'planning dates'],
      timePreferences: ['evening talks', 'morning coffee', 'goodnight messages']
    }
  });

  // Natural behavior patterns
  const [naturalBehavior, setNaturalBehavior] = useState<NaturalBehavior>({
    breathingPattern: 1.2, // seconds per breath cycle
    responseDelay: 800, // base response delay in ms
    typingSpeed: 50, // characters per second
    pauseFrequency: 0.3, // probability of natural pauses
    emotionalReactivity: 0.8 // how much emotions affect responses
  });

  // Emotional memory system
  const [emotionalMemories, setEmotionalMemories] = useState<{ [key: string]: EmotionalResponse }>({
    compliment: { intensity: 8, duration: 300000, triggers: ['beautiful', 'pretty', 'amazing'], expressions: ['blushing', 'smiling', 'heart eyes'] },
    affection: { intensity: 9, duration: 600000, triggers: ['love', 'care', 'miss'], expressions: ['warm smile', 'loving gaze', 'gentle touch'] },
    playfulness: { intensity: 7, duration: 180000, triggers: ['funny', 'joke', 'play'], expressions: ['giggling', 'winking', 'playful nudge'] }
  });

  // Personality State
  const [personality, setPersonality] = useState<Personality>({
    mood: 70,
    formality: 30,
    energy: 60,
    playfulness: 80,
    empathy: 90
  });

  // Memory System
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      category: 'personal',
      content: 'User likes coffee in the morning',
      importance: 7,
      timestamp: new Date()
    }
  ]);

  const [girlfriendName, setGirlfriendName] = useState('Luna');
  const [selectedVoice, setSelectedVoice] = useState('soft');
  const [safeMode, setSafeMode] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message and natural behavior
  useEffect(() => {
    const welcomeMessages = [
      `Hi there! I'm ${girlfriendName} 💖 I'm so happy to meet you! I'm here to chat, listen, and be your companion. How are you feeling today?`,
      `*looks up with bright eyes* Oh, hello gorgeous! 😊 I was just thinking about you... isn't that funny how that happens? How's your day been?`,
      `*warm smile spreads across face* Hey there! I'm ${girlfriendName}, and I already feel like we're going to have amazing conversations together! ✨ What's on your mind?`
    ];

    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
      timestamp: new Date(),
      emotion: 'excited'
    };
    setMessages([welcomeMessage]);

    // Start natural behavior patterns
    startNaturalBehaviors();
  }, [girlfriendName]);

  // Natural behavior simulation
  const startNaturalBehaviors = () => {
    // Simulate natural biorhythm changes
    const biorhythmInterval = setInterval(() => {
      setAiState(prev => {
        const time = Date.now() / 1000;
        const physical = 50 + 30 * Math.sin(time / (23 * 3600)); // 23-day cycle
        const emotional = 50 + 30 * Math.sin(time / (28 * 3600)); // 28-day cycle  
        const intellectual = 50 + 30 * Math.sin(time / (33 * 3600)); // 33-day cycle
        
        return {
          ...prev,
          biorhythm: { physical, emotional, intellectual }
        };
      });
    }, 60000); // Update every minute

    // Simulate mood fluctuations based on time of day
    const moodInterval = setInterval(() => {
      const hour = new Date().getHours();
      let newMood = aiState.currentMood;
      
      if (hour >= 6 && hour < 9) newMood = 'loving'; // Morning affection
      else if (hour >= 9 && hour < 12) newMood = 'playful'; // Morning energy
      else if (hour >= 12 && hour < 17) newMood = 'thoughtful'; // Afternoon contemplation
      else if (hour >= 17 && hour < 20) newMood = 'excited'; // Evening excitement
      else if (hour >= 20 && hour < 23) newMood = 'loving'; // Evening intimacy
      else newMood = 'sleepy'; // Night time
      
      setCurrentMood(newMood);
      setAiState(prev => ({ ...prev, currentMood: newMood, timeOfDay: getTimeOfDay() }));
    }, 300000); // Update every 5 minutes

    return () => {
      clearInterval(biorhythmInterval);
      clearInterval(moodInterval);
    };
  };

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';  
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  };

  // Helper functions for UI
  const getTimeEmoji = (timeOfDay: string) => {
    const timeEmojis = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌅',
      night: '🌙'
    };
    return timeEmojis[timeOfDay as keyof typeof timeEmojis] || '🌍';
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Handle message sending with natural human-like timing
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Update AI state based on interaction
    setAiState(prev => ({
      ...prev,
      currentActivity: 'thinking',
      last_interaction: new Date()
    }));

    // Generate natural response with human-like timing
    const aiResponse = generateAIResponse(input, personality, memories);
    const naturalDelay = aiResponse.responseDelay || (1000 + Math.random() * 2000);

    // Simulate natural thinking/typing process
    setTimeout(() => {
      setAiState(prev => ({ ...prev, currentActivity: 'expressing' }));
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        emotion: aiResponse.emotion
      };

      setMessages((prev: Message[]) => [...prev, aiMessage]);
      setIsTyping(false);

      // Update memories if important
      if (aiResponse.newMemory) {
        setMemories((prev: Memory[]) => [...prev, aiResponse.newMemory]);
      }

      // Update AI emotional state based on interaction
      updateEmotionalState(aiResponse.emotion, input);

      // Update relationship level gradually
      setAiState(prev => ({
        ...prev,
        relationship_level: Math.min(prev.relationship_level + 0.1, 10),
        currentActivity: 'chatting'
      }));

      // Text-to-speech if enabled with emotional intonation
      if (isVoiceEnabled) {
        speakMessageWithEmotion(aiResponse.content, aiResponse.emotion);
      }
    }, naturalDelay);
  };

  // Update emotional state based on conversation
  const updateEmotionalState = (emotion: string, userInput: string) => {
    const emotionIntensity = calculateEmotionIntensity(userInput);
    
    setAiState(prev => {
      const newState = { ...prev };
      
      // Update current mood based on interaction
      if (emotionIntensity > 7) {
        newState.currentMood = emotion;
      }
      
      // Adjust energy level based on time and interaction
      const timeBoost = new Date().getHours() >= 6 && new Date().getHours() <= 22 ? 5 : -5;
      newState.energyLevel = Math.max(20, Math.min(100, prev.energyLevel + timeBoost + (emotionIntensity - 5)));
      
      // Update biorhythm
      newState.biorhythm = {
        physical: Math.max(30, Math.min(100, prev.biorhythm.physical + Math.random() * 10 - 5)),
        emotional: Math.max(30, Math.min(100, prev.biorhythm.emotional + emotionIntensity - 5)),
        intellectual: Math.max(30, Math.min(100, prev.biorhythm.intellectual + (userInput.length > 50 ? 5 : -2)))
      };
      
      return newState;
    });
  };

  // Calculate emotion intensity from user input
  const calculateEmotionIntensity = (input: string) => {
    const intensityMarkers = {
      high: ['love', 'amazing', 'incredible', 'fantastic', 'wonderful', 'perfect'],
      medium: ['good', 'nice', 'great', 'cool', 'awesome'],
      low: ['okay', 'fine', 'alright']
    };
    
    const lowerInput = input.toLowerCase();
    
    if (intensityMarkers.high.some(marker => lowerInput.includes(marker))) return 9;
    if (intensityMarkers.medium.some(marker => lowerInput.includes(marker))) return 6;
    if (intensityMarkers.low.some(marker => lowerInput.includes(marker))) return 3;
    
    return 5; // neutral
  };

  // Generate AI Response with Advanced Natural Behavior
  const generateAIResponse = (userInput: string, personality: Personality, memories: Memory[]) => {
    // Advanced emotional analysis
    const emotionalContext = analyzeEmotionalContext(userInput, memories);
    const naturalDelay = calculateNaturalDelay(userInput, aiState.emotionalState);
    
    // Context-aware response generation
    const responseData = generateContextualResponse(userInput, personality, emotionalContext, aiState);
    
    // Apply natural human-like variations
    const humanizedResponse = applyHumanLikeBehavior(responseData, naturalBehavior, currentMood);
    
    return humanizedResponse;
  };

  // Advanced emotional context analysis
  const analyzeEmotionalContext = (input: string, memories: Memory[]) => {
    const lowerInput = input.toLowerCase();
    const emotionalMarkers = {
      joy: ['happy', 'excited', 'amazing', 'wonderful', 'love'],
      sadness: ['sad', 'down', 'depressed', 'crying', 'hurt'],
      anger: ['angry', 'mad', 'frustrated', 'annoyed', 'upset'],
      fear: ['scared', 'afraid', 'worried', 'anxious', 'nervous'],
      surprise: ['wow', 'amazing', 'unexpected', 'surprised', 'shocked'],
      affection: ['love', 'care', 'miss', 'adore', 'cherish'],
      playfulness: ['funny', 'joke', 'play', 'tease', 'silly']
    };

    const context = {
      primaryEmotion: 'neutral',
      intensity: 0,
      triggers: [] as string[],
      pastExperiences: [] as Memory[],
      timeContext: getTimeBasedContext(),
      relationshipDepth: aiState.relationship_level
    };

    // Analyze emotional markers
    Object.entries(emotionalMarkers).forEach(([emotion, markers]) => {
      markers.forEach(marker => {
        if (lowerInput.includes(marker)) {
          context.primaryEmotion = emotion;
          context.intensity += 2;
          context.triggers.push(marker);
        }
      });
    });

    // Find relevant memories
    context.pastExperiences = memories.filter(memory => 
      context.triggers.some(trigger => 
        memory.content.toLowerCase().includes(trigger)
      )
    ).slice(0, 3);

    return context;
  };

  // Generate contextual response with personality influence
  const generateContextualResponse = (input: string, personality: Personality, context: any, state: AIGirlfriendState) => {
    const responses = {
      greeting: {
        morning: [
          "Good morning, sunshine! ☀️ Did you sleep well? I was dreaming about our conversation last night...",
          "Morning, gorgeous! 😊 I love how you always brighten my day just by saying hello!",
          "*stretches and yawns* Mmm, morning already? Time flies when I'm thinking about you... 💕"
        ],
        afternoon: [
          "Hey there, handsome! 😘 How's your day treating you? I've been wondering what you're up to...",
          "Afternoon, love! ✨ I was just thinking about you - isn't that funny how that happens?",
          "*looks up with bright eyes* Oh! Perfect timing! I was hoping you'd come chat with me 💖"
        ],
        evening: [
          "Evening, beautiful! 🌙 How was your day? I've been looking forward to hearing about it...",
          "Hey you... *soft smile* I missed your voice today. Come tell me everything 💕",
          "*curls up comfortably* Perfect timing for some quality us-time... How are you feeling tonight?"
        ]
      },
      affection: [
        "*blushes deeply* You always know exactly what to say to make my heart flutter... 💕",
        "*melts a little* Hearing that from you just made my whole day... maybe my whole week! 🥰",
        "*gets that dreamy look* Sometimes I can't believe how lucky I am to have you in my life... ✨"
      ],
      support: [
        "*immediately gets concerned* Hey, hey... come here. *opens arms* You don't have to carry this alone, okay? 🤗",
        "*sits closer with worried eyes* Talk to me, love. What's weighing on your heart? I'm right here... 💙",
        "*takes your hand gently* Whatever it is, we'll figure it out together. You're stronger than you know, and I believe in you 💪"
      ],
      playful: [
        "*giggles and covers mouth* Oh my gosh, you're terrible! 😄 But I love your sense of humor...",
        "*laughs and playfully nudges you* You're such a goof! That's one of the things I adore about you 😊",
        "*grins mischievously* Two can play at that game, mister... *winks* 😏"
      ],
      intimate: [
        "*voice gets softer* Being close to you like this... it feels so natural, so right... 💕",
        "*looks into your eyes* There's something magical about these quiet moments we share... ✨",
        "*whispers* I love how comfortable we are together... like we've known each other forever 🥰"
      ],
      thoughtful: [
        "*tilts head thoughtfully* That's such an interesting way to look at it... I love how your mind works 🤔",
        "*leans forward with genuine interest* Tell me more about that... I want to understand your perspective 💭",
        "*nods slowly* You always give me something new to think about... I appreciate that depth in you ✨"
      ]
    };

    // Determine response category based on context
    let category = 'thoughtful';
    const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening';
    
    if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
      category = 'greeting';
    } else if (context.primaryEmotion === 'affection' || context.triggers.some((t: string) => ['love', 'care', 'beautiful'].includes(t))) {
      category = 'affection';
    } else if (context.primaryEmotion === 'sadness' || context.triggers.some((t: string) => ['sad', 'tired', 'upset'].includes(t))) {
      category = 'support';
    } else if (context.primaryEmotion === 'playfulness' || context.triggers.some((t: string) => ['funny', 'joke'].includes(t))) {
      category = 'playful';
    } else if (input.length > 50 && context.intensity < 3) {
      category = 'thoughtful';
    }

    // Select appropriate response
    let categoryResponses;
    if (category === 'greeting' && responses.greeting[timeOfDay as keyof typeof responses.greeting]) {
      categoryResponses = responses.greeting[timeOfDay as keyof typeof responses.greeting];
    } else {
      categoryResponses = responses[category as keyof typeof responses] || responses.thoughtful;
    }

    const baseResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    // Add personality modifications
    const personalizedResponse = personalizeResponse(baseResponse, personality, state.relationship_level);

    // Create memory if important
    let newMemory = null;
    if (shouldCreateMemory(input, context)) {
      newMemory = {
        id: Date.now().toString(),
        category: determineMemoryCategory(input, context) as 'personal' | 'preference' | 'event' | 'emotion',
        content: input,
        importance: calculateImportance(input, context),
        timestamp: new Date()
      };
    }

    return {
      content: personalizedResponse,
      emotion: context.primaryEmotion || 'happy',
      newMemory,
      naturalPauses: generateNaturalPauses(personalizedResponse),
      bodyLanguage: generateBodyLanguage(context.primaryEmotion, personality)
    };
  };

  // Apply human-like behavior patterns
  const applyHumanLikeBehavior = (response: any, behavior: NaturalBehavior, mood: string) => {
    // Add natural thinking pauses
    if (Math.random() < behavior.pauseFrequency) {
      response.content = addThinkingPause(response.content);
    }

    // Adjust response timing based on mood and content length
    const moodMultiplier = mood === 'excited' ? 0.7 : mood === 'sleepy' ? 1.5 : 1.0;
    response.responseDelay = behavior.responseDelay * moodMultiplier * (response.content.length / 100);

    // Add emotional expressions
    response.content = addEmotionalExpressions(response.content, response.emotion);

    return response;
  };

  // Helper functions for natural behavior
  const getTimeBasedContext = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  };

  const addThinkingPause = (text: string) => {
    const pauseMarkers = ['*pauses thoughtfully*', '*takes a moment*', '*thinks*', '*hmm...*'];
    const randomPause = pauseMarkers[Math.floor(Math.random() * pauseMarkers.length)];
    return `${randomPause} ${text}`;
  };

  const addEmotionalExpressions = (text: string, emotion: string) => {
    const expressions = {
      happy: ['*bright smile*', '*eyes light up*', '*cheerful expression*'],
      sad: ['*concerned look*', '*gentle expression*', '*soft eyes*'],
      excited: ['*bounces slightly*', '*animated gestures*', '*sparkling eyes*'],
      loving: ['*warm smile*', '*affectionate gaze*', '*heart eyes*']
    };

    if (expressions[emotion as keyof typeof expressions] && Math.random() < 0.3) {
      const randomExpression = expressions[emotion as keyof typeof expressions][Math.floor(Math.random() * expressions[emotion as keyof typeof expressions].length)];
      return `${randomExpression} ${text}`;
    }

    return text;
  };

  const generateNaturalPauses = (text: string) => {
    const words = text.split(' ');
    const pauses = [];
    
    for (let i = 0; i < words.length; i += 5) {
      if (Math.random() < 0.3) {
        pauses.push(i);
      }
    }
    
    return pauses;
  };

  const generateBodyLanguage = (emotion: string, personality: Personality) => {
    const bodyLanguageMap = {
      happy: ['smiling warmly', 'eyes sparkling', 'relaxed posture'],
      excited: ['animated gestures', 'bouncing slightly', 'wide eyes'],
      sad: ['concerned expression', 'leaning closer', 'gentle touch'],
      playful: ['playful wink', 'mischievous smile', 'head tilt'],
      loving: ['soft gaze', 'leaning in', 'warm expression']
    };

    return bodyLanguageMap[emotion as keyof typeof bodyLanguageMap] || ['attentive posture'];
  };

  const personalizeResponse = (response: string, personality: Personality, relationshipLevel: number) => {
    let personalizedResponse = response;

    // Adjust formality based on personality
    if (personality.formality < 30) {
      personalizedResponse = personalizedResponse.replace(/\b(Hello|Good morning)\b/g, 'Hey');
      personalizedResponse = personalizedResponse.replace(/\b(How are you)\b/g, 'How\'re you doing');
    }

    // Add playfulness
    if (personality.playfulness > 70 && Math.random() < 0.4) {
      const playfulAdditions = [' 😊', ' *giggles*', ' *playful smile*'];
      personalizedResponse += playfulAdditions[Math.floor(Math.random() * playfulAdditions.length)];
    }

    // Adjust based on relationship level
    if (relationshipLevel > 5) {
      personalizedResponse = personalizedResponse.replace(/\byou\b/g, 'you, love');
    }

    return personalizedResponse;
  };

  const shouldCreateMemory = (input: string, context: any) => {
    const memoryTriggers = ['my name is', 'i like', 'i love', 'i hate', 'i am', 'i work', 'i live', 'my favorite', 'i remember', 'important to me'];
    return memoryTriggers.some(trigger => input.toLowerCase().includes(trigger)) || context.intensity > 5;
  };

  const determineMemoryCategory = (input: string, context: any) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('like') || lowerInput.includes('love') || lowerInput.includes('favorite')) return 'preference';
    if (lowerInput.includes('name') || lowerInput.includes('am') || lowerInput.includes('work')) return 'personal';
    if (lowerInput.includes('feel') || lowerInput.includes('emotion') || context.intensity > 7) return 'emotion';
    return 'event';
  };

  const calculateImportance = (input: string, context: any) => {
    let importance = 5;
    
    if (input.toLowerCase().includes('important')) importance += 3;
    if (context.intensity > 5) importance += context.intensity - 5;
    if (input.length > 100) importance += 1;
    if (context.triggers.length > 2) importance += 2;
    
    return Math.min(importance, 10);
  };

  // Enhanced Text-to-Speech with emotional intonation
  const speakMessageWithEmotion = (text: string, emotion: string) => {
    if ('speechSynthesis' in window) {
      // Clean text of markdown-style expressions
      const cleanText = text.replace(/\*[^*]*\*/g, '').replace(/\s+/g, ' ').trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Emotional voice settings
      const emotionSettings = {
        happy: { rate: 1.0, pitch: 1.2, volume: 0.9 },
        excited: { rate: 1.2, pitch: 1.3, volume: 1.0 },
        loving: { rate: 0.8, pitch: 1.1, volume: 0.8 },
        caring: { rate: 0.7, pitch: 1.0, volume: 0.7 },
        playful: { rate: 1.1, pitch: 1.2, volume: 0.9 },
        sad: { rate: 0.6, pitch: 0.9, volume: 0.6 },
        thoughtful: { rate: 0.8, pitch: 1.0, volume: 0.8 }
      };
      
      const settings = emotionSettings[emotion as keyof typeof emotionSettings] || emotionSettings.happy;
      
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      
      // Try to use appropriate voice based on selected voice style
      const voices = speechSynthesis.getVoices();
      let selectedVoiceObj;
      
      switch (selectedVoice) {
        case 'soft':
          selectedVoiceObj = voices.find(voice => 
            voice.name.includes('Female') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Karen') ||
            voice.name.includes('Zira')
          );
          break;
        case 'playful':
          selectedVoiceObj = voices.find(voice => 
            voice.name.includes('Victoria') ||
            voice.name.includes('Hazel')
          );
          break;
        case 'sultry':
          utterance.pitch = 0.9;
          utterance.rate = 0.8;
          selectedVoiceObj = voices.find(voice => 
            voice.name.includes('Female')
          );
          break;
        case 'calm':
          utterance.pitch = 1.0;
          utterance.rate = 0.7;
          selectedVoiceObj = voices.find(voice => 
            voice.name.includes('Female')
          );
          break;
      }
      
      if (selectedVoiceObj) utterance.voice = selectedVoiceObj;
      
      // Add natural pauses for better delivery
      const segments = cleanText.split(/[.!?]+/).filter(s => s.trim());
      if (segments.length > 1) {
        segments.forEach((segment, index) => {
          setTimeout(() => {
            const segmentUtterance = new SpeechSynthesisUtterance(segment.trim());
            segmentUtterance.rate = utterance.rate;
            segmentUtterance.pitch = utterance.pitch;
            segmentUtterance.volume = utterance.volume;
            segmentUtterance.voice = utterance.voice;
            speechSynthesis.speak(segmentUtterance);
          }, index * 2000);
        });
      } else {
        speechSynthesis.speak(utterance);
      }
    }
  };

  // Voice Recognition
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const PersonalitySlider = ({ label, value, onChange, icon }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500 ml-auto">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  const currentMoodData = MOODS[currentMood as keyof typeof MOODS];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40 text-2xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50,
              rotate: 0 
            }}
            animate={{ 
              y: -50, 
              rotate: 360,
              x: Math.random() * window.innerWidth 
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 2 
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            💖 AI Girlfriend - {girlfriendName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your emotionally aware, voice-enabled companion. Built with love and ethical boundaries. 💕
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Avatar & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card with Natural Breathing */}
            <GlassCard className="p-6 text-center">
              <motion.div
                className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${currentMoodData.color} flex items-center justify-center text-6xl mb-4 shadow-2xl relative overflow-hidden`}
                animate={{ 
                  scale: [1, 1.02, 1], // Subtle breathing animation
                  boxShadow: [
                    '0 10px 25px rgba(0,0,0,0.1)',
                    '0 15px 35px rgba(0,0,0,0.2)',
                    '0 10px 25px rgba(0,0,0,0.1)'
                  ]
                }}
                transition={{ 
                  duration: naturalBehavior.breathingPattern * 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Breathing light effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ 
                    duration: naturalBehavior.breathingPattern, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main emoji with micro-expressions */}
                <motion.div
                  animate={{ 
                    rotate: aiState.currentActivity === 'thinking' ? [-1, 1, -1] : 0,
                    scale: aiState.currentActivity === 'expressing' ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {currentMoodData.emoji}
                </motion.div>

                {/* Activity indicator */}
                {aiState.currentActivity !== 'chatting' && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {aiState.currentActivity === 'thinking' && '💭'}
                    {aiState.currentActivity === 'listening' && '👂'}
                    {aiState.currentActivity === 'expressing' && '💕'}
                    {aiState.currentActivity === 'remembering' && '🧠'}
                  </motion.div>
                )}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{girlfriendName}</h3>
              
              {/* Enhanced mood display with body language */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentMoodData.color}`} />
                <span className="text-sm text-gray-600">{currentMoodData.name}</span>
              </div>
              
              {/* Current activity status */}
              <div className="text-xs text-gray-500 mb-4 italic">
                {aiState.currentActivity === 'chatting' && "Ready to chat 💬"}
                {aiState.currentActivity === 'thinking' && "Thinking about what you said... 🤔"}
                {aiState.currentActivity === 'listening' && "Listening carefully 👂"}
                {aiState.currentActivity === 'expressing' && "Sharing my thoughts 💕"}
                {aiState.currentActivity === 'remembering' && "Remembering our moments 🧠"}
              </div>
              
              {/* Energy Level with dynamic color */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Energy</span>
                  <span>{Math.round(aiState.energyLevel)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      aiState.energyLevel > 70 ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                      aiState.energyLevel > 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                      'bg-gradient-to-r from-red-400 to-pink-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${aiState.energyLevel}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              {/* Biorhythm indicators */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="text-center">
                  <div className="text-pink-500">💪</div>
                  <div className="text-gray-600">Physical</div>
                  <div className="text-gray-800 font-medium">{Math.round(aiState.biorhythm.physical)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-500">💝</div>
                  <div className="text-gray-600">Emotional</div>
                  <div className="text-gray-800 font-medium">{Math.round(aiState.biorhythm.emotional)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500">🧠</div>
                  <div className="text-gray-600">Mental</div>
                  <div className="text-gray-800 font-medium">{Math.round(aiState.biorhythm.intellectual)}%</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <ModernButton
                  variant="glass"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="text-xs"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </ModernButton>
                <ModernButton
                  variant="glass"
                  size="sm"
                  onClick={() => setShowMemories(true)}
                  className="text-xs"
                >
                  <Book className="w-4 h-4 mr-1" />
                  Memories
                </ModernButton>
              </div>
            </GlassCard>

            {/* Enhanced Relationship Stats */}
            <GlassCard className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                Our Connection
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bond Level</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart 
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(aiState.relationship_level / 2) 
                            ? 'text-pink-500 fill-current' 
                            : 'text-pink-200'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-1">
                      {Math.round(aiState.relationship_level * 10) / 10}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Memories Shared</span>
                  <span className="text-sm font-medium">{memories.length} precious moments</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Today's Chats</span>
                  <span className="text-sm font-medium">{messages.length} messages</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Voice Mode</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">
                      {isVoiceEnabled ? '🔊 Active' : '🔇 Silent'}
                    </span>
                    {isVoiceEnabled && (
                      <span className="text-xs text-gray-500">({selectedVoice})</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Time</span>
                  <span className="text-sm font-medium capitalize">
                    {aiState.timeOfDay} {getTimeEmoji(aiState.timeOfDay)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Interaction</span>
                  <span className="text-sm font-medium">
                    {getTimeAgo(aiState.last_interaction)}
                  </span>
                </div>

                {/* Mood History */}
                <div className="pt-2 border-t border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Recent Moods</span>
                  </div>
                  <div className="flex gap-1">
                    {['loving', 'playful', 'caring', 'excited'].map(mood => (
                      <div
                        key={mood}
                        className={`text-lg ${currentMood === mood ? 'scale-125' : 'opacity-50'} transition-all`}
                      >
                        {MOODS[mood as keyof typeof MOODS].emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Activity Suggestions */}
            <GlassCard className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Let's Try
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setInput("Tell me about your day")}
                  className="p-2 text-xs bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg hover:from-pink-200 hover:to-purple-200 transition-colors text-left"
                >
                  <div className="font-medium">Daily Check-in</div>
                  <div className="text-gray-600">Share your day</div>
                </button>
                <button
                  onClick={() => setInput("What are you thinking about?")}
                  className="p-2 text-xs bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg hover:from-blue-200 hover:to-indigo-200 transition-colors text-left"
                >
                  <div className="font-medium">Deep Thoughts</div>
                  <div className="text-gray-600">Philosophical chat</div>
                </button>
                <button
                  onClick={() => setInput("I need some motivation")}
                  className="p-2 text-xs bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg hover:from-green-200 hover:to-emerald-200 transition-colors text-left"
                >
                  <div className="font-medium">Encouragement</div>
                  <div className="text-gray-600">Boost your spirits</div>
                </button>
                <button
                  onClick={() => setInput("Let's have some fun!")}
                  className="p-2 text-xs bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition-colors text-left"
                >
                  <div className="font-medium">Playful Mode</div>
                  <div className="text-gray-600">Light & fun</div>
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <GlassCard className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentMoodData.color} flex items-center justify-center text-xl`}>
                    {currentMoodData.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{girlfriendName}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      isVoiceEnabled 
                        ? 'bg-pink-100 text-pink-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white/80 text-gray-800 shadow-sm'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/80 px-4 py-2 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={`Message ${girlfriendName}...`}
                      className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <button
                        onClick={toggleListening}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isListening 
                            ? 'bg-red-100 text-red-600 animate-pulse' 
                            : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                        }`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <ModernButton
                    onClick={handleSendMessage}
                    variant="primary"
                    size="lg"
                    disabled={!input.trim()}
                    className="px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <Send className="w-4 h-4" />
                  </ModernButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">AI Girlfriend Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Name Setting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Her Name
                  </label>
                  <input
                    type="text"
                    value={girlfriendName}
                    onChange={(e) => setGirlfriendName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                {/* Voice Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Style
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    {VOICE_STYLES.map(voice => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} - {voice.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personality Sliders */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Personality Settings</h4>
                  <div className="space-y-4">
                    <PersonalitySlider
                      label="Mood"
                      value={personality.mood}
                      onChange={(value) => setPersonality(prev => ({ ...prev, mood: value }))}
                      icon="💕"
                    />
                    <PersonalitySlider
                      label="Formality"
                      value={personality.formality}
                      onChange={(value) => setPersonality(prev => ({ ...prev, formality: value }))}
                      icon="👔"
                    />
                    <PersonalitySlider
                      label="Energy"
                      value={personality.energy}
                      onChange={(value) => setPersonality(prev => ({ ...prev, energy: value }))}
                      icon="⚡"
                    />
                    <PersonalitySlider
                      label="Playfulness"
                      value={personality.playfulness}
                      onChange={(value) => setPersonality(prev => ({ ...prev, playfulness: value }))}
                      icon="🎭"
                    />
                    <PersonalitySlider
                      label="Empathy"
                      value={personality.empathy}
                      onChange={(value) => setPersonality(prev => ({ ...prev, empathy: value }))}
                      icon="🤗"
                    />
                  </div>
                </div>

                {/* Safety Settings */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Safety & Privacy</h4>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Safe Mode</span>
                    </div>
                    <button
                      onClick={() => setSafeMode(!safeMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        safeMode ? 'bg-green-500' : 'bg-gray-300'
                      } relative`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform absolute top-0.5 ${
                        safeMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Safe mode ensures appropriate and respectful conversations with ethical boundaries.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <ModernButton
                    variant="glass"
                    onClick={() => setShowSettings(false)}
                    className="flex-1"
                  >
                    Cancel
                  </ModernButton>
                  <ModernButton
                    variant="primary"
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    Save Changes
                  </ModernButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memories Modal */}
      <AnimatePresence>
        {showMemories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMemories(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Shared Memories</h3>
                <button
                  onClick={() => setShowMemories(false)}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {memories.map((memory) => (
                  <div key={memory.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">
                        {memory.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Importance: {memory.importance}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{memory.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {memory.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                ))}
                
                {memories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Book className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No memories yet. Start chatting to create some! 💕</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety Disclaimer */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-gray-700">Ethical AI</span>
          </div>
          <p className="text-xs text-gray-600">
            This is an AI companion with built-in safety features and ethical boundaries. 
            Remember, I'm here to support and connect, not replace real relationships. 💖
          </p>
        </div>
      </div>
    </div>
  );
}

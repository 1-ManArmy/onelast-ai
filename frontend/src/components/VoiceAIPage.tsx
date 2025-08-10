import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  User,
  Bot,
  Clock,
  Settings,
  Zap
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { ModernButton } from './ui/ModernButton';

interface VoiceSession {
  id: string;
  timestamp: string;
  duration: number;
  transcription: string;
  response: string;
  personality: string;
}

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  voice: string;
  color: string;
}

export function VoiceAIPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedPersonality, setSelectedPersonality] = useState('assistant');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sessions, setSessions] = useState<VoiceSession[]>([]);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const personalities: AIPersonality[] = [
    {
      id: 'assistant',
      name: 'Professional Assistant',
      description: 'Helpful and professional AI assistant',
      voice: 'calm',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'creative',
      name: 'Creative Companion',
      description: 'Imaginative and inspiring creative partner',
      voice: 'enthusiastic',
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 'technical',
      name: 'Tech Expert',
      description: 'Technical and analytical problem solver',
      voice: 'precise',
      color: 'from-green-500 to-cyan-500'
    },
    {
      id: 'friendly',
      name: 'Friendly Companion',
      description: 'Warm and conversational friend',
      voice: 'warm',
      color: 'from-yellow-500 to-red-500'
    }
  ];

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentTranscription(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current?.start();
        }
      };
    }

    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        await processRecording(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      setCurrentTranscription('');

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Start timer
      recordingTimer.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
        recordingTimer.current = null;
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const processRecording = async (audioBlob: Blob) => {
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const personality = personalities.find(p => p.id === selectedPersonality) || personalities[0];
      
      const responses = {
        assistant: [
          "I understand your request. Let me provide you with a comprehensive solution.",
          "Based on what you've shared, here's my professional analysis.",
          "I'm here to assist you with that. Here's what I recommend."
        ],
        creative: [
          "What an exciting creative challenge! Let me spark some innovative ideas.",
          "I love your creative vision! Here are some inspiring possibilities.",
          "Let's explore the creative dimensions of your idea together."
        ],
        technical: [
          "From a technical perspective, here's the optimal approach.",
          "Let me analyze the technical requirements and provide a solution.",
          "Here's the systematic breakdown of your technical query."
        ],
        friendly: [
          "That's really interesting! I'd love to chat about that with you.",
          "Thanks for sharing that with me! Here's what I think about it.",
          "I really enjoy our conversations! Let me share my thoughts on this."
        ]
      };

      const personalityResponses = responses[selectedPersonality as keyof typeof responses] || responses.assistant;
      const response = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];

      const newSession: VoiceSession = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        duration: recordingDuration,
        transcription: currentTranscription || '[Voice input processed]',
        response,
        personality: personality.name
      };

      setSessions(prev => [newSession, ...prev]);

      // Text-to-speech response
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = personality.id === 'technical' ? 0.9 : 0.8;
        utterance.pitch = personality.id === 'friendly' ? 1.2 : 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }

      setIsProcessing(false);
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedPersonalityData = personalities.find(p => p.id === selectedPersonality) || personalities[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedPersonalityData.color} shadow-2xl glow-effect`}>
                <Mic size={32} color="white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Voice AI Assistant</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience natural voice conversations with AI personalities tailored to your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Personality Selection */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings size={20} />
                  AI Personality
                </h3>
                <div className="space-y-3">
                  {personalities.map((personality) => (
                    <motion.div
                      key={personality.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => setSelectedPersonality(personality.id)}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          selectedPersonality === personality.id
                            ? 'bg-white/20 border border-white/30'
                            : 'hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${personality.color}`} />
                          <div>
                            <div className="font-medium text-white text-sm">{personality.name}</div>
                            <div className="text-xs text-gray-300">{personality.description}</div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                      voiceEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    Voice Response {voiceEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* Recording Interface */}
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-8">
                <div className="text-center">
                  <motion.div
                    className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                      isRecording ? 'animate-pulse' : ''
                    } bg-gradient-to-r ${selectedPersonalityData.color} shadow-2xl`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ModernButton
                      onClick={isRecording ? stopRecording : startRecording}
                      variant="ghost"
                      className="w-full h-full rounded-full"
                      disabled={isProcessing}
                    >
                      {isRecording ? (
                        <MicOff size={48} color="white" />
                      ) : (
                        <Mic size={48} color="white" />
                      )}
                    </ModernButton>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {selectedPersonalityData.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{selectedPersonalityData.description}</p>

                  {isRecording && (
                    <div className="space-y-4">
                      <div className="text-2xl font-mono text-white">
                        {formatDuration(recordingDuration)}
                      </div>
                      <div className="flex justify-center">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-white rounded-full"
                              animate={{
                                height: [10, 30, 10],
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {currentTranscription && (
                        <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
                          <p className="text-white text-sm">{currentTranscription}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {isProcessing && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-white">
                        <Zap size={20} className="animate-pulse" />
                        <span>Processing your voice...</span>
                      </div>
                      <div className="w-32 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  )}

                  {!isRecording && !isProcessing && (
                    <ModernButton
                      onClick={startRecording}
                      variant="primary"
                      className="px-8 py-3"
                    >
                      Start Voice Conversation
                    </ModernButton>
                  )}
                </div>
              </GlassCard>

              {/* Session History */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  Voice Sessions
                </h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {sessions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No voice sessions yet</p>
                  ) : (
                    sessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">{session.timestamp}</span>
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            {formatDuration(session.duration)}
                          </span>
                        </div>
                        <div className="text-sm text-white mb-2">
                          <strong>You:</strong> {session.transcription}
                        </div>
                        <div className="text-sm text-gray-300">
                          <strong>{session.personality}:</strong> {session.response}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

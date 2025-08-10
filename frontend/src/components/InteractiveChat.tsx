import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  MessageCircle,
  Bot,
  User,
  Settings
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { ModernButton } from './ui/ModernButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isVoice?: boolean;
  audioUrl?: string;
}

export function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentModule, setCurrentModule] = useState('general');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Voice modules
  const modules = [
    { id: 'general', name: 'General Chat', color: 'from-blue-500 to-purple-500' },
    { id: 'emotion', name: 'Emotion Analysis', color: 'from-pink-500 to-red-500' },
    { id: 'assistant', name: 'AI Assistant', color: 'from-green-500 to-emerald-500' },
    { id: 'creative', name: 'Creative Mode', color: 'from-orange-500 to-yellow-500' }
  ];

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const voiceMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: '[Voice Message]',
          timestamp: new Date().toLocaleTimeString(),
          isVoice: true,
          audioUrl
        };

        setMessages(prev => [...prev, voiceMessage]);
        handleAIResponse('[Voice Message]', true);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    handleAIResponse(input.trim());
    setInput('');
  };

  const handleAIResponse = (userInput: string, isVoice = false) => {
    setTimeout(() => {
      const responses = {
        general: [
          "I understand what you're saying. Let me help you with that.",
          "That's an interesting point. Here's my perspective...",
          "Based on your message, I think..."
        ],
        emotion: [
          "I can sense the emotion in your voice. You seem to be feeling...",
          "Your emotional state appears to be...",
          "Let me analyze the sentiment of your message..."
        ],
        assistant: [
          "As your AI assistant, I'm here to help you with...",
          "I can assist you with that task. Here's what I recommend...",
          "Let me provide you with a comprehensive solution..."
        ],
        creative: [
          "What a creative idea! Let's explore this further...",
          "Thinking creatively about your request...",
          "Here's an innovative approach to consider..."
        ]
      };

      const moduleResponses = responses[currentModule as keyof typeof responses] || responses.general;
      const response = moduleResponses[Math.floor(Math.random() * moduleResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString(),
        isVoice: isVoice && voiceEnabled
      };

      setMessages(prev => [...prev, aiMessage]);

      // Text-to-speech for AI responses
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 2000);
  };

  const playAudio = (audioUrl: string, messageId: string) => {
    if (isPlaying === messageId) {
      setIsPlaying(null);
      return;
    }

    const audio = new Audio(audioUrl);
    setIsPlaying(messageId);
    
    audio.onended = () => {
      setIsPlaying(null);
    };
    
    audio.play();
  };

  const currentModuleData = modules.find(m => m.id === currentModule) || modules[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${currentModuleData.color} shadow-2xl glow-effect`}>
                <MessageCircle size={32} color="white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Interactive Voice Chat</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience advanced AI conversation with voice recognition and synthesis
            </p>
          </div>

          {/* Controls */}
          <GlassCard className="mb-6 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <label className="text-white font-medium">Module:</label>
                <select
                  value={currentModule}
                  onChange={(e) => setCurrentModule(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {modules.map(module => (
                    <option key={module.id} value={module.id} className="bg-gray-800">
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    voiceEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  Voice {voiceEnabled ? 'On' : 'Off'}
                </button>
                
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Voice Chat Active</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Chat Interface */}
          <GlassCard className="h-[500px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Bot size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">Start a voice conversation with AI</p>
                  </motion.div>
                )}
                
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : `bg-gradient-to-r ${currentModuleData.color}`
                    }`}>
                      {message.role === 'user' ? (
                        <User size={16} color="white" />
                      ) : (
                        <Bot size={16} color="white" />
                      )}
                    </div>
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}>
                        <div className="flex items-center gap-2">
                          {message.isVoice && message.audioUrl && (
                            <button
                              onClick={() => playAudio(message.audioUrl!, message.id)}
                              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            >
                              {isPlaying === message.id ? (
                                <Pause size={12} />
                              ) : (
                                <Play size={12} />
                              )}
                            </button>
                          )}
                          <span>{message.content}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or speak your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                
                <ModernButton
                  type="button"
                  variant={isListening ? "secondary" : "outline"}
                  onClick={isListening ? stopListening : startListening}
                  className={`px-4 py-2 ${isListening ? 'animate-pulse' : ''}`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </ModernButton>

                <ModernButton
                  type="button"
                  variant={isRecording ? "secondary" : "outline"}
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-4 py-2 ${isRecording ? 'animate-pulse bg-red-500/20' : ''}`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </ModernButton>
                
                <ModernButton
                  type="submit"
                  variant="primary"
                  disabled={!input.trim()}
                  className="px-4 py-2"
                >
                  <Send size={16} />
                </ModernButton>
              </form>
            </div>
          </GlassCard>

          {/* Voice Waves Animation */}
          {(isListening || isRecording) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-8">
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
                <p className="text-white text-center mt-4 text-sm">
                  {isListening ? 'Listening...' : 'Recording...'}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

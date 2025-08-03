import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Send, 
  Code, 
  FileText, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  User,
  Bot
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { ModernButton } from './ui/ModernButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AssistantMode {
  id: string;
  name: string;
  icon: React.ComponentType;
  description: string;
  color: string;
}

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modes: AssistantMode[] = [
    { 
      id: 'general', 
      name: 'General Assistant', 
      icon: MessageCircle, 
      description: 'General purpose AI assistance',
      color: 'from-blue-500 to-purple-500'
    },
    { 
      id: 'code', 
      name: 'Code Helper', 
      icon: Code, 
      description: 'Programming and development help',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'writing', 
      name: 'Writing Assistant', 
      icon: FileText, 
      description: 'Content creation and editing',
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'creative', 
      name: 'Creative Mode', 
      icon: Sparkles, 
      description: 'Creative thinking and brainstorming',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(input.trim(), selectedMode),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const getSimulatedResponse = (input: string, mode: string): string => {
    const responses = {
      general: [
        "I understand your question. Let me help you with that...",
        "That's an interesting point. Here's what I think...",
        "Based on what you've shared, I'd suggest...",
      ],
      code: [
        "Here's a code solution for your problem:\n\n```javascript\n// Example code\nfunction solution() {\n  return 'Hello, World!';\n}\n```",
        "For this programming challenge, I recommend...",
        "The error you're encountering is likely due to..."
      ],
      writing: [
        "Here's a refined version of your text...",
        "To improve your writing, consider...",
        "Your content structure could benefit from..."
      ],
      creative: [
        "What an imaginative idea! Let's explore...",
        "Here are some creative approaches you could try...",
        "Thinking outside the box, you might consider..."
      ]
    };

    const modeResponses = responses[mode as keyof typeof responses] || responses.general;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  };

  const selectedModeData = modes.find(m => m.id === selectedMode) || modes[0];

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
              <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedModeData.color} shadow-2xl glow-effect`}>
                <Brain size={32} color="white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-2">AI Assistant</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose your preferred AI mode and start a conversation. Get help with coding, writing, 
              creative tasks, or general questions.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Mode Selection Sidebar */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">AI Modes</h3>
                <div className="space-y-3">
                  {modes.map((mode) => {
                    const IconComponent = mode.icon;
                    return (
                      <motion.div
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => setSelectedMode(mode.id)}
                          className={`w-full p-3 rounded-lg text-left transition-all ${
                            selectedMode === mode.id
                              ? 'bg-white/20 border border-white/30'
                              : 'hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${mode.color}`}>
                              <IconComponent size={16} color="white" />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">{mode.name}</div>
                              <div className="text-xs text-gray-300">{mode.description}</div>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <GlassCard className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedModeData.color}`}>
                      <selectedModeData.icon size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedModeData.name}</h3>
                      <p className="text-sm text-gray-300">{selectedModeData.description}</p>
                    </div>
                  </div>
                </div>

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
                        <p className="text-gray-400">Start a conversation with your AI assistant</p>
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
                            : `bg-gradient-to-r ${selectedModeData.color}`
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
                            <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                          </div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Clock size={12} />
                            {message.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${selectedModeData.color}`}>
                        <Bot size={16} color="white" />
                      </div>
                      <div className="bg-white/10 text-white border border-white/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Ask ${selectedModeData.name.toLowerCase()}...`}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      disabled={isLoading}
                    />
                    <ModernButton
                      type="submit"
                      variant="primary"
                      disabled={!input.trim() || isLoading}
                      className="px-4 py-2"
                    >
                      <Send size={16} />
                    </ModernButton>
                  </form>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

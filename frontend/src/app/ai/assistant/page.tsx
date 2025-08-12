'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff, 
  Settings, 
  Trash2, 
  Download,
  Copy,
  MessageSquare,
  Sparkles,
  Zap,
  User,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModernButton } from '@/components/ui/ModernButton';
import Navigation from '@/components/Navigation';
import FooterNew from '@/components/FooterNew';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'image' | 'voice';
}

const AIAssistantPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🤖✨ Hello! I'm your OneLast AI Assistant - the most advanced AI companion designed specifically for students and young professionals. I can help you with:\n\n💡 **Study & Learning** - Explain complex topics, create study guides\n📚 **Research & Writing** - Help with essays, projects, and assignments  \n🎯 **Career Planning** - Interview prep, resume tips, skill development\n🧠 **Creative Projects** - Brainstorming, problem-solving, innovation\n💬 **Daily Chat** - Friendly conversations and emotional support\n\nWhat would you like to explore today? 🚀",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample conversation starters
  const conversationStarters = [
    "Help me understand quantum physics",
    "Create a study plan for my exams",
    "Review my resume for tech jobs",
    "Brainstorm startup ideas",
    "Explain AI and machine learning",
    "Help with creative writing"
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSmartAIResponse(currentInput),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateSmartAIResponse = (input: string): string => {
    const topic = input.toLowerCase();
    
    if (topic.includes('study') || topic.includes('learn') || topic.includes('exam')) {
      return `📚 **Study & Learning Support**\n\nGreat question about studying! Here's my personalized approach for "${input}":\n\n✅ **Break it down** - Divide complex topics into manageable chunks\n✅ **Active recall** - Test yourself regularly instead of just re-reading\n✅ **Spaced repetition** - Review material at increasing intervals\n✅ **Practice problems** - Apply concepts to reinforce understanding\n\nWould you like me to create a specific study schedule or explain any particular concept in detail? I'm here to make learning easier and more effective! 🎯`;
    }
    
    if (topic.includes('career') || topic.includes('job') || topic.includes('resume')) {
      return `💼 **Career Development Guidance**\n\nExcellent! Career planning is crucial for your future success. For "${input}", here's my strategic advice:\n\n🎯 **Skills Assessment** - Identify your strengths and growth areas\n🎯 **Market Research** - Understand industry trends and demands\n🎯 **Network Building** - Connect with professionals in your field\n🎯 **Portfolio Development** - Showcase your best work and projects\n\nI can help you with interview prep, resume optimization, or creating a personalized career roadmap. What specific area would you like to focus on? 🚀`;
    }
    
    if (topic.includes('creative') || topic.includes('idea') || topic.includes('brainstorm')) {
      return `🎨 **Creative Innovation Hub**\n\nFantastic! Creativity is the cornerstone of innovation. For "${input}", let's unlock your creative potential:\n\n💡 **Divergent Thinking** - Generate multiple unique solutions\n💡 **Cross-Pollination** - Combine ideas from different fields\n💡 **Rapid Prototyping** - Test concepts quickly and iterate\n💡 **Fresh Perspectives** - Challenge assumptions and think differently\n\nI love creative challenges! Whether it's for business, art, writing, or problem-solving, I can help you develop groundbreaking ideas. What's your creative vision? ✨`;
    }
    
    // Default intelligent response
    return `🧠 **AI Analysis & Response**\n\nThanks for sharing "${input}" with me! This is a fascinating topic that deserves a thoughtful response.\n\n**My Understanding:**\nYou're exploring an important area that requires both analytical thinking and practical application.\n\n**Strategic Insights:**\n• Consider multiple perspectives and approaches\n• Look for patterns and underlying principles  \n• Think about real-world applications and impact\n• Connect ideas across different domains\n\n**Next Steps:**\nI can dive deeper into any aspect of this topic, provide specific examples, or help you develop actionable strategies. What would be most valuable for you right now? 🎯\n\n*Remember: The best solutions often come from asking better questions!*`;
  };

  const handleQuickStart = (starter: string) => {
    setInputMessage(starter);
    inputRef.current?.focus();
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("Voice message received! (Voice feature coming soon)");
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: "🤖✨ Chat cleared! I'm ready for our next conversation. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date(),
    }]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        <GlassCard className="text-center z-10 max-w-md mx-4">
          <Brain className="w-16 h-16 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl font-bold gradient-text mb-4">OneLast AI Assistant</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">Your intelligent study companion awaits! Please log in to start learning with AI.</p>
          <ModernButton onClick={() => router.push('/login')} variant="primary" size="lg" glow>
            <Crown className="w-5 h-5 mr-2" />
            Access AI Assistant
          </ModernButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <ParticleBackground />
      <Navigation />
      
      <div className="pt-20 pb-4 px-4 h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="backdrop-blur-xl bg-white/10 border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl glow-effect"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Brain size={32} color="white" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold gradient-text">OneLast AI Assistant</h1>
                    <p className="text-gray-300 text-sm">Your intelligent learning companion • Powered by advanced AI</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-2 mr-4">
                    <span className="text-xs text-gray-400">Welcome back,</span>
                    <span className="text-sm text-purple-300 font-medium">{user.firstName || user.username}</span>
                  </div>
                  <ModernButton 
                    variant="glass" 
                    size="sm"
                    onClick={clearChat}
                  >
                    <Trash2 className="w-4 h-4" />
                  </ModernButton>
                  <ModernButton 
                    variant="glass" 
                    size="sm"
                    onClick={() => setIsVoiceMode(!isVoiceMode)}
                  >
                    <Settings className="w-4 h-4" />
                  </ModernButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Start Suggestions (only show when minimal messages) */}
          {messages.length <= 1 && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="backdrop-blur-xl bg-white/5 border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Quick Start Ideas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {conversationStarters.map((starter, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickStart(starter)}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 text-left text-sm text-gray-300 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {starter}
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Chat Messages */}
          <motion.div 
            className="flex-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="h-full backdrop-blur-xl bg-white/5 border-white/10">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`p-5 rounded-2xl relative ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/20' 
                              : 'bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-lg'
                          }`}>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {message.text}
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                              <p className="text-xs opacity-60">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                              {message.sender === 'ai' && (
                                <div className="flex gap-1">
                                  <button className="p-1 rounded hover:bg-white/10 transition-colors">
                                    <Copy className="w-3 h-3 opacity-60 hover:opacity-100" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {message.sender === 'ai' && (
                          <div className="order-0 mr-4 mt-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                              <Brain size={20} color="white" />
                            </div>
                          </div>
                        )}
                        
                        {message.sender === 'user' && (
                          <div className="order-3 ml-4 mt-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-lg">
                              <User size={20} color="white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                          <Brain size={20} color="white" />
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-purple-300 font-medium">OneLast AI is thinking...</span>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Input Area */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlassCard className="backdrop-blur-xl bg-white/10 border-white/20">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything... I'm here to help with your studies, career, and more! 🤖✨"
                      className="w-full p-5 bg-transparent border-none outline-none text-white placeholder-gray-400 text-base resize-none"
                      disabled={isTyping}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Voice Button */}
                  <ModernButton
                    variant={isListening ? "primary" : "glass"}
                    size="md"
                    onClick={handleVoiceToggle}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </ModernButton>
                  
                  {/* Send Button */}
                  <ModernButton
                    variant="primary"
                    size="md"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    glow
                    className="px-6"
                  >
                    <Send className="w-5 h-5" />
                    <span className="ml-2 hidden sm:block">Send</span>
                  </ModernButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      {/* Beautiful Footer */}
      <FooterNew />
    </div>
  );
};

export default AIAssistantPage;

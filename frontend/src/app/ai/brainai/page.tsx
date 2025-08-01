'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

interface BrainMessage {
  id: string;
  type: 'user' | 'brain';
  content: string;
  timestamp: string;
  activated: boolean;
}

export default function BrainAIPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [messages, setMessages] = useState<BrainMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userName, setUserName] = useState('User');
  const [respectTrigger, setRespectTrigger] = useState('hey');
  const [brainStats, setBrainStats] = useState({
    totalCommands: 0,
    totalMemories: 0,
    activationRate: 0
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user info (mock for now)
    setUserName('John'); // This would come from user auth
    
    // Add welcome message
    const welcomeMessage: BrainMessage = {
      id: '1',
      type: 'brain',
      content: `🧠 Hello! I'm Brain AI, your respectful personal assistant. To activate me, say: "${respectTrigger} ${userName}, please [your request]". I will only respond when you show me respect! 😊`,
      timestamp: new Date().toLocaleTimeString(),
      activated: true
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubscribe = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!currentMessage.trim()) return;

    const userMessage: BrainMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
      activated: false
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    const messageToProcess = currentMessage;
    setCurrentMessage('');

    try {
      // Simulate API call to Brain AI
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check 3-key activation
      const lowerMessage = messageToProcess.toLowerCase();
      const hasRespectTrigger = ['hey', 'hello', 'dear', 'darling', 'hi'].some(trigger => 
        lowerMessage.includes(trigger)
      );
      const hasUserName = lowerMessage.includes(userName.toLowerCase());
      const hasPoliteness = lowerMessage.includes('please');
      
      const isActivated = hasRespectTrigger && hasUserName && hasPoliteness;
      
      let brainResponse = '';
      
      if (!isActivated) {
        const missingKeys = [];
        if (!hasRespectTrigger) missingKeys.push('respectful greeting');
        if (!hasUserName) missingKeys.push('your name');
        if (!hasPoliteness) missingKeys.push('"please"');
        
        brainResponse = `🧠 I require respectful activation. You're missing: ${missingKeys.join(', ')}. Try: "${respectTrigger} ${userName}, please [your request]"`;
      } else {
        // Generate appropriate response based on content
        if (lowerMessage.includes('save') || lowerMessage.includes('remember')) {
          brainResponse = '🧠 I\'ve saved that information in my memory. You can ask me to recall it anytime! Your data is safe with me.';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('number')) {
          brainResponse = '📞 I\'ll save this contact information for you. I can help you find it later by name, date, or partial details.';
        } else if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule')) {
          brainResponse = '📅 I\'ve noted this in your schedule. I\'ll remember all the details and can remind you when needed.';
        } else if (lowerMessage.includes('find') || lowerMessage.includes('recall')) {
          brainResponse = '🔍 Let me search through my perfect memory for you... I remember everything you\'ve told me!';
        } else {
          brainResponse = '🧠 Thank you for activating me respectfully! I\'m ready to help. What would you like me to remember or do for you?';
        }
      }

      const brainMessage: BrainMessage = {
        id: (Date.now() + 1).toString(),
        type: 'brain',
        content: brainResponse,
        timestamp: new Date().toLocaleTimeString(),
        activated: isActivated
      };

      setMessages(prev => [...prev, brainMessage]);
      
      if (isActivated) {
        setBrainStats(prev => ({
          ...prev,
          totalCommands: prev.totalCommands + 1,
          totalMemories: lowerMessage.includes('save') ? prev.totalMemories + 1 : prev.totalMemories
        }));
      }

    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [currentMessage, userName, respectTrigger]);

  const startVoiceListening = useCallback(() => {
    setIsListening(true);
    // Simulate voice listening
    setTimeout(() => {
      setCurrentMessage(`Hey ${userName}, please save this contact number 555-1234 for Mike`);
      setIsListening(false);
    }, 3000);
  }, [userName]);

  return (
    <div className="bg-gradient-to-br from-purple-950 via-pink-900 to-indigo-950 min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-8xl mb-6"
            whileHover={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
          >
            🧠
          </motion.div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-500 to-indigo-700 bg-clip-text text-transparent">
            Brain AI
          </h1>
          
          <p className="text-2xl mb-8 text-purple-300 font-medium max-w-4xl mx-auto">
            Your respectful personal AI that remembers everything. Activated only with respect - requires greeting, your name, and "please".
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-purple-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-purple-500/20">
              <span className="text-green-400">●</span>
              <span className="text-purple-200">3-Key Activation</span>
            </div>
            <div className="flex items-center space-x-3 bg-pink-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-pink-500/20">
              <span className="text-yellow-400">●</span>
              <span className="text-pink-200">Perfect Memory</span>
            </div>
            <div className="flex items-center space-x-3 bg-indigo-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-indigo-500/20">
              <span className="text-red-400">●</span>
              <span className="text-indigo-200">Voice Commands</span>
            </div>
          </div>
        </motion.div>

        {/* Activation Keys Info */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-800/30 to-pink-900/30 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">
              🔐 3-Key Respectful Activation System
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-700/30 rounded-2xl">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">Key 1: Respect</h3>
                <p className="text-purple-200 text-sm">Hey, Hello, Dear, Darling, Hi</p>
              </div>
              
              <div className="text-center p-6 bg-pink-700/30 rounded-2xl">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-bold mb-2 text-pink-300">Key 2: Your Name</h3>
                <p className="text-pink-200 text-sm">"{userName}" (Auto from your profile)</p>
              </div>
              
              <div className="text-center p-6 bg-indigo-700/30 rounded-2xl">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold mb-2 text-indigo-300">Key 3: Please</h3>
                <p className="text-indigo-200 text-sm">"Please" (Always required)</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-800/30 to-emerald-900/30 rounded-2xl">
              <h4 className="text-lg font-bold text-green-300 mb-2">✅ Example Command:</h4>
              <p className="text-green-200 text-lg">"Hey {userName}, please save this contact number 555-1234"</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            💬 Talk to Brain AI
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Messages Area */}
            <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-6 mb-6 h-96 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : message.activated 
                        ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white' 
                        : 'bg-red-600/70 text-white'
                  }`}>
                    <p className="text-sm font-medium mb-1">
                      {message.type === 'user' ? 'You' : 'Brain AI'}
                    </p>
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left mb-4"
                >
                  <div className="inline-block p-4 rounded-2xl bg-purple-700/50">
                    <p className="text-sm font-medium mb-1">Brain AI</p>
                    <p>🧠 Processing your request...</p>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="flex gap-4">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Try: "${respectTrigger} ${userName}, please save my meeting tomorrow at 3pm"`}
                className="flex-1 bg-purple-900/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={isProcessing}
                className="bg-gradient-to-r from-purple-600 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
              >
                {isProcessing ? '🧠' : '📤'} Send
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startVoiceListening}
                disabled={isListening}
                className={`px-8 py-4 rounded-xl font-semibold ${
                  isListening 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : 'bg-gradient-to-r from-pink-600 to-purple-700 text-white'
                }`}
              >
                {isListening ? '🎤 Listening...' : '🎤 Voice'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            📊 Your Brain AI Stats
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-800/40 to-pink-900/40 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/20 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-purple-300 mb-2">{brainStats.totalCommands}</h3>
              <p className="text-purple-200">Commands Processed</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-800/40 to-indigo-900/40 backdrop-blur-xl p-6 rounded-3xl border border-pink-500/20 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-pink-300 mb-2">{brainStats.totalMemories}</h3>
              <p className="text-pink-200">Memories Saved</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-800/40 to-purple-900/40 backdrop-blur-xl p-6 rounded-3xl border border-indigo-500/20 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">{brainStats.activationRate}%</h3>
              <p className="text-indigo-200">Respectful Activation Rate</p>
            </div>
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            🧠 Brain AI Plans
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Memory Starter",
                price: "$14.99",
                period: "/week",
                features: [
                  "Basic memory storage",
                  "100 commands/week",
                  "Text interface only",
                  "7-day memory retention",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Perfect Brain",
                price: "$49.99",
                period: "/month",
                features: [
                  "Unlimited memory storage",
                  "Unlimited commands",
                  "Voice + Text interface",
                  "Lifetime memory retention",
                  "Advanced search",
                  "Priority support",
                  "Export memories"
                ],
                popular: true
              },
              {
                name: "Brain Genius",
                price: "$499.99",
                period: "/year",
                features: [
                  "Everything in Perfect Brain",
                  "Multiple AI personalities",
                  "Custom activation phrases",
                  "API access",
                  "Team sharing",
                  "24/7 VIP support",
                  "Custom integrations"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: plan.popular 
                    ? "0 25px 60px -12px rgba(168, 85, 247, 0.4)" 
                    : "0 15px 40px -12px rgba(168, 85, 247, 0.2)"
                }}
                className={`relative bg-gradient-to-br ${
                  plan.popular 
                    ? 'from-purple-700/40 to-pink-900/40 border-purple-400/50' 
                    : 'from-purple-800/40 to-indigo-900/20 border-purple-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-purple-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-purple-400">{plan.period}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-purple-400">🧠</span>
                      <span className="text-purple-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-purple-700/50 text-white border border-purple-500/30 hover:bg-purple-600/50'
                  }`}
                >
                  Activate {plan.name}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscriptionModal && (
          <SubscriptionModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
            service={{
              name: "Brain AI",
              icon: "🧠",
              color: "from-purple-600 to-pink-800"
            }}
            plan={{
              name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
              price: selectedPlan === 'memory starter' ? '$14.99' : selectedPlan === 'perfect brain' ? '$49.99' : '$499.99',
              features: selectedPlan === 'memory starter' 
                ? ['Basic memory storage', '100 commands/week', 'Text interface only', '7-day memory retention', 'Email support']
                : selectedPlan === 'perfect brain' 
                ? ['Unlimited memory storage', 'Unlimited commands', 'Voice + Text interface', 'Lifetime memory retention', 'Advanced search', 'Priority support', 'Export memories']
                : ['Everything in Perfect Brain', 'Multiple AI personalities', 'Custom activation phrases', 'API access', 'Team sharing', '24/7 VIP support', 'Custom integrations']
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

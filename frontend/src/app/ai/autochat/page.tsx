'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function AutoChatPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [conversationSample, setConversationSample] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubscribe = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  }, []);

  const startTraining = useCallback(() => {
    if (!conversationSample.trim()) return;
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTraining(false);
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
  }, [conversationSample]);

  const generateReply = useCallback(() => {
    if (!testMessage.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const replies = [
        "Thanks for reaching out! I'll get back to you shortly.",
        "Hey! Good to hear from you. What can I help you with?",
        "Got it! Let me look into this for you.",
        "Absolutely! I'll take care of that right away.",
        "Great question! Here's what I think about that..."
      ];
      
      setGeneratedReply(replies[Math.floor(Math.random() * replies.length)]);
      setIsGenerating(false);
    }, 1500);
  }, [testMessage]);

  return (
    <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
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
            💬
          </motion.div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-700 bg-clip-text text-transparent">
            AutoChat
          </h1>
          
          <p className="text-2xl mb-8 text-blue-300 font-medium max-w-4xl mx-auto">
            Autopilot for DMs, replies, chats — powered by LLMs. Your AI wingman that learns your style and keeps conversations flowing.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-blue-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-blue-500/20">
              <span className="text-green-400">●</span>
              <span className="text-blue-200">Custom LLM Engine</span>
            </div>
            <div className="flex items-center space-x-3 bg-indigo-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-indigo-500/20">
              <span className="text-yellow-400">●</span>
              <span className="text-indigo-200">Style Learning</span>
            </div>
            <div className="flex items-center space-x-3 bg-purple-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-purple-500/20">
              <span className="text-red-400">●</span>
              <span className="text-purple-200">Multi-Platform Support</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe('monthly')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Start Automation
          </motion.button>
        </motion.div>

        {/* Training Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            🧠 Train Your AI Style
          </h2>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/20">
            <div className="mb-6">
              <label className="block text-blue-300 text-lg font-semibold mb-4">
                Paste Your Conversation Samples
              </label>
              <textarea
                value={conversationSample}
                onChange={(e) => setConversationSample(e.target.value)}
                placeholder="Paste your typical messages here so AutoChat can learn your style..."
                className="w-full h-40 bg-blue-900/50 border border-blue-500/30 rounded-xl p-4 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startTraining}
              disabled={isTraining || !conversationSample.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <motion.span
                  animate={isTraining ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: isTraining ? Infinity : 0, ease: "linear" }}
                >
                  🧠
                </motion.span>
                <span>{isTraining ? `Training... ${Math.round(trainingProgress)}%` : 'Train AutoChat'}</span>
              </span>
              
              {isTraining && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-blue-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${trainingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Test Reply Generation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            🔄 Test Auto-Reply
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-xl p-6 rounded-3xl border border-blue-500/20">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Incoming Message</h3>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Type a test message here..."
                className="w-full h-32 bg-blue-900/50 border border-blue-500/30 rounded-xl p-4 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 resize-none mb-4"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateReply}
                disabled={isGenerating || !testMessage.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {isGenerating ? '🤖 Generating...' : '⚡ Generate Reply'}
              </motion.button>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-800/30 to-purple-900/30 backdrop-blur-xl p-6 rounded-3xl border border-indigo-500/20">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">Generated Reply</h3>
              <div className="bg-indigo-900/50 border border-indigo-500/30 rounded-xl p-4 h-32 flex items-center justify-center">
                {generatedReply ? (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-center"
                  >
                    {generatedReply}
                  </motion.p>
                ) : (
                  <p className="text-indigo-400 text-center">Your AI-generated reply will appear here...</p>
                )}
              </div>
              <div className="mt-4 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold"
                  disabled={!generatedReply}
                >
                  📋 Copy Reply
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            🛠️ Powerful Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '🤖',
                title: 'Custom LLM Engine',
                description: 'Based on GPT/Local models with your personal training'
              },
              {
                icon: '🔄',
                title: 'Async Auto-Response',
                description: 'Intelligent response timing that feels natural'
              },
              {
                icon: '📱',
                title: 'Multi-Platform',
                description: 'Email, Telegram, Twitter DMs, and more'
              },
              {
                icon: '🔒',
                title: 'Local Data',
                description: 'All data stays local — no cloud sync required'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)"
                }}
                className="bg-gradient-to-br from-blue-800/40 to-indigo-900/40 backdrop-blur-xl p-6 rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">{feature.title}</h3>
                <p className="text-blue-200 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            💰 Choose Your Plan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$8.99",
                period: "/week",
                features: [
                  "1 platform integration",
                  "100 auto-replies/week",
                  "Basic style training",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Pro Automation",
                price: "$29.99",
                period: "/month",
                features: [
                  "All platforms supported",
                  "Unlimited auto-replies",
                  "Advanced style learning",
                  "Custom response delays",
                  "Priority support",
                  "Analytics dashboard"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$299.99",
                period: "/year",
                features: [
                  "Everything in Pro",
                  "Custom LLM training",
                  "White-label solution",
                  "API access",
                  "24/7 support",
                  "Team collaboration"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: plan.popular 
                    ? "0 25px 60px -12px rgba(59, 130, 246, 0.4)" 
                    : "0 15px 40px -12px rgba(59, 130, 246, 0.2)"
                }}
                className={`relative bg-gradient-to-br ${
                  plan.popular 
                    ? 'from-blue-700/40 to-indigo-900/40 border-blue-400/50' 
                    : 'from-blue-800/40 to-indigo-900/20 border-blue-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-blue-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-300">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-blue-400">{plan.period}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-blue-400">💬</span>
                      <span className="text-blue-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-blue-700/50 text-white border border-blue-500/30 hover:bg-blue-600/50'
                  }`}
                >
                  Start {plan.name}
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
              name: "AutoChat",
              icon: "💬",
              color: "from-blue-600 to-indigo-800"
            }}
            plan={{
              name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
              price: selectedPlan === 'starter' ? '$8.99' : selectedPlan === 'pro automation' ? '$29.99' : '$299.99',
              features: selectedPlan === 'starter' 
                ? ['1 platform integration', '100 auto-replies/week', 'Basic style training', 'Email support']
                : selectedPlan === 'pro automation' 
                ? ['All platforms supported', 'Unlimited auto-replies', 'Advanced style learning', 'Custom response delays', 'Priority support', 'Analytics dashboard']
                : ['Everything in Pro', 'Custom LLM training', 'White-label solution', 'API access', '24/7 support', 'Team collaboration']
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

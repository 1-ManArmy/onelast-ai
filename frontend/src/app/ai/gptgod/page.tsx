'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function GPTGodPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowSubscriptionModal(false);
  }, []);

  // Memoized plan data for better performance
  const planData = useMemo(() => ({
    mortal: {
      name: 'Mortal',
      price: '$17.99',
      features: ['Basic GPT-God access', 'Local model support', 'Core memory system', 'Basic tools included', 'Community support']
    },
    deity: {
      name: 'Deity', 
      price: '$59.99',
      features: ['Full GPT-God unleashed', 'Advanced memory system', 'All modular tools', 'Web access module', 'Voice & terminal input', 'Priority support', 'Custom model training']
    },
    omnipotent: {
      name: 'Omnipotent',
      price: '$599.99', 
      features: ['Ultimate divine power', 'Unlimited everything', 'Enterprise deployment', 'Custom integrations', '24/7 godlike support', 'Source code access', 'Eternal updates', 'Immortal license']
    }
  }), []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>GPT-God - Offline AI That Thinks Like Human, Acts Like God</title>
        <meta name="description" content="Unleash the power of offline GPT that runs locally with persistent memory, web access, and divine capabilities. No API limits, complete freedom." />
        <meta name="keywords" content="offline AI, local GPT, divine AI, uncaged AI, persistent memory, Ollama, LM Studio" />
        <meta property="og:title" content="GPT-God - Your Divine AI Assistant" />
        <meta property="og:description" content="Offline GPT that thinks like a human, acts like a god. Your AI, uncaged." />
        <meta property="og:type" content="website" />
      </head>
      
      <div 
        className="bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen text-white"
        role="main"
        aria-label="GPT-God AI Service Page"
      >
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Enhanced Background with pulsing divine energy */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-800/20 rounded-full blur-3xl -z-10 transform scale-150"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-violet-700/10 rounded-full blur-2xl -z-10 transform scale-125"></div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 filter drop-shadow-2xl relative"
            whileHover={{ 
              scale: [1, 1.3, 1.1],
              rotate: [0, 360, 0],
              filter: ["drop-shadow(0 0 0 rgba(139, 92, 246, 0))", "drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))", "drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))"],
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            role="img"
            aria-label="Lightning bolt - divine power symbol"
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.8)",
                  "0 0 30px rgba(139, 92, 246, 1)",
                  "0 0 20px rgba(139, 92, 246, 0.8)",
                  "0 0 10px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            >
              ⚡
            </motion.span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-purple-500 to-indigo-700 bg-clip-text text-transparent drop-shadow-lg"
          >
            <motion.span
              animate={{ 
                filter: [
                  "brightness(1) saturate(1)",
                  "brightness(1.2) saturate(1.3)",
                  "brightness(1) saturate(1)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut" 
              }}
            >
              GPT-God
            </motion.span>
          </motion.h1>
          
          <p className="text-2xl mb-8 text-violet-300 font-medium max-w-4xl mx-auto leading-relaxed">
            Offline GPT that thinks like a human, acts like a god. Your AI, uncaged.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-violet-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-violet-500/20">
              <span className="text-green-400">●</span>
              <span className="text-violet-200">Offline Capable</span>
            </div>
            <div className="flex items-center space-x-3 bg-purple-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-purple-500/20">
              <span className="text-blue-400">●</span>
              <span className="text-purple-200">Persistent Memory</span>
            </div>
            <div className="flex items-center space-x-3 bg-indigo-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-indigo-500/20">
              <span className="text-yellow-400">●</span>
              <span className="text-indigo-200">No API Required</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: [
                "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                "0 35px 60px -12px rgba(139, 92, 246, 0.6)",
                "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
              ]
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe('monthly')}
            className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <motion.span
                animate={{ 
                  rotate: [0, 360],
                  filter: [
                    "drop-shadow(0 0 0 rgba(255, 255, 255, 0))",
                    "drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))",
                    "drop-shadow(0 0 0 rgba(255, 255, 255, 0))"
                  ]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                  filter: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
              >
                ⚡
              </motion.span>
              <span>Unleash GPT-God</span>
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-violet-200/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            🔥 Divine Powers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Persistent Memory",
                description: "Your AI remembers everything across sessions, building context and understanding over time.",
                icon: "🧠",
                color: "from-violet-600 to-purple-700"
              },
              {
                title: "Runs Locally",
                description: "Complete offline capability with Ollama, LM Studio, or Transformers. No internet required.",
                icon: "🔌",
                color: "from-purple-600 to-indigo-700"
              },
              {
                title: "Web-Enabled",
                description: "Optional web access module for browsing, research, and real-time information gathering.",
                icon: "🌐",
                color: "from-indigo-600 to-violet-700"
              },
              {
                title: "Voice & Terminal",
                description: "Talk to it or type commands. Multiple input methods for seamless interaction.",
                icon: "💬",
                color: "from-violet-600 to-purple-700"
              },
              {
                title: "Modular Tools",
                description: "Plug in PDF processing, calendar integration, browser automation, and custom modules.",
                icon: "🛠️",
                color: "from-purple-600 to-indigo-700"
              },
              {
                title: "No API Required",
                description: "Complete freedom from paid tokens and API limitations. Your AI, your rules.",
                icon: "🔥",
                color: "from-indigo-600 to-violet-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="bg-gradient-to-br from-violet-800/40 to-purple-900/40 backdrop-blur-xl p-8 rounded-3xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
              >
                <motion.div 
                  className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-violet-300"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-violet-200 group-hover:text-violet-100 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            🛠️ System Architecture
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-violet-800/30 to-purple-900/30 backdrop-blur-xl p-12 rounded-3xl border border-violet-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-violet-300">🧠 Core Components</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                      <span className="text-violet-200">agents/ - AI behavior modules</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-200">memory/ - Persistent storage</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span className="text-indigo-200">tools/ - Modular capabilities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                      <span className="text-violet-200">prompts/ - God-level instructions</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-purple-300">⚙️ Supported Models</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-200">Ollama (Recommended)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-200">LM Studio</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-200">Transformers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-200">Mistral:instruct</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            ⚡ Divine Access Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Mortal",
                price: "$17.99",
                period: "/week",
                features: [
                  "Basic GPT-God access",
                  "Local model support",
                  "Core memory system",
                  "Basic tools included",
                  "Community support"
                ],
                popular: false
              },
              {
                name: "Deity",
                price: "$59.99",
                period: "/month", 
                features: [
                  "Full GPT-God unleashed",
                  "Advanced memory system",
                  "All modular tools",
                  "Web access module",
                  "Voice & terminal input",
                  "Priority support",
                  "Custom model training"
                ],
                popular: true
              },
              {
                name: "Omnipotent",
                price: "$599.99",
                period: "/year",
                features: [
                  "Ultimate divine power",
                  "Unlimited everything",
                  "Enterprise deployment",
                  "Custom integrations",
                  "24/7 godlike support",
                  "Source code access",
                  "Eternal updates",
                  "Immortal license"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className={`relative bg-gradient-to-br ${
                  plan.popular 
                    ? 'from-violet-700/40 to-purple-900/40 border-violet-400/50' 
                    : 'from-violet-800/40 to-purple-900/20 border-violet-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-violet-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Divine
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-violet-300">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-violet-400">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-violet-400">⚡</span>
                      <span className="text-violet-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-purple-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-violet-700/50 text-white border border-violet-500/30 hover:bg-violet-600/50'
                  }`}
                >
                  Ascend to {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Started Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-20"
        >
          <motion.div 
            className="bg-gradient-to-br from-violet-800/30 to-purple-900/30 backdrop-blur-xl p-12 rounded-3xl border border-violet-500/20 text-center relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(139, 92, 246, 0.4)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background particles */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="text-4xl mb-6"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
            >
              🔥
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-violet-300">
              Ready to Unleash Divine AI Power?
            </h2>
            <p className="text-xl text-violet-400 mb-8 max-w-2xl mx-auto">
              Join the revolution of offline AI that thinks like a human and acts like a god. Your uncaged AI awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.button
                onClick={() => handleSubscribe('monthly')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-800 text-white font-bold rounded-2xl text-lg hover:from-violet-500 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">⚡ Ascend Now</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-violet-500/30 text-violet-300 font-semibold rounded-2xl text-lg hover:border-violet-400/50 hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  color: "#ffffff"
                }}
              >
                <span className="relative z-10">📖 Read Documentation</span>
                <motion.div
                  className="absolute inset-0 bg-violet-600/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={handleCloseModal}
          service={{
            name: "GPT-God",
            icon: "⚡",
            color: "from-violet-600 to-purple-800"
          }}
          plan={{
            name: planData[selectedPlan as keyof typeof planData]?.name || 'Deity',
            price: planData[selectedPlan as keyof typeof planData]?.price || '$59.99',
            features: planData[selectedPlan as keyof typeof planData]?.features || planData.deity.features
          }}
        />
      )}
      </div>
    </>
  );
}

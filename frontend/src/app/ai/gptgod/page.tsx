'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function GPTGodPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
          <div className="text-8xl mb-6 filter drop-shadow-2xl">
            ⚡
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-purple-500 to-indigo-700 bg-clip-text text-transparent drop-shadow-lg">
            GPT-God
          </h1>
          
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe('monthly')}
            className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ⚡ Unleash GPT-God
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
                className="bg-gradient-to-br from-violet-800/40 to-purple-900/40 backdrop-blur-xl p-8 rounded-3xl border border-violet-500/20"
              >
                <div className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-violet-300">{feature.title}</h3>
                <p className="text-violet-200">{feature.description}</p>
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
          <div className="bg-gradient-to-br from-violet-800/30 to-purple-900/30 backdrop-blur-xl p-12 rounded-3xl border border-violet-500/20 text-center">
            <div className="text-4xl mb-6">🔥</div>
            <h2 className="text-3xl font-bold mb-4 text-violet-300">
              Ready to Unleash Divine AI Power?
            </h2>
            <p className="text-xl text-violet-400 mb-8 max-w-2xl mx-auto">
              Join the revolution of offline AI that thinks like a human and acts like a god. Your uncaged AI awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleSubscribe('monthly')}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-800 text-white font-bold rounded-2xl text-lg hover:from-violet-500 hover:to-purple-700 transition-all duration-300"
              >
                ⚡ Ascend Now
              </button>
              <button className="px-8 py-4 border border-violet-500/30 text-violet-300 font-semibold rounded-2xl text-lg hover:border-violet-400/50 hover:text-white transition-all duration-300">
                📖 Read Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          service={{
            name: "GPT-God",
            icon: "⚡",
            color: "from-violet-600 to-purple-800"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'mortal' ? '$17.99' : selectedPlan === 'deity' ? '$59.99' : '$599.99',
            features: selectedPlan === 'mortal' 
              ? ['Basic GPT-God access', 'Local model support', 'Core memory system', 'Basic tools included', 'Community support']
              : selectedPlan === 'deity' 
              ? ['Full GPT-God unleashed', 'Advanced memory system', 'All modular tools', 'Web access module', 'Voice & terminal input', 'Priority support', 'Custom model training']
              : ['Ultimate divine power', 'Unlimited everything', 'Enterprise deployment', 'Custom integrations', '24/7 godlike support', 'Source code access', 'Eternal updates', 'Immortal license']
          }}
        />
      )}
    </div>
  );
}

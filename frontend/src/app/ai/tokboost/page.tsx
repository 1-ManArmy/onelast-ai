'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function TokBoostPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const handleGetStarted = (plan: 'weekly' | 'monthly' | 'yearly') => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-600/30 blur-3xl rounded-full"></div>
              <span className="text-8xl relative z-10 drop-shadow-2xl">📱</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
          >
            TokBoost
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-purple-300 mb-4 font-light"
          >
            TikTok Growth & Content Optimization
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6"
          >
            AI-powered TikTok growth tool that analyzes trends, optimizes content, and boosts your social media presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 max-w-2xl mx-auto">
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                🔥 Blow up TikTok videos with AI
              </p>
              <p className="text-lg text-gray-300 mt-2">
                Edit, caption, remix and schedule TikToks with AI
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={() => handleGetStarted('monthly')}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              Start Boosting Now
            </button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            🔥 Viral Video Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "✂️",
                title: "Auto-cut reels from long-form",
                description: "Automatically extract the best moments from long videos and create viral-ready clips.",
                color: "from-purple-500/20 to-indigo-500/20"
              },
              {
                icon: "🧠", 
                title: "Viral caption + hashtag generator",
                description: "AI-powered captions and trending hashtags to maximize your reach and engagement.",
                color: "from-indigo-500/20 to-purple-500/20"
              },
              {
                icon: "📍",
                title: "Subtitle overlay + export", 
                description: "Add dynamic subtitles with custom fonts and animations to boost video accessibility.",
                color: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: "📆",
                title: "Schedule videos (Beta)",
                description: "Plan and schedule your TikTok posts for optimal engagement times.",
                color: "from-pink-500/20 to-purple-500/20"
              },
              {
                icon: "📲",
                title: "TikTok API support",
                description: "Direct integration with TikTok for seamless content management and analytics.",
                color: "from-indigo-500/20 to-pink-500/20"
              },
              {
                icon: "📈",
                title: "Growth Analytics",
                description: "Track performance, analyze trends, and optimize your content strategy.",
                color: "from-purple-500/20 to-indigo-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                className={`group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br ${feature.color} p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Choose Your Growth Plan
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Select the perfect plan to skyrocket your TikTok presence with AI-powered optimization
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                plan: 'weekly' as const,
                name: 'Weekly',
                price: '$11.99',
                period: '/week',
                badge: 'Try it out',
                popular: false,
                features: ['Basic video editing', 'Caption generation', '10 clips/day', 'Email support']
              },
              {
                plan: 'monthly' as const,
                name: 'Monthly', 
                price: '$39.99',
                period: '/month',
                badge: 'Most Popular',
                popular: true,
                features: ['Advanced AI editing', 'Viral hashtag research', '100 clips/day', 'Priority support', 'Trend analysis', 'Schedule posts']
              },
              {
                plan: 'yearly' as const,
                name: 'Yearly',
                price: '$399.99', 
                period: '/year',
                badge: 'Best Value',
                popular: false,
                features: ['All premium features', 'Unlimited clips', 'TikTok API access', '24/7 priority support', 'Custom branding', 'Advanced analytics']
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.plan}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                className={`relative group ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 scale-105' 
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
                } backdrop-blur-xl p-8 rounded-2xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-purple-300">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  {!tier.popular && (
                    <span className="text-sm text-gray-400">{tier.badge}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <span className="text-purple-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(tier.plan)}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/25'
                      : 'bg-gray-700 hover:bg-gray-600 text-white hover:text-purple-300'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-center"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-indigo-600/10 to-purple-500/10 backdrop-blur-xl p-12 rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-600/5 animate-pulse"></div>
            <div className="relative z-10">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                TokBoost is currently in development. Get ready to boost your TikTok game with AI-powered video optimization!
              </p>
              
              {/* Project Structure Preview */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30 text-left max-w-2xl mx-auto mb-8">
                <h3 className="text-lg font-semibold mb-4 text-purple-300 text-center">📈 TokBoost – Project Structure</h3>
                <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre">
{`TokBoost/
├── core/
│   ├── cutter.py
│   ├── caption_gen.py
│   └── scheduler.py
├── clips/
│   ├── raw/
│   │   └── vlog001.mp4
│   └── edited/
│       └── vlog001_subtitled.mp4
├── captions/
│   └── vlog001.srt
├── assets/
│   └── fonts/
│       └── montserrat.ttf
├── config/
│   └── hashtags.yaml
├── tokboost.py
├── requirements.txt
└── README.md`}
                </pre>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                  ✂️ Auto Video Cutting
                </span>
                <span className="bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30">
                  🧠 AI Caption Generation
                </span>
                <span className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                  📍 Dynamic Subtitles
                </span>
                <span className="bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30">
                  📆 Smart Scheduling
                </span>
              </div>
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
            name: "TokBoost",
            icon: "📱",
            color: "from-purple-500 to-indigo-600"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'weekly' ? '$11.99' : selectedPlan === 'monthly' ? '$39.99' : '$399.99',
            features: selectedPlan === 'weekly' 
              ? ['Basic video editing', 'Caption generation', '10 clips/day', 'Email support']
              : selectedPlan === 'monthly' 
              ? ['Advanced AI editing', 'Viral hashtag research', '100 clips/day', 'Priority support', 'Trend analysis', 'Schedule posts']
              : ['All premium features', 'Unlimited clips', 'TikTok API access', '24/7 priority support', 'Custom branding', 'Advanced analytics']
          }}
        />
      )}
    </div>
  );
}

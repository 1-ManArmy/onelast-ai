'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function YouGenPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/30 min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 filter drop-shadow-2xl"
          >
            📺
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            YouGen
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl mb-8 text-gray-200 font-medium"
          >
            Turn YouTube channels into full websites or AI datasets
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Rips through entire YouTube channels, transcribes content, and converts it into markdown, JSON datasets, HTML sites, or AI fine-tuning input.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscribe('monthly')}
              className="relative bg-gradient-to-r from-red-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center space-x-2">
                <span>🚀</span>
                <span>Start Converting Now</span>
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800/50 backdrop-blur-lg border-2 border-red-500/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:border-red-400/50 transition-all duration-300 group"
            >
              <span className="flex items-center space-x-2">
                <span>👀</span>
                <span>View Demo</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center items-center space-x-12 mt-16 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">10K+</div>
              <div className="text-gray-400">Channels Converted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">500K+</div>
              <div className="text-gray-400">Videos Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">99.8%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            🎯 Powerful Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "📥",
                title: "Download + Auto-transcribe",
                description: "Download full channels/playlists and automatically transcribe all content with high accuracy.",
                color: "from-red-500/20 to-orange-600/30",
                borderColor: "border-red-500/30",
                accent: "text-red-300"
              },
              {
                icon: "🧾", 
                title: "Export to Multiple Formats",
                description: "Export content to JSON, Markdown, PDF, and other formats for various use cases.",
                color: "from-orange-600/20 to-red-500/30",
                borderColor: "border-orange-500/30",
                accent: "text-orange-300"
              },
              {
                icon: "🌐",
                title: "Generate HTML Blog Sites",
                description: "Convert YouTube channels into fully functional HTML blog websites automatically.",
                color: "from-red-600/20 to-orange-500/30",
                borderColor: "border-red-400/30",
                accent: "text-red-300"
              },
              {
                icon: "🤖",
                title: "AI Fine-tuning Ready",
                description: "Prepare content for LLM fine-tuning with properly formatted datasets and training data.",
                color: "from-orange-500/20 to-red-600/30",
                borderColor: "border-orange-400/30",
                accent: "text-orange-300"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`relative bg-gradient-to-br ${feature.color} backdrop-blur-xl p-10 rounded-3xl border ${feature.borderColor} hover:border-opacity-60 transition-all duration-500 group overflow-hidden`}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {feature.icon}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className={`text-2xl font-bold mb-4 ${feature.accent} group-hover:text-white transition-colors duration-300`}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                >
                  {feature.description}
                </motion.p>

                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            🚀 How It Works
          </motion.h2>
          
          <div className="max-w-5xl mx-auto relative">
            {/* Connection line */}
            <div className="absolute left-8 top-16 bottom-16 w-1 bg-gradient-to-b from-red-500/50 to-orange-500/50 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Enter YouTube Channel URL",
                  description: "Simply paste any YouTube channel or playlist URL to get started.",
                  icon: "🔗",
                  color: "from-red-500 to-red-600"
                },
                {
                  step: "2", 
                  title: "AI Processing & Transcription",
                  description: "Our AI downloads, processes, and transcribes all videos with high accuracy.",
                  icon: "⚡",
                  color: "from-orange-500 to-red-500"
                },
                {
                  step: "3",
                  title: "Choose Output Format",
                  description: "Select from JSON datasets, HTML websites, PDF documents, or AI training data.",
                  icon: "📋",
                  color: "from-red-500 to-orange-500"
                },
                {
                  step: "4",
                  title: "Download & Deploy",
                  description: "Get your converted content ready for websites, AI training, or data analysis.",
                  icon: "🎉",
                  color: "from-orange-500 to-orange-600"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
                  className="flex items-center space-x-8 relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 relative z-10"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300`}>
                      {step.step}
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.3, duration: 0.6 }}
                    className="flex-1 bg-gradient-to-r from-gray-800/40 to-red-900/20 backdrop-blur-xl p-8 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8 + index * 0.3, duration: 0.4, type: "spring", stiffness: 300 }}
                        className="text-3xl group-hover:scale-110 transition-transform duration-300"
                      >
                        {step.icon}
                      </motion.span>
                      <h3 className="text-2xl font-bold text-red-300 group-hover:text-red-200 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            💎 Choose Your Plan
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Weekly",
                price: "$9.99",
                period: "/week",
                originalPrice: "$14.99",
                savings: "Save 33%",
                features: [
                  "Up to 5 channels per week",
                  "Basic transcription",
                  "JSON & MD export",
                  "Email support"
                ],
                popular: false,
                plan: "weekly",
                gradient: "from-gray-800/60 to-red-900/40",
                border: "border-red-500/30",
                buttonStyle: "bg-gray-700/60 hover:bg-gray-600/70 border border-red-500/40"
              },
              {
                name: "Monthly", 
                price: "$34.99",
                period: "/month",
                originalPrice: "$49.99",
                savings: "Save 30%",
                features: [
                  "Unlimited channels",
                  "HD transcription + timestamps",
                  "All export formats",
                  "HTML website generation",
                  "Priority support",
                  "AI training datasets"
                ],
                popular: true,
                plan: "monthly",
                gradient: "from-red-800/60 to-orange-900/60",
                border: "border-red-400/60",
                buttonStyle: "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500"
              },
              {
                name: "Yearly",
                price: "$349.99",
                period: "/year",
                originalPrice: "$419.99",
                savings: "Save 17%",
                features: [
                  "Everything in Monthly",
                  "Custom website themes",
                  "API access",
                  "Bulk processing",
                  "24/7 priority support",
                  "Custom integrations"
                ],
                popular: false,
                plan: "yearly",
                gradient: "from-orange-800/60 to-red-900/40",
                border: "border-orange-500/30",
                buttonStyle: "bg-orange-600/70 hover:bg-orange-500/80 border border-orange-500/40"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: plan.popular ? 1.05 : 1.02, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`relative bg-gradient-to-br ${plan.gradient} backdrop-blur-xl p-8 rounded-3xl border ${plan.border} hover:border-opacity-80 transition-all duration-500 group ${
                  plan.popular ? 'transform scale-105 shadow-2xl shadow-red-500/20' : 'shadow-xl'
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.15, duration: 0.6, type: "spring", stiffness: 200 }}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                      🔥 Most Popular
                    </span>
                  </motion.div>
                )}
                
                {/* Background glow for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                )}
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                      className="text-2xl font-bold mb-4 text-red-300 group-hover:text-red-200 transition-colors duration-300"
                    >
                      {plan.name}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
                      className="mb-4"
                    >
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-gray-400 line-through text-lg">{plan.originalPrice}</span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                          {plan.savings}
                        </span>
                      </div>
                      <span className="text-4xl font-bold text-white group-hover:text-red-100 transition-colors duration-300">
                        {plan.price}
                      </span>
                      <span className="text-gray-400">{plan.period}</span>
                    </motion.div>
                  </div>
                  
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                    className="space-y-4 mb-8"
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.6 + index * 0.1 + featureIndex * 0.05, duration: 0.4 }}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-red-400 text-lg">✓</span>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubscribe(plan.plan)}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${plan.buttonStyle} shadow-lg hover:shadow-xl`}
                  >
                    {plan.popular ? '🚀 Get Started' : 'Choose Plan'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Started Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="relative bg-gradient-to-br from-red-800/40 to-orange-900/40 backdrop-blur-xl p-16 rounded-3xl border border-red-500/30 text-center overflow-hidden group"
          >
            {/* Background animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 group-hover:from-red-500/10 group-hover:to-orange-500/10 transition-all duration-500 rounded-3xl"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
              >
                🚀 Ready to Transform YouTube Content?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Join thousands of creators, researchers, and developers who use YouGen to convert YouTube channels into powerful datasets and websites.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="space-y-8"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(239, 68, 68, 0.4)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe('monthly')}
                  className="relative bg-gradient-to-r from-red-500 to-orange-600 text-white px-16 py-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 overflow-hidden group/button"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>🎬</span>
                    <span>Start Converting Today</span>
                    <span>✨</span>
                  </span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.6, duration: 0.8 }}
                  className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
                >
                  <span className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-2xl border border-gray-600/30">
                    <span className="text-green-400 text-lg">✓</span>
                    <span>No setup required</span>
                  </span>
                  <span className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-2xl border border-gray-600/30">
                    <span className="text-green-400 text-lg">✓</span>
                    <span>Start in minutes</span>
                  </span>
                  <span className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-2xl border border-gray-600/30">
                    <span className="text-green-400 text-lg">✓</span>
                    <span>Cancel anytime</span>
                  </span>
                </motion.div>

                {/* Success metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 0.8 }}
                  className="flex justify-center items-center space-x-12 pt-8 border-t border-red-500/20"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">10K+</div>
                    <div className="text-sm text-gray-400">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">500K+</div>
                    <div className="text-sm text-gray-400">Videos Converted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">99.8%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          service={{
            name: "YouGen",
            icon: "📺",
            color: "from-red-500 to-orange-600"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'weekly' ? '$9.99' : selectedPlan === 'monthly' ? '$34.99' : '$349.99',
            features: selectedPlan === 'weekly' 
              ? ['Up to 5 channels per week', 'Basic transcription', 'JSON & MD export', 'Email support']
              : selectedPlan === 'monthly' 
              ? ['Unlimited channels', 'HD transcription + timestamps', 'All export formats', 'HTML website generation', 'Priority support', 'AI training datasets']
              : ['Everything in Monthly', 'Custom website themes', 'API access', 'Bulk processing', '24/7 priority support', 'Custom integrations']
          }}
        />
      )}
    </div>
  );
}

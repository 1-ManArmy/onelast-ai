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
          className="text-center mb-20"
        >
          <div className="text-6xl mb-6">📺</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            YouGen
          </h1>
          <h2 className="text-2xl mb-8 text-gray-300">
            Turn YouTube channels into full websites or AI datasets
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12">
            Rips through entire YouTube channels, transcribes content, and converts it into markdown, JSON datasets, HTML sites, or AI fine-tuning input.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscribe('monthly')}
              className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Converting Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-red-500/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-700/50 transition-all duration-300"
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            🎯 Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: "📥",
                title: "Download + Auto-transcribe",
                description: "Download full channels/playlists and automatically transcribe all content with high accuracy.",
                color: "from-red-500/20 to-orange-500/20"
              },
              {
                icon: "🧾", 
                title: "Export to Multiple Formats",
                description: "Export content to JSON, Markdown, PDF, and other formats for various use cases.",
                color: "from-orange-500/20 to-red-500/20"
              },
              {
                icon: "🌐",
                title: "Generate HTML Blog Sites",
                description: "Convert YouTube channels into fully functional HTML blog websites automatically.",
                color: "from-red-500/20 to-orange-500/20"
              },
              {
                icon: "🤖",
                title: "AI Fine-tuning Ready",
                description: "Prepare content for LLM fine-tuning with properly formatted datasets and training data.",
                color: "from-orange-500/20 to-red-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl p-8 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-red-300">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            🚀 How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Enter YouTube Channel URL",
                  description: "Simply paste any YouTube channel or playlist URL to get started.",
                  icon: "🔗"
                },
                {
                  step: "2", 
                  title: "AI Processing & Transcription",
                  description: "Our AI downloads, processes, and transcribes all videos with high accuracy.",
                  icon: "⚡"
                },
                {
                  step: "3",
                  title: "Choose Output Format",
                  description: "Select from JSON datasets, HTML websites, PDF documents, or AI training data.",
                  icon: "📋"
                },
                {
                  step: "4",
                  title: "Download & Deploy",
                  description: "Get your converted content ready for websites, AI training, or data analysis.",
                  icon: "🎉"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className="flex items-center space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{step.icon}</span>
                      <h3 className="text-2xl font-bold text-red-300">{step.title}</h3>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            💎 Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Weekly",
                price: "$9.99",
                period: "/week",
                features: [
                  "Up to 5 channels per week",
                  "Basic transcription",
                  "JSON & MD export",
                  "Email support"
                ],
                popular: false,
                plan: "weekly"
              },
              {
                name: "Monthly", 
                price: "$34.99",
                period: "/month",
                features: [
                  "Unlimited channels",
                  "HD transcription + timestamps",
                  "All export formats",
                  "HTML website generation",
                  "Priority support",
                  "AI training datasets"
                ],
                popular: true,
                plan: "monthly"
              },
              {
                name: "Yearly",
                price: "$349.99",
                period: "/year",
                features: [
                  "Everything in Monthly",
                  "Custom website themes",
                  "API access",
                  "Bulk processing",
                  "24/7 priority support",
                  "Custom integrations"
                ],
                popular: false,
                plan: "yearly"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className={`relative bg-gradient-to-br ${
                  plan.popular 
                    ? 'from-red-800/40 to-orange-900/40 border-red-400/50' 
                    : 'from-gray-800/40 to-red-900/20 border-red-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-red-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-red-300">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-red-400">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe(plan.plan)}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-700/50 text-white border border-red-500/30 hover:bg-gray-600/50'
                  }`}
                >
                  Get Started
                </motion.button>
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
          <div className="bg-gradient-to-br from-red-800/30 to-orange-900/30 backdrop-blur-xl p-12 rounded-3xl border border-red-500/20 text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              🚀 Ready to Transform YouTube Content?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of creators, researchers, and developers who use YouGen to convert YouTube channels into powerful datasets and websites.
            </p>
            
            <div className="space-y-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubscribe('monthly')}
                className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Converting Today
              </motion.button>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>No setup required</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Start in minutes</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Cancel anytime</span>
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

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Mic, 
  MessageSquare, 
  Smile, 
  TrendingUp,
  Code,
  Play,
  Pause,
  Github,
  ExternalLink,
  CheckCircle2,
  Zap,
  Shield,
  Sparkles,
  Users,
  Copy,
  Check,
  Globe,
  Mail,
  Send,
  BarChart3,
  Headphones
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const EmoAIPage = () => {
  const [activeDemo, setActiveDemo] = useState('text');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState(null);

  // Demo text for emotion analysis
  const [demoText, setDemoText] = useState("I'm feeling really excited about this new project! It's going to change everything. 😊");
  const [analysisResult, setAnalysisResult] = useState(null);

  // Mock emotion analysis
  const analyzeEmotion = () => {
    const emotions = {
      joy: 0.85,
      excitement: 0.9,
      confidence: 0.7,
      anticipation: 0.8
    };
    
    const suggestedEmojis = ['😊', '🚀', '✨', '🎉', '💫'];
    
    setAnalysisResult({
      emotions,
      suggestedEmojis,
      dominantEmotion: 'excitement',
      confidence: 0.92
    });
  };

  const handleSubscribe = (plan) => {
    setSelectedSubscriptionPlan(plan);
    setShowSubscriptionModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const codeExample = `# Install EmoAI
pip install emoai

# Quick Start
from emoai import EmotionEngine

engine = EmotionEngine()
result = engine.analyze_text("I love this new feature!")

print(result.emotions)  # {'joy': 0.9, 'love': 0.8}
print(result.emojis)    # ['😍', '❤️', '🎉']`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-8"
              variants={fadeInUp}
            >
              <Heart className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-800 font-semibold text-sm">Emotional Intelligence AI</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                EmoAI
              </span>
              <br />
              <span className="text-gray-900 text-4xl md:text-5xl">
                Decode Emotions. Generate Empathy.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              A contextual AI engine that analyzes text, voice, and mood patterns to inject 
              <span className="font-semibold text-purple-600"> real emotional intelligence</span> into conversations. 
              Perfect for bots, virtual agents, and emotional analysis tools.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              variants={fadeInUp}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 inline mr-2" />
                Try Live Demo
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg shadow-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="w-5 h-5 inline mr-2" />
                Start Free Trial
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              variants={staggerContainer}
            >
              {[
                { icon: Heart, value: '99.2%', label: 'Accuracy' },
                { icon: Zap, value: '<100ms', label: 'Response Time' },
                { icon: Users, value: '50K+', label: 'Active Users' },
                { icon: BarChart3, value: '24/7', label: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                >
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-3">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Experience EmoAI in Action
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Try our real-time emotion analysis with text, voice, or both
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Demo Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
                {[
                  { id: 'text', icon: MessageSquare, label: 'Text Analysis' },
                  { id: 'voice', icon: Mic, label: 'Voice Analysis' },
                  { id: 'combo', icon: Heart, label: 'Multi-Modal' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDemo(tab.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                      activeDemo === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Interface */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-8">
                {activeDemo === 'text' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter text to analyze emotions:
                      </label>
                      <textarea
                        value={demoText}
                        onChange={(e) => setDemoText(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={4}
                        placeholder="Type something emotional..."
                      />
                    </div>
                    
                    <button
                      onClick={() => analyzeEmotion(demoText)}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Brain className="w-5 h-5 inline mr-2" />
                      Analyze Emotions
                    </button>

                    {analysisResult && (
                      <motion.div
                        className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-4">Analysis Results:</h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-3">Detected Emotions:</h5>
                            <div className="space-y-2">
                              {Object.entries(analysisResult.emotions).map(([emotion, score]) => (
                                <div key={emotion} className="flex items-center justify-between">
                                  <span className="capitalize text-gray-600">{emotion}</span>
                                  <div className="flex items-center">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                      <div 
                                        className={`h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500`}
                                        style={{ width: `${score * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-medium">{Math.round(score * 100)}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-3">Suggested Emojis:</h5>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.suggestedEmojis.map((emoji, index) => (
                                <span key={index} className="text-2xl p-2 bg-white rounded-lg shadow-sm">
                                  {emoji}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 text-sm text-gray-600">
                              <strong>Dominant Emotion:</strong> {analysisResult.dominantEmotion} 
                              ({Math.round(analysisResult.confidence * 100)}% confidence)
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {activeDemo === 'voice' && (
                  <div className="text-center py-12">
                    <Headphones className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Voice Emotion Analysis</h3>
                    <p className="text-gray-600 mb-8">Analyze emotions from speech patterns and tone</p>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        isPlaying 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5 inline mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5 inline mr-2" />
                          Start Recording
                        </>
                      )}
                    </button>
                    
                    {isPlaying && (
                      <motion.div
                        className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex justify-center items-center space-x-2 mb-4">
                          <div className="w-2 h-8 bg-purple-500 rounded animate-pulse" />
                          <div className="w-2 h-12 bg-pink-500 rounded animate-pulse animation-delay-200" />
                          <div className="w-2 h-6 bg-purple-500 rounded animate-pulse animation-delay-400" />
                          <div className="w-2 h-10 bg-pink-500 rounded animate-pulse animation-delay-600" />
                        </div>
                        <p className="text-gray-600">Listening and analyzing speech patterns...</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {activeDemo === 'combo' && (
                  <div className="text-center py-12">
                    <div className="flex justify-center items-center space-x-4 mb-6">
                      <MessageSquare className="w-12 h-12 text-purple-600" />
                      <span className="text-2xl text-gray-400">+</span>
                      <Mic className="w-12 h-12 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Modal Analysis</h3>
                    <p className="text-gray-600 mb-8">Combine text and voice for the most accurate emotion detection</p>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                      <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Text + Voice Benefits:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              99.2% accuracy rate
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              Detects sarcasm & irony
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              Context-aware analysis
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Real-time Processing:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                              <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                              &lt;100ms response time
                            </li>
                            <li className="flex items-center">
                              <Shield className="w-4 h-4 text-blue-500 mr-2" />
                              Secure processing
                            </li>
                            <li className="flex items-center">
                              <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
                              Mood memory tracking
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Powerful Features
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Everything you need to build emotionally intelligent applications
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Brain,
                title: 'Emotion Detection',
                description: 'NLP-based sentiment & emotion extraction with 99.2% accuracy',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: TrendingUp,
                title: 'Mood Memory',
                description: 'Saves emotional trends across sessions for context-aware responses',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                icon: MessageSquare,
                title: 'Voice + Text Fusion',
                description: 'Integrates speech tone analysis with chat content processing',
                gradient: 'from-pink-500 to-red-500'
              },
              {
                icon: Smile,
                title: 'Emoji Recommender',
                description: 'Reacts like a human with contextually appropriate emojis',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Code,
                title: 'Easy Integration',
                description: 'Simple APIs for bots, therapy apps, and customer service tools',
                gradient: 'from-green-500 to-teal-500'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Enterprise-grade security with local processing options',
                gradient: 'from-blue-500 to-indigo-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/50 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Quick Integration
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Get started with EmoAI in just a few lines of code
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 bg-gray-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <button
                  onClick={() => copyToClipboard(codeExample)}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>

            <div className="mt-8 text-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 inline mr-2" />
                View Full Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Start free, scale as you grow. No hidden fees.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'forever',
                description: 'Perfect for testing and small projects',
                features: [
                  '1,000 API calls/month',
                  'Text emotion analysis',
                  'Basic emoji suggestions',
                  'Community support',
                  'Basic documentation'
                ],
                cta: 'Get Started',
                popular: false
              },
              {
                name: 'Pro',
                price: '$29',
                period: 'month',
                description: 'Best for production applications',
                features: [
                  '50,000 API calls/month',
                  'Text + Voice analysis',
                  'Advanced emoji library',
                  'Mood memory tracking',
                  'Priority support',
                  'Advanced analytics',
                  'Custom integrations'
                ],
                cta: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'pricing',
                description: 'For large-scale deployments',
                features: [
                  'Unlimited API calls',
                  'On-premise deployment',
                  'Custom ML models',
                  'White-label solutions',
                  'Dedicated support',
                  'SLA guarantee',
                  'Custom features'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-500 scale-105 shadow-2xl shadow-purple-500/25' 
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-2xl'
                }`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              variants={fadeInUp}
            >
              Ready to Build Emotionally Intelligent Apps?
            </motion.h2>
            <motion.p
              className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Join thousands of developers building the future of human-AI interaction
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.button
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5 inline mr-2" />
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5 inline mr-2" />
                View Documentation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold">EmoAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building emotionally intelligent AI for a more empathetic world.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="tel:+441172050459" className="hover:text-purple-400 transition-colors">
                    📱 WhatsApp: +44 117 205 0459
                  </a>
                </li>
                <li>
                  <a href="https://line.me/ti/p/@onelastai" className="hover:text-purple-400 transition-colors">
                    💬 Line: @onelastai
                  </a>
                </li>
                <li>
                  <a href="https://t.me/onelastai" className="hover:text-purple-400 transition-colors">
                    📞 Telegram: @onelastai
                  </a>
                </li>
                <li>
                  <a href="tel:+12137720156" className="hover:text-purple-400 transition-colors">
                    ☎️ Call: +1 213 772 0156
                  </a>
                </li>
                <li>
                  <a href="mailto:info@onelastai.com" className="hover:text-purple-400 transition-colors">
                    ✉️ Email: info@onelastai.com
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a href="https://github.com/orgs/Stingy-Guy-US/" className="text-gray-400 hover:text-purple-400 transition-colors" title="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.onelastai.com" className="text-gray-400 hover:text-purple-400 transition-colors" title="Website">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="mailto:info@onelastai.com" className="text-gray-400 hover:text-purple-400 transition-colors" title="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://t.me/onelastai" className="text-gray-400 hover:text-purple-400 transition-colors" title="Telegram">
                  <Send className="w-5 h-5" />
                </a>
              </div>
              <div className="text-center text-gray-400">
                <p>&copy; 2025 Team Grand Pa United. Built across 🇦🇪 🇬🇧 🇺🇸</p>
                <p className="mt-2 text-sm">Licensed under Apache License 2.0</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Subscription Modal */}
      {selectedSubscriptionPlan && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => {
            setShowSubscriptionModal(false);
            setSelectedSubscriptionPlan(null);
          }}
          service={{
            name: 'EmoAI',
            icon: '🧠',
            color: 'purple'
          }}
          plan={selectedSubscriptionPlan}
        />
      )}
    </div>
  );
};

export default EmoAIPage;

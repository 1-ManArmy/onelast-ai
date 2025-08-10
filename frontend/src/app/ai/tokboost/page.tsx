'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function TokBoostPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedClips, setGeneratedClips] = useState<{id: number, title: string, duration: string, viralScore: number, thumbnail: string}[]>([]);
  const [selectedTrend, setSelectedTrend] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGetStarted = (plan: 'weekly' | 'monthly' | 'yearly') => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  const handleVideoUpload = async () => {
    if (!videoUrl.trim()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI video processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock generated clips
    setGeneratedClips([
      { id: 1, title: "Best Moment #1", duration: "15s", viralScore: 94, thumbnail: "https://picsum.photos/160/90?random=1" },
      { id: 2, title: "Viral Hook", duration: "12s", viralScore: 89, thumbnail: "https://picsum.photos/160/90?random=2" },
      { id: 3, title: "Trending Clip", duration: "18s", viralScore: 92, thumbnail: "https://picsum.photos/160/90?random=3" }
    ]);
    setIsProcessing(false);
  };

  const handleGenerateCaption = async (trend: string) => {
    setSelectedTrend(trend);
    
    // Simulate AI caption generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const captions = [
      "POV: When the algorithm finally notices you 😎 #viral #fyp #trending",
      "This took me 3 hours to make but it was worth it! 🔥 #contentcreator #process",
      "Nobody talks about this anymore... let's change that! 💯 #facts #realtalke",
      "The secret sauce everyone's been asking for 👀 #tips #lifehacks"
    ];
    
    setGeneratedCaption(captions[Math.floor(Math.random() * captions.length)]);
  };

  const trendingTopics = [
    { name: "AI & Tech", emoji: "🤖", growth: "+347%" },
    { name: "Life Hacks", emoji: "💡", growth: "+289%" },
    { name: "Behind the Scenes", emoji: "🎬", growth: "+156%" },
    { name: "Motivation", emoji: "💪", growth: "+203%" }
  ];

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

        {/* Interactive Video Demo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Try TokBoost Demo
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI-driven TikTok optimization with our interactive demo
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Video Upload & Processing */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20">
                  <h3 className="text-2xl font-bold mb-6 text-purple-300">
                    📹 Auto-Cut Video Demo
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-gray-300">Video URL or Upload</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Paste YouTube/TikTok URL or upload video..."
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                      >
                        📁
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        aria-label="Upload video file"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleVideoUpload}
                    disabled={!videoUrl.trim() || isProcessing}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Processing Video...</span>
                      </div>
                    ) : (
                      '✂️ Generate Viral Clips'
                    )}
                  </button>

                  {/* Generated Clips */}
                  {generatedClips.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-purple-300">Generated Clips:</h4>
                      <div className="space-y-3">
                        {generatedClips.map((clip) => (
                          <div key={clip.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                            <div className="w-16 h-9 bg-gray-600 rounded flex items-center justify-center text-xs">
                              📹
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">{clip.title}</p>
                              <p className="text-sm text-gray-400">{clip.duration}</p>
                            </div>
                            <button className="text-purple-400 hover:text-purple-300 text-sm">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Caption & Hashtag Generator */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-indigo-800/30 to-purple-900/30 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/20">
                  <h3 className="text-2xl font-bold mb-6 text-indigo-300">
                    🧠 Viral Caption Generator
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-300">Choose Trending Topic</label>
                    <div className="grid grid-cols-2 gap-3">
                      {trendingTopics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => handleGenerateCaption(topic.name)}
                          className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                            selectedTrend === topic.name
                              ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                              : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-indigo-400/50 hover:text-indigo-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg">{topic.emoji}</span>
                            <span className="text-xs text-green-400">{topic.growth}</span>
                          </div>
                          <div className="text-sm font-medium mt-1">{topic.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {generatedCaption && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <label className="block text-sm font-medium mb-2 text-gray-300">Generated Caption</label>
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                        <p className="text-white">{generatedCaption}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-400">Viral Score: 94%</span>
                          <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                            Copy Caption
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Trending Hashtags */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3 text-indigo-300">🔥 Trending Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      {['#fyp', '#viral', '#trending', '#ai', '#tech', '#lifehacks', '#motivation', '#process'].map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30 hover:bg-indigo-500/30 cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Demo Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-center"
            >
              <p className="text-purple-300">
                📱 This is a demo preview. Subscribe to unlock full TikTok optimization capabilities!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Analytics Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              📊 Growth Analytics Dashboard
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your TikTok performance and optimize your content strategy with AI-powered insights
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Views", value: "2.4M", change: "+23%", icon: "👁️" },
                { label: "Engagement Rate", value: "8.7%", change: "+12%", icon: "❤️" },
                { label: "Followers Growth", value: "+12.5K", change: "+45%", icon: "👥" },
                { label: "Viral Score", value: "94/100", change: "+8%", icon: "🔥" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Trending Analysis */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.8, duration: 0.8 }}
                className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-300">📈 Trend Analysis</h3>
                
                <div className="space-y-4">
                  {[
                    { trend: "AI & Technology", growth: 347, color: "from-purple-500 to-indigo-600" },
                    { trend: "Life Productivity", growth: 289, color: "from-indigo-500 to-purple-600" },
                    { trend: "Behind the Scenes", growth: 156, color: "from-purple-400 to-indigo-500" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.trend}</span>
                        <span className="text-green-400 font-semibold">+{item.growth}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000 ${
                            item.growth > 300 ? 'w-full' : 
                            item.growth > 200 ? 'w-3/4' : 
                            item.growth > 100 ? 'w-1/2' : 'w-1/4'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2 text-purple-300">🎯 Recommended Actions</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Focus on AI & Tech content for maximum reach</li>
                    <li>• Post between 7-9 PM for optimal engagement</li>
                    <li>• Use trending audio in next 3 videos</li>
                  </ul>
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="bg-gradient-to-br from-indigo-800/30 to-purple-900/30 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/20"
              >
                <h3 className="text-2xl font-bold mb-6 text-indigo-300">⚡ Performance Insights</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-indigo-300">Best Posting Times</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {['7 PM', '8 PM', '9 PM', '12 PM', '6 PM', '10 PM'].map((time, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-lg text-center text-sm ${
                            index < 3 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-gray-700/30 text-gray-400'
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-indigo-300">Top Performing Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { tag: '#fyp', performance: 98 },
                        { tag: '#viral', performance: 94 },
                        { tag: '#ai', performance: 87 },
                        { tag: '#tech', performance: 82 }
                      ].map((hashtag, index) => (
                        <div key={index} className="relative">
                          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30">
                            {hashtag.tag}
                          </span>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{hashtag.performance}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-400">🎉</span>
                      <span className="text-green-400 font-semibold">Viral Prediction</span>
                    </div>
                    <p className="text-sm text-gray-300">Your next video has a 89% chance of going viral based on current trends!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              🌟 Join 50,000+ Creators Going Viral
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what creators are saying about TokBoost AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                handle: "@sarahcreates",
                followers: "2.1M",
                avatar: "👩‍💻",
                testimonial: "TokBoost helped me grow from 10K to 2M followers in 6 months! The AI captions are pure magic ✨",
                growth: "+2100%"
              },
              {
                name: "Alex Rivera",
                handle: "@techtalkalex",
                followers: "847K",
                avatar: "👨‍💼",
                testimonial: "The trend analysis feature is incredible. I now know exactly when and what to post for maximum reach 🚀",
                growth: "+890%"
              },
              {
                name: "Maya Johnson",
                handle: "@lifewithmaya",
                followers: "1.5M",
                avatar: "🌟",
                testimonial: "Auto-cutting my long videos into viral clips saved me 10+ hours per week. Game changer! 🎬",
                growth: "+1400%"
              }
            ].map((creator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 + index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{creator.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{creator.name}</h4>
                    <p className="text-purple-300 text-sm">{creator.handle}</p>
                    <p className="text-indigo-300 text-xs">{creator.followers} followers</p>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold border border-green-500/30">
                      {creator.growth}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 italic">
                  &ldquo;{creator.testimonial}&rdquo;
                </blockquote>
                
                <div className="flex mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-center mt-12"
          >
            <div className="flex justify-center items-center space-x-8 text-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50K+</div>
                <div className="text-sm text-gray-400">Active Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400">500M+</div>
                <div className="text-sm text-gray-400">Views Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">94%</div>
                <div className="text-sm text-gray-400">Go Viral Rate</div>
              </div>
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

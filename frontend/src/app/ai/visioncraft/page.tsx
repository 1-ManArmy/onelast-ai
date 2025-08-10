'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function VisionCraftPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [showDemo, setShowDemo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGetStarted = (plan: 'weekly' | 'monthly' | 'yearly') => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated image (placeholder)
    setGeneratedImage(`https://picsum.photos/512/512?random=${Math.floor(Math.random() * 1000)}`);
    setIsGenerating(false);
  };

  const demoPrompts = [
    "A majestic dragon soaring through a rainbow-colored sky at sunset",
    "Cyberpunk cityscape with neon lights reflecting on wet streets",
    "Peaceful zen garden with cherry blossoms and a traditional bridge",
    "Abstract digital art with flowing geometric patterns in purple and gold"
  ];

  const artStyles = [
    { id: 'realistic', name: 'Realistic', icon: '📷' },
    { id: 'anime', name: 'Anime', icon: '🎨' },
    { id: 'abstract', name: 'Abstract', icon: '🌈' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖' },
    { id: 'vintage', name: 'Vintage', icon: '📸' },
    { id: 'fantasy', name: 'Fantasy', icon: '🧙‍♂️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
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
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-rose-600/30 blur-3xl rounded-full"></div>
              <span className="text-8xl relative z-10 drop-shadow-2xl">🎨</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent"
          >
            VisionCraft
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-pink-300 mb-4 font-light"
          >
            AI Image Generation & Visual Arts
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Create stunning artwork, generate images from text, and transform your visual ideas into reality with advanced AI models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={() => handleGetStarted('monthly')}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/25 hover:scale-105"
            >
              Start Creating Now
            </button>
          </motion.div>
        </motion.div>

        {/* Interactive Demo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Try VisionCraft Demo
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI image generation with our interactive demo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/20">
              {/* Style Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-pink-300">Choose Art Style</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {artStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        selectedStyle === style.id
                          ? 'border-pink-500 bg-pink-500/20 text-pink-300'
                          : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-pink-400/50 hover:text-pink-400'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-pink-300">Enter Your Prompt</h3>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create..."
                    className="w-full h-24 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {prompt.length}/500
                  </div>
                </div>
              </div>

              {/* Demo Prompts */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-gray-400">Try these examples:</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {demoPrompts.map((demoPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(demoPrompt)}
                      className="text-left p-3 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg border border-gray-600/50 hover:border-pink-500/30 transition-all duration-300 text-sm text-gray-300 hover:text-pink-300"
                    >
                      &quot;{demoPrompt}&quot;
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleGenerateImage}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/25 disabled:shadow-none hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate Image'
                  )}
                </button>
              </div>

              {/* Generated Image Display */}
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="relative inline-block">
                    <Image
                      src={generatedImage}
                      alt="Generated artwork"
                      width={512}
                      height={512}
                      className="rounded-xl shadow-2xl max-w-md w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Generated with {selectedStyle} style
                  </p>
                </motion.div>
              )}

              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                <p className="text-center text-pink-300 text-sm">
                  🎨 This is a demo preview. Subscribe to unlock full AI image generation capabilities!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Features Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Advanced AI Capabilities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the cutting-edge features that make VisionCraft the ultimate AI art platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Feature List */}
            <div className="space-y-6">
              {[
                {
                  icon: "🎯",
                  title: "Precision Control",
                  description: "Fine-tune every aspect of your generated images with advanced parameters and controls.",
                  highlight: "NEW"
                },
                {
                  icon: "🔄",
                  title: "Real-time Variations",
                  description: "Generate multiple variations instantly and choose the perfect result for your project.",
                  highlight: "POPULAR"
                },
                {
                  icon: "📐",
                  title: "Custom Dimensions",
                  description: "Create images in any size from social media posts to high-resolution prints.",
                  highlight: ""
                },
                {
                  icon: "🎭",
                  title: "Style Mixing",
                  description: "Combine multiple artistic styles to create unique and unprecedented visual compositions.",
                  highlight: "PRO"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6 + index * 0.1, duration: 0.6 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-pink-300">{feature.title}</h3>
                      {feature.highlight && (
                        <span className="px-2 py-1 text-xs font-bold bg-pink-500/20 text-pink-400 rounded border border-pink-500/30">
                          {feature.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-500/10 to-rose-600/10 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/20">
                <h3 className="text-2xl font-bold mb-6 text-center text-pink-300">
                  AI Model Selection
                </h3>
                
                <div className="space-y-4">
                  {[
                    { name: "DALL-E 3", desc: "Latest OpenAI model", status: "active" },
                    { name: "Midjourney", desc: "Artistic excellence", status: "active" },
                    { name: "Stable Diffusion", desc: "Open source power", status: "active" },
                    { name: "Custom Models", desc: "Your trained models", status: "coming" }
                  ].map((model, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        model.status === 'active'
                          ? 'bg-pink-500/10 border-pink-500/30 hover:bg-pink-500/20'
                          : 'bg-gray-700/30 border-gray-600/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-pink-300">{model.name}</h4>
                          <p className="text-sm text-gray-400">{model.desc}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          model.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Generation Speed</span>
                    <span className="text-pink-300">~3-5 seconds</span>
                  </div>
                  <div className="mt-2 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
            Powerful AI Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Text-to-Image Generation",
                description: "Transform your written descriptions into stunning visual artwork using advanced AI models.",
                icon: "✨",
                color: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "Image-to-Image Transformation", 
                description: "Modify and enhance existing images with AI-powered transformation tools.",
                icon: "🔄",
                color: "from-rose-500/20 to-pink-500/20"
              },
              {
                title: "Style Transfer & Editing",
                description: "Apply different artistic styles and make precise edits to your images.",
                icon: "🎭",
                color: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "High-Resolution Upscaling",
                description: "Enhance image quality and resolution using AI upscaling technology.",
                icon: "📈",
                color: "from-rose-500/20 to-pink-500/20"
              },
              {
                title: "Batch Processing", 
                description: "Process multiple images simultaneously for efficient workflow management.",
                icon: "⚡",
                color: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "Custom Model Fine-tuning",
                description: "Train and customize AI models for your specific artistic needs and style preferences.",
                icon: "🎯",
                color: "from-rose-500/20 to-pink-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className={`group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br ${feature.color} p-8 rounded-2xl border border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-pink-300 group-hover:text-pink-200 transition-colors">
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
          transition={{ delay: 2, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
            Choose Your Creative Plan
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Select the perfect plan to unleash your creativity with VisionCraft&apos;s AI-powered image generation
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                plan: 'weekly' as const,
                name: 'Weekly',
                price: '$8.99',
                period: '/week',
                badge: 'Try it out',
                popular: false,
                features: ['Basic image generation', 'Standard resolution', '10 images/day', 'Email support']
              },
              {
                plan: 'monthly' as const,
                name: 'Monthly', 
                price: '$29.99',
                period: '/month',
                badge: 'Most Popular',
                popular: true,
                features: ['Advanced AI models', 'High resolution', '100 images/day', 'Priority support', 'Style transfer', 'Batch processing']
              },
              {
                plan: 'yearly' as const,
                name: 'Yearly',
                price: '$299.99', 
                period: '/year',
                badge: 'Best Value',
                popular: false,
                features: ['All premium features', '4K resolution', 'Unlimited images', '24/7 priority support', 'Custom model training', 'API access']
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.plan}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
                className={`relative group ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-pink-500/20 to-rose-600/20 border-2 border-pink-400/50 shadow-2xl shadow-pink-500/20 scale-105' 
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
                } backdrop-blur-xl p-8 rounded-2xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-pink-300">{tier.name}</h3>
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
                      <span className="text-pink-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(tier.plan)}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-lg hover:shadow-pink-500/25'
                      : 'bg-gray-700 hover:bg-gray-600 text-white hover:text-pink-300'
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
          transition={{ delay: 2.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-pink-500/10 via-rose-600/10 to-pink-500/10 backdrop-blur-xl p-12 rounded-3xl border border-pink-500/20 shadow-2xl shadow-pink-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-600/5 animate-pulse"></div>
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
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                VisionCraft is currently in development. Advanced AI image generation capabilities will be available soon!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="bg-pink-500/20 px-4 py-2 rounded-full border border-pink-500/30">
                  🎨 DALL-E Integration
                </span>
                <span className="bg-rose-500/20 px-4 py-2 rounded-full border border-rose-500/30">
                  🖼️ Midjourney API
                </span>
                <span className="bg-pink-500/20 px-4 py-2 rounded-full border border-pink-500/30">
                  ⚡ Stable Diffusion
                </span>
                <span className="bg-rose-500/20 px-4 py-2 rounded-full border border-rose-500/30">
                  🎯 Custom Models
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
            name: "VisionCraft",
            icon: "🎨",
            color: "from-pink-500 to-rose-600"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'weekly' ? '$8.99' : selectedPlan === 'monthly' ? '$29.99' : '$299.99',
            features: selectedPlan === 'weekly' 
              ? ['Basic image generation', 'Standard resolution', '10 images/day', 'Email support']
              : selectedPlan === 'monthly' 
              ? ['Advanced AI models', 'High resolution', '100 images/day', 'Priority support', 'Style transfer', 'Batch processing']
              : ['All premium features', '4K resolution', 'Unlimited images', '24/7 priority support', 'Custom model training', 'API access']
          }}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function CVSmashPage() {
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
    'job seeker': {
      name: 'Job Seeker',
      price: '$6.99',
      features: ['5 resume variations', 'Basic ATS optimization', 'PDF & DOCX export', 'Standard templates', 'Email support']
    },
    'career crusher': {
      name: 'Career Crusher', 
      price: '$22.99',
      features: ['Unlimited resume variations', 'Advanced ATS optimization', 'All export formats', 'Premium templates', 'Job-tailored keywords', 'Auto-branding', 'Priority support']
    },
    'resume destroyer': {
      name: 'Resume Destroyer',
      price: '$229.99', 
      features: ['Everything in Career Crusher', 'Bulk resume generation', 'Custom template creation', 'API access', 'White-label licensing', '1-on-1 career coaching', 'Interview preparation', 'Lifetime updates']
    }
  }), []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>CVSmash - AI Resume Builder | ATS-Optimized Resume Generator</title>
        <meta name="description" content="CVSmash: One prompt → Multiple Resume Formats. AI-powered resume blacksmith that crushes HR bots with ATS-optimized, job-tailored resumes in PDF, DOCX, HTML." />
        <meta name="keywords" content="resume builder, ATS optimization, AI resume, job application, CV generator, resume templates, career tools, interview preparation" />
        <meta property="og:title" content="CVSmash - Resume Destroyer That Crushes HR Bots" />
        <meta property="og:description" content="One prompt → Multiple Resume Formats, Styled, Branded, ATS-ready. Crush HR bots, smash the stack." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CVSmash - AI Resume Blacksmith" />
        <meta name="twitter:description" content="Transform your career with AI-powered resumes that crush ATS systems and land interviews." />
      </head>
      
      <div 
        className="bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950 min-h-screen text-white"
        role="main"
        aria-label="CVSmash Resume Builder Service Page"
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
          {/* Background decoration with reduced motion support */}
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
            className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-800/20 rounded-full blur-3xl -z-10 transform scale-150"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          ></motion.div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-700/10 rounded-full blur-2xl -z-10 transform scale-125"
            aria-hidden="true"
          ></div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 filter drop-shadow-2xl relative"
            whileHover={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1.1],
              filter: ["drop-shadow(0 0 0 rgba(245, 158, 11, 0))", "drop-shadow(0 0 30px rgba(245, 158, 11, 0.8))", "drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))"],
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            style={{ willChange: 'transform, filter' }}
            role="img"
            aria-label="Document icon representing professional resume and CV optimization services"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSubscribe('monthly');
              }
            }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(245, 158, 11, 0.5)",
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                  "0 0 30px rgba(245, 158, 11, 1)",
                  "0 0 20px rgba(245, 158, 11, 0.8)",
                  "0 0 10px rgba(245, 158, 11, 0.5)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              style={{ willChange: 'filter' }}
              aria-hidden="true"
            >
              📄
            </motion.span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-700 bg-clip-text text-transparent drop-shadow-lg"
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
              CVSmash
            </motion.span>
          </motion.h1>
          
          <p className="text-2xl mb-8 text-amber-300 font-medium max-w-4xl mx-auto leading-relaxed">
            One prompt → Multiple Resume Formats, Styled, Branded, ATS-ready. Crush HR bots, smash the stack.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-amber-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-amber-500/20">
              <span className="text-green-400">●</span>
              <span className="text-amber-200">Multi-Format Export</span>
            </div>
            <div className="flex items-center space-x-3 bg-yellow-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-yellow-500/20">
              <span className="text-blue-400">●</span>
              <span className="text-yellow-200">ATS Optimized</span>
            </div>
            <div className="flex items-center space-x-3 bg-orange-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-orange-500/20">
              <span className="text-purple-400">●</span>
              <span className="text-orange-200">Job-Tailored</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: [
                "0 25px 50px -12px rgba(245, 158, 11, 0.4)",
                "0 35px 60px -12px rgba(245, 158, 11, 0.6)",
                "0 25px 50px -12px rgba(245, 158, 11, 0.4)"
              ]
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe('monthly')}
            className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            style={{ willChange: 'transform, box-shadow' }}
            aria-label="Start building your optimized resume with CVSmash monthly plan"
            role="button"
            tabIndex={0}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <motion.span
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 0 rgba(255, 255, 255, 0))",
                    "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
                    "drop-shadow(0 0 0 rgba(255, 255, 255, 0))"
                  ]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  filter: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                style={{ willChange: 'transform, filter' }}
                aria-hidden="true"
              >
                💥
              </motion.span>
              <span>Smash Your Resume</span>
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-yellow-200/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform, opacity' }}
              aria-hidden="true"
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            🔨 Resume Blacksmith Powers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Multi-Format Export",
                description: "Generate PDF, DOCX, and HTML versions from one prompt. Perfect for every job application.",
                icon: "🔁",
                color: "from-amber-600 to-yellow-700"
              },
              {
                title: "Auto-Branding",
                description: "Insert logos, colors, and themes automatically. Your personal brand in every resume.",
                icon: "🎨",
                color: "from-yellow-600 to-orange-700"
              },
              {
                title: "Job-Tailored Keywords",
                description: "Extract keywords from job descriptions and optimize your resume for maximum ATS score.",
                icon: "🧠",
                color: "from-orange-600 to-amber-700"
              },
              {
                title: "Clean + Creative Styles",
                description: "From minimalist to portfolio-style. Choose the perfect design for your industry.",
                icon: "✨",
                color: "from-amber-600 to-yellow-700"
              },
              {
                title: "ATS Optimization",
                description: "Crush HR bots with perfectly formatted, keyword-optimized resumes that pass every filter.",
                icon: "🤖",
                color: "from-yellow-600 to-orange-700"
              },
              {
                title: "Bulk Generation",
                description: "Generate multiple resume variations for different roles. One profile, unlimited possibilities.",
                icon: "🗂️",
                color: "from-orange-600 to-amber-700"
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
                className="bg-gradient-to-br from-amber-800/40 to-yellow-900/40 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 group"
              >
                <motion.div 
                  className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{
                    rotate: [0, -15, 15, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-amber-300"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-amber-200 group-hover:text-amber-100 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive ATS Score Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            🎯 Live ATS Score Calculator
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-amber-300">📊 Current Resume Score</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-amber-200">Keyword Optimization</span>
                        <motion.span 
                          className="text-amber-400 font-bold"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          73%
                        </motion.span>
                      </div>
                      <div className="w-full bg-amber-900/50 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-amber-500 to-yellow-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "73%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-amber-200">Format Compliance</span>
                        <motion.span 
                          className="text-green-400 font-bold"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          94%
                        </motion.span>
                      </div>
                      <div className="w-full bg-amber-900/50 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-amber-200">Skills Match</span>
                        <motion.span 
                          className="text-red-400 font-bold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                        >
                          51%
                        </motion.span>
                      </div>
                      <div className="w-full bg-amber-900/50 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-orange-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "51%" }}
                          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-yellow-300">⚡ After CVSmash</h3>
                  <motion.div 
                    className="text-center"
                    animate={{ 
                      scale: [1, 1.02, 1],
                      filter: [
                        "drop-shadow(0 0 0 rgba(34, 197, 94, 0))",
                        "drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))",
                        "drop-shadow(0 0 0 rgba(34, 197, 94, 0))"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    <div className="text-8xl mb-4">📈</div>
                    <motion.div 
                      className="text-6xl font-bold text-green-400 mb-4"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.5)",
                          "0 0 20px rgba(34, 197, 94, 0.8)",
                          "0 0 10px rgba(34, 197, 94, 0.5)"
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      97%
                    </motion.div>
                    <p className="text-green-300 font-semibold">ATS Score</p>
                    <motion.p 
                      className="text-sm text-green-200 mt-2"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      🎯 Ready to crush interviews!
                    </motion.p>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="text-center mt-8 pt-6 border-t border-amber-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(34, 197, 94, 0)",
                      "0 0 20px rgba(34, 197, 94, 0.4)",
                      "0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  💥 Boost My Score Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            ⚡ The Resume Blacksmith Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 backdrop-blur-xl p-12 rounded-3xl border border-amber-500/20">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut" 
                    }}
                  >
                    📝
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-amber-300">1. Input Your Info</h3>
                  <p className="text-amber-200">Simple JSON or text prompt with your experience, skills, and target job.</p>
                  
                  {/* Interactive data flow */}
                  <motion.div 
                    className="mt-4 flex justify-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="flex space-x-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                          animate={{ 
                            scale: [0.5, 1.2, 0.5],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            delay: i * 0.3 
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 360],
                      filter: [
                        "drop-shadow(0 0 0 rgba(245, 158, 11, 0))",
                        "drop-shadow(0 0 15px rgba(245, 158, 11, 0.8))",
                        "drop-shadow(0 0 0 rgba(245, 158, 11, 0))"
                      ]
                    }}
                    transition={{ 
                      rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                      filter: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                  >
                    🔨
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-300">2. AI Blacksmith</h3>
                  <p className="text-yellow-200">LangChain + GPT analyzes job requirements and crafts multiple resume versions.</p>
                  
                  {/* Processing indicator */}
                  <motion.div 
                    className="mt-4 flex justify-center"
                    animate={{ 
                      background: [
                        "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)",
                        "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)"
                      ]
                    }}
                  >
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full">
                      <motion.div
                        className="w-full h-full bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full"
                        animate={{ 
                          x: [-80, 80, -80],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut" 
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut" 
                    }}
                  >
                    💥
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-300">3. Export & Crush</h3>
                  <p className="text-orange-200">Get PDF, DOCX, and HTML formats ready to smash through ATS systems.</p>
                  
                  {/* Success indicator */}
                  <motion.div 
                    className="mt-4 flex justify-center space-x-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    {['PDF', 'DOCX', 'HTML'].map((format, i) => (
                      <motion.div
                        key={format}
                        className="px-2 py-1 bg-orange-600/30 rounded text-xs text-orange-200 border border-orange-500/30"
                        animate={{ 
                          scale: [0.9, 1.1, 0.9],
                          borderColor: [
                            "rgba(251, 146, 60, 0.3)", 
                            "rgba(251, 146, 60, 0.8)", 
                            "rgba(251, 146, 60, 0.3)"
                          ]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          delay: i * 0.4 
                        }}
                      >
                        {format}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            💥 Smash Your Way In
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Job Seeker",
                price: "$6.99",
                period: "/week",
                features: [
                  "5 resume variations",
                  "Basic ATS optimization",
                  "PDF & DOCX export",
                  "Standard templates",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Career Crusher",
                price: "$22.99",
                period: "/month", 
                features: [
                  "Unlimited resume variations",
                  "Advanced ATS optimization",
                  "All export formats",
                  "Premium templates",
                  "Job-tailored keywords",
                  "Auto-branding",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Resume Destroyer",
                price: "$229.99",
                period: "/year",
                features: [
                  "Everything in Career Crusher",
                  "Bulk resume generation",
                  "Custom template creation",
                  "API access",
                  "White-label licensing",
                  "1-on-1 career coaching",
                  "Interview preparation",
                  "Lifetime updates"
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
                    ? 'from-amber-700/40 to-yellow-900/40 border-amber-400/50' 
                    : 'from-amber-800/40 to-yellow-900/20 border-amber-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-amber-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-600 to-yellow-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-amber-300">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-amber-400">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-amber-400">💥</span>
                      <span className="text-amber-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-amber-700/50 text-white border border-amber-500/30 hover:bg-amber-600/50'
                  }`}
                >
                  Crush With {plan.name}
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
            className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 backdrop-blur-xl p-12 rounded-3xl border border-amber-500/20 text-center relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(245, 158, 11, 0.4)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background particles */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)"
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
              🔨
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-amber-300">
              Ready to Smash Through HR Bots?
            </h2>
            <p className="text-xl text-amber-400 mb-8 max-w-2xl mx-auto">
              Transform your career with AI-powered resumes that crush ATS systems and land interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.button
                onClick={() => handleSubscribe('monthly')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(245, 158, 11, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-800 text-white font-bold rounded-2xl text-lg hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">💥 Start Smashing Now</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-amber-500/30 text-amber-300 font-semibold rounded-2xl text-lg hover:border-amber-400/50 hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{
                  borderColor: "rgba(245, 158, 11, 0.5)",
                  color: "#ffffff"
                }}
              >
                <span className="relative z-10">📖 View Examples</span>
                <motion.div
                  className="absolute inset-0 bg-amber-600/10"
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
            name: "CVSmash",
            icon: "📄",
            color: "from-amber-600 to-yellow-800"
          }}
          plan={{
            name: planData[selectedPlan as keyof typeof planData]?.name || 'Career Crusher',
            price: planData[selectedPlan as keyof typeof planData]?.price || '$22.99',
            features: planData[selectedPlan as keyof typeof planData]?.features || planData['career crusher'].features
          }}
        />
      )}
      </div>
    </>
  );
}

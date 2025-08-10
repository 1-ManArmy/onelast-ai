'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function ChatRevivePage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isResurrecting, setIsResurrecting] = useState(false);
  const [resurrectionProgress, setResurrectionProgress] = useState(0);
  const [memoryParticles, setMemoryParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [dnaAnimation, setDnaAnimation] = useState(false);

  // Optimized particle generation with useMemo
  const particleConfig = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
  }, []);

  // Initialize memory particles
  useEffect(() => {
    setMemoryParticles(particleConfig);
  }, [particleConfig]);

  // Optimized subscription handler
  const handleSubscribe = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  }, []);

  // Optimized resurrection process
  const startResurrection = useCallback(() => {
    setIsResurrecting(true);
    setDnaAnimation(true);
    setResurrectionProgress(0);
    
    const interval = setInterval(() => {
      setResurrectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsResurrecting(false);
            setDnaAnimation(false);
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 min-h-screen text-white relative overflow-hidden">
      {/* Floating Memory Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {memoryParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* DNA Helix Animation */}
      <AnimatePresence>
        {dnaAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-10"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-8xl text-green-400/50"
              >
                🧬
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 filter drop-shadow-2xl"
            whileHover={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
              transition: { duration: 0.8 }
            }}
            role="img"
            aria-label="DNA helix representing conversation memory and context resurrection"
          >
            🧬
          </motion.div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-300 via-emerald-500 to-teal-700 bg-clip-text text-transparent drop-shadow-lg">
            ChatRevive
          </h1>
          
          <p className="text-2xl mb-8 text-green-300 font-medium max-w-4xl mx-auto leading-relaxed">
            Revive broken AI chats. Restore context, memory, personality. Resurrect conversations from the digital dead.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-green-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-green-500/20">
              <span className="text-blue-400">●</span>
              <span className="text-green-200">Memory Restoration</span>
            </div>
            <div className="flex items-center space-x-3 bg-emerald-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-emerald-500/20">
              <span className="text-purple-400">●</span>
              <span className="text-emerald-200">Persona Rebuilding</span>
            </div>
            <div className="flex items-center space-x-3 bg-teal-800/30 backdrop-blur-lg px-6 py-3 rounded-full border border-teal-500/20">
              <span className="text-yellow-400">●</span>
              <span className="text-teal-200">Context Analysis</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={startResurrection}
            disabled={isResurrecting}
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <motion.span
                animate={isResurrecting ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: isResurrecting ? Infinity : 0, ease: "linear" }}
              >
                🧬
              </motion.span>
              <span>{isResurrecting ? 'Resurrecting...' : 'Resurrect Conversations'}</span>
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Progress bar */}
            {isResurrecting && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-green-300"
                initial={{ width: 0 }}
                animate={{ width: `${resurrectionProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            🔬 Resurrection Laboratory
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Memory Resurrection",
                description: "Extract and restore complete conversation history, context, and relationship dynamics from dead chat logs.",
                icon: "🧠",
                color: "from-green-600 to-emerald-700",
                ariaLabel: "Brain icon representing memory extraction and restoration"
              },
              {
                title: "Persona Rebuilding", 
                description: "Reconstruct AI personality, tone, and behavioral patterns from conversation fragments and interactions.",
                icon: "👤",
                color: "from-emerald-600 to-teal-700",
                ariaLabel: "Person icon representing AI personality reconstruction"
              },
              {
                title: "Context Analysis",
                description: "Deep analysis of conversation flow, topic tracking, and emotional context for perfect continuity.",
                icon: "🔍",
                color: "from-teal-600 to-green-700",
                ariaLabel: "Magnifying glass representing deep conversation analysis"
              },
              {
                title: "Multi-Platform Support",
                description: "Works with OpenAI, Claude, Mistral, and all major LLMs. Universal compatibility guaranteed.",
                icon: "🌐",
                color: "from-green-600 to-emerald-700",
                ariaLabel: "Globe icon representing multi-platform AI compatibility"
              },
              {
                title: "Export Formats",
                description: "Generate system prompts, memory JSON, or custom formats ready for injection into new AI sessions.",
                icon: "📦",
                color: "from-emerald-600 to-teal-700",
                ariaLabel: "Package icon representing various export format options"
              },
              {
                title: "Smart Injection",
                description: "Seamlessly inject restored memories back into fresh AI sessions for perfect conversation continuity.",
                icon: "💉",
                color: "from-teal-600 to-green-700",
                ariaLabel: "Syringe icon representing memory injection into AI systems"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.3)"
                }}
                className="bg-gradient-to-br from-green-800/40 to-emerald-900/40 backdrop-blur-xl p-8 rounded-3xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
              >
                <motion.div 
                  className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.5 }}
                  role="img"
                  aria-label={feature.ariaLabel}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">{feature.title}</h3>
                <p className="text-green-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resurrection Process */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            ⚗️ The Resurrection Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-800/30 to-emerald-900/30 backdrop-blur-xl p-12 rounded-3xl border border-green-500/20">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotateY: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    💀
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-green-300">1. Import Dead Chat</h3>
                  <p className="text-green-200">Paste your broken chat logs, conversation fragments, or dead AI sessions.</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🔬
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-300">2. AI Analysis</h3>
                  <p className="text-emerald-200">Deep learning algorithms extract tone, personality, context, and memory patterns.</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotateZ: [0, 180, 360],
                      scale: [1, 1.3, 1],
                      filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🧬
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-teal-300">3. Resurrect & Export</h3>
                  <p className="text-teal-200">Get system prompts and memory files ready to breathe life into new AI sessions.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            🎯 Resurrection Scenarios
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "🤖 AI Companion Revival",
                description: "Your AI friend died? Resurrect their complete personality, memories, and relationship history from chat logs.",
                gradient: "from-green-700/30 to-emerald-800/30"
              },
              {
                title: "💼 Business Bot Continuity",
                description: "Maintain customer service consistency by restoring bot context across sessions and platform migrations.",
                gradient: "from-emerald-700/30 to-teal-800/30"
              },
              {
                title: "🎮 Character Persistence",
                description: "Keep game NPCs and interactive characters consistent across updates, reboots, and version changes.",
                gradient: "from-teal-700/30 to-green-800/30"
              },
              {
                title: "📚 Research Continuity",
                description: "Restore research assistant context, ongoing projects, and accumulated knowledge from previous sessions.",
                gradient: "from-green-700/30 to-emerald-800/30"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.03,
                  rotateX: 5,
                  boxShadow: "0 20px 40px -12px rgba(34, 197, 94, 0.25)"
                }}
                className={`bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 rounded-3xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300`}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-green-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {useCase.title}
                </motion.h3>
                <p className="text-green-200">{useCase.description}</p>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            🧬 Resurrection Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic Revival",
                price: "$5.99",
                period: "/week",
                features: [
                  "5 chat resurrections",
                  "Basic memory extraction",
                  "System prompt export",
                  "Standard analysis",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Memory Master",
                price: "$19.99",
                period: "/month", 
                features: [
                  "Unlimited resurrections",
                  "Advanced memory restoration",
                  "Multi-format export",
                  "Personality rebuilding",
                  "Context preservation",
                  "Priority support",
                  "API access"
                ],
                popular: true
              },
              {
                name: "Resurrection God",
                price: "$199.99",
                period: "/year",
                features: [
                  "Everything in Memory Master",
                  "Bulk processing",
                  "Custom export formats",
                  "Enterprise integration",
                  "White-label licensing",
                  "24/7 support",
                  "Custom model training",
                  "Immortal memories"
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
                    ? "0 25px 60px -12px rgba(34, 197, 94, 0.4)" 
                    : "0 15px 40px -12px rgba(34, 197, 94, 0.2)"
                }}
                className={`relative bg-gradient-to-br ${
                  plan.popular 
                    ? 'from-green-700/40 to-emerald-900/40 border-green-400/50' 
                    : 'from-green-800/40 to-emerald-900/20 border-green-500/20'
                } backdrop-blur-xl p-8 rounded-3xl border hover:border-green-400/60 transition-all duration-300`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="bg-gradient-to-r from-green-600 to-emerald-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </motion.div>
                )}
                
                <div className="text-center mb-8">
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-green-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {plan.name}
                  </motion.h3>
                  <div className="mb-4">
                    <motion.span 
                      className="text-4xl font-bold text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-green-400">{plan.period}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex} 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      <motion.span 
                        className="text-green-400"
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: featureIndex * 0.2
                        }}
                        role="img"
                        aria-label="DNA helix feature indicator"
                      >
                        🧬
                      </motion.span>
                      <span className="text-green-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-600 to-emerald-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-green-700/50 text-white border border-green-500/30 hover:bg-green-600/50'
                  }`}
                >
                  Revive With {plan.name}
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
          <div className="bg-gradient-to-br from-green-800/30 to-emerald-900/30 backdrop-blur-xl p-12 rounded-3xl border border-green-500/20">
            <div className="text-4xl mb-6" role="img" aria-label="Laboratory equipment representing conversation resurrection">⚗️</div>
            <h2 className="text-3xl font-bold mb-4 text-green-300">
              Ready to Resurrect Your Conversations?
            </h2>
            <p className="text-xl text-green-400 mb-8 max-w-2xl mx-auto">
              Bring your dead AI chats back to life with perfect memory, personality, and context restoration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubscribe('monthly')}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-800 text-white font-bold rounded-2xl text-lg hover:from-green-500 hover:to-emerald-700 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">🧬 Start Resurrection</span>
                <motion.div 
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(34, 197, 94, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-green-500/30 text-green-300 font-semibold rounded-2xl text-lg hover:border-green-400/50 hover:text-white transition-all duration-300"
              >
                📖 View Examples
              </motion.button>
            </div>
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
              name: "ChatRevive",
              icon: "🧬",
              color: "from-green-600 to-emerald-800"
            }}
            plan={{
              name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
              price: selectedPlan === 'basic revival' ? '$5.99' : selectedPlan === 'memory master' ? '$19.99' : '$199.99',
              features: selectedPlan === 'basic revival' 
                ? ['5 chat resurrections', 'Basic memory extraction', 'System prompt export', 'Standard analysis', 'Email support']
                : selectedPlan === 'memory master' 
                ? ['Unlimited resurrections', 'Advanced memory restoration', 'Multi-format export', 'Personality rebuilding', 'Context preservation', 'Priority support', 'API access']
                : ['Everything in Memory Master', 'Bulk processing', 'Custom export formats', 'Enterprise integration', 'White-label licensing', '24/7 support', 'Custom model training', 'Immortal memories']
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function AgentXPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
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
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 filter drop-shadow-2xl"
          >
            🕶️
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent drop-shadow-lg"
          >
            AgentX
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl mb-8 text-gray-300 font-medium"
          >
            AI Agent that does your dirty work <span className="text-gray-500">(legal, mostly)</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Your persistent AI assistant, trained to carry out missions across apps, files, and APIs. From scraping to replying, from fetching reports to acting on web data — AgentX handles it all.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(75, 85, 99, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscribe('monthly')}
              className="relative bg-gradient-to-r from-gray-600 to-gray-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center space-x-2">
                <span>🚀</span>
                <span>Deploy AgentX</span>
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800/50 backdrop-blur-lg border-2 border-gray-500/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:border-gray-400/50 transition-all duration-300 group"
            >
              <span className="flex items-center space-x-2">
                <span>📊</span>
                <span>View Mission Logs</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Agent Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center items-center space-x-12 mt-16 text-sm"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-xl font-bold text-green-400">2,847</div>
              </div>
              <div className="text-gray-400">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="text-xl font-bold text-blue-400">99.7%</div>
              </div>
              <div className="text-gray-400">Mission Success</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="text-xl font-bold text-purple-400">24/7</div>
              </div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Capabilities Section */}
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
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent"
          >
            🔧 Advanced Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "🧠",
                title: "Goal-driven Task Planning",
                description: "Intelligent mission planning with multi-step task breakdown and adaptive execution strategies.",
                color: "from-gray-700/30 to-gray-900/40",
                borderColor: "border-gray-600/30",
                accent: "text-gray-300",
                glowColor: "shadow-gray-500/10"
              },
              {
                icon: "🕸️", 
                title: "Web + API Automation",
                description: "Seamless automation across web platforms, APIs, and external services with intelligent error handling.",
                color: "from-gray-800/30 to-gray-900/50",
                borderColor: "border-gray-500/30",
                accent: "text-gray-400",
                glowColor: "shadow-gray-600/10"
              },
              {
                icon: "📁",
                title: "File Access, Parsing & Logging",
                description: "Advanced file manipulation, data extraction, and comprehensive mission logging capabilities.",
                color: "from-gray-700/30 to-gray-900/40",
                borderColor: "border-gray-600/30",
                accent: "text-gray-300",
                glowColor: "shadow-gray-500/10"
              },
              {
                icon: "🔁",
                title: "Loop & Retry Logic",
                description: "Persistent execution with intelligent retry mechanisms and failure recovery protocols.",
                color: "from-gray-800/30 to-gray-900/50",
                borderColor: "border-gray-500/30",
                accent: "text-gray-400",
                glowColor: "shadow-gray-600/10"
              },
              {
                icon: "🌐",
                title: "Browser Control (Playwright)",
                description: "Full browser automation with Playwright integration for complex web interactions.",
                color: "from-gray-700/30 to-gray-900/40",
                borderColor: "border-gray-600/30",
                accent: "text-gray-300",
                glowColor: "shadow-gray-500/10"
              },
              {
                icon: "🔄",
                title: "24/7 Autonomous Operation",
                description: "Continuous background operation with monitoring, alerting, and self-maintenance capabilities.",
                color: "from-gray-800/30 to-gray-900/50",
                borderColor: "border-gray-500/30",
                accent: "text-gray-400",
                glowColor: "shadow-gray-600/10"
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className={`relative bg-gradient-to-br ${capability.color} backdrop-blur-xl p-10 rounded-3xl border ${capability.borderColor} hover:border-opacity-80 transition-all duration-500 group overflow-hidden ${capability.glowColor} hover:shadow-xl`}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {capability.icon}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className={`text-2xl font-bold mb-4 ${capability.accent} group-hover:text-white transition-colors duration-300`}
                >
                  {capability.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                >
                  {capability.description}
                </motion.p>

                {/* Status indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Types */}
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
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent"
          >
            🎯 Mission Types
          </motion.h2>
          
          <div className="max-w-6xl mx-auto relative">
            {/* Connection line */}
            <div className="absolute left-8 top-16 bottom-16 w-1 bg-gradient-to-b from-gray-600/50 to-gray-800/50 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  mission: "Data Extraction & Scraping",
                  description: "Extract data from websites, databases, and APIs with intelligent parsing and validation.",
                  icon: "🔍",
                  examples: ["E-commerce price monitoring", "Social media sentiment analysis", "News aggregation"],
                  color: "from-gray-700 to-gray-800",
                  bgGradient: "from-gray-800/40 to-gray-900/60"
                },
                {
                  mission: "Automated Communication", 
                  description: "Handle emails, messages, and notifications with context-aware responses and scheduling.",
                  icon: "📧",
                  examples: ["Customer support automation", "Lead qualification", "Follow-up sequences"],
                  color: "from-gray-600 to-gray-700",
                  bgGradient: "from-gray-700/40 to-gray-800/60"
                },
                {
                  mission: "Workflow Automation",
                  description: "Automate complex business processes across multiple platforms and applications.",
                  icon: "⚙️",
                  examples: ["Report generation", "Data synchronization", "Quality assurance testing"],
                  color: "from-gray-700 to-gray-800",
                  bgGradient: "from-gray-800/40 to-gray-900/60"
                },
                {
                  mission: "Monitoring & Alerting",
                  description: "Continuous monitoring of systems, metrics, and conditions with intelligent alerting.",
                  icon: "📊",
                  examples: ["Server health monitoring", "Market trend analysis", "Security threat detection"],
                  color: "from-gray-600 to-gray-700",
                  bgGradient: "from-gray-700/40 to-gray-800/60"
                }
              ].map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
                  className="flex items-center space-x-8 relative group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 relative z-10"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${mission.color} rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-300`}>
                      {mission.icon}
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${mission.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.3, duration: 0.6 }}
                    className={`flex-1 bg-gradient-to-r ${mission.bgGradient} backdrop-blur-xl p-8 rounded-3xl border border-gray-500/20 hover:border-gray-400/40 transition-all duration-300 group/mission`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-300 group-hover/mission:text-white transition-colors duration-300">
                        {mission.mission}
                      </h3>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-60 group-hover/mission:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed group-hover/mission:text-gray-300 transition-colors duration-300">
                      {mission.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Use Cases:</h4>
                      <div className="flex flex-wrap gap-3">
                        {mission.examples.map((example, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8 + index * 0.3 + idx * 0.1, duration: 0.4 }}
                            className="text-sm bg-gray-700/60 text-gray-300 px-4 py-2 rounded-full border border-gray-600/30 hover:bg-gray-600/60 hover:border-gray-500/40 transition-all duration-300 cursor-pointer"
                          >
                            {example}
                          </motion.span>
                        ))}
                      </div>
                    </div>
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
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent"
          >
            💼 Agent Deployment Plans
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                name: "Solo Agent",
                price: "$14.99",
                period: "/week",
                features: [
                  "Single agent deployment",
                  "Basic task automation",
                  "Web scraping capabilities",
                  "Email support",
                  "Mission logs (7 days)"
                ],
                popular: false,
                plan: "weekly",
                icon: "🔍",
                color: "from-gray-700 to-gray-800",
                bgGradient: "from-gray-800/30 to-gray-900/50",
                borderGradient: "from-gray-600/30 to-gray-700/30"
              },
              {
                name: "Agent Squad", 
                price: "$49.99",
                period: "/month",
                features: [
                  "Up to 5 concurrent agents",
                  "Advanced automation suite",
                  "Browser control (Playwright)",
                  "API integrations",
                  "Priority support",
                  "Mission logs (30 days)",
                  "Custom workflows"
                ],
                popular: true,
                plan: "monthly",
                icon: "🎯",
                color: "from-gray-500 to-gray-700",
                bgGradient: "from-gray-700/40 to-gray-800/60",
                borderGradient: "from-gray-500/40 to-gray-600/40"
              },
              {
                name: "Agent Army",
                price: "$499.99",
                period: "/year",
                features: [
                  "Unlimited agents",
                  "Enterprise automation",
                  "Dedicated infrastructure",
                  "Custom integrations",
                  "24/7 priority support",
                  "Unlimited mission logs",
                  "Advanced monitoring",
                  "SLA guarantee"
                ],
                popular: false,
                plan: "yearly",
                icon: "👑",
                color: "from-gray-600 to-gray-800",
                bgGradient: "from-gray-800/40 to-gray-900/60",
                borderGradient: "from-gray-500/40 to-gray-600/40"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 1.6 + index * 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                className={`relative group ${plan.popular ? 'md:scale-105' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.6, type: "spring" }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </motion.div>
                )}
                
                <div className={`relative bg-gradient-to-br ${plan.bgGradient} backdrop-blur-xl border border-gray-500/20 rounded-3xl p-8 h-full overflow-hidden group-hover:border-gray-400/40 transition-all duration-500`}>
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Animated border gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.8 + index * 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
                      className="text-center mb-8"
                    >
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${plan.color} rounded-full mb-4 text-3xl shadow-2xl group-hover:shadow-gray-500/25 transition-all duration-300`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                        {plan.name}
                      </h3>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                      className="text-center mb-8"
                    >
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
                          {plan.price}
                        </span>
                        <span className="text-gray-400 text-lg ml-2 group-hover:text-gray-300 transition-colors duration-300">
                          {plan.period}
                        </span>
                      </div>
                    </motion.div>
                    
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 + index * 0.2, duration: 0.6 }}
                      className="space-y-4 mb-8"
                    >
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.4 + index * 0.2 + featureIndex * 0.1, duration: 0.4 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 group-hover:animate-pulse"></div>
                          <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6 + index * 0.2, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubscribe(plan.plan)}
                      className={`w-full py-4 px-6 bg-gradient-to-r ${plan.color} text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 relative overflow-hidden group/btn`}
                    >
                      <span className="relative z-10">Deploy {plan.name}</span>
                      <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </motion.button>
                  </div>
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl p-16 rounded-3xl border border-gray-500/20 text-center overflow-hidden group"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="mb-8"
              >
                <motion.div
                  animate={{ 
                    rotateY: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-6xl mb-6"
                >
                  🕶️
                </motion.div>
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent">
                  Ready to Deploy Your AI Agent?
                </h2>
                <p className="text-xl text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300 max-w-3xl mx-auto leading-relaxed">
                  Join professionals and businesses who use AgentX to automate their workflows, save time, and handle complex tasks 24/7.
                </p>
                <p className="text-lg text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  Your digital workforce awaits orders.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(156, 163, 175, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribe('monthly')}
                  className="px-12 py-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-2xl text-xl hover:from-gray-500 hover:to-gray-700 transition-all duration-300 relative overflow-hidden group/btn shadow-2xl"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>🚀</span>
                    <span>Start Mission Now</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-500/30 text-gray-300 font-semibold rounded-2xl text-lg hover:border-gray-400/50 hover:text-white transition-all duration-300 group/secondary"
                >
                  <span className="flex items-center space-x-3">
                    <span>📋</span>
                    <span>View Documentation</span>
                  </span>
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="flex justify-center items-center space-x-12 text-sm text-gray-400 mb-8"
              >
                {[
                  { icon: "✓", text: "No setup required", color: "text-green-400" },
                  { icon: "✓", text: "Deploy in seconds", color: "text-green-400" },
                  { icon: "✓", text: "Cancel anytime", color: "text-green-400" }
                ].map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.6 + index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-2 group/feature"
                  >
                    <span className={`${item.color} group-hover/feature:animate-pulse`}>{item.icon}</span>
                    <span className="group-hover/feature:text-gray-300 transition-colors duration-300">{item.text}</span>
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
                className="flex justify-center space-x-16 text-center"
              >
                {[
                  { label: "Deploy Time", value: "< 30 sec", icon: "⚡" },
                  { label: "Success Rate", value: "99.8%", icon: "🎯" },
                  { label: "Active Agents", value: "10,000+", icon: "🤖" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3 + index * 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                    className="group/stat"
                  >
                    <div className="text-3xl mb-2 group-hover/stat:animate-bounce">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white group-hover/stat:text-gray-200 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 group-hover/stat:text-gray-400 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
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
            name: "AgentX",
            icon: "🕶️",
            color: "from-gray-600 to-gray-800"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'weekly' ? '$14.99' : selectedPlan === 'monthly' ? '$49.99' : '$499.99',
            features: selectedPlan === 'weekly' 
              ? ['Single agent deployment', 'Basic task automation', 'Web scraping capabilities', 'Email support', 'Mission logs (7 days)']
              : selectedPlan === 'monthly' 
              ? ['Up to 5 concurrent agents', 'Advanced automation suite', 'Browser control (Playwright)', 'API integrations', 'Priority support', 'Mission logs (30 days)', 'Custom workflows']
              : ['Unlimited agents', 'Enterprise automation', 'Dedicated infrastructure', 'Custom integrations', '24/7 priority support', 'Unlimited mission logs', 'Advanced monitoring', 'SLA guarantee']
          }}
        />
      )}
    </div>
  );
}

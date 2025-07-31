'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

export default function CVSmashPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950 min-h-screen text-white">
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
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-800/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
          
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
            aria-label="Document - professional resume and CV optimization"
          >
            📄
          </motion.div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-700 bg-clip-text text-transparent drop-shadow-lg">
            CVSmash
          </h1>
          
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
              boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe('monthly')}
            className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>💥</span>
              <span>Smash Your Resume</span>
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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
                className="bg-gradient-to-br from-amber-800/40 to-yellow-900/40 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/20"
              >
                <div className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-amber-300">{feature.title}</h3>
                <p className="text-amber-200">{feature.description}</p>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            ⚡ The Resume Blacksmith Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 backdrop-blur-xl p-12 rounded-3xl border border-amber-500/20">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold mb-4 text-amber-300">1. Input Your Info</h3>
                  <p className="text-amber-200">Simple JSON or text prompt with your experience, skills, and target job.</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🔨</div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-300">2. AI Blacksmith</h3>
                  <p className="text-yellow-200">LangChain + GPT analyzes job requirements and crafts multiple resume versions.</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">💥</div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-300">3. Export & Crush</h3>
                  <p className="text-orange-200">Get PDF, DOCX, and HTML formats ready to smash through ATS systems.</p>
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
          <div className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 backdrop-blur-xl p-12 rounded-3xl border border-amber-500/20 text-center">
            <div className="text-4xl mb-6">🔨</div>
            <h2 className="text-3xl font-bold mb-4 text-amber-300">
              Ready to Smash Through HR Bots?
            </h2>
            <p className="text-xl text-amber-400 mb-8 max-w-2xl mx-auto">
              Transform your career with AI-powered resumes that crush ATS systems and land interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleSubscribe('monthly')}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-800 text-white font-bold rounded-2xl text-lg hover:from-amber-500 hover:to-yellow-700 transition-all duration-300"
              >
                💥 Start Smashing Now
              </button>
              <button className="px-8 py-4 border border-amber-500/30 text-amber-300 font-semibold rounded-2xl text-lg hover:border-amber-400/50 hover:text-white transition-all duration-300">
                📖 View Examples
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
            name: "CVSmash",
            icon: "📄",
            color: "from-amber-600 to-yellow-800"
          }}
          plan={{
            name: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
            price: selectedPlan === 'job seeker' ? '$6.99' : selectedPlan === 'career crusher' ? '$22.99' : '$229.99',
            features: selectedPlan === 'job seeker' 
              ? ['5 resume variations', 'Basic ATS optimization', 'PDF & DOCX export', 'Standard templates', 'Email support']
              : selectedPlan === 'career crusher' 
              ? ['Unlimited resume variations', 'Advanced ATS optimization', 'All export formats', 'Premium templates', 'Job-tailored keywords', 'Auto-branding', 'Priority support']
              : ['Everything in Career Crusher', 'Bulk resume generation', 'Custom template creation', 'API access', 'White-label licensing', '1-on-1 career coaching', 'Interview preparation', 'Lifetime updates']
          }}
        />
      )}
    </div>
  );
}

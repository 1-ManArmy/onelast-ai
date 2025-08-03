import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mic, 
  Brain, 
  Code, 
  Heart, 
  Zap, 
  BarChart3,
  ExternalLink,
  CheckCircle,
  Clock
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { ModernButton } from './ui/ModernButton';

interface AIModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  features: string[];
  status: 'active' | 'coming-soon' | 'beta';
  subdomain?: string;
}

export function ModulesSection() {
  const modules: AIModule[] = [
    {
      id: 'astrology',
      name: 'Astrology AI',
      description: 'Personalized astrological insights and predictions powered by advanced AI algorithms',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      features: ['Birth Chart Analysis', 'Daily Horoscopes', 'Compatibility Reports', 'Transit Predictions'],
      status: 'active',
      subdomain: 'astrology'
    },
    {
      id: 'voice',
      name: 'Voice AI',
      description: 'Advanced voice processing with real-time speech recognition and natural responses',
      icon: Mic,
      color: 'from-blue-500 to-cyan-500',
      features: ['Speech Recognition', 'Voice Synthesis', 'Emotion Detection', 'Multi-language Support'],
      status: 'active',
      subdomain: 'voice'
    },
    {
      id: 'assistant',
      name: 'AI Assistant',
      description: 'Comprehensive AI assistant for productivity, creativity, and problem-solving',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      features: ['Task Management', 'Creative Writing', 'Research Assistant', 'Email Drafting'],
      status: 'active',
      subdomain: 'assistant'
    },
    {
      id: 'code',
      name: 'Code Assistant',
      description: 'Intelligent coding companion for development, debugging, and code optimization',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      features: ['Code Generation', 'Bug Detection', 'Code Review', 'Documentation'],
      status: 'active',
      subdomain: 'code'
    },
    {
      id: 'emotion',
      name: 'Voice Emotion Analysis',
      description: 'Real-time emotion detection and analysis from voice patterns and speech',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      features: ['Emotion Recognition', 'Mood Tracking', 'Sentiment Analysis', 'Wellness Insights'],
      status: 'beta',
      subdomain: 'emotion'
    },
    {
      id: 'automation',
      name: 'Smart Automation',
      description: 'Intelligent workflow automation and task orchestration powered by AI',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      features: ['Workflow Creation', 'Task Automation', 'Smart Triggers', 'Integration Hub'],
      status: 'coming-soon'
    },
    {
      id: 'analytics',
      name: 'AI Analytics',
      description: 'Advanced data analysis and insights generation with predictive capabilities',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      features: ['Data Visualization', 'Predictive Analytics', 'Trend Analysis', 'Custom Reports'],
      status: 'coming-soon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'beta': return 'text-yellow-400 bg-yellow-500/20';
      case 'coming-soon': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'beta': return 'Beta';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  const handleModuleClick = (module: AIModule) => {
    if (module.status === 'active' && module.subdomain) {
      // In a real app, this would navigate to the subdomain
      window.open(`https://${module.subdomain}.example.com`, '_blank');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            AI-Powered Modules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive suite of AI modules designed to enhance every aspect of your digital experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <GlassCard className="p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <IconComponent size={24} color="white" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                      {getStatusText(module.status)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{module.name}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{module.description}</p>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-semibold text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    {module.status === 'active' ? (
                      <ModernButton
                        onClick={() => handleModuleClick(module)}
                        variant="primary"
                        className="w-full group"
                      >
                        <span>Launch Module</span>
                        <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </ModernButton>
                    ) : module.status === 'beta' ? (
                      <ModernButton
                        onClick={() => handleModuleClick(module)}
                        variant="secondary"
                        className="w-full"
                      >
                        <span>Try Beta</span>
                        <ExternalLink size={16} className="ml-2" />
                      </ModernButton>
                    ) : (
                      <ModernButton
                        variant="outline"
                        disabled
                        className="w-full"
                      >
                        <Clock size={16} className="mr-2" />
                        Coming Soon
                      </ModernButton>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity pointer-events-none`} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <GlassCard className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience AI Innovation?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of users who are already transforming their workflows with our AI-powered modules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton variant="primary" className="px-8 py-3">
                Get Started Free
              </ModernButton>
              <ModernButton variant="outline" className="px-8 py-3">
                View Pricing
              </ModernButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

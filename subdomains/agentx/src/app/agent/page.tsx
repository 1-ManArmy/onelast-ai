'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgentXPlatform() {
  const [agentStatus, setAgentStatus] = useState<'idle' | 'learning' | 'executing' | 'optimizing'>('idle');
  const [currentTask, setCurrentTask] = useState('');
  const [efficiency, setEfficiency] = useState(97.3);
  const [tasksCompleted, setTasksCompleted] = useState(1247);
  const [learningProgress, setLearningProgress] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'AgentX v2.0.1 initialized...',
    'Neural networks online...',
    'Self-learning protocols activated...',
    'Ready for mission deployment 🕶️'
  ]);

  // Simulate real-time agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiency(prev => Math.min(99.9, prev + Math.random() * 0.1));
      setTasksCompleted(prev => prev + Math.floor(Math.random() * 3));
      
      if (agentStatus === 'learning') {
        setLearningProgress(prev => Math.min(100, prev + Math.random() * 5));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [agentStatus]);

  // Simulate agent tasks
  const agentTasks = useMemo(() => [
    'Analyzing web traffic patterns...',
    'Optimizing API response times...',
    'Learning from user interactions...',
    'Executing automated workflows...',
    'Processing data streams...',
    'Adapting to new environments...',
    'Self-diagnosing system performance...',
    'Optimizing neural pathways...'
  ], []);

  const startAgent = useCallback(() => {
    setAgentStatus('learning');
    setLearningProgress(0);
    setCurrentTask(agentTasks[Math.floor(Math.random() * agentTasks.length)]);
    
    setTimeout(() => {
      setAgentStatus('executing');
      setCurrentTask('Mission in progress...');
    }, 3000);
  }, [agentTasks]);

  const openTerminal = useCallback(() => {
    setShowTerminal(true);
    const newLines = [
      '> agentx --status',
      'Status: OPERATIONAL 🟢',
      `Efficiency: ${efficiency.toFixed(1)}%`,
      `Tasks Completed: ${tasksCompleted.toLocaleString()}`,
      '> agentx --capabilities',
      '✓ Web Automation (Playwright)',
      '✓ API Integration & Automation', 
      '✓ File Processing & Analysis',
      '✓ Self-Learning Algorithms',
      '✓ Goal-Driven Task Planning',
      '✓ Error Recovery & Retry Logic',
      '> agentx --mission-ready',
      'Agent ready for deployment 🚀'
    ];
    
    setTerminalLines(prev => [...prev, ...newLines]);
  }, [efficiency, tasksCompleted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agent-darker via-gray-950 to-black text-white overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 p-6 border-b border-gray-800/50 backdrop-blur-agent"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              🕶️
            </motion.span>
            <div>
              <h1 className="text-2xl font-bold cyber-text">AgentX</h1>
              <p className="text-agent-secondary text-sm">agentx.onelast.ai</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <motion.div 
              className="px-4 py-2 bg-agent-cyan-600/20 rounded-full border border-agent-cyan-500/30"
              animate={{ borderColor: ['rgba(34, 211, 238, 0.3)', 'rgba(34, 211, 238, 0.6)', 'rgba(34, 211, 238, 0.3)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-sm terminal-text">Status: ONLINE</span>
            </motion.div>
            
            <motion.button
              onClick={openTerminal}
              className="px-6 py-3 bg-gradient-to-r from-agent-cyan-600 to-agent-cyan-700 rounded-lg font-semibold hover:from-agent-cyan-500 hover:to-agent-cyan-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Terminal
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Main Dashboard */}
      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <motion.h2 
            className="text-6xl font-bold mb-6 cyber-text bg-gradient-to-r from-white via-agent-secondary to-agent-cyan-400 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI That Does Your Dirty Work
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto terminal-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Self-learning automation agent with maximum efficiency. 
            Web scraping, API automation, file processing, and adaptive intelligence.
          </motion.p>

          <motion.div 
            className="flex justify-center space-x-8 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center data-stream">
              <div className="text-3xl font-bold text-agent-secondary">{efficiency.toFixed(1)}%</div>
              <div className="text-gray-400">Efficiency</div>
            </div>
            <div className="text-center data-stream">
              <div className="text-3xl font-bold text-agent-cyan-400">{tasksCompleted.toLocaleString()}</div>
              <div className="text-gray-400">Tasks Completed</div>
            </div>
            <div className="text-center data-stream">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400">Active Learning</div>
            </div>
          </motion.div>

          <motion.button
            onClick={startAgent}
            disabled={agentStatus !== 'idle'}
            className={`px-12 py-4 text-xl font-bold rounded-xl transition-all transform ${
              agentStatus === 'idle'
                ? 'bg-gradient-to-r from-agent-cyan-600 to-agent-cyan-700 hover:from-agent-cyan-500 hover:to-agent-cyan-600 hover:scale-105 agent-glow'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            whileHover={agentStatus === 'idle' ? { scale: 1.05 } : {}}
            whileTap={agentStatus === 'idle' ? { scale: 0.95 } : {}}
          >
            {agentStatus === 'idle' ? '🚀 Deploy Agent' : 
             agentStatus === 'learning' ? '🧠 Learning...' :
             agentStatus === 'executing' ? '⚡ Executing...' : '🔧 Optimizing...'}
          </motion.button>
        </motion.section>

        {/* Agent Status Panel */}
        <AnimatePresence>
          {agentStatus !== 'idle' && (
            <motion.section
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-12 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-agent rounded-2xl border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-6 cyber-text">Agent Status Panel</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-agent-secondary">Current Task</h4>
                  <p className="terminal-text text-gray-300">{currentTask}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-agent-secondary">Learning Progress</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-agent-cyan-600 to-agent-secondary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${learningProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{learningProgress.toFixed(1)}%</span>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-agent-secondary">Neural Activity</h4>
                  <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-8 bg-agent-cyan-600 rounded"
                        animate={{
                          height: [16, 32, 16],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1 + i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Capabilities Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12 cyber-text">Agent Capabilities</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠',
                title: 'Self-Learning AI',
                description: 'Continuously adapts and improves from every interaction',
                color: 'from-purple-500 to-purple-700'
              },
              {
                icon: '🕸️',
                title: 'Web Automation',
                description: 'Browser control with Playwright for complex web tasks',
                color: 'from-blue-500 to-blue-700'
              },
              {
                icon: '⚡',
                title: 'API Integration',
                description: 'Seamless automation across multiple APIs and services',
                color: 'from-yellow-500 to-yellow-700'
              },
              {
                icon: '📁',
                title: 'File Processing',
                description: 'Parse, analyze, and manipulate files of any format',
                color: 'from-green-500 to-green-700'
              },
              {
                icon: '🔁',
                title: 'Retry Logic',
                description: 'Intelligent error recovery and persistent execution',
                color: 'from-red-500 to-red-700'
              },
              {
                icon: '🎯',
                title: 'Goal Planning',
                description: 'Strategic task breakdown and optimal execution paths',
                color: 'from-cyan-500 to-cyan-700'
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-agent rounded-xl border border-gray-700/50 hover:border-agent-cyan-500/50 transition-all agent-glow"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center`}>
                  {capability.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 cyber-text">{capability.title}</h4>
                <p className="text-gray-300 terminal-text">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center py-20"
        >
          <h3 className="text-4xl font-bold mb-6 cyber-text">Ready to Deploy?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the automation revolution. Let AgentX handle your repetitive tasks while you focus on what matters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-agent-cyan-600 to-agent-cyan-700 rounded-xl font-bold text-lg hover:from-agent-cyan-500 hover:to-agent-cyan-600 transition-all agent-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Free Trial
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border border-agent-cyan-500/50 text-agent-cyan-400 rounded-xl font-bold text-lg hover:bg-agent-cyan-500/10 transition-all"
              whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              📖 View Documentation
            </motion.button>
          </div>
        </motion.section>
      </main>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-96 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-400 terminal-text">AgentX Terminal</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 h-80 overflow-y-auto terminal-text bg-black">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-1 text-agent-secondary"
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-4 bg-agent-secondary ml-1"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

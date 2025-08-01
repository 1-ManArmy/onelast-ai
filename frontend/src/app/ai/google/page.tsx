'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function GoogleAITestPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const testGoogleAI = async (endpoint: string, payload: Record<string, unknown>) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch(`/api/ai/google/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.data.response || data.data.analysis || data.data.reasoning);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = () => {
    testGoogleAI('chat', {
      prompt,
      model: 'gemini-1.5-flash',
      options: {
        temperature: 0.7,
        maxTokens: 1000
      }
    });
  };

  const handleReasoning = () => {
    testGoogleAI('reasoning', {
      question: prompt,
      options: {
        temperature: 0.3,
        maxTokens: 2000
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 via-green-900 to-black min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-6">🌈</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-green-400 to-blue-500 bg-clip-text text-transparent">
            Google AI Studio Test
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test Google AI Studio integration with Gemini models
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('reasoning')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'reasoning'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🧠 Reasoning
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-800/20 to-green-900/30 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/20">
            <div className="space-y-6">
              <div>
                <label className="block text-blue-300 text-sm font-semibold mb-2">
                  {activeTab === 'chat' ? 'Enter your message:' : 'Enter your question:'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    activeTab === 'chat'
                      ? 'Ask Gemini anything...'
                      : 'Ask a complex question that requires reasoning...'
                  }
                  className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                  disabled={loading}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={activeTab === 'chat' ? handleChat : handleReasoning}
                disabled={loading || !prompt.trim()}
                className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Send to ${activeTab === 'chat' ? 'Gemini Chat' : 'Gemini Reasoning'}`
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg"
                >
                  <p className="text-red-300">❌ {error}</p>
                </motion.div>
              )}

              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h3 className="text-blue-300 text-lg font-semibold">
                    {activeTab === 'chat' ? 'Gemini Response:' : 'Gemini Reasoning:'}
                  </h3>
                  <div className="p-6 bg-gray-900/50 border border-blue-500/30 rounded-lg">
                    <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {response}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Available Gemini Models</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'gemini-1.5-flash', desc: 'Fast & efficient', icon: '⚡' },
                { name: 'gemini-1.5-pro', desc: 'Advanced reasoning', icon: '🧠' },
                { name: 'gemini-pro-vision', desc: 'Multimodal analysis', icon: '👁️' }
              ].map((model, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-blue-500/20 rounded-lg p-4"
                >
                  <div className="text-2xl mb-2">{model.icon}</div>
                  <div className="font-semibold text-blue-300">{model.name}</div>
                  <div className="text-sm text-gray-400">{model.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

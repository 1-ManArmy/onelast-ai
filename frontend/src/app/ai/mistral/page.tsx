'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function MistralTestPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testMistral = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/ai/mistral/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          prompt,
          model: 'mistral-small',
          options: {
            temperature: 0.7,
            maxTokens: 500
          }
        })
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.data.response);
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

  return (
    <div className="bg-gradient-to-br from-orange-950 via-red-900 to-black min-h-screen text-white">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-6">🌟</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-red-400 to-orange-500 bg-clip-text text-transparent">
            Mistral AI Test
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test the Mistral AI integration with your API key
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-orange-800/20 to-red-900/30 backdrop-blur-xl p-8 rounded-3xl border border-orange-500/20">
            <div className="space-y-6">
              <div>
                <label className="block text-orange-300 text-sm font-semibold mb-2">
                  Enter your prompt:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask Mistral AI anything..."
                  className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 resize-none"
                  disabled={loading}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={testMistral}
                disabled={loading || !prompt.trim()}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Thinking...</span>
                  </div>
                ) : (
                  'Send to Mistral AI'
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
                  <h3 className="text-orange-300 text-lg font-semibold">Mistral AI Response:</h3>
                  <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-lg">
                    <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {response}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

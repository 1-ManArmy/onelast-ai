'use client';

import React from 'react';

export default function TokBoostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl">📱</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            TokBoost
          </h1>
          <p className="text-xl text-purple-300 mb-2">
            TikTok Growth & Content Optimization
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            AI-powered TikTok growth tool that analyzes trends, optimizes content, and boosts your social media presence.
          </p>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Blow up TikTok videos with AI
          </p>
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-purple-300">Viral Video Toolkit</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Edit, caption, remix and schedule TikToks with AI. Upload clips, add dynamic subtitles, and let AI create viral hooks or captions. You shoot, TokBoost promotes.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">🔥 Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">✂️</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Auto-cut reels from long-form</h3>
              <p className="text-gray-300">Automatically extract the best moments from long videos and create viral-ready clips.</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">🧠</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Viral caption + hashtag generator</h3>
              <p className="text-gray-300">AI-powered captions and trending hashtags to maximize your reach and engagement.</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Subtitle overlay + export</h3>
              <p className="text-gray-300">Add dynamic subtitles with custom fonts and animations to boost video accessibility.</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">📆</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Schedule videos (Beta)</h3>
              <p className="text-gray-300">Plan and schedule your TikTok posts for optimal engagement times.</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">📲</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">TikTok API support</h3>
              <p className="text-gray-300">Direct integration with TikTok for seamless content management and analytics.</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <div className="text-2xl mb-3">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Growth Analytics</h3>
              <p className="text-gray-300">Track performance, analyze trends, and optimize your content strategy.</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Weekly</h3>
              <p className="text-3xl font-bold mb-2">$11.99</p>
              <p className="text-gray-400">Try it out</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border-2 border-purple-400">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Monthly</h3>
              <p className="text-3xl font-bold mb-2">$39.99</p>
              <p className="text-purple-400 font-semibold">Most Popular</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-600/30">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Yearly</h3>
              <p className="text-3xl font-bold mb-2">$399.99</p>
              <p className="text-gray-400">Best Value</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-600/20 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Coming Soon</h2>
            <p className="text-gray-300 mb-4">
              TokBoost is currently in development. Get ready to boost your TikTok game with AI-powered video optimization!
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30 text-left">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">📈 TokBoost – Output Preview</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}

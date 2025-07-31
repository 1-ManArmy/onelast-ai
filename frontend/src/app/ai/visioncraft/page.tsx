'use client';

import React from 'react';

export default function VisionCraftPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl">🎨</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
            VisionCraft
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            AI Image Generation & Visual Arts
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create stunning artwork, generate images from text, and transform your visual ideas into reality with advanced AI models.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Text-to-Image Generation</h3>
              <p className="text-gray-300">Transform your written descriptions into stunning visual artwork using advanced AI models.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-rose-400">Image-to-Image Transformation</h3>
              <p className="text-gray-300">Modify and enhance existing images with AI-powered transformation tools.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Style Transfer & Editing</h3>
              <p className="text-gray-300">Apply different artistic styles and make precise edits to your images.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-rose-400">High-Resolution Upscaling</h3>
              <p className="text-gray-300">Enhance image quality and resolution using AI upscaling technology.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Batch Processing</h3>
              <p className="text-gray-300">Process multiple images simultaneously for efficient workflow management.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-rose-400">Custom Model Fine-tuning</h3>
              <p className="text-gray-300">Train and customize AI models for your specific artistic needs and style preferences.</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Weekly</h3>
              <p className="text-3xl font-bold mb-2">$8.99</p>
              <p className="text-gray-400">Try it out</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border-2 border-pink-500">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Monthly</h3>
              <p className="text-3xl font-bold mb-2">$29.99</p>
              <p className="text-pink-400 font-semibold">Most Popular</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Yearly</h3>
              <p className="text-3xl font-bold mb-2">$299.99</p>
              <p className="text-gray-400">Best Value</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-rose-600/20 backdrop-blur-sm p-8 rounded-lg border border-pink-500/30">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">Coming Soon</h2>
            <p className="text-gray-300">
              VisionCraft is currently in development. Advanced AI image generation capabilities will be available soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

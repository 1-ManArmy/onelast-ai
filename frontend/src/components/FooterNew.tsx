'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Heart,
  Sparkles,
  Crown,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

interface FooterProps {
  variant?: 'light' | 'dark';
  serviceName?: string;
  serviceIcon?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  variant = 'dark', 
  serviceName = 'OneLast AI',
  serviceIcon = '🧠'
}) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "AI Services",
      links: [
        { name: "AI Assistant", href: "/ai/assistant", icon: "🤖" },
        { name: "EmoAI", href: "/ai/emoai", icon: "🧠" },
        { name: "PDFMind", href: "/ai/pdfmind", icon: "📄" },
        { name: "Voice AI", href: "/ai/voice", icon: "🎤" },
        { name: "AI Girlfriend", href: "/ai/girlfriend", icon: "💖" },
      ]
    },
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Account", href: "/account", icon: "👤" },
        { name: "Pricing", href: "/pricing", icon: "💰" },
        { name: "Enterprise", href: "/enterprise", icon: "🏢" },
        { name: "API Access", href: "/api", icon: "⚡" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs", icon: "📚" },
        { name: "Blog", href: "/blog", icon: "✍️" },
        { name: "Support", href: "/support", icon: "🎧" },
        { name: "Community", href: "/community", icon: "👥" },
        { name: "Tutorials", href: "/tutorials", icon: "🎓" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: "🌟" },
        { name: "Contact", href: "/contact", icon: "📞" },
        { name: "Careers", href: "/careers", icon: "💼" },
        { name: "Privacy", href: "/privacy", icon: "🔒" },
        { name: "Terms", href: "/terms", icon: "📋" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/onelastai", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/onelastai", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/onelastai", icon: Linkedin },
    { name: "Email", href: "mailto:hello@onelastai.com", icon: Mail },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] opacity-5" />
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl glow-effect"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain size={28} color="white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold gradient-text">{serviceName}</h3>
                  <p className="text-xs text-gray-400">Powered by Intelligence</p>
                </div>
              </Link>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering the next generation with affordable AI education and intelligent assistance. 
                Your journey to digital excellence starts here.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-lg font-bold gradient-text">10K+</div>
                  <div className="text-xs text-gray-400">Students</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-lg font-bold gradient-text">50+</div>
                  <div className="text-xs text-gray-400">AI Tools</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 hover:translate-x-1 transform"
                    >
                      <span>{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-bold gradient-text mb-4 flex items-center justify-center gap-2">
              <Crown className="w-5 h-5" />
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              Get the latest AI insights, feature updates, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:border-purple-400/50 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconComponent size={18} />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright & Trust Badges */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Global</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Fast</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 flex items-center gap-1">
              © {currentYear} {serviceName}. Made with 
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              for the next generation.
            </div>
          </div>
        </motion.div>

        {/* Partnership Badge */}
        <motion.div
          className="mt-8 pt-6 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs text-gray-400">Proudly partnered with</span>
            <span className="text-xs font-medium gradient-text">Grand Pa United</span>
            <Crown className="w-4 h-4 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
    </footer>
  );
};

export default Footer;

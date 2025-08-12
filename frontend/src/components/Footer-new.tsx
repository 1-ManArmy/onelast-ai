'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Sparkles,
  Shield,
  Zap,
  Users,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "AI Services",
      links: [
        { name: "AI Assistant", href: "/ai/assistant", icon: "🤖" },
        { name: "EmoAI", href: "/ai/emoai", icon: "💝" },
        { name: "PDF Mind", href: "/ai/pdfmind", icon: "📄" },
        { name: "AgentX", href: "/ai/agentx", icon: "🎯" },
        { name: "Voice AI", href: "/ai/voice", icon: "🎵" },
        { name: "Astrology AI", href: "/ai/astrology", icon: "✨" }
      ]
    },
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Account", href: "/account", icon: "👤" },
        { name: "Pricing", href: "/pricing", icon: "💎" },
        { name: "Enterprise", href: "/enterprise", icon: "🏢" },
        { name: "API Docs", href: "/docs", icon: "📚" },
        { name: "Status", href: "/status", icon: "🟢" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: "ℹ️" },
        { name: "Blog", href: "/blog", icon: "📝" },
        { name: "Careers", href: "/careers", icon: "💼" },
        { name: "Contact", href: "/contact", icon: "📧" },
        { name: "Press Kit", href: "/press", icon: "📰" },
        { name: "Partners", href: "/partners", icon: "🤝" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy", icon: "🔒" },
        { name: "Terms of Service", href: "/terms", icon: "📋" },
        { name: "Cookie Policy", href: "/cookies", icon: "🍪" },
        { name: "GDPR", href: "/gdpr", icon: "🛡️" },
        { name: "Security", href: "/security", icon: "🔐" },
        { name: "Compliance", href: "/compliance", icon: "✅" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/onelastai", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/onelastai", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/onelastai", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/onelastai", color: "hover:text-blue-700" }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "AI Models", value: "25+", icon: Brain },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: Shield }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-t border-purple-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="border-b border-purple-500/20 py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl glow-effect">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">OneLast AI</h3>
                  <p className="text-sm text-purple-300">Powered by Grand Pa United</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                Revolutionizing AI education and interaction for the next generation. 
                Affordable, accessible, and powerful AI tools for students, developers, 
                and creators worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>contact@onelastai.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>UAE • UK • USA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-800/50 backdrop-blur border border-gray-700 text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-700/50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors duration-200 group"
                      >
                        <span className="text-sm opacity-70 group-hover:opacity-100">
                          {link.icon}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-purple-500/20 py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Stay Updated with OneLast AI
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest AI insights, product updates, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div 
                className="flex items-center gap-2 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span>© {currentYear} OneLast AI. Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>by Grand Pa United</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  SSL Secured
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  99.9% Uptime
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  Global CDN
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient text */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
      `}</style>
    </footer>
  );
};

export default Footer;

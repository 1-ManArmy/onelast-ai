'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  LogOut
} from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'AI Assistant', desc: 'Intelligent Chat Assistant', icon: '�', href: '/ai/assistant' },
    { name: 'Voice AI', desc: 'Voice Recognition & Synthesis', icon: '🎤', href: '/ai/voice' },
    { name: 'Interactive Chat', desc: 'Advanced Voice Chat', icon: '💬', href: '/ai/chat' },
    { name: 'EmoAI', desc: 'Emotional Intelligence', icon: '🧠', href: '/ai/emoai' },
    { name: 'PDFMind', desc: 'Document Processing', icon: '📄', href: '/ai/pdfmind' },
    { name: 'ChatRevive', desc: 'Conversation Enhancement', icon: '💫', href: '/services#chatrevive' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="h-8 w-8 text-indigo-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Onelast.AI
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {!user ? (
                <>
                  <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Home
                  </Link>
                  
                  {/* Services Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowServicesMenu(true)}
                    onMouseLeave={() => setShowServicesMenu(false)}
                  >
                    <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                      Services
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    
                    <AnimatePresence>
                      {showServicesMenu && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                              {services.map((service) => (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
                                >
                                  <span className="text-2xl mr-3">{service.icon}</span>
                                  <div>
                                    <div className="font-semibold text-gray-900 group-hover:text-indigo-600">
                                      {service.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {service.desc}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <Link
                                href="/services"
                                className="flex items-center justify-center w-full py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                              >
                                View All Services
                                <Sparkles className="ml-2 h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Pricing
                  </Link>
                  <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/services" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Services
                  </Link>
                  <Link href="/account" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Account
                  </Link>
                  <motion.button
                    onClick={logout}
                    className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
                {!user ? (
                  <>
                    <Link 
                      href="/" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      href="/services" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                    <Link 
                      href="/pricing" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link 
                      href="/login" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-center transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/services" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                    <Link 
                      href="/account" 
                      className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center text-red-600 hover:text-red-700 font-medium py-2 transition-colors w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navigation;

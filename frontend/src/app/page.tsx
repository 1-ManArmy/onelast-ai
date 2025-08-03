'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Brain, Sparkles, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { ModernButton } from '@/components/ui/ModernButton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <div className="relative px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl glow-effect"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain size={32} color="white" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text mb-6"
              variants={fadeInUp}
            >
              Your AI Memory
              <span className="gradient-text-secondary"> Assistant</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Never forget anything again. Onelast.AI becomes your digital memory,
              learning and remembering everything you share. From conversations to ideas,
              tasks to documents - your AI assistant keeps it all organized and accessible.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              variants={fadeInUp}
            >
              <Link href="/register">
                <ModernButton variant="primary" size="lg" glow>
                  <Sparkles className="w-5 h-5" />
                  Start Your Free Trial
                </ModernButton>
              </Link>
              <Link href="#features">
                <ModernButton variant="glass" size="lg">
                  Learn more <span aria-hidden="true">→</span>
                </ModernButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        id="features" 
        className="py-24 sm:py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent sm:text-4xl">
              Everything you need in an AI memory assistant
            </p>
          </motion.div>
          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <motion.div 
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Brain className="h-5 w-5 flex-none text-indigo-600" />
                  Smart Memory
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    AI-powered categorization and tagging of all your memories.
                    Automatically connects related information.
                  </p>
                </dd>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Sparkles className="h-5 w-5 flex-none text-indigo-600" />
                  Instant Search
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Find anything instantly with semantic search. Search by meaning,
                    not just keywords.
                  </p>
                </dd>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Shield className="h-5 w-5 flex-none text-indigo-600" />
                  Privacy First
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Your data stays secure with enterprise-grade encryption.
                    Complete control over your information.
                  </p>
                </dd>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Zap className="h-5 w-5 flex-none text-indigo-600" />
                  Real-time Sync
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Access your memories across all devices. Real-time
                    synchronization keeps everything up to date.
                  </p>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
              Join thousands of users who never forget important information again.
              Start your free trial today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <ModernButton
                  variant="glass"
                  size="lg"
                  className="text-white border-white/30 hover:border-white/50"
                >
                  Start Free Trial
                </ModernButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Onelast.AI</span>
              </div>
              <p className="text-gray-600 mb-4">
                Your AI Memory Assistant - Never forget anything again.
              </p>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="tel:+441172050459" className="hover:text-indigo-600 transition-colors">
                    📱 WhatsApp: +44 117 205 0459
                  </a>
                </li>
                <li>
                  <a href="https://line.me/ti/p/@onelastai" className="hover:text-indigo-600 transition-colors">
                    💬 Line: @onelastai
                  </a>
                </li>
                <li>
                  <a href="https://t.me/onelastai" className="hover:text-indigo-600 transition-colors">
                    📞 Telegram: @onelastai
                  </a>
                </li>
                <li>
                  <a href="tel:+12137720156" className="hover:text-indigo-600 transition-colors">
                    ☎️ Call: +1 213 772 0156
                  </a>
                </li>
                <li>
                  <a href="mailto:info@onelast.ai" className="hover:text-indigo-600 transition-colors">
                    ✉️ Email: info@onelast.ai
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/services" className="hover:text-indigo-600 transition-colors">
                    AI Services
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-indigo-600 transition-colors">
                    Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@onelast.ai" className="hover:text-indigo-600 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="https://t.me/onelastai" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 6.728-1.292 8.073-1.292 8.073-.296.696-.96.696-.96.696s-2.496-.192-4.224-1.056c-1.056-.528-2.112-1.248-2.112-1.248s-.48-.336-.192-.96c.288-.624 2.016-1.92 3.36-3.168.672-.624 1.248-1.056.48-1.248-.48-.144-1.536.48-2.496 1.056-1.344.816-2.88 1.824-2.88 1.824s-.672.432-1.2.048c-.528-.384-1.536-1.152-1.536-1.152s-.96-.864.672-1.296c.96-.24 8.64-3.936 8.64-3.936s.864-.336 1.632-.048c.384.144.576.432.48.816z"/>
                </svg>
              </a>
              <a href="https://line.me/ti/p/@onelastai" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Line</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"/>
                </svg>
              </a>
              <a href="tel:+441172050459" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
              <a href="mailto:info@onelast.ai" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-xs leading-5 text-gray-500">
                &copy; 2025 Onelast.AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

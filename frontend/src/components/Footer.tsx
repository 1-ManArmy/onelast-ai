'use client';

import React from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';

interface FooterProps {
  variant?: 'light' | 'dark';
  serviceName?: string;
  serviceIcon?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  variant = 'light', 
  serviceName = 'Onelast.AI',
  serviceIcon = '🧠'
}) => {
  const isDark = variant === 'dark';
  
  const containerClass = isDark 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';
    
  const textClass = isDark 
    ? 'text-gray-400' 
    : 'text-gray-600';
    
  const hoverClass = isDark 
    ? 'hover:text-white' 
    : 'hover:text-indigo-600';

  return (
    <footer className={`${containerClass} py-16`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              {serviceName === 'Onelast.AI' ? (
                <Brain className={`h-8 w-8 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              ) : (
                <span className="text-3xl mr-2">{serviceIcon}</span>
              )}
              <span className="text-xl font-bold">{serviceName}</span>
            </div>
            <p className={`${textClass} mb-4`}>
              {serviceName === 'Onelast.AI' 
                ? 'Your AI Memory Assistant - Never forget anything again.'
                : `Part of the Onelast.AI ecosystem - Building the future of AI.`
              }
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className={`space-y-2 ${textClass}`}>
              <li>
                <a href="tel:+441172050459" className={`${hoverClass} transition-colors`}>
                  📱 WhatsApp: +44 117 205 0459
                </a>
              </li>
              <li>
                <a href="https://line.me/ti/p/@onelastai" className={`${hoverClass} transition-colors`}>
                  💬 Line: @onelastai
                </a>
              </li>
              <li>
                <a href="https://t.me/onelastai" className={`${hoverClass} transition-colors`}>
                  📞 Telegram: @onelastai
                </a>
              </li>
              <li>
                <a href="tel:+12137720156" className={`${hoverClass} transition-colors`}>
                  ☎️ Call: +1 213 772 0156
                </a>
              </li>
              <li>
                <a href="mailto:info@onelast.ai" className={`${hoverClass} transition-colors`}>
                  ✉️ Email: info@onelast.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className={`space-y-2 ${textClass}`}>
              <li>
                <Link href="/services" className={`${hoverClass} transition-colors`}>
                  AI Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={`${hoverClass} transition-colors`}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={`${hoverClass} transition-colors`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/account" className={`${hoverClass} transition-colors`}>
                  Account
                </Link>
              </li>
              <li>
                <Link href="/ai/emoai" className={`${hoverClass} transition-colors`}>
                  EmoAI
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold mb-4">Legal & Support</h4>
            <ul className={`space-y-2 ${textClass}`}>
              <li>
                <Link href="/privacy" className={`${hoverClass} transition-colors`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={`${hoverClass} transition-colors`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@onelast.ai" className={`${hoverClass} transition-colors`}>
                  Support Center
                </a>
              </li>
              <li>
                <a href="https://status.onelast.ai" className={`${hoverClass} transition-colors`}>
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a 
                href="https://t.me/onelastai" 
                className={`${textClass} ${hoverClass} transition-colors`}
                title="Telegram"
                aria-label="Follow us on Telegram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 6.728-1.292 8.073-1.292 8.073-.296.696-.96.696-.96.696s-2.496-.192-4.224-1.056c-1.056-.528-2.112-1.248-2.112-1.248s-.48-.336-.192-.96c.288-.624 2.016-1.92 3.36-3.168.672-.624 1.248-1.056.48-1.248-.48-.144-1.536.48-2.496 1.056-1.344.816-2.88 1.824-2.88 1.824s-.672.432-1.2.048c-.528-.384-1.536-1.152-1.536-1.152s-.96-.864.672-1.296c.96-.24 8.64-3.936 8.64-3.936s.864-.336 1.632-.048c.384.144.576.432.48.816z"/>
                </svg>
              </a>
              
              <a 
                href="https://line.me/ti/p/@onelastai" 
                className={`${textClass} ${hoverClass} transition-colors`}
                title="Line"
                aria-label="Chat with us on Line"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"/>
                </svg>
              </a>
              
              <a 
                href="tel:+441172050459" 
                className={`${textClass} ${hoverClass} transition-colors`}
                title="WhatsApp"
                aria-label="Contact us on WhatsApp"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
              
              <a 
                href="mailto:info@onelast.ai" 
                className={`${textClass} ${hoverClass} transition-colors`}
                title="Email"
                aria-label="Send us an email"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              
              <a 
                href="https://github.com/AI-Digital-Market/onelast-ai" 
                className={`${textClass} ${hoverClass} transition-colors`}
                title="GitHub"
                aria-label="Visit our GitHub repository"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className={`text-center ${textClass}`}>
              <p className="text-sm">
                &copy; 2025 Onelast.AI by Team Grand Pa United 🇦🇪 🇬🇧 🇺🇸
              </p>
              <p className="text-xs mt-1">
                Building the future of AI-powered solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Glassmorphism Card Component
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hover = true 
}) => (
  <motion.div
    className={`
      backdrop-blur-lg bg-white/10 
      border border-white/20 
      rounded-2xl p-6 
      shadow-2xl shadow-black/10
      ${hover ? 'hover:bg-white/20 hover:border-white/30 hover:-translate-y-2' : ''}
      transition-all duration-300
      ${className}
    `}
    whileHover={hover ? { scale: 1.02 } : {}}
    {...fadeInUp}
  >
    {children}
  </motion.div>
);

// Modern Button Component
interface ModernButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = "",
  onClick,
  href
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-2xl
    transition-all duration-300
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-offset-2
    shadow-lg hover:shadow-xl
  `;

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-700 hover:text-gray-900 focus:ring-gray-500',
    gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white focus:ring-purple-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

// Feature Grid Component
interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export const FeatureCard: React.FC<FeatureProps> = ({ 
  icon: Icon, 
  title, 
  description,
  gradient = "from-indigo-500 to-purple-600"
}) => (
  <motion.div
    className="group relative overflow-hidden"
    {...fadeInUp}
    whileHover={{ y: -5 }}
  >
    <div className="relative z-10 p-8 h-full">
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gradient} mb-6`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-300" />
    <div className="absolute inset-0 border border-gray-200 group-hover:border-indigo-200 rounded-2xl transition-colors" />
  </motion.div>
);

// Stats Component
interface StatProps {
  number: string;
  label: string;
  icon?: LucideIcon;
}

export const StatCard: React.FC<StatProps> = ({ number, label, icon: Icon }) => (
  <motion.div
    className="text-center p-6"
    {...fadeInUp}
    whileHover={{ scale: 1.05 }}
  >
    {Icon && (
      <div className="inline-flex p-3 rounded-full bg-indigo-100 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    )}
    <div className="text-4xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </motion.div>
);

// Testimonial Component
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  company?: string;
}

export const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  avatar,
  company
}) => (
  <motion.div
    className="relative p-8 bg-white rounded-3xl shadow-2xl"
    {...fadeInUp}
    whileHover={{ y: -5 }}
  >
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
      <span className="text-white text-xl font-bold">&ldquo;</span>
    </div>
    <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg italic">
      {quote}
    </blockquote>
    <div className="flex items-center">
      {avatar ? (
        <Image src={avatar} alt={author} width={48} height={48} className="w-12 h-12 rounded-full mr-4" />
      ) : (
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{author.charAt(0)}</span>
        </div>
      )}
      <div>
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-gray-600 text-sm">
          {role}{company && ` at ${company}`}
        </div>
      </div>
    </div>
  </motion.div>
);

// Gradient Background Component
export const GradientBackground: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

// Section Wrapper
interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient' | 'transparent';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "",
  background = 'transparent'
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    transparent: 'bg-transparent'
  };

  return (
    <section className={`py-20 ${backgrounds[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className = '', hover = true, glow = false }: GlassCardProps) {
  const baseClasses = "glass-card rounded-xl p-6";
  const glowClasses = glow ? "glow-effect" : "";
  const combinedClasses = `${baseClasses} ${glowClasses} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={combinedClasses}
        whileHover={{ 
          scale: 1.02, 
          y: -5,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={combinedClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

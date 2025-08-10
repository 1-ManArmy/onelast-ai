import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation variants for Framer Motion
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

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Color utilities for the modern theme
export const gradients = {
  primary: "bg-gradient-to-r from-purple-600 to-blue-600",
  secondary: "bg-gradient-to-r from-teal-500 to-green-500", 
  accent: "bg-gradient-to-r from-pink-500 to-rose-500",
  neural: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
};

export const textGradients = {
  primary: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
  secondary: "bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent",
  accent: "bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent",
  neural: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
};

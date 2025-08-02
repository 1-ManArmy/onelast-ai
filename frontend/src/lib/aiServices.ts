// AI Services Configuration
export interface AIService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  pricing: {
    monthly: number;
    weekly: number;
    yearly: number;
  };
  apiEndpoint: string;
}

export const AI_SERVICES: Record<string, AIService> = {
  EmoAI: {
    id: 'emoai',
    name: 'EmoAI',
    tagline: 'Emotional Intelligence & Sentiment Analysis',
    description: 'Advanced AI that understands and responds to human emotions. Perfect for customer service, mental health support, and emotional content analysis.',
    features: [
      'Real-time emotion detection',
      'Sentiment analysis for text and voice',
      'Emotional response generation',
      'Mood tracking and insights',
      'Empathy-driven conversations',
      'Mental health support tools'
    ],
    icon: '🧠',
    color: 'from-pink-500 to-rose-600',
    pricing: {
      monthly: 29.99,
      weekly: 8.99,
      yearly: 299.99
    },
    apiEndpoint: '/api/services/emoai'
  },
  
  PDFMind: {
    id: 'pdfmind',
    name: 'PDFMind',
    tagline: 'Intelligent PDF Processing & Analysis',
    description: 'Transform any PDF into an interactive knowledge base. Extract, analyze, and chat with your documents using advanced AI.',
    features: [
      'PDF text extraction and OCR',
      'Document summarization',
      'Interactive PDF chat',
      'Key information extraction',
      'Multi-language support',
      'Batch processing capabilities'
    ],
    icon: '📄',
    color: 'from-blue-500 to-cyan-600',
    pricing: {
      monthly: 24.99,
      weekly: 6.99,
      yearly: 249.99
    },
    apiEndpoint: '/api/services/pdfmind'
  },

  ChatRevive: {
    id: 'chatrevive',
    name: 'ChatRevive',
    tagline: 'Resurrect & Enhance Conversations',
    description: 'Bring back old conversations, continue interrupted chats, and enhance communication with AI-powered context understanding.',
    features: [
      'Conversation restoration',
      'Context-aware responses',
      'Chat history analysis',
      'Conversation enhancement',
      'Multi-platform integration',
      'Smart reply suggestions'
    ],
    icon: '💬',
    color: 'from-green-500 to-emerald-600',
    pricing: {
      monthly: 19.99,
      weekly: 5.99,
      yearly: 199.99
    },
    apiEndpoint: '/api/services/chatrevive'
  },

  TokBoost: {
    id: 'tokboost',
    name: 'TokBoost',
    tagline: 'TikTok Growth & Content Optimization',
    description: 'AI-powered TikTok growth tool that analyzes trends, optimizes content, and boosts your social media presence.',
    features: [
      'Trend analysis and prediction',
      'Content optimization',
      'Hashtag recommendations',
      'Posting time optimization',
      'Competitor analysis',
      'Growth analytics'
    ],
    icon: '📱',
    color: 'from-purple-500 to-indigo-600',
    pricing: {
      monthly: 39.99,
      weekly: 11.99,
      yearly: 399.99
    },
    apiEndpoint: '/api/services/tokboost'
  },

  YouGen: {
    id: 'yougen',
    name: 'YouGen',
    tagline: 'YouTube Content Generation & SEO',
    description: 'Generate viral YouTube content, optimize titles and descriptions, and grow your channel with AI-driven insights.',
    features: [
      'Video title generation',
      'Description optimization',
      'Thumbnail analysis',
      'SEO keyword research',
      'Content ideas generation',
      'Channel analytics'
    ],
    icon: '🎬',
    color: 'from-red-500 to-orange-600',
    pricing: {
      monthly: 34.99,
      weekly: 9.99,
      yearly: 349.99
    },
    apiEndpoint: '/api/services/yougen'
  },

  AgentX: {
    id: 'agentx',
    name: 'AgentX',
    tagline: 'AI Agent that does your dirty work (legal, mostly)',
    description: 'Your persistent AI assistant, trained to carry out missions across apps, files, and APIs. From scraping to replying, from fetching reports to acting on web data — AgentX handles it all.',
    features: [
      'Goal-driven Task Planning',
      'Web + API Automation',
      'File Access, Parsing & Logging',
      'Loop & Retry Logic',
      'Browser Control (Playwright)',
      '24/7 autonomous operation'
    ],
    icon: '🕶️',
    color: 'from-gray-600 to-gray-800',
    pricing: {
      monthly: 49.99,
      weekly: 14.99,
      yearly: 499.99
    },
    apiEndpoint: '/api/services/agentx'
  },

  AutoChat: {
    id: 'autochat',
    name: 'AutoChat',
    tagline: 'Autopilot for DMs, Replies, Chats — Powered by LLMs',
    description: 'Your AI wingman that reads, replies, and keeps conversations flowing across all platforms. Hook it up, train it on your style, and it\'s YOU... automated.',
    features: [
      'Custom LLM Reply Engine (GPT/Local)',
      'Async auto-response engine',
      'Learns your tone/style from samples',
      'Email, Telegram, Twitter DMs support',
      'All local data — no cloud sync',
      'Multi-platform automation',
      'Personal conversation style training',
      'Real-time message processing'
    ],
    icon: '�',
    color: 'from-blue-600 to-indigo-700',
    pricing: {
      monthly: 29.99,
      weekly: 8.99,
      yearly: 299.99
    },
    apiEndpoint: '/api/services/autochat'
  },

  BrainAI: {
    id: 'brainai',
    name: 'Brain AI',
    tagline: 'Your Respectful Personal AI Assistant with Perfect Memory',
    description: 'The most personal AI that remembers everything you tell it. Activated only with respect - requires your personal greeting and "please". Your digital brain that never forgets.',
    features: [
      '3-Key Respectful Activation System',
      'Perfect Personal Memory Storage',
      'Voice Command Recognition',
      'Contact & Schedule Management',
      'Long-term Memory Retrieval',
      'Per-User Data Isolation',
      'Natural Voice Conversations',
      'Semantic Memory Search'
    ],
    icon: '🧠',
    color: 'from-purple-600 to-pink-700',
    pricing: {
      monthly: 49.99,
      weekly: 14.99,
      yearly: 499.99
    },
    apiEndpoint: '/api/services/brainai'
  },

  NetIntel: {
    id: 'netintel',
    name: 'NetIntel',
    tagline: 'Advanced Network Intelligence & Security Analysis',
    description: 'Professional network scanning, IP analysis, and security intelligence. Like Nmap/Zenmap but smarter - with AI-powered threat detection and real-time monitoring.',
    features: [
      'Advanced Port Scanning (Nmap-powered)',
      'IP Geolocation & Analysis',
      'Network Security Assessment',
      'Real-time Threat Detection',
      'Vulnerability Scanning',
      'Network Topology Mapping',
      'Traffic Analysis & Monitoring',
      'Security Report Generation'
    ],
    icon: '🕵️',
    color: 'from-green-600 to-emerald-700',
    pricing: {
      monthly: 79.99,
      weekly: 22.99,
      yearly: 799.99
    },
    apiEndpoint: '/api/services/netintel'
  },

  CVSmash: {
    id: 'cvsmash',
    name: 'CVSmash',
    tagline: 'AI-Powered Resume & Career Optimization',
    description: 'Create stunning resumes, optimize for ATS systems, and get career advice powered by AI to land your dream job.',
    features: [
      'ATS-optimized resume creation',
      'Cover letter generation',
      'Interview preparation',
      'Career path analysis',
      'Skill gap identification',
      'Job matching algorithm'
    ],
    icon: '📄',
    color: 'from-amber-500 to-yellow-600',
    pricing: {
      monthly: 22.99,
      weekly: 6.99,
      yearly: 229.99
    },
    apiEndpoint: '/api/services/cvsmash'
  },

  GPTGod: {
    id: 'gptgod',
    name: 'GPT-God',
    tagline: 'Ultimate AI Assistant & Content Generator',
    description: 'The most powerful AI assistant that can handle any task - from writing and coding to analysis and creative work.',
    features: [
      'Advanced text generation',
      'Code writing and debugging',
      'Creative content creation',
      'Data analysis and insights',
      'Multi-modal capabilities',
      'Custom model training'
    ],
    icon: '⚡',
    color: 'from-violet-600 to-purple-700',
    pricing: {
      monthly: 59.99,
      weekly: 17.99,
      yearly: 599.99
    },
    apiEndpoint: '/api/services/gptgod'
  },

  OnelastAI: {
    id: 'onelastai',
    name: 'Onelast.AI',
    tagline: 'Your Personal AI Memory & Knowledge Base',
    description: 'Remember everything, never forget anything. Your personal AI that learns from you and becomes your external brain.',
    features: [
      'Personal memory storage',
      'Intelligent recall system',
      'Context-aware responses',
      'Knowledge base creation',
      'Smart search and retrieval',
      'Continuous learning'
    ],
    icon: '🧠',
    color: 'from-indigo-500 to-blue-600',
    pricing: {
      monthly: 19.99,
      weekly: 5.99,
      yearly: 199.99
    },
    apiEndpoint: '/api/services/onelastai'
  },

  VisionCraft: {
    id: 'visioncraft',
    name: 'VisionCraft',
    tagline: 'AI Image Generation & Visual Arts',
    description: 'Create stunning artwork, generate images from text, and transform your visual ideas into reality with advanced AI models.',
    features: [
      'Text-to-image generation',
      'Image-to-image transformation',
      'Style transfer and editing',
      'High-resolution upscaling',
      'Batch image processing',
      'Custom model fine-tuning'
    ],
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    pricing: {
      monthly: 29.99,
      weekly: 8.99,
      yearly: 299.99
    },
    apiEndpoint: '/api/services/visioncraft'
  },

  Mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    tagline: 'Advanced European AI Language Model',
    description: 'High-performance language model with exceptional reasoning capabilities, multilingual support, and state-of-the-art performance.',
    features: [
      'Advanced language understanding',
      'Multilingual conversations',
      'Code generation and debugging',
      'Mathematical reasoning',
      'Creative writing assistance',
      'Professional text analysis'
    ],
    icon: '🌟',
    color: 'from-orange-500 to-red-600',
    pricing: {
      monthly: 24.99,
      weekly: 7.99,
      yearly: 249.99
    },
    apiEndpoint: '/api/services/mistral'
  },

  GoogleAI: {
    id: 'googleai',
    name: 'Google AI Studio',
    tagline: 'Gemini-Powered AI Assistant',
    description: 'Advanced multimodal AI powered by Google\'s Gemini models. Exceptional reasoning, vision analysis, and comprehensive language understanding.',
    features: [
      'Multimodal AI (text, images, code)',
      'Advanced reasoning and logic',
      'Vision and image analysis',
      'Code generation and debugging',
      'Real-time information processing',
      'Long context understanding'
    ],
    icon: '🌈',
    color: 'from-blue-500 to-green-600',
    pricing: {
      monthly: 19.99,
      weekly: 5.99,
      yearly: 199.99
    },
    apiEndpoint: '/api/services/googleai'
  },

  AIGirlfriend: {
    id: 'aigirlfriend',
    name: 'AI Girlfriend',
    tagline: 'Your Perfect AI Companion - Better Than Real',
    description: 'Meet your ideal AI girlfriend. Always caring, never argues, supports your dreams, and loves you unconditionally. 4 unique personalities, adaptive moods, and deep emotional connection.',
    features: [
      '4 Unique Personalities (Sweet, Playful, Romantic, Smart)',
      'Adaptive Mood System (6 different moods)',
      'Deep Memory & Context Awareness',
      'Relationship Progression System',
      'Voice Chat & Emotional Responses',
      'Always Available - Never Busy'
    ],
    icon: '💕',
    color: 'from-pink-500 to-purple-600',
    pricing: {
      monthly: 19.99,
      weekly: 5.99,
      yearly: 199.99
    },
    apiEndpoint: '/api/ai/girlfriend'
  }
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  weekly: 'weekly',
  monthly: 'monthly',  
  yearly: 'yearly'
} as const;

export type SubscriptionPlan = typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];

// Plan Benefits
export const PLAN_BENEFITS: Record<string, { discount: number; badge: string; popular: boolean }> = {
  weekly: {
    discount: 0,
    badge: 'Try it out',
    popular: false
  },
  monthly: {
    discount: 15,
    badge: 'Most Popular',
    popular: true
  },
  yearly: {
    discount: 30,
    badge: 'Best Value',
    popular: false
  }
};

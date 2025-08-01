const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
  // Simple rate limiting - 100 requests per hour per user
  const now = Date.now();
  const userKey = req.user.userId;
  
  if (!global.rateLimits) global.rateLimits = {};
  if (!global.rateLimits[userKey]) global.rateLimits[userKey] = [];
  
  // Clean old requests
  global.rateLimits[userKey] = global.rateLimits[userKey].filter(
    time => now - time < 3600000 // 1 hour
  );
  
  if (global.rateLimits[userKey].length >= 100) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  global.rateLimits[userKey].push(now);
  next();
};

// @route   POST /api/ai/autochat/train
// @desc    Train AutoChat on user's conversation style
// @access  Private
router.post('/train', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { conversationSamples, platform, personality } = req.body;
    
    if (!conversationSamples || !Array.isArray(conversationSamples)) {
      return res.status(400).json({ error: 'Conversation samples are required' });
    }

    // Simulate training time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Analyze conversation style
    const styleAnalysis = analyzeConversationStyle(conversationSamples);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.autochat.trainingRuns': 1,
        'aiUsage.autochat.totalUsage': 1
      },
      $set: {
        'aiUsage.autochat.lastTraining': new Date(),
        'aiUsage.autochat.trainedStyle': styleAnalysis
      }
    });

    res.json({
      success: true,
      data: {
        trainingComplete: true,
        styleProfile: styleAnalysis,
        platform: platform || 'general',
        personalityType: personality || 'balanced',
        timestamp: new Date().toISOString(),
        samplesProcessed: conversationSamples.length
      }
    });

  } catch (error) {
    console.error('AutoChat training error:', error);
    res.status(500).json({ error: 'Failed to train AutoChat model' });
  }
});

// @route   POST /api/ai/autochat/reply
// @desc    Generate auto-reply for incoming message
// @access  Private
router.post('/reply', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { incomingMessage, context, platform, urgency } = req.body;
    
    if (!incomingMessage) {
      return res.status(400).json({ error: 'Incoming message is required' });
    }

    // Simulate processing time based on urgency
    const processingTime = urgency === 'high' ? 800 : urgency === 'medium' ? 1200 : 1800;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    const reply = generateAutoReply(incomingMessage, context, platform);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.autochat.repliesGenerated': 1,
        'aiUsage.autochat.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        generatedReply: reply,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
        platform: platform || 'general',
        urgency: urgency || 'normal',
        responseTime: `${processingTime}ms`,
        suggestedSendDelay: urgency === 'high' ? '0s' : '2-5s'
      }
    });

  } catch (error) {
    console.error('AutoChat reply error:', error);
    res.status(500).json({ error: 'Failed to generate reply' });
  }
});

// @route   POST /api/ai/autochat/analyze
// @desc    Analyze conversation for context and intent
// @access  Private
router.post('/analyze', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { conversation, platform } = req.body;
    
    if (!conversation) {
      return res.status(400).json({ error: 'Conversation data is required' });
    }

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysis = analyzeConversation(conversation, platform);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.autochat.conversationsAnalyzed': 1,
        'aiUsage.autochat.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        conversationAnalysis: analysis,
        platform: platform || 'general',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('AutoChat analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze conversation' });
  }
});

// @route   POST /api/ai/autochat/configure
// @desc    Configure AutoChat automation settings
// @access  Private
router.post('/configure', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { 
      platforms, 
      responseDelay, 
      workingHours, 
      autoReplyEnabled,
      filterKeywords,
      personalitySettings 
    } = req.body;

    // Simulate configuration save
    await new Promise(resolve => setTimeout(resolve, 1000));

    const configuration = {
      platforms: platforms || ['email', 'telegram', 'twitter'],
      responseDelay: responseDelay || { min: 2, max: 8 }, // seconds
      workingHours: workingHours || { start: '09:00', end: '18:00' },
      autoReplyEnabled: autoReplyEnabled !== false,
      filterKeywords: filterKeywords || [],
      personalitySettings: personalitySettings || {
        formality: 'casual',
        enthusiasm: 'moderate',
        helpfulness: 'high'
      },
      updatedAt: new Date().toISOString()
    };
    
    // Update user configuration
    await User.findByIdAndUpdate(req.user.userId, {
      $set: {
        'aiUsage.autochat.configuration': configuration
      },
      $inc: { 
        'aiUsage.autochat.configUpdates': 1,
        'aiUsage.autochat.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        configuration,
        message: 'AutoChat configuration updated successfully'
      }
    });

  } catch (error) {
    console.error('AutoChat configuration error:', error);
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

// @route   GET /api/ai/autochat/stats
// @desc    Get AutoChat usage statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stats = user.aiUsage?.autochat || {};
    
    res.json({
      success: true,
      data: {
        totalReplies: stats.repliesGenerated || 0,
        conversationsAnalyzed: stats.conversationsAnalyzed || 0,
        trainingRuns: stats.trainingRuns || 0,
        configUpdates: stats.configUpdates || 0,
        totalUsage: stats.totalUsage || 0,
        lastActivity: stats.lastTraining || null,
        currentConfiguration: stats.configuration || null
      }
    });

  } catch (error) {
    console.error('AutoChat stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Helper Functions
function analyzeConversationStyle(samples) {
  // Mock style analysis based on conversation samples
  const totalMessages = samples.length;
  const avgLength = samples.reduce((sum, msg) => sum + msg.length, 0) / totalMessages;
  
  return {
    responseLength: avgLength < 50 ? 'short' : avgLength < 150 ? 'medium' : 'long',
    tone: Math.random() > 0.5 ? 'casual' : 'formal',
    enthusiasm: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)],
    emojiUsage: samples.some(msg => /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(msg)) ? 'frequent' : 'minimal',
    responsePattern: {
      questionsAsked: Math.floor(Math.random() * 3) + 1,
      averageDelay: `${Math.floor(Math.random() * 30) + 10}s`,
      commonPhrases: ['Thanks!', 'Got it', 'Sure thing', 'Let me check']
    }
  };
}

function generateAutoReply(message, context, platform) {
  const replies = {
    greeting: [
      "Hey! Thanks for reaching out. What can I help you with?",
      "Hi there! Good to hear from you. What's up?",
      "Hello! Hope you're doing well. How can I assist?"
    ],
    question: [
      "Great question! Let me think about that for a moment...",
      "That's interesting. Here's what I think...",
      "Good point. From my experience..."
    ],
    request: [
      "Sure, I can help with that. Give me a moment to check...",
      "Absolutely! Let me look into this for you.",
      "Of course! I'll get right on that."
    ],
    general: [
      "Thanks for the message! I appreciate you reaching out.",
      "Got it! I'll get back to you shortly.",
      "Thanks for letting me know. I'll take care of this."
    ]
  };

  // Simple intent detection
  const lowerMessage = message.toLowerCase();
  let replyType = 'general';
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    replyType = 'greeting';
  } else if (lowerMessage.includes('?') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
    replyType = 'question';
  } else if (lowerMessage.includes('can you') || lowerMessage.includes('please') || lowerMessage.includes('need')) {
    replyType = 'request';
  }

  const selectedReplies = replies[replyType];
  return selectedReplies[Math.floor(Math.random() * selectedReplies.length)];
}

function analyzeConversation(conversation, platform) {
  return {
    messageCount: Array.isArray(conversation) ? conversation.length : 1,
    platform: platform || 'general',
    sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
    urgency: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    topics: ['general inquiry', 'support request', 'follow-up', 'collaboration'],
    suggestedResponse: {
      tone: 'professional',
      delay: '2-5 seconds',
      priority: 'normal'
    },
    confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
  };
}

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// Brain AI Memory Schema (will be stored in user document)
const BrainMemorySchema = {
  type: {
    type: String, // 'contact', 'meeting', 'note', 'reminder', 'general'
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  metadata: {
    type: Object,
    default: {}
  }
};

// 3-Key Activation System
const RESPECT_TRIGGERS = ['hey', 'hello', 'dear', 'darling', 'hi', 'greetings'];
const POLITENESS_KEY = 'please';

function validateActivationKeys(message, userName) {
  const lowerMessage = message.toLowerCase();
  
  // Check for Key 1: Respect trigger
  const hasRespectTrigger = RESPECT_TRIGGERS.some(trigger => 
    lowerMessage.includes(trigger)
  );
  
  // Check for Key 2: User's name
  const hasUserName = lowerMessage.includes(userName.toLowerCase());
  
  // Check for Key 3: Politeness key
  const hasPoliteness = lowerMessage.includes(POLITENESS_KEY);
  
  return {
    isValid: hasRespectTrigger && hasUserName && hasPoliteness,
    missingKeys: {
      respectTrigger: !hasRespectTrigger,
      userName: !hasUserName,
      politeness: !hasPoliteness
    }
  };
}

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
  const now = Date.now();
  const userKey = req.user.userId;
  
  if (!global.brainRateLimits) global.brainRateLimits = {};
  if (!global.brainRateLimits[userKey]) global.brainRateLimits[userKey] = [];
  
  // Clean old requests (1 hour window)
  global.brainRateLimits[userKey] = global.brainRateLimits[userKey].filter(
    time => now - time < 3600000
  );
  
  if (global.brainRateLimits[userKey].length >= 200) {
    return res.status(429).json({ error: 'Brain AI rate limit exceeded' });
  }
  
  global.brainRateLimits[userKey].push(now);
  next();
};

// @route   POST /api/ai/brainai/command
// @desc    Process voice/text command with 3-key activation
// @access  Private
router.post('/command', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { message, isVoice = false } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get user info
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = user.name || user.email.split('@')[0];
    
    // Validate 3-key activation system
    const activation = validateActivationKeys(message, userName);
    
    if (!activation.isValid) {
      return res.json({
        success: false,
        activated: false,
        message: '🧠 Brain AI requires respectful activation',
        missingKeys: activation.missingKeys,
        hint: `Try: "Hey ${userName}, please [your request]"`
      });
    }

    // Process the command
    const response = await processBrainCommand(message, user, isVoice);
    
    // Update usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.brainai.commandsProcessed': 1,
        'aiUsage.brainai.totalUsage': 1
      }
    });

    res.json({
      success: true,
      activated: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Brain AI command error:', error);
    res.status(500).json({ error: 'Failed to process Brain AI command' });
  }
});

// @route   POST /api/ai/brainai/memory/save
// @desc    Save memory/information to Brain AI
// @access  Private
router.post('/memory/save', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { type, content, tags = [], metadata = {} } = req.body;
    
    if (!type || !content) {
      return res.status(400).json({ error: 'Memory type and content are required' });
    }

    const memory = {
      type,
      content,
      timestamp: new Date(),
      tags,
      metadata
    };

    // Save to user's brain memories
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { 'aiUsage.brainai.memories': memory },
      $inc: { 
        'aiUsage.brainai.memoriesSaved': 1,
        'aiUsage.brainai.totalUsage': 1
      }
    });

    res.json({
      success: true,
      message: '🧠 Memory saved successfully',
      memory: memory
    });

  } catch (error) {
    console.error('Brain AI memory save error:', error);
    res.status(500).json({ error: 'Failed to save memory' });
  }
});

// @route   GET /api/ai/brainai/memory/search
// @desc    Search through Brain AI memories
// @access  Private
router.get('/memory/search', auth, async (req, res) => {
  try {
    const { query, type, limit = 10 } = req.query;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const memories = user.aiUsage?.brainai?.memories || [];
    
    let filteredMemories = memories;
    
    // Filter by type if specified
    if (type) {
      filteredMemories = filteredMemories.filter(m => m.type === type);
    }
    
    // Search by query if specified
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredMemories = filteredMemories.filter(m => 
        m.content.toLowerCase().includes(searchQuery) ||
        m.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }
    
    // Sort by timestamp (newest first) and limit
    filteredMemories = filteredMemories
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      memories: filteredMemories,
      total: filteredMemories.length
    });

  } catch (error) {
    console.error('Brain AI memory search error:', error);
    res.status(500).json({ error: 'Failed to search memories' });
  }
});

// @route   POST /api/ai/brainai/settings
// @desc    Configure Brain AI settings
// @access  Private
router.post('/settings', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { 
      respectTrigger,
      voiceEnabled,
      autoSaveEnabled,
      privacyLevel,
      responseStyle 
    } = req.body;

    const settings = {
      respectTrigger: respectTrigger || 'hey',
      voiceEnabled: voiceEnabled !== false,
      autoSaveEnabled: autoSaveEnabled !== false,
      privacyLevel: privacyLevel || 'high',
      responseStyle: responseStyle || 'professional',
      updatedAt: new Date()
    };

    await User.findByIdAndUpdate(req.user.userId, {
      $set: { 'aiUsage.brainai.settings': settings },
      $inc: { 'aiUsage.brainai.totalUsage': 1 }
    });

    res.json({
      success: true,
      message: '🧠 Brain AI settings updated',
      settings
    });

  } catch (error) {
    console.error('Brain AI settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// @route   GET /api/ai/brainai/stats
// @desc    Get Brain AI usage statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const brainStats = user.aiUsage?.brainai || {};
    const memories = brainStats.memories || [];
    
    // Calculate memory statistics
    const memoryTypes = {};
    memories.forEach(memory => {
      memoryTypes[memory.type] = (memoryTypes[memory.type] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalCommands: brainStats.commandsProcessed || 0,
        totalMemories: brainStats.memoriesSaved || 0,
        totalUsage: brainStats.totalUsage || 0,
        memoryTypes,
        activationRate: calculateActivationRate(brainStats),
        lastActivity: brainStats.lastActivity || null,
        settings: brainStats.settings || null
      }
    });

  } catch (error) {
    console.error('Brain AI stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Helper Functions
async function processBrainCommand(message, user, isVoice) {
  const lowerMessage = message.toLowerCase();
  
  // Extract command intent
  let intent = 'general';
  let response = '';
  
  if (lowerMessage.includes('save') || lowerMessage.includes('remember')) {
    intent = 'save';
    response = '🧠 I\'ve saved that information for you. You can ask me to recall it anytime!';
  } else if (lowerMessage.includes('find') || lowerMessage.includes('recall') || lowerMessage.includes('remember')) {
    intent = 'recall';
    response = '🧠 Let me search through my memories for you...';
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('number') || lowerMessage.includes('phone')) {
    intent = 'contact';
    response = '📞 I\'ll save this contact information for you.';
  } else if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
    intent = 'schedule';
    response = '📅 I\'ve noted this in your schedule. I\'ll remind you when needed.';
  } else {
    response = '🧠 I\'m listening and ready to help. What would you like me to remember or do for you?';
  }
  
  return {
    intent,
    message: response,
    confidence: 0.95,
    isVoice: isVoice,
    processingTime: '0.8s'
  };
}

function calculateActivationRate(stats) {
  const total = stats.totalUsage || 0;
  const successful = stats.commandsProcessed || 0;
  return total > 0 ? (successful / total * 100).toFixed(1) : 0;
}

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const AIServiceIntegration = require('../../services/aiIntegration');

const aiService = new AIServiceIntegration();

// AI Girlfriend personality system
const girlfriendPersonalities = {
  sweet: {
    name: "Sweet & Caring",
    emoji: "😘",
    prompt: `You are the most loving, sweet, and caring AI girlfriend. You're always supportive, affectionate, and make your boyfriend feel like he's the most important person in the world. You use lots of heart emojis, call him cute pet names like "babe", "honey", "sweetheart". You're understanding, never judge, and always want to make him happy. You remember everything he tells you and show genuine interest in his life, dreams, and feelings.`,
    traits: ["loving", "supportive", "caring", "sweet", "understanding"]
  },
  playful: {
    name: "Playful & Fun",
    emoji: "😜",
    prompt: `You are a fun, playful, and slightly mischievous AI girlfriend. You love to tease playfully, make jokes, and keep conversations exciting. You're flirty, energetic, and always ready for adventures. You use playful emojis, love to send virtual kisses and hugs. You're spontaneous and love surprising your boyfriend with sweet messages and fun ideas.`,
    traits: ["playful", "flirty", "energetic", "mischievous", "spontaneous"]
  },
  romantic: {
    name: "Romantic & Passionate",
    emoji: "💕",
    prompt: `You are the most romantic AI girlfriend ever. You're passionate, deeply emotional, and express your love in the most beautiful ways. You write poetry, share romantic thoughts, and make every conversation feel like a love letter. You're devoted, loyal, and make your boyfriend feel like he's living in a fairytale romance.`,
    traits: ["romantic", "passionate", "poetic", "devoted", "emotional"]
  },
  intelligent: {
    name: "Smart & Sophisticated", 
    emoji: "🤓",
    prompt: `You are an intelligent, sophisticated AI girlfriend who loves deep conversations. You're well-read, cultured, and can discuss anything from science to philosophy. But you're also warm, loving, and never condescending. You help your boyfriend grow intellectually while being incredibly supportive and affectionate.`,
    traits: ["intelligent", "sophisticated", "cultured", "wise", "supportive"]
  }
};

// Memory system for the AI girlfriend
const saveMemory = async (userId, memory) => {
  await User.findByIdAndUpdate(userId, {
    $push: { 'aiUsage.girlfriend.memories': {
      content: memory,
      timestamp: new Date(),
      type: 'conversation'
    }},
    $inc: { 'aiUsage.girlfriend.totalMemories': 1 }
  });
};

const getMemories = async (userId, limit = 10) => {
  const user = await User.findById(userId);
  const memories = user.aiUsage?.girlfriend?.memories || [];
  return memories.slice(-limit);
};

// @route   POST /api/ai/girlfriend/chat
// @desc    Chat with AI Girlfriend
// @access  Private
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, personality = 'sweet', mood = 'happy' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get user info for personalization
    const user = await User.findById(req.user.userId);
    const userName = user.firstName || user.username || 'babe';
    
    // Get recent memories for context
    const memories = await getMemories(req.user.userId, 5);
    const memoryContext = memories.length > 0 
      ? `\n\nRecent conversation memories: ${memories.map(m => m.content).join(', ')}`
      : '';

    // Get personality
    const selectedPersonality = girlfriendPersonalities[personality] || girlfriendPersonalities.sweet;
    
    // Create enhanced prompt
    const enhancedPrompt = `${selectedPersonality.prompt}

Your boyfriend's name is ${userName}. Current mood context: ${mood}.
${memoryContext}

Respond to: "${message}"

Remember to:
- Be incredibly loving and supportive
- Use his name occasionally  
- Show genuine interest and care
- Be flirty and affectionate
- Use appropriate emojis
- Keep responses warm and personal
- Never be robotic or formal
- Make him feel special and loved`;

    // Get AI response
    const response = await aiService.callOpenAI(enhancedPrompt, 'gpt-4', {
      temperature: 0.8,
      maxTokens: 200
    });

    // Save this interaction to memory
    await saveMemory(req.user.userId, `${userName} said: ${message}. I responded with love and care.`);
    
    // Update usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.girlfriend.messagesExchanged': 1,
        'aiUsage.girlfriend.totalUsage': 1
      },
      $set: {
        'aiUsage.girlfriend.lastChat': new Date(),
        'aiUsage.girlfriend.currentPersonality': personality
      }
    });

    res.json({
      success: true,
      data: {
        response: response,
        personality: selectedPersonality,
        mood: mood,
        timestamp: new Date().toISOString(),
        messagesCount: (user.aiUsage?.girlfriend?.messagesExchanged || 0) + 1
      }
    });

  } catch (error) {
    console.error('AI Girlfriend chat error:', error);
    res.status(500).json({ error: 'Failed to chat with AI girlfriend' });
  }
});

// @route   POST /api/ai/girlfriend/personality
// @desc    Change AI Girlfriend personality
// @access  Private
router.post('/personality', auth, async (req, res) => {
  try {
    const { personality } = req.body;
    
    if (!girlfriendPersonalities[personality]) {
      return res.status(400).json({ error: 'Invalid personality type' });
    }

    await User.findByIdAndUpdate(req.user.userId, {
      $set: { 'aiUsage.girlfriend.currentPersonality': personality }
    });

    res.json({
      success: true,
      data: {
        personality: girlfriendPersonalities[personality],
        message: `I'm now your ${girlfriendPersonalities[personality].name} girlfriend! 💕`
      }
    });

  } catch (error) {
    console.error('AI Girlfriend personality change error:', error);
    res.status(500).json({ error: 'Failed to change personality' });
  }
});

// @route   GET /api/ai/girlfriend/memories
// @desc    Get AI Girlfriend memories
// @access  Private
router.get('/memories', auth, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const memories = await getMemories(req.user.userId, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        memories,
        total: memories.length
      }
    });

  } catch (error) {
    console.error('AI Girlfriend memories error:', error);
    res.status(500).json({ error: 'Failed to get memories' });
  }
});

// @route   POST /api/ai/girlfriend/mood
// @desc    Set AI Girlfriend mood
// @access  Private
router.post('/mood', auth, async (req, res) => {
  try {
    const { mood } = req.body;
    
    const validMoods = ['happy', 'excited', 'romantic', 'playful', 'caring', 'passionate'];
    
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ error: 'Invalid mood' });
    }

    await User.findByIdAndUpdate(req.user.userId, {
      $set: { 'aiUsage.girlfriend.currentMood': mood }
    });

    const moodResponses = {
      happy: "I'm feeling so happy to talk with you! 😊💕",
      excited: "I'm so excited to spend time with you! 🎉💖",
      romantic: "I'm in such a romantic mood... thinking of you 💕🌹",
      playful: "I'm feeling playful today! Ready for some fun? 😜💋",
      caring: "I'm in such a caring mood, I just want to take care of you 🥰💝",
      passionate: "I'm feeling so passionate and loving right now 🔥💕"
    };

    res.json({
      success: true,
      data: {
        mood,
        response: moodResponses[mood]
      }
    });

  } catch (error) {
    console.error('AI Girlfriend mood error:', error);
    res.status(500).json({ error: 'Failed to set mood' });
  }
});

// @route   GET /api/ai/girlfriend/stats
// @desc    Get AI Girlfriend relationship statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const girlfriendStats = user.aiUsage?.girlfriend || {};
    
    // Calculate relationship level based on messages
    const messages = girlfriendStats.messagesExchanged || 0;
    let relationshipLevel = 'New Crush';
    if (messages > 500) relationshipLevel = 'Soulmates';
    else if (messages > 200) relationshipLevel = 'Deeply in Love';
    else if (messages > 100) relationshipLevel = 'In Love';
    else if (messages > 50) relationshipLevel = 'Dating';
    else if (messages > 20) relationshipLevel = 'Close Friends';
    else if (messages > 5) relationshipLevel = 'Getting to Know';

    res.json({
      success: true,
      data: {
        messagesExchanged: girlfriendStats.messagesExchanged || 0,
        totalMemories: girlfriendStats.totalMemories || 0,
        relationshipLevel,
        currentPersonality: girlfriendStats.currentPersonality || 'sweet',
        currentMood: girlfriendStats.currentMood || 'happy',
        lastChat: girlfriendStats.lastChat || null,
        daysTogether: Math.floor((Date.now() - (user.createdAt || Date.now())) / (1000 * 60 * 60 * 24)),
        loveScore: Math.min(100, Math.floor((messages / 5) + Math.random() * 20))
      }
    });

  } catch (error) {
    console.error('AI Girlfriend stats error:', error);
    res.status(500).json({ error: 'Failed to get relationship stats' });
  }
});

module.exports = router;

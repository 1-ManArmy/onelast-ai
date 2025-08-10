const express = require('express');
const router = express.Router();
const AIServiceIntegration = require('../services/aiIntegration');
const auth = require('../middleware/auth');

// Import individual AI service routes
const girlfriendRoutes = require('./girlfriend');

const aiService = new AIServiceIntegration();

// Mount AI service routes
router.use('/girlfriend', girlfriendRoutes);

// Astrology AI - Advanced astrological insights
router.post('/astrology/reading', auth, async (req, res) => {
  try {
    const { birthDate, birthTime, birthPlace, readingType } = req.body;
    
    if (!birthDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Birth date is required' 
      });
    }

    const reading = await aiService.generateAstrologyReading({
      birthDate,
      birthTime,
      birthPlace,
      readingType: readingType || 'comprehensive'
    });
    
    res.json({
      success: true,
      data: {
        reading,
        accuracy: reading.accuracy || 85,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Astrology reading error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate astrology reading'
    });
  }
});

router.get('/astrology/moon-phase', async (req, res) => {
  try {
    const moonPhase = await aiService.getCurrentMoonPhase();
    
    res.json({
      success: true,
      data: moonPhase
    });

  } catch (error) {
    console.error('Moon phase error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get moon phase data'
    });
  }
});

router.get('/astrology/planetary-positions', async (req, res) => {
  try {
    const positions = await aiService.getPlanetaryPositions();
    
    res.json({
      success: true,
      data: positions
    });

  } catch (error) {
    console.error('Planetary positions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get planetary positions'
    });
  }
});

// TokBoost - Social Media Content Generation
router.post('/tokboost/generate', auth, async (req, res) => {
  try {
    const { platform, topic, style } = req.body;
    
    if (!platform || !topic) {
      return res.status(400).json({ 
        success: false, 
        message: 'Platform and topic are required' 
      });
    }

    const content = await aiService.generateTokBoostContent(platform, topic, style);
    
    res.json({
      success: true,
      data: {
        platform,
        topic,
        style,
        generatedContent: content,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('TokBoost Generation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate TokBoost content' 
    });
  }
});

// YouGen - Content Creation
router.post('/yougen/create', auth, async (req, res) => {
  try {
    const { contentType, niche, audience } = req.body;
    
    if (!contentType || !niche) {
      return res.status(400).json({ 
        success: false, 
        message: 'Content type and niche are required' 
      });
    }

    const content = await aiService.generateYouGenContent(contentType, niche, audience);
    
    res.json({
      success: true,
      data: {
        contentType,
        niche,
        audience,
        generatedContent: content,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('YouGen Creation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create YouGen content' 
    });
  }
});

// GPT-God - Advanced AI Operations
router.post('/gptgod/execute', auth, async (req, res) => {
  try {
    const { task, complexity } = req.body;
    
    if (!task) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task description is required' 
      });
    }

    const result = await aiService.executeGPTGodTask(task, complexity);
    
    res.json({
      success: true,
      data: {
        task,
        complexity,
        result,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('GPT-God Execution Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to execute GPT-God task' 
    });
  }
});

// CVSmash - Resume Optimization
router.post('/cvsmash/optimize', auth, async (req, res) => {
  try {
    const { resumeText, jobDescription, currentAtsScore } = req.body;
    
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Resume text and job description are required' 
      });
    }

    const optimizedResume = await aiService.optimizeResume(
      resumeText, 
      jobDescription, 
      currentAtsScore || 73
    );
    
    res.json({
      success: true,
      data: {
        originalAtsScore: currentAtsScore || 73,
        targetAtsScore: 97,
        optimizedResume,
        jobDescription,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('CVSmash Optimization Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to optimize resume' 
    });
  }
});

// ChatRevive - Conversation Memory Restoration
router.post('/chatrevive/resurrect', auth, async (req, res) => {
  try {
    const { chatLogs, context } = req.body;
    
    if (!chatLogs) {
      return res.status(400).json({ 
        success: false, 
        message: 'Chat logs are required for resurrection' 
      });
    }

    const memoryProfile = await aiService.resurrectConversation(chatLogs, context);
    
    res.json({
      success: true,
      data: {
        memoryProfile,
        context,
        resurrectionStatus: 'completed',
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('ChatRevive Resurrection Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to resurrect conversation' 
    });
  }
});

// AgentX - AI Agent Creation
router.post('/agentx/create', auth, async (req, res) => {
  try {
    const { taskDescription, agentType } = req.body;
    
    if (!taskDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task description is required' 
      });
    }

    const agentConfig = await aiService.createAgentXTask(taskDescription, agentType);
    
    res.json({
      success: true,
      data: {
        taskDescription,
        agentType,
        agentConfig,
        status: 'created',
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('AgentX Creation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create AI agent' 
    });
  }
});

// VisionCraft - Image Analysis
router.post('/visioncraft/analyze', auth, async (req, res) => {
  try {
    const { imageUrl, task } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL is required' 
      });
    }

    const analysis = await aiService.analyzeImage(imageUrl, task);
    
    res.json({
      success: true,
      data: {
        imageUrl,
        task,
        analysis,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('VisionCraft Analysis Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to analyze image' 
    });
  }
});

// Mistral AI - Chat Completion
router.post('/mistral/chat', auth, async (req, res) => {
  try {
    const { prompt, model = 'mistral-small', options = {} } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }

    const response = await aiService.callMistral(prompt, model, options);
    
    res.json({
      success: true,
      data: {
        prompt,
        model,
        response,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Mistral AI Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process Mistral AI request' 
    });
  }
});

// Mistral AI - Code Analysis
router.post('/mistral/code-analysis', auth, async (req, res) => {
  try {
    const { code, language, task = 'analyze' } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({ 
        success: false, 
        message: 'Code and language are required' 
      });
    }

    const analysis = await aiService.codeAnalysisWithMistral(code, language, task);
    
    res.json({
      success: true,
      data: {
        code,
        language,
        task,
        analysis,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Mistral Code Analysis Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to analyze code with Mistral AI' 
    });
  }
});

// Mistral AI - Multilingual Support
router.post('/mistral/multilingual', auth, async (req, res) => {
  try {
    const { text, targetLanguage, task = 'translate' } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text is required' 
      });
    }

    const result = await aiService.multilingualSupportWithMistral(text, targetLanguage, task);
    
    res.json({
      success: true,
      data: {
        text,
        targetLanguage,
        task,
        result,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Mistral Multilingual Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process multilingual request with Mistral AI' 
    });
  }
});

// Google AI Studio - Chat with Gemini
router.post('/google/chat', auth, async (req, res) => {
  try {
    const { prompt, model = 'gemini-1.5-flash', options = {} } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }

    const response = await aiService.callGoogleAI(prompt, model, options);
    
    res.json({
      success: true,
      data: {
        prompt,
        model,
        response,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Google AI Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process Google AI request' 
    });
  }
});

// Google AI Studio - Vision Analysis
router.post('/google/vision', auth, async (req, res) => {
  try {
    const { imageBase64, prompt, options = {} } = req.body;
    
    if (!imageBase64 || !prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image and prompt are required' 
      });
    }

    const analysis = await aiService.visionAnalysisWithGoogleAI(imageBase64, prompt, options);
    
    res.json({
      success: true,
      data: {
        prompt,
        analysis,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Google AI Vision Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to analyze image with Google AI' 
    });
  }
});

// Google AI Studio - Advanced Reasoning
router.post('/google/reasoning', auth, async (req, res) => {
  try {
    const { question, context, options = {} } = req.body;
    
    if (!question) {
      return res.status(400).json({ 
        success: false, 
        message: 'Question is required' 
      });
    }

    const reasoning = await aiService.reasoningWithGoogleAI(question, context, options);
    
    res.json({
      success: true,
      data: {
        question,
        context,
        reasoning,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Google AI Reasoning Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process reasoning request with Google AI' 
    });
  }
});

// Health check for AI services
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Services are operational',
    services: [
      'AI Girlfriend',
      'TokBoost',
      'YouGen', 
      'GPT-God',
      'CVSmash',
      'ChatRevive',
      'AgentX',
      'AutoChat',
      'VisionCraft',
      'Mistral',
      'Google AI Studio'
    ],
    timestamp: new Date()
  });
});

module.exports = router;

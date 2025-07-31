const express = require('express');
const router = express.Router();
const AIServiceIntegration = require('../services/aiIntegration');
const auth = require('../middleware/auth');

const aiService = new AIServiceIntegration();

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

// Health check for AI services
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Services are operational',
    services: [
      'TokBoost',
      'YouGen', 
      'GPT-God',
      'CVSmash',
      'ChatRevive',
      'AgentX',
      'VisionCraft'
    ],
    timestamp: new Date()
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Rate limiting middleware
const rateLimit = {};
const rateLimitMiddleware = (req, res, next) => {
  const userId = req.user?.userId || req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // 10 requests per minute

  if (!rateLimit[userId]) {
    rateLimit[userId] = { count: 1, resetTime: now + windowMs };
  } else if (now > rateLimit[userId].resetTime) {
    rateLimit[userId] = { count: 1, resetTime: now + windowMs };
  } else if (rateLimit[userId].count >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  } else {
    rateLimit[userId].count++;
  }

  next();
};

// Simulate PDF text extraction
const extractTextFromPDF = (filename) => {
  // Simulate different types of documents
  const sampleTexts = {
    'financial-report.pdf': `
      QUARTERLY FINANCIAL REPORT - Q3 2024
      
      EXECUTIVE SUMMARY
      We are pleased to report strong financial performance for Q3 2024, with revenue growth of 23% year-over-year.
      
      KEY METRICS:
      - Total Revenue: $12.5M (up 23% YoY)
      - Net Income: $2.8M (up 31% YoY)
      - Customer Acquisition: 1,245 new customers
      - Customer Retention Rate: 94%
      
      STRATEGIC INITIATIVES:
      1. Expansion into European markets
      2. Launch of new product line
      3. Investment in AI and automation technologies
      
      OUTLOOK:
      We expect continued growth in Q4 2024, driven by seasonal demand and new product launches.
    `,
    'research-paper.pdf': `
      ARTIFICIAL INTELLIGENCE IN HEALTHCARE: A COMPREHENSIVE REVIEW
      
      ABSTRACT
      This paper examines the current state and future prospects of artificial intelligence applications in healthcare.
      
      INTRODUCTION
      The integration of AI technologies in healthcare has shown promising results across multiple domains.
      
      KEY FINDINGS:
      - AI diagnostic accuracy improved by 15-20% over traditional methods
      - Cost reduction of 25% in administrative processes
      - Patient satisfaction scores increased by 30%
      
      METHODOLOGY
      We conducted a systematic review of 150 peer-reviewed studies published between 2020-2024.
      
      CONCLUSIONS
      AI implementation in healthcare shows significant potential for improving patient outcomes and operational efficiency.
    `,
    'contract.pdf': `
      SOFTWARE LICENSING AGREEMENT
      
      This Software Licensing Agreement ("Agreement") is entered into on [DATE] between:
      
      LICENSOR: TechCorp Solutions Inc.
      LICENSEE: [Client Company Name]
      
      TERMS AND CONDITIONS:
      
      1. GRANT OF LICENSE
      Subject to the terms of this Agreement, Licensor grants Licensee a non-exclusive license to use the Software.
      
      2. RESTRICTIONS
      Licensee shall not:
      - Modify, adapt, or create derivative works
      - Reverse engineer or decompile
      - Distribute or sublicense the Software
      
      3. PAYMENT TERMS
      License fee: $50,000 annually
      Payment due: Net 30 days
      
      4. TERM AND TERMINATION
      This Agreement shall remain in effect for 2 years from the effective date.
    `
  };

  // Return sample text based on filename or default
  return sampleTexts[filename] || sampleTexts['financial-report.pdf'];
};

// Simulate document analysis
const analyzeDocument = (text, analysisType = 'summary') => {
  const responses = {
    summary: "This document appears to be a business report containing financial data, key performance indicators, and strategic information. The main topics include revenue growth, customer metrics, and future business initiatives.",
    
    key_points: [
      "Revenue increased by 23% year-over-year",
      "Customer retention rate is at 94%",
      "Expansion into new markets is planned",
      "Investment in AI technologies is a priority"
    ],
    
    entities: [
      { type: "MONEY", value: "$12.5M", context: "Total Revenue" },
      { type: "PERCENT", value: "23%", context: "Revenue Growth" },
      { type: "NUMBER", value: "1,245", context: "New Customers" },
      { type: "DATE", value: "Q3 2024", context: "Reporting Period" }
    ],
    
    sentiment: {
      overall: "positive",
      confidence: 0.89,
      details: "The document expresses optimism about business performance and future prospects"
    }
  };

  return responses[analysisType] || responses.summary;
};

// Generate contextual response for chat
const generateChatResponse = (question, context) => {
  const question_lower = question.toLowerCase();
  
  if (question_lower.includes('revenue') || question_lower.includes('sales')) {
    return "Based on the document analysis, the revenue grew by 23% year-over-year to $12.5M in Q3 2024. This growth was primarily driven by new customer acquisitions and improved retention rates.";
  }
  
  if (question_lower.includes('customer') || question_lower.includes('retention')) {
    return "The document shows strong customer metrics with 1,245 new customers acquired and an impressive 94% customer retention rate. This indicates high customer satisfaction and product-market fit.";
  }
  
  if (question_lower.includes('future') || question_lower.includes('outlook') || question_lower.includes('plan')) {
    return "The outlook section indicates continued growth expected in Q4 2024, with strategic initiatives including European market expansion, new product launches, and investments in AI and automation technologies.";
  }
  
  if (question_lower.includes('financial') || question_lower.includes('profit')) {
    return "The financial performance shows strong results with net income of $2.8M, representing a 31% year-over-year increase. The company demonstrates healthy profitability and growth trajectory.";
  }
  
  if (question_lower.includes('summary') || question_lower.includes('overview')) {
    return "This document is a Q3 2024 quarterly financial report showing excellent business performance. Key highlights include 23% revenue growth, strong customer metrics, and positive future outlook with strategic expansion plans.";
  }
  
  return "I can help you understand various aspects of this document including financial performance, customer metrics, strategic initiatives, and future outlook. What specific information would you like to know more about?";
};

// PDF upload and text extraction endpoint
router.post('/upload', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    const { filename, fileSize } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extract text from PDF (simulated)
    const extractedText = extractTextFromPDF(filename);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.pdfmind.documentsProcessed': 1,
        'aiUsage.pdfmind.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        filename,
        extractedText,
        wordCount: extractedText.split(' ').length,
        processingTime: '1.2s',
        documentId: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });

  } catch (error) {
    console.error('PDFMind upload error:', error);
    res.status(500).json({ error: 'Failed to process PDF document' });
  }
});

// Document analysis endpoint
router.post('/analyze', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    const { text, analysisType = 'summary' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 800));

    const analysis = analyzeDocument(text, analysisType);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.pdfmind.analysisPerformed': 1,
        'aiUsage.pdfmind.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        analysisType,
        result: analysis,
        timestamp: new Date().toISOString(),
        processingTime: '0.8s'
      }
    });

  } catch (error) {
    console.error('PDFMind analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
});

// Chat with document endpoint
router.post('/chat', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    const { question, context } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = generateChatResponse(question, context);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.pdfmind.chatInteractions': 1,
        'aiUsage.pdfmind.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        question,
        response,
        timestamp: new Date().toISOString(),
        confidence: 0.92,
        responseTime: '1.2s'
      }
    });

  } catch (error) {
    console.error('PDFMind chat error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Get user's PDFMind usage statistics
router.get('/usage', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('aiUsage.pdfmind');
    
    const usage = user?.aiUsage?.pdfmind || {
      documentsProcessed: 0,
      analysisPerformed: 0,
      chatInteractions: 0,
      totalUsage: 0
    };

    res.json({
      success: true,
      data: {
        ...usage,
        subscriptionStatus: 'active', // This would come from actual subscription data
        planType: 'pro',
        remainingCredits: 1000 - usage.totalUsage
      }
    });

  } catch (error) {
    console.error('PDFMind usage error:', error);
    res.status(500).json({ error: 'Failed to get usage statistics' });
  }
});

// Subscription management endpoint
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planType, billingPeriod } = req.body;

    // Update user subscription (simplified)
    await User.findByIdAndUpdate(req.user.userId, {
      $set: {
        'subscription.pdfmind': {
          plan: planType,
          billing: billingPeriod,
          status: 'active',
          startDate: new Date(),
          nextBilling: new Date(Date.now() + (billingPeriod === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000)
        }
      }
    });

    res.json({
      success: true,
      message: 'Successfully subscribed to PDFMind',
      data: {
        planType,
        billingPeriod,
        status: 'active'
      }
    });

  } catch (error) {
    console.error('PDFMind subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PaymentValidator = require('./validators/PaymentValidator');
const BINLookupService = require('./services/BINLookupService');
const FraudDetectionService = require('./services/FraudDetectionService');
const CardValidationService = require('./services/CardValidationService');
const CardAuthorizationService = require('./services/CardAuthorizationService');
const logger = require('./utils/logger');
const cache = require('./utils/cache');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many validation requests, please try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api/', limiter);

// Initialize services
const binLookupService = new BINLookupService();
const fraudDetectionService = new FraudDetectionService();
const cardValidationService = new CardValidationService();
const cardAuthorizationService = new CardAuthorizationService();
const paymentValidator = new PaymentValidator({
  binLookupService,
  fraudDetectionService,
  cardValidationService
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Card authorization endpoint (NEW!)
app.post('/api/authorize-card', async (req, res) => {
  try {
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      billingAddress,
      metadata
    } = req.body;

    // Input validation
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return res.status(400).json({
        success: false,
        error: 'Card number, expiry month, expiry year, and CVV are required',
        code: 'MISSING_CARD_DATA'
      });
    }

    // Perform card authorization
    const authResult = await cardAuthorizationService.authorizeCard({
      cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces
      expiryMonth: parseInt(expiryMonth),
      expiryYear: parseInt(expiryYear),
      cvv,
      holderName,
      billingAddress,
      metadata
    });

    // Log authorization attempt
    logger.info('Card authorization completed', {
      authId: authResult.authId,
      success: authResult.success,
      status: authResult.status,
      cardLast4: cardNumber.slice(-4)
    });

    res.json(authResult);

  } catch (error) {
    logger.error('Card authorization error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Card authorization failed',
      code: 'AUTHORIZATION_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get refund status endpoint
app.get('/api/refund-status/:chargeId', async (req, res) => {
  try {
    const { chargeId } = req.params;
    
    if (!chargeId) {
      return res.status(400).json({
        success: false,
        error: 'Charge ID is required',
        code: 'MISSING_CHARGE_ID'
      });
    }

    const refundStatus = await cardAuthorizationService.getRefundStatus(chargeId);
    
    res.json({
      success: true,
      data: refundStatus
    });

  } catch (error) {
    logger.error('Refund status check error', { error: error.message, chargeId: req.params.chargeId });
    
    res.status(500).json({
      success: false,
      error: 'Failed to check refund status',
      code: 'REFUND_STATUS_ERROR'
    });
  }
});

// Manual refund endpoint
app.post('/api/refund/:chargeId', async (req, res) => {
  try {
    const { chargeId } = req.params;
    const { authId } = req.body;
    
    if (!chargeId) {
      return res.status(400).json({
        success: false,
        error: 'Charge ID is required',
        code: 'MISSING_CHARGE_ID'
      });
    }

    const refundResult = await cardAuthorizationService.refundAuthorization(chargeId, authId);
    
    res.json(refundResult);

  } catch (error) {
    logger.error('Manual refund error', { error: error.message, chargeId: req.params.chargeId });
    
    res.status(500).json({
      success: false,
      error: 'Refund failed',
      code: 'REFUND_ERROR',
      details: error.message
    });
  }
});

// Authorization stats endpoint
app.get('/api/authorization-stats', async (req, res) => {
  try {
    const { timeframe } = req.query;
    const stats = await cardAuthorizationService.getAuthorizationStats(timeframe);
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    logger.error('Authorization stats error', { error: error.message });
    
    res.status(500).json({
      success: false,
      error: 'Failed to get authorization statistics',
      code: 'STATS_ERROR'
    });
  }
});

// Health check for Stripe
app.get('/api/stripe-health', async (req, res) => {
  try {
    const healthStatus = await cardAuthorizationService.checkStripeHealth();
    
    res.json({
      success: true,
      data: healthStatus
    });

  } catch (error) {
    logger.error('Stripe health check error', { error: error.message });
    
    res.status(500).json({
      success: false,
      error: 'Stripe health check failed',
      code: 'STRIPE_HEALTH_ERROR'
    });
  }
});

// Main validation endpoint
app.post('/api/validate-payment', async (req, res) => {
  try {
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      billingAddress,
      amount,
      currency,
      metadata
    } = req.body;

    // Input validation
    if (!cardNumber) {
      return res.status(400).json({
        success: false,
        error: 'Card number is required',
        code: 'MISSING_CARD_NUMBER'
      });
    }

    // Create cache key
    const cacheKey = `validation_${cardNumber.slice(-4)}_${amount}_${currency}`;
    const cachedResult = cache.get(cacheKey);

    if (cachedResult && !process.env.TEST_MODE) {
      logger.info('Returning cached validation result', { cacheKey });
      return res.json(cachedResult);
    }

    // Perform comprehensive validation
    const validationResult = await paymentValidator.validatePayment({
      cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces
      expiryMonth: parseInt(expiryMonth),
      expiryYear: parseInt(expiryYear),
      cvv,
      holderName,
      billingAddress,
      amount: parseFloat(amount),
      currency: currency?.toUpperCase(),
      metadata
    });

    // Cache result for successful validations
    if (validationResult.success && validationResult.overallRisk !== 'HIGH') {
      cache.set(cacheKey, validationResult);
    }

    // Log validation attempt
    logger.info('Payment validation completed', {
      success: validationResult.success,
      riskLevel: validationResult.overallRisk,
      cardType: validationResult.cardDetails?.type,
      country: validationResult.cardDetails?.country
    });

    res.json(validationResult);

  } catch (error) {
    logger.error('Payment validation error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Internal validation error',
      code: 'VALIDATION_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// BIN lookup endpoint
app.get('/api/bin-lookup/:bin', async (req, res) => {
  try {
    const { bin } = req.params;
    
    if (!bin || bin.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Invalid BIN format. Must be at least 6 digits.',
        code: 'INVALID_BIN'
      });
    }

    const binInfo = await binLookupService.lookupBIN(bin);
    
    res.json({
      success: true,
      data: binInfo
    });

  } catch (error) {
    logger.error('BIN lookup error', { error: error.message, bin: req.params.bin });
    
    res.status(500).json({
      success: false,
      error: 'BIN lookup failed',
      code: 'BIN_LOOKUP_ERROR'
    });
  }
});

// Card type detection endpoint
app.post('/api/detect-card-type', (req, res) => {
  try {
    const { cardNumber } = req.body;
    
    if (!cardNumber) {
      return res.status(400).json({
        success: false,
        error: 'Card number is required',
        code: 'MISSING_CARD_NUMBER'
      });
    }

    const cardType = cardValidationService.detectCardType(cardNumber);
    
    res.json({
      success: true,
      data: {
        type: cardType.type,
        brand: cardType.brand,
        lengths: cardType.lengths,
        cvvLength: cardType.code?.size
      }
    });

  } catch (error) {
    logger.error('Card type detection error', { error: error.message });
    
    res.status(500).json({
      success: false,
      error: 'Card type detection failed',
      code: 'CARD_TYPE_ERROR'
    });
  }
});

// Batch validation endpoint
app.post('/api/validate-batch', async (req, res) => {
  try {
    const { payments } = req.body;
    
    if (!Array.isArray(payments) || payments.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Payments array is required',
        code: 'MISSING_PAYMENTS'
      });
    }

    if (payments.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 50 payments per batch',
        code: 'BATCH_SIZE_EXCEEDED'
      });
    }

    const results = await Promise.allSettled(
      payments.map(async (payment, index) => {
        try {
          const result = await paymentValidator.validatePayment(payment);
          return { index, ...result };
        } catch (error) {
          return {
            index,
            success: false,
            error: error.message,
            code: 'VALIDATION_ERROR'
          };
        }
      })
    );

    const processedResults = results.map(result => 
      result.status === 'fulfilled' ? result.value : result.reason
    );

    res.json({
      success: true,
      totalProcessed: payments.length,
      results: processedResults,
      summary: {
        successful: processedResults.filter(r => r.success).length,
        failed: processedResults.filter(r => !r.success).length,
        highRisk: processedResults.filter(r => r.overallRisk === 'HIGH').length
      }
    });

  } catch (error) {
    logger.error('Batch validation error', { error: error.message });
    
    res.status(500).json({
      success: false,
      error: 'Batch validation failed',
      code: 'BATCH_VALIDATION_ERROR'
    });
  }
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
  const stats = {
    cacheStats: cache.getStats(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  };

  res.json({
    success: true,
    data: stats
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Payment Validation Server started on port ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');

// Payment Validation Service
class PaymentValidator {
  constructor() {
    this.binApiUrl = 'https://lookup.binlist.net/';
    this.siftApiUrl = 'https://api.sift.com/v205/events';
    this.maxmindApiUrl = 'https://minfraud.maxmind.com/minfraud/v2.0/insights';
  }

  // Luhn Algorithm for card number validation
  validateCardNumber(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(num)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Get card type from number
  getCardType(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6/.test(num)) return 'discover';
    if (/^35/.test(num)) return 'jcb';
    
    return 'unknown';
  }

  // Validate CVV based on card type
  validateCVV(cvv, cardType) {
    if (!cvv || !/^\d+$/.test(cvv)) return false;
    
    if (cardType === 'amex') {
      return cvv.length === 4;
    } else {
      return cvv.length === 3;
    }
  }

  // BIN Lookup for card details
  async binLookup(cardNumber) {
    try {
      const bin = cardNumber.replace(/\s/g, '').substring(0, 6);
      const response = await axios.get(`${this.binApiUrl}${bin}`);
      
      return {
        valid: true,
        country: response.data.country?.name,
        countryCode: response.data.country?.alpha2,
        bank: response.data.bank?.name,
        brand: response.data.brand,
        type: response.data.type, // debit, credit
        prepaid: response.data.prepaid,
        scheme: response.data.scheme
      };
    } catch (error) {
      return {
        valid: false,
        error: 'BIN lookup failed'
      };
    }
  }

  // Risk Assessment using Sift Science (mock implementation)
  async riskAssessment(paymentData) {
    try {
      // Mock risk scoring (in production, use real Sift API)
      const riskFactors = [];
      let riskScore = 0;

      // Check for high-risk countries
      const highRiskCountries = ['XX', 'YY', 'ZZ']; // Add actual high-risk country codes
      if (highRiskCountries.includes(paymentData.country)) {
        riskFactors.push('High-risk country');
        riskScore += 30;
      }

      // Check for prepaid cards
      if (paymentData.prepaid === true) {
        riskFactors.push('Prepaid card detected');
        riskScore += 20;
      }

      // Check email domain
      const suspiciousDomains = ['tempmail', '10minutemail', 'guerrillamail'];
      const emailDomain = paymentData.email?.split('@')[1]?.toLowerCase();
      if (suspiciousDomains.some(domain => emailDomain?.includes(domain))) {
        riskFactors.push('Suspicious email domain');
        riskScore += 25;
      }

      // Mock IP risk check
      if (Math.random() > 0.8) { // 20% chance of flagging IP
        riskFactors.push('Suspicious IP address');
        riskScore += 15;
      }

      return {
        riskScore: Math.min(riskScore, 100),
        riskLevel: riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high',
        riskFactors,
        recommendation: riskScore > 70 ? 'block' : riskScore > 40 ? 'review' : 'approve'
      };
    } catch (error) {
      return {
        riskScore: 50,
        riskLevel: 'medium',
        error: 'Risk assessment failed'
      };
    }
  }

  // Comprehensive payment validation
  async validatePayment(paymentData) {
    const validation = {
      valid: true,
      errors: [],
      warnings: [],
      details: {}
    };

    // 1. Card number validation
    if (!this.validateCardNumber(paymentData.cardNumber)) {
      validation.valid = false;
      validation.errors.push('Invalid card number');
    }

    // 2. Card type detection
    const cardType = this.getCardType(paymentData.cardNumber);
    validation.details.cardType = cardType;

    if (cardType === 'unknown') {
      validation.valid = false;
      validation.errors.push('Unsupported card type');
    }

    // 3. CVV validation
    if (!this.validateCVV(paymentData.cvv, cardType)) {
      validation.valid = false;
      validation.errors.push('Invalid CVV');
    }

    // 4. Expiry date validation
    const expiry = paymentData.expiryDate.split('/');
    const month = parseInt(expiry[0]);
    const year = parseInt('20' + expiry[1]);
    const now = new Date();
    const expiryDate = new Date(year, month - 1);

    if (expiryDate <= now) {
      validation.valid = false;
      validation.errors.push('Card has expired');
    }

    // 5. BIN lookup
    const binData = await this.binLookup(paymentData.cardNumber);
    validation.details.binData = binData;

    if (!binData.valid) {
      validation.warnings.push('Could not verify card details');
    }

    // 6. Risk assessment
    const riskAssessment = await this.riskAssessment({
      ...paymentData,
      ...binData
    });
    validation.details.riskAssessment = riskAssessment;

    if (riskAssessment.recommendation === 'block') {
      validation.valid = false;
      validation.errors.push('Payment blocked due to high risk');
    } else if (riskAssessment.recommendation === 'review') {
      validation.warnings.push('Payment requires manual review');
    }

    return validation;
  }
}

const paymentValidator = new PaymentValidator();

// @route   POST /api/payment/validate
// @desc    Validate payment details before processing
// @access  Private
router.post('/validate', auth, async (req, res) => {
  try {
    const {
      cardNumber,
      cvv,
      expiryDate,
      email,
      amount,
      currency = 'USD',
      service
    } = req.body;

    // Required field validation
    if (!cardNumber || !cvv || !expiryDate || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment fields'
      });
    }

    console.log(`💳 Validating payment for ${service} - $${amount}`);

    // Comprehensive validation
    const validation = await paymentValidator.validatePayment({
      cardNumber,
      cvv,
      expiryDate,
      email,
      amount,
      currency,
      service
    });

    // Log validation result
    console.log(`Validation result: ${validation.valid ? 'PASSED' : 'FAILED'}`);
    if (validation.errors.length > 0) {
      console.log('Errors:', validation.errors);
    }

    res.json({
      success: true,
      validation: {
        ...validation,
        timestamp: new Date().toISOString(),
        service,
        amount,
        currency
      }
    });

  } catch (error) {
    console.error('Payment validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment validation failed'
    });
  }
});

// @route   POST /api/payment/bin-lookup
// @desc    Lookup BIN information for card
// @access  Private
router.post('/bin-lookup', auth, async (req, res) => {
  try {
    const { cardNumber } = req.body;

    if (!cardNumber) {
      return res.status(400).json({
        success: false,
        error: 'Card number is required'
      });
    }

    const binData = await paymentValidator.binLookup(cardNumber);

    res.json({
      success: true,
      binData
    });

  } catch (error) {
    console.error('BIN lookup error:', error);
    res.status(500).json({
      success: false,
      error: 'BIN lookup failed'
    });
  }
});

// @route   POST /api/payment/risk-check
// @desc    Perform fraud risk assessment
// @access  Private
router.post('/risk-check', auth, async (req, res) => {
  try {
    const paymentData = req.body;

    const riskAssessment = await paymentValidator.riskAssessment(paymentData);

    res.json({
      success: true,
      riskAssessment
    });

  } catch (error) {
    console.error('Risk check error:', error);
    res.status(500).json({
      success: false,
      error: 'Risk assessment failed'
    });
  }
});

module.exports = router;

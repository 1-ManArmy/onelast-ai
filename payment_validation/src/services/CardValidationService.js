const creditCardType = require('credit-card-type');
const cardValidator = require('card-validator');

class CardValidationService {
  constructor() {
    this.supportedNetworks = [
      'visa',
      'mastercard',
      'american-express',
      'discover',
      'jcb',
      'diners-club',
      'maestro',
      'unionpay'
    ];
  }

  detectCardType(cardNumber) {
    try {
      const cleanNumber = cardNumber.replace(/\s/g, '');
      const cardTypes = creditCardType(cleanNumber);

      if (cardTypes.length === 0) {
        return {
          type: 'unknown',
          brand: 'UNKNOWN',
          lengths: [],
          gaps: [],
          code: { size: 3 }
        };
      }

      const primaryType = cardTypes[0];
      
      return {
        type: primaryType.type,
        brand: primaryType.niceType,
        lengths: primaryType.lengths,
        gaps: primaryType.gaps,
        code: primaryType.code,
        matchStrength: primaryType.matchStrength,
        supported: this.supportedNetworks.includes(primaryType.type)
      };

    } catch (error) {
      return {
        type: 'unknown',
        brand: 'UNKNOWN',
        lengths: [],
        gaps: [],
        code: { size: 3 },
        error: error.message
      };
    }
  }

  validateCardNumber(cardNumber) {
    try {
      const validation = cardValidator.number(cardNumber);
      
      return {
        valid: validation.isValid,
        lengthValid: validation.isValidLength,
        luhnValid: validation.isLuhnValid,
        card: validation.card,
        maxLength: validation.card?.lengths?.[validation.card.lengths.length - 1] || 19
      };

    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  validateExpirationDate(month, year) {
    try {
      const validation = cardValidator.expirationDate({
        month: month,
        year: year
      });

      return {
        valid: validation.isValid,
        expired: validation.isPastDate,
        details: validation
      };

    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  validateCVV(cvv, cardType) {
    try {
      const validation = cardValidator.cvv(cvv, cardType);

      return {
        valid: validation.isValid,
        lengthValid: validation.isValidLength,
        details: validation
      };

    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  validateCardholderName(name) {
    if (!name || typeof name !== 'string') {
      return {
        valid: false,
        message: 'Cardholder name is required'
      };
    }

    const trimmedName = name.trim();

    // Basic validations
    if (trimmedName.length < 2) {
      return {
        valid: false,
        message: 'Name must be at least 2 characters'
      };
    }

    if (trimmedName.length > 50) {
      return {
        valid: false,
        message: 'Name must be less than 50 characters'
      };
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedName)) {
      return {
        valid: false,
        message: 'Name contains invalid characters'
      };
    }

    // Check for at least one letter
    if (!/[a-zA-Z]/.test(trimmedName)) {
      return {
        valid: false,
        message: 'Name must contain at least one letter'
      };
    }

    // Check for reasonable format (at least first and last name)
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
    if (nameParts.length < 2) {
      return {
        valid: false,
        message: 'Please provide both first and last name',
        suggestion: 'Use format: "First Last"'
      };
    }

    return {
      valid: true,
      message: 'Valid cardholder name',
      formatted: trimmedName,
      parts: nameParts
    };
  }

  // Comprehensive card validation
  validateCard(cardData) {
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      holderName
    } = cardData;

    const results = {
      overall: { valid: true, errors: [] },
      cardNumber: this.validateCardNumber(cardNumber),
      cardType: this.detectCardType(cardNumber),
      expiry: this.validateExpirationDate(expiryMonth, expiryYear),
      cvv: null,
      holderName: this.validateCardholderName(holderName)
    };

    // Validate CVV with detected card type
    if (cvv && results.cardType.type) {
      results.cvv = this.validateCVV(cvv, results.cardType.type);
    }

    // Check overall validity
    const validationChecks = [
      results.cardNumber.valid,
      results.expiry.valid,
      results.holderName.valid
    ];

    if (cvv) {
      validationChecks.push(results.cvv?.valid || false);
    }

    results.overall.valid = validationChecks.every(check => check === true);

    // Collect errors
    if (!results.cardNumber.valid) {
      results.overall.errors.push('Invalid card number');
    }
    if (!results.expiry.valid) {
      results.overall.errors.push('Invalid expiry date');
    }
    if (!results.holderName.valid) {
      results.overall.errors.push('Invalid cardholder name');
    }
    if (cvv && !results.cvv?.valid) {
      results.overall.errors.push('Invalid CVV');
    }

    return results;
  }

  // Get card network specific limits and rules
  getCardNetworkRules(cardType) {
    const rules = {
      'visa': {
        lengthRange: [13, 16, 19],
        cvvLength: 3,
        acceptedGlobally: true,
        commonDeclines: ['Insufficient funds', 'Card blocked'],
        processingNotes: 'Most widely accepted'
      },
      'mastercard': {
        lengthRange: [16],
        cvvLength: 3,
        acceptedGlobally: true,
        commonDeclines: ['Insufficient funds', 'Card blocked'],
        processingNotes: 'Widely accepted, good international support'
      },
      'american-express': {
        lengthRange: [15],
        cvvLength: 4,
        acceptedGlobally: false,
        acceptanceRate: 85,
        commonDeclines: ['Not accepted by merchant', 'Credit limit'],
        processingNotes: 'Higher fees, premium card'
      },
      'discover': {
        lengthRange: [16],
        cvvLength: 3,
        acceptedGlobally: false,
        acceptanceRate: 70,
        commonDeclines: ['Not accepted internationally'],
        processingNotes: 'Primarily US-based acceptance'
      },
      'jcb': {
        lengthRange: [16],
        cvvLength: 3,
        acceptedGlobally: false,
        acceptanceRate: 60,
        commonDeclines: ['Limited international acceptance'],
        processingNotes: 'Popular in Asia, limited elsewhere'
      },
      'diners-club': {
        lengthRange: [14],
        cvvLength: 3,
        acceptedGlobally: false,
        acceptanceRate: 50,
        commonDeclines: ['Limited acceptance'],
        processingNotes: 'Corporate/business focused'
      }
    };

    return rules[cardType] || {
      lengthRange: [16],
      cvvLength: 3,
      acceptedGlobally: false,
      acceptanceRate: 30,
      commonDeclines: ['Unknown card type'],
      processingNotes: 'Unknown or unsupported card type'
    };
  }

  // Generate card validation insights
  generateValidationInsights(cardData) {
    const validation = this.validateCard(cardData);
    const networkRules = this.getCardNetworkRules(validation.cardType.type);

    return {
      ...validation,
      insights: {
        networkRules: networkRules,
        recommendations: this.generateRecommendations(validation, networkRules),
        riskFactors: this.identifyRiskFactors(validation, cardData),
        processingLikelihood: this.calculateProcessingLikelihood(validation, networkRules)
      }
    };
  }

  generateRecommendations(validation, networkRules) {
    const recommendations = [];

    if (!validation.overall.valid) {
      recommendations.push({
        type: 'REJECT',
        priority: 'HIGH',
        message: 'Fix validation errors before processing'
      });
      return recommendations;
    }

    if (!networkRules.acceptedGlobally) {
      recommendations.push({
        type: 'CHECK_ACCEPTANCE',
        priority: 'MEDIUM',
        message: `Verify ${validation.cardType.brand} acceptance in target market`
      });
    }

    if (validation.expiry.details?.isPastDate) {
      recommendations.push({
        type: 'REJECT',
        priority: 'HIGH',
        message: 'Card has expired'
      });
    }

    if (validation.cardType.type === 'american-express') {
      recommendations.push({
        type: 'FEE_WARNING',
        priority: 'LOW',
        message: 'American Express typically has higher processing fees'
      });
    }

    if (networkRules.acceptanceRate < 80) {
      recommendations.push({
        type: 'ALTERNATIVE_PAYMENT',
        priority: 'MEDIUM',
        message: 'Consider offering alternative payment methods'
      });
    }

    return recommendations;
  }

  identifyRiskFactors(validation, cardData) {
    const riskFactors = [];

    if (!validation.cardNumber.luhnValid) {
      riskFactors.push('Failed Luhn algorithm check');
    }

    if (validation.cardType.type === 'unknown') {
      riskFactors.push('Unknown or unsupported card type');
    }

    if (!validation.cardType.supported) {
      riskFactors.push('Card type not in supported networks list');
    }

    // Check for suspicious patterns
    const cleanNumber = cardData.cardNumber?.replace(/\s/g, '') || '';
    if (/^(\d)\1+$/.test(cleanNumber)) {
      riskFactors.push('Repeated digit pattern detected');
    }

    if (cleanNumber.startsWith('0000') || cleanNumber.startsWith('1111')) {
      riskFactors.push('Suspicious number pattern');
    }

    return riskFactors;
  }

  calculateProcessingLikelihood(validation, networkRules) {
    let likelihood = 100;

    if (!validation.overall.valid) {
      return 0;
    }

    // Reduce likelihood based on network acceptance
    if (!networkRules.acceptedGlobally) {
      likelihood -= (100 - (networkRules.acceptanceRate || 50));
    }

    // Reduce for card type issues
    if (!validation.cardType.supported) {
      likelihood -= 20;
    }

    // Reduce for validation issues
    if (!validation.cardNumber.luhnValid) {
      likelihood -= 30;
    }

    return Math.max(0, Math.min(100, likelihood));
  }

  // Test card numbers for development
  getTestCards() {
    return {
      visa: {
        valid: ['4111111111111111', '4242424242424242'],
        invalid: ['4111111111111112']
      },
      mastercard: {
        valid: ['5555555555554444', '5105105105105100'],
        invalid: ['5555555555554445']
      },
      amex: {
        valid: ['378282246310005', '371449635398431'],
        invalid: ['378282246310006']
      },
      discover: {
        valid: ['6011111111111117', '6011000990139424'],
        invalid: ['6011111111111118']
      }
    };
  }
}

module.exports = CardValidationService;

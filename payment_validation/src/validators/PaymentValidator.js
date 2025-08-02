const cardValidator = require('card-validator');
const luhn = require('luhn');
const logger = require('../utils/logger');

class PaymentValidator {
  constructor(services = {}) {
    this.binLookupService = services.binLookupService;
    this.fraudDetectionService = services.fraudDetectionService;
    this.cardValidationService = services.cardValidationService;
  }

  async validatePayment(paymentData) {
    const startTime = Date.now();
    
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
        metadata = {}
      } = paymentData;

      // Initialize validation result
      const validationResult = {
        success: false,
        timestamp: new Date().toISOString(),
        validationId: this.generateValidationId(),
        overallRisk: 'UNKNOWN',
        validationChecks: {},
        cardDetails: {},
        riskFactors: [],
        recommendations: [],
        processingTime: 0
      };

      // 1. Basic card format validation
      const basicValidation = this.validateBasicCardFormat(cardNumber, expiryMonth, expiryYear, cvv);
      validationResult.validationChecks.basicFormat = basicValidation;

      if (!basicValidation.valid) {
        validationResult.success = false;
        validationResult.overallRisk = 'HIGH';
        validationResult.riskFactors.push('Invalid card format');
        validationResult.processingTime = Date.now() - startTime;
        return validationResult;
      }

      // 2. Luhn algorithm validation
      const luhnValidation = this.validateLuhnAlgorithm(cardNumber);
      validationResult.validationChecks.luhnCheck = luhnValidation;

      if (!luhnValidation.valid) {
        validationResult.riskFactors.push('Failed Luhn algorithm check');
      }

      // 3. Card type and brand detection
      const cardTypeResult = this.cardValidationService.detectCardType(cardNumber);
      validationResult.cardDetails = {
        type: cardTypeResult.type,
        brand: cardTypeResult.brand,
        last4: cardNumber.slice(-4),
        binRange: cardNumber.substring(0, 6)
      };

      // 4. BIN lookup for additional card details
      if (this.binLookupService) {
        try {
          const binInfo = await this.binLookupService.lookupBIN(cardNumber.substring(0, 6));
          validationResult.cardDetails = {
            ...validationResult.cardDetails,
            ...binInfo,
            issuer: binInfo.bank || binInfo.issuer,
            country: binInfo.country,
            countryCode: binInfo.countryCode,
            cardLevel: binInfo.level,
            prepaid: binInfo.prepaid
          };
        } catch (error) {
          logger.warn('BIN lookup failed', { error: error.message });
          validationResult.riskFactors.push('BIN lookup unavailable');
        }
      }

      // 5. Expiry date validation
      const expiryValidation = this.validateExpiryDate(expiryMonth, expiryYear);
      validationResult.validationChecks.expiryDate = expiryValidation;

      if (!expiryValidation.valid) {
        validationResult.riskFactors.push('Card expired or invalid expiry date');
      }

      // 6. CVV validation
      const cvvValidation = this.validateCVV(cvv, cardTypeResult.type);
      validationResult.validationChecks.cvv = cvvValidation;

      if (!cvvValidation.valid) {
        validationResult.riskFactors.push('Invalid CVV format');
      }

      // 7. Amount validation
      const amountValidation = this.validateAmount(amount, currency);
      validationResult.validationChecks.amount = amountValidation;

      if (!amountValidation.valid) {
        validationResult.riskFactors.push('Invalid transaction amount');
      }

      // 8. Billing address validation (if provided)
      if (billingAddress) {
        const addressValidation = this.validateBillingAddress(billingAddress);
        validationResult.validationChecks.billingAddress = addressValidation;

        if (!addressValidation.valid) {
          validationResult.riskFactors.push('Incomplete billing address');
        }
      }

      // 9. Fraud detection checks
      if (this.fraudDetectionService) {
        try {
          const fraudCheck = await this.fraudDetectionService.analyzeFraudRisk({
            cardNumber,
            amount,
            currency,
            billingAddress,
            metadata
          });

          validationResult.validationChecks.fraudDetection = fraudCheck;

          if (fraudCheck.riskLevel === 'HIGH') {
            validationResult.riskFactors.push(`High fraud risk: ${fraudCheck.reason}`);
          }
        } catch (error) {
          logger.warn('Fraud detection check failed', { error: error.message });
          validationResult.riskFactors.push('Fraud detection unavailable');
        }
      }

      // 10. Calculate overall risk score
      const riskScore = this.calculateRiskScore(validationResult);
      validationResult.riskScore = riskScore.score;
      validationResult.overallRisk = riskScore.level;

      // 11. Generate recommendations
      validationResult.recommendations = this.generateRecommendations(validationResult);

      // 12. Determine final success status
      validationResult.success = this.determineValidationSuccess(validationResult);

      validationResult.processingTime = Date.now() - startTime;

      logger.info('Payment validation completed', {
        validationId: validationResult.validationId,
        success: validationResult.success,
        riskLevel: validationResult.overallRisk,
        processingTime: validationResult.processingTime
      });

      return validationResult;

    } catch (error) {
      logger.error('Payment validation error', {
        error: error.message,
        stack: error.stack
      });

      return {
        success: false,
        timestamp: new Date().toISOString(),
        validationId: this.generateValidationId(),
        overallRisk: 'HIGH',
        error: 'Validation process failed',
        processingTime: Date.now() - startTime
      };
    }
  }

  validateBasicCardFormat(cardNumber, expiryMonth, expiryYear, cvv) {
    const errors = [];

    // Card number validation
    if (!cardNumber || typeof cardNumber !== 'string') {
      errors.push('Card number is required');
    } else {
      const cleanedNumber = cardNumber.replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cleanedNumber)) {
        errors.push('Card number must be 13-19 digits');
      }
    }

    // Expiry month validation
    if (!expiryMonth || !Number.isInteger(expiryMonth) || expiryMonth < 1 || expiryMonth > 12) {
      errors.push('Expiry month must be between 1 and 12');
    }

    // Expiry year validation
    const currentYear = new Date().getFullYear();
    if (!expiryYear || !Number.isInteger(expiryYear) || expiryYear < currentYear || expiryYear > currentYear + 20) {
      errors.push('Expiry year is invalid');
    }

    // CVV validation (basic format)
    if (cvv && (!/^\d{3,4}$/.test(cvv))) {
      errors.push('CVV must be 3 or 4 digits');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  validateLuhnAlgorithm(cardNumber) {
    try {
      const cleanedNumber = cardNumber.replace(/\s/g, '');
      const isValid = luhn.validate(cleanedNumber);

      return {
        valid: isValid,
        message: isValid ? 'Luhn check passed' : 'Luhn check failed'
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Luhn validation error',
        error: error.message
      };
    }
  }

  validateExpiryDate(month, year) {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      // Check if card is expired
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return {
          valid: false,
          message: 'Card has expired',
          expired: true
        };
      }

      // Check if expiry is too far in the future (more than 10 years)
      if (year > currentYear + 10) {
        return {
          valid: false,
          message: 'Expiry date too far in the future',
          expired: false
        };
      }

      return {
        valid: true,
        message: 'Expiry date is valid',
        expired: false,
        monthsUntilExpiry: (year - currentYear) * 12 + (month - currentMonth)
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Expiry date validation error',
        error: error.message
      };
    }
  }

  validateCVV(cvv, cardType) {
    if (!cvv) {
      return {
        valid: false,
        message: 'CVV is required'
      };
    }

    const cvvString = cvv.toString();
    
    // American Express uses 4-digit CVV, others use 3-digit
    const expectedLength = (cardType === 'american-express' || cardType === 'amex') ? 4 : 3;
    
    if (cvvString.length !== expectedLength) {
      return {
        valid: false,
        message: `CVV must be ${expectedLength} digits for ${cardType} cards`
      };
    }

    if (!/^\d+$/.test(cvvString)) {
      return {
        valid: false,
        message: 'CVV must contain only digits'
      };
    }

    return {
      valid: true,
      message: 'CVV format is valid',
      length: cvvString.length
    };
  }

  validateAmount(amount, currency) {
    const errors = [];

    if (amount === undefined || amount === null) {
      errors.push('Amount is required');
    } else {
      if (typeof amount !== 'number' || isNaN(amount)) {
        errors.push('Amount must be a valid number');
      } else {
        if (amount <= 0) {
          errors.push('Amount must be greater than zero');
        }
        if (amount > 999999.99) {
          errors.push('Amount exceeds maximum limit');
        }
      }
    }

    if (!currency || typeof currency !== 'string') {
      errors.push('Currency is required');
    } else {
      // Basic currency code validation (ISO 4217)
      if (!/^[A-Z]{3}$/.test(currency)) {
        errors.push('Currency must be a valid 3-letter code');
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
      formattedAmount: amount ? `${amount.toFixed(2)} ${currency}` : null
    };
  }

  validateBillingAddress(address) {
    const errors = [];
    const requiredFields = ['street', 'city', 'postalCode', 'country'];

    requiredFields.forEach(field => {
      if (!address[field] || typeof address[field] !== 'string' || address[field].trim().length === 0) {
        errors.push(`${field} is required`);
      }
    });

    // Postal code format validation (basic)
    if (address.postalCode && address.country) {
      const postalCodeRegex = this.getPostalCodeRegex(address.country);
      if (postalCodeRegex && !postalCodeRegex.test(address.postalCode)) {
        errors.push('Invalid postal code format for country');
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
      completeness: ((requiredFields.length - errors.length) / requiredFields.length) * 100
    };
  }

  getPostalCodeRegex(country) {
    const patterns = {
      'US': /^\d{5}(-\d{4})?$/,
      'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
      'UK': /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
      'DE': /^\d{5}$/,
      'FR': /^\d{5}$/,
      'AU': /^\d{4}$/
    };

    return patterns[country.toUpperCase()];
  }

  calculateRiskScore(validationResult) {
    let score = 0;
    const checks = validationResult.validationChecks;

    // Basic format validation (critical)
    if (!checks.basicFormat?.valid) score += 50;

    // Luhn algorithm (critical)
    if (!checks.luhnCheck?.valid) score += 40;

    // Expiry date (high importance)
    if (!checks.expiryDate?.valid) score += 30;

    // CVV validation (medium importance)
    if (!checks.cvv?.valid) score += 20;

    // Amount validation (medium importance)
    if (!checks.amount?.valid) score += 15;

    // Billing address (low importance)
    if (checks.billingAddress && !checks.billingAddress.valid) score += 10;

    // Fraud detection (very high importance)
    if (checks.fraudDetection?.riskLevel === 'HIGH') score += 60;
    else if (checks.fraudDetection?.riskLevel === 'MEDIUM') score += 30;

    // Card-specific risk factors
    if (validationResult.cardDetails?.prepaid) score += 15;
    if (validationResult.cardDetails?.country && 
        ['XX', 'UNKNOWN'].includes(validationResult.cardDetails.country)) score += 20;

    // Additional risk factors
    score += validationResult.riskFactors.length * 5;

    // Determine risk level
    let level;
    if (score >= 70) level = 'HIGH';
    else if (score >= 40) level = 'MEDIUM';
    else if (score >= 20) level = 'LOW';
    else level = 'VERY_LOW';

    return { score, level };
  }

  generateRecommendations(validationResult) {
    const recommendations = [];
    const checks = validationResult.validationChecks;

    if (!checks.basicFormat?.valid) {
      recommendations.push({
        type: 'REJECT',
        priority: 'HIGH',
        message: 'Reject transaction due to invalid card format'
      });
    }

    if (!checks.luhnCheck?.valid) {
      recommendations.push({
        type: 'REJECT',
        priority: 'HIGH',
        message: 'Reject transaction due to invalid card number'
      });
    }

    if (checks.expiryDate?.expired) {
      recommendations.push({
        type: 'REJECT',
        priority: 'HIGH',
        message: 'Reject transaction due to expired card'
      });
    }

    if (checks.fraudDetection?.riskLevel === 'HIGH') {
      recommendations.push({
        type: 'MANUAL_REVIEW',
        priority: 'HIGH',
        message: 'Flag for manual review due to high fraud risk'
      });
    }

    if (validationResult.overallRisk === 'MEDIUM') {
      recommendations.push({
        type: 'ADDITIONAL_VERIFICATION',
        priority: 'MEDIUM',
        message: 'Request additional verification (3DS, phone verification)'
      });
    }

    if (validationResult.cardDetails?.prepaid) {
      recommendations.push({
        type: 'POLICY_CHECK',
        priority: 'LOW',
        message: 'Verify prepaid card acceptance policy'
      });
    }

    if (recommendations.length === 0 && validationResult.overallRisk === 'VERY_LOW') {
      recommendations.push({
        type: 'APPROVE',
        priority: 'LOW',
        message: 'Transaction appears safe to process'
      });
    }

    return recommendations;
  }

  determineValidationSuccess(validationResult) {
    const criticalChecks = [
      validationResult.validationChecks.basicFormat?.valid,
      validationResult.validationChecks.luhnCheck?.valid,
      validationResult.validationChecks.expiryDate?.valid,
      validationResult.validationChecks.amount?.valid
    ];

    // All critical checks must pass
    const criticalChecksPassed = criticalChecks.every(check => check === true);

    // Overall risk must not be HIGH
    const acceptableRisk = validationResult.overallRisk !== 'HIGH';

    return criticalChecksPassed && acceptableRisk;
  }

  generateValidationId() {
    return `val_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = PaymentValidator;

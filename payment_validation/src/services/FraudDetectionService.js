const axios = require('axios');
const logger = require('../utils/logger');

class FraudDetectionService {
  constructor() {
    this.services = {
      sift: {
        url: process.env.SIFT_API_URL || 'https://api.sift.com/v205',
        apiKey: process.env.SIFT_API_KEY,
        accountId: process.env.SIFT_ACCOUNT_ID
      },
      kount: {
        url: process.env.KOUNT_API_URL || 'https://api.kount.com',
        apiKey: process.env.KOUNT_API_KEY,
        merchantId: process.env.KOUNT_MERCHANT_ID
      },
      maxmind: {
        url: process.env.MAXMIND_API_URL || 'https://minfraud.maxmind.com/minfraud/v2.0',
        accountId: process.env.MAXMIND_ACCOUNT_ID,
        licenseKey: process.env.MAXMIND_LICENSE_KEY
      },
      stripe_radar: {
        url: 'https://api.stripe.com/v1',
        apiKey: process.env.STRIPE_SECRET_KEY
      },
      signifyd: {
        url: process.env.SIGNIFYD_API_URL || 'https://api.signifyd.com/v2',
        apiKey: process.env.SIGNIFYD_API_KEY
      }
    };
  }

  async analyzeFraudRisk(paymentData) {
    const {
      cardNumber,
      amount,
      currency,
      billingAddress,
      metadata = {}
    } = paymentData;

    try {
      // Try multiple fraud detection services
      const results = await Promise.allSettled([
        this.checkSiftScience(paymentData),
        this.checkMaxMind(paymentData),
        this.checkKount(paymentData)
      ]);

      // Aggregate results
      const fraudScores = results
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => result.value);

      if (fraudScores.length === 0) {
        return {
          riskLevel: 'UNKNOWN',
          score: 50,
          reason: 'No fraud detection services available',
          details: {},
          recommendations: ['Manual review recommended']
        };
      }

      // Calculate weighted average risk score
      const avgScore = fraudScores.reduce((sum, score) => sum + score.score, 0) / fraudScores.length;
      
      return {
        riskLevel: this.calculateRiskLevel(avgScore),
        score: Math.round(avgScore),
        reason: this.generateRiskReason(fraudScores),
        details: {
          serviceResults: fraudScores,
          factors: this.extractRiskFactors(fraudScores)
        },
        recommendations: this.generateRecommendations(avgScore, fraudScores)
      };

    } catch (error) {
      logger.error('Fraud detection analysis failed', {
        error: error.message,
        cardLast4: cardNumber ? cardNumber.slice(-4) : 'unknown'
      });

      return {
        riskLevel: 'UNKNOWN',
        score: 50,
        reason: 'Fraud detection service error',
        error: error.message,
        recommendations: ['Manual review required due to service error']
      };
    }
  }

  async checkSiftScience(paymentData) {
    if (!this.services.sift.apiKey) {
      throw new Error('Sift Science API key not configured');
    }

    try {
      const payload = {
        $type: '$transaction',
        $api_key: this.services.sift.apiKey,
        $user_id: paymentData.metadata?.userId || 'anonymous',
        $transaction_id: paymentData.metadata?.transactionId || `txn_${Date.now()}`,
        $amount: Math.round(paymentData.amount * 100), // Convert to cents
        $currency_code: paymentData.currency,
        $billing_address: paymentData.billingAddress ? {
          $name: paymentData.holderName,
          $address_1: paymentData.billingAddress.street,
          $city: paymentData.billingAddress.city,
          $region: paymentData.billingAddress.state,
          $country: paymentData.billingAddress.country,
          $zipcode: paymentData.billingAddress.postalCode
        } : undefined,
        $payment_method: {
          $payment_type: '$credit_card',
          $payment_gateway: '$stripe',
          $card_bin: paymentData.cardNumber.substring(0, 6),
          $card_last4: paymentData.cardNumber.slice(-4)
        }
      };

      const response = await axios.post(`${this.services.sift.url}/events`, payload, {
        timeout: 10000
      });

      // Get risk score
      const scoreResponse = await axios.get(
        `${this.services.sift.url}/v205/users/${payload.$user_id}/score`,
        {
          params: { api_key: this.services.sift.apiKey },
          timeout: 10000
        }
      );

      const score = scoreResponse.data.score * 100; // Convert to 0-100 scale

      return {
        service: 'sift',
        score: score,
        riskLevel: score > 70 ? 'HIGH' : score > 40 ? 'MEDIUM' : 'LOW',
        details: {
          siftScore: scoreResponse.data.score,
          reasons: scoreResponse.data.reasons || []
        }
      };

    } catch (error) {
      logger.warn('Sift Science fraud check failed', { error: error.message });
      throw error;
    }
  }

  async checkMaxMind(paymentData) {
    if (!this.services.maxmind.licenseKey) {
      throw new Error('MaxMind license key not configured');
    }

    try {
      const payload = {
        account: {
          user_id: paymentData.metadata?.userId || 'anonymous'
        },
        event: {
          transaction_id: paymentData.metadata?.transactionId || `txn_${Date.now()}`,
          shop_id: paymentData.metadata?.shopId || 'default',
          time: new Date().toISOString(),
          type: 'purchase'
        },
        payment: {
          processor: 'stripe',
          was_authorized: false,
          decline_code: null
        },
        credit_card: {
          issuer_id_number: paymentData.cardNumber.substring(0, 6),
          last_four_digits: paymentData.cardNumber.slice(-4),
          token: `token_${paymentData.cardNumber.slice(-4)}_${Date.now()}`
        },
        order: {
          amount: paymentData.amount,
          currency: paymentData.currency,
          discount_code: paymentData.metadata?.discountCode,
          is_gift: false,
          has_gift_message: false
        }
      };

      if (paymentData.billingAddress) {
        payload.billing = {
          first_name: paymentData.holderName?.split(' ')[0],
          last_name: paymentData.holderName?.split(' ').slice(1).join(' '),
          company: paymentData.billingAddress.company,
          address: paymentData.billingAddress.street,
          address_2: paymentData.billingAddress.address2,
          city: paymentData.billingAddress.city,
          region: paymentData.billingAddress.state,
          country: paymentData.billingAddress.country,
          postal: paymentData.billingAddress.postalCode,
          phone_number: paymentData.billingAddress.phone
        };
      }

      const auth = Buffer.from(`${this.services.maxmind.accountId}:${this.services.maxmind.licenseKey}`).toString('base64');

      const response = await axios.post(`${this.services.maxmind.url}/score`, payload, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });

      const riskScore = response.data.risk_score * 100; // Convert to 0-100 scale

      return {
        service: 'maxmind',
        score: riskScore,
        riskLevel: riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW',
        details: {
          riskScore: response.data.risk_score,
          subscores: response.data.subscores,
          riskReasons: response.data.risk_reasons || [],
          warnings: response.data.warnings || []
        }
      };

    } catch (error) {
      logger.warn('MaxMind fraud check failed', { error: error.message });
      throw error;
    }
  }

  async checkKount(paymentData) {
    if (!this.services.kount.apiKey) {
      throw new Error('Kount API key not configured');
    }

    try {
      // Kount RIS (Risk Inquiry Service) request
      const payload = {
        VERS: '0700',
        MODE: 'Q', // Query mode
        PTYP: 'CARD',
        MERC: this.services.kount.merchantId || 'DEFAULT',
        SESS: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ORDR: paymentData.metadata?.orderId || `order_${Date.now()}`,
        AUTO: 'Y',
        TOTL: Math.round(paymentData.amount * 100), // Convert to cents
        CURR: paymentData.currency,
        PTOK: this.hashCardNumber(paymentData.cardNumber), // Hashed card token
        LAST4: paymentData.cardNumber.slice(-4)
      };

      if (paymentData.billingAddress) {
        payload.B2A1 = paymentData.billingAddress.street;
        payload.B2CI = paymentData.billingAddress.city;
        payload.B2ST = paymentData.billingAddress.state;
        payload.B2PC = paymentData.billingAddress.postalCode;
        payload.B2CC = paymentData.billingAddress.country;
      }

      const response = await axios.post(`${this.services.kount.url}/risk-inquiry`, payload, {
        headers: {
          'Authorization': `Bearer ${this.services.kount.apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      });

      const kountData = this.parseKountResponse(response.data);
      const riskScore = this.convertKountScore(kountData.SCOR);

      return {
        service: 'kount',
        score: riskScore,
        riskLevel: kountData.AUTO === 'D' ? 'HIGH' : kountData.AUTO === 'R' ? 'MEDIUM' : 'LOW',
        details: {
          kountScore: kountData.SCOR,
          decision: kountData.AUTO,
          rules: kountData.RULES || [],
          geox: kountData.GEOX,
          kapt: kountData.KAPT
        }
      };

    } catch (error) {
      logger.warn('Kount fraud check failed', { error: error.message });
      throw error;
    }
  }

  calculateRiskLevel(score) {
    if (score >= 75) return 'HIGH';
    if (score >= 50) return 'MEDIUM';
    if (score >= 25) return 'LOW';
    return 'VERY_LOW';
  }

  generateRiskReason(fraudScores) {
    const highRiskServices = fraudScores.filter(s => s.riskLevel === 'HIGH');
    const mediumRiskServices = fraudScores.filter(s => s.riskLevel === 'MEDIUM');

    if (highRiskServices.length > 0) {
      return `High fraud risk detected by ${highRiskServices.map(s => s.service).join(', ')}`;
    }

    if (mediumRiskServices.length > 0) {
      return `Medium fraud risk detected by ${mediumRiskServices.map(s => s.service).join(', ')}`;
    }

    return 'Low fraud risk across all services';
  }

  extractRiskFactors(fraudScores) {
    const factors = [];

    fraudScores.forEach(result => {
      if (result.details) {
        if (result.details.reasons) {
          factors.push(...result.details.reasons);
        }
        if (result.details.riskReasons) {
          factors.push(...result.details.riskReasons);
        }
        if (result.details.rules) {
          factors.push(...result.details.rules);
        }
      }
    });

    return [...new Set(factors)]; // Remove duplicates
  }

  generateRecommendations(avgScore, fraudScores) {
    const recommendations = [];

    if (avgScore >= 75) {
      recommendations.push('REJECT transaction - High fraud risk');
      recommendations.push('Block card/user for manual review');
    } else if (avgScore >= 50) {
      recommendations.push('MANUAL REVIEW required');
      recommendations.push('Request additional verification (3DS, phone)');
      recommendations.push('Monitor for suspicious patterns');
    } else if (avgScore >= 25) {
      recommendations.push('PROCEED with enhanced monitoring');
      recommendations.push('Consider step-up authentication');
    } else {
      recommendations.push('APPROVE - Low fraud risk');
    }

    // Service-specific recommendations
    const highRiskServices = fraudScores.filter(s => s.riskLevel === 'HIGH');
    if (highRiskServices.length > 1) {
      recommendations.push('Multiple services flagged - Consider permanent block');
    }

    return recommendations;
  }

  hashCardNumber(cardNumber) {
    // Simple hash for demo - in production use proper encryption
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(cardNumber).digest('hex').substring(0, 16);
  }

  parseKountResponse(responseData) {
    // Parse Kount key-value response format
    const data = {};
    const pairs = responseData.split('\n');
    
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        data[key] = value;
      }
    });

    return data;
  }

  convertKountScore(kountScore) {
    // Convert Kount score (0-100) to our standard scale
    return parseInt(kountScore) || 50;
  }

  // Health check for fraud detection services
  async checkServiceHealth() {
    const healthStatus = {};

    for (const [serviceName, service] of Object.entries(this.services)) {
      try {
        if (!service.apiKey && !service.licenseKey) {
          healthStatus[serviceName] = {
            status: 'not_configured',
            message: 'API key not configured'
          };
          continue;
        }

        // Simple health check - this would be service-specific in production
        healthStatus[serviceName] = {
          status: 'configured',
          message: 'API key configured',
          lastCheck: new Date().toISOString()
        };

      } catch (error) {
        healthStatus[serviceName] = {
          status: 'error',
          error: error.message,
          lastCheck: new Date().toISOString()
        };
      }
    }

    return healthStatus;
  }
}

module.exports = FraudDetectionService;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../utils/logger');
const cache = require('../utils/cache');

class CardAuthorizationService {
  constructor() {
    this.verificationAmount = parseInt(process.env.CARD_VERIFICATION_AMOUNT) || 100; // $1.00 in cents
    this.currency = process.env.CARD_VERIFICATION_CURRENCY || 'usd';
    this.autoRefund = process.env.AUTO_REFUND_ENABLED === 'true';
    this.timeout = parseInt(process.env.AUTHORIZATION_TIMEOUT) || 300000; // 5 minutes
    this.description = process.env.AUTHORIZATION_DESCRIPTION || 'Card Verification - OneLast AI';
    
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is required for card authorization');
    }
  }

  /**
   * Authorize a card by charging a small amount and optionally refunding it
   * @param {Object} cardData - Card information
   * @returns {Object} Authorization result
   */
  async authorizeCard(cardData) {
    const authId = this.generateAuthId();
    const startTime = Date.now();

    try {
      const {
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        holderName,
        billingAddress,
        metadata = {}
      } = cardData;

      logger.info('Starting card authorization', {
        authId,
        cardLast4: cardNumber ? cardNumber.slice(-4) : 'unknown',
        amount: this.verificationAmount
      });

      // Step 1: Create Payment Method
      const paymentMethod = await this.createPaymentMethod({
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        holderName,
        billingAddress
      });

      // Step 2: Create Payment Intent
      const paymentIntent = await this.createPaymentIntent({
        paymentMethodId: paymentMethod.id,
        amount: this.verificationAmount,
        currency: this.currency,
        metadata: {
          ...metadata,
          authId,
          purpose: 'card_verification',
          timestamp: new Date().toISOString()
        }
      });

      // Step 3: Confirm Payment Intent
      const confirmedPayment = await this.confirmPaymentIntent(paymentIntent.id);

      // Step 4: Handle the result
      const result = await this.processAuthorizationResult({
        authId,
        paymentIntent: confirmedPayment,
        paymentMethod,
        startTime,
        cardData
      });

      // Step 5: Auto-refund if enabled and successful
      if (this.autoRefund && result.success && result.chargeId) {
        setTimeout(async () => {
          try {
            await this.refundAuthorization(result.chargeId, authId);
          } catch (refundError) {
            logger.error('Auto-refund failed', {
              authId,
              chargeId: result.chargeId,
              error: refundError.message
            });
          }
        }, 5000); // Wait 5 seconds before refunding
      }

      return result;

    } catch (error) {
      logger.error('Card authorization failed', {
        authId,
        error: error.message,
        code: error.code,
        type: error.type
      });

      return {
        success: false,
        authId,
        error: this.formatStripeError(error),
        processingTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      };
    }
  }

  async createPaymentMethod(cardData) {
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      billingAddress
    } = cardData;

    const paymentMethodData = {
      type: 'card',
      card: {
        number: cardNumber.replace(/\s/g, ''),
        exp_month: parseInt(expiryMonth),
        exp_year: parseInt(expiryYear),
        cvc: cvv
      }
    };

    // Add billing details if provided
    if (holderName || billingAddress) {
      paymentMethodData.billing_details = {};
      
      if (holderName) {
        paymentMethodData.billing_details.name = holderName;
      }

      if (billingAddress) {
        paymentMethodData.billing_details.address = {
          line1: billingAddress.street,
          line2: billingAddress.address2,
          city: billingAddress.city,
          state: billingAddress.state,
          postal_code: billingAddress.postalCode,
          country: billingAddress.country
        };

        if (billingAddress.phone) {
          paymentMethodData.billing_details.phone = billingAddress.phone;
        }
      }
    }

    return await stripe.paymentMethods.create(paymentMethodData);
  }

  async createPaymentIntent(data) {
    const { paymentMethodId, amount, currency, metadata } = data;

    return await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: false,
      description: this.description,
      metadata: metadata,
      capture_method: 'automatic', // Immediate capture for verification
      setup_future_usage: 'off_session' // Allow saving for future use
    });
  }

  async confirmPaymentIntent(paymentIntentId) {
    return await stripe.paymentIntents.confirm(paymentIntentId, {
      return_url: process.env.FRONTEND_URL || 'https://onelast.ai/payment-return'
    });
  }

  async processAuthorizationResult(data) {
    const { authId, paymentIntent, paymentMethod, startTime, cardData } = data;

    const result = {
      success: false,
      authId,
      paymentIntentId: paymentIntent.id,
      paymentMethodId: paymentMethod.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      processingTime: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };

    // Analyze the payment result
    switch (paymentIntent.status) {
      case 'succeeded':
        result.success = true;
        result.message = 'Card authorization successful';
        result.chargeId = paymentIntent.charges.data[0]?.id;
        
        // Extract card details from successful payment
        if (paymentIntent.charges.data[0]) {
          const charge = paymentIntent.charges.data[0];
          result.cardDetails = {
            last4: charge.payment_method_details.card.last4,
            brand: charge.payment_method_details.card.brand,
            funding: charge.payment_method_details.card.funding,
            country: charge.payment_method_details.card.country,
            checks: charge.payment_method_details.card.checks
          };
        }
        break;

      case 'requires_action':
        result.success = false;
        result.message = 'Card requires additional authentication (3DS)';
        result.nextAction = paymentIntent.next_action;
        result.clientSecret = paymentIntent.client_secret;
        break;

      case 'requires_payment_method':
        result.success = false;
        result.message = 'Payment method was declined';
        result.lastPaymentError = paymentIntent.last_payment_error;
        break;

      case 'canceled':
        result.success = false;
        result.message = 'Payment was canceled';
        break;

      default:
        result.success = false;
        result.message = `Unexpected payment status: ${paymentIntent.status}`;
    }

    // Add risk assessment
    result.riskAssessment = this.assessAuthorizationRisk(paymentIntent, paymentMethod);

    // Cache successful authorizations
    if (result.success) {
      const cacheKey = `auth_${cardData.cardNumber?.slice(-4)}_${authId}`;
      cache.set(cacheKey, result, 3600); // Cache for 1 hour
    }

    return result;
  }

  async refundAuthorization(chargeId, authId) {
    try {
      logger.info('Processing auto-refund', { chargeId, authId });

      const refund = await stripe.refunds.create({
        charge: chargeId,
        reason: 'requested_by_customer',
        metadata: {
          authId,
          purpose: 'card_verification_refund',
          timestamp: new Date().toISOString()
        }
      });

      logger.info('Auto-refund successful', {
        authId,
        chargeId,
        refundId: refund.id,
        amount: refund.amount,
        status: refund.status
      });

      return {
        success: true,
        refundId: refund.id,
        amount: refund.amount,
        status: refund.status,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error('Refund failed', {
        authId,
        chargeId,
        error: error.message,
        code: error.code
      });

      throw error;
    }
  }

  /**
   * Get refund status for an authorization
   */
  async getRefundStatus(chargeId) {
    try {
      const charge = await stripe.charges.retrieve(chargeId);
      
      if (charge.refunded) {
        const refunds = await stripe.refunds.list({
          charge: chargeId,
          limit: 10
        });

        return {
          refunded: true,
          refunds: refunds.data.map(refund => ({
            id: refund.id,
            amount: refund.amount,
            status: refund.status,
            reason: refund.reason,
            created: new Date(refund.created * 1000).toISOString()
          }))
        };
      }

      return {
        refunded: false,
        refundable: charge.amount - charge.amount_refunded > 0,
        amountRefunded: charge.amount_refunded,
        amountRefundable: charge.amount - charge.amount_refunded
      };

    } catch (error) {
      logger.error('Failed to get refund status', {
        chargeId,
        error: error.message
      });

      throw error;
    }
  }

  assessAuthorizationRisk(paymentIntent, paymentMethod) {
    const riskFactors = [];
    let riskScore = 0;

    // Check if payment required additional actions
    if (paymentIntent.status === 'requires_action') {
      riskFactors.push('Required 3D Secure authentication');
      riskScore += 10;
    }

    // Check payment method details
    if (paymentIntent.charges.data[0]) {
      const charge = paymentIntent.charges.data[0];
      const card = charge.payment_method_details.card;

      // Check CVC and postal code verification
      if (card.checks) {
        if (card.checks.cvc_check === 'fail') {
          riskFactors.push('CVC check failed');
          riskScore += 30;
        }
        if (card.checks.address_postal_code_check === 'fail') {
          riskFactors.push('Postal code check failed');
          riskScore += 20;
        }
      }

      // Check card funding type
      if (card.funding === 'prepaid') {
        riskFactors.push('Prepaid card detected');
        riskScore += 15;
      }

      // Check if card country is high-risk (this would be configurable)
      const highRiskCountries = ['XX', 'UNKNOWN'];
      if (highRiskCountries.includes(card.country)) {
        riskFactors.push('High-risk country');
        riskScore += 25;
      }
    }

    // Check for network issues or processing problems
    if (paymentIntent.last_payment_error) {
      riskFactors.push(`Payment error: ${paymentIntent.last_payment_error.code}`);
      riskScore += 20;
    }

    return {
      riskScore,
      riskLevel: riskScore >= 50 ? 'HIGH' : riskScore >= 25 ? 'MEDIUM' : 'LOW',
      riskFactors,
      recommendation: this.getRiskRecommendation(riskScore)
    };
  }

  getRiskRecommendation(riskScore) {
    if (riskScore >= 50) {
      return 'HIGH RISK - Consider rejecting or requiring additional verification';
    } else if (riskScore >= 25) {
      return 'MEDIUM RISK - Monitor closely or request additional verification';
    } else {
      return 'LOW RISK - Safe to proceed with transaction';
    }
  }

  formatStripeError(error) {
    const errorMap = {
      'card_declined': 'Your card was declined',
      'expired_card': 'Your card has expired',
      'incorrect_cvc': 'Your card\'s security code is incorrect',
      'insufficient_funds': 'Your card has insufficient funds',
      'processing_error': 'An error occurred processing your card',
      'rate_limit': 'Too many requests - please try again later'
    };

    return {
      code: error.code,
      type: error.type,
      message: errorMap[error.code] || error.message,
      param: error.param,
      decline_code: error.decline_code
    };
  }

  generateAuthId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `auth_${timestamp}_${random}`;
  }

  /**
   * Get authorization statistics
   */
  async getAuthorizationStats(timeframe = '24h') {
    // This would typically query a database
    // For now, return mock statistics
    return {
      timeframe,
      totalAuthorizations: 0,
      successfulAuthorizations: 0,
      failedAuthorizations: 0,
      successRate: 0,
      totalAmount: 0,
      totalRefunded: 0,
      averageProcessingTime: 0,
      commonDeclineReasons: [],
      riskDistribution: {
        low: 0,
        medium: 0,
        high: 0
      }
    };
  }

  /**
   * Health check for Stripe connection
   */
  async checkStripeHealth() {
    try {
      await stripe.accounts.retrieve();
      return {
        status: 'healthy',
        message: 'Stripe connection successful',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

module.exports = CardAuthorizationService;

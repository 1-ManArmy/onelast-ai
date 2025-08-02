# Payment Validation System

A comprehensive payment validation and card authorization system that validates cards by charging $1 and immediately refunding it. This modular system can be easily integrated into multiple platforms.

## 🚀 Features

### 💳 Card Authorization System
- **$1 Charge + Auto Refund**: Validates cards by charging $1 and automatically refunding within seconds
- **Real-time Validation**: Instant card verification using Stripe's payment processing
- **Risk Assessment**: Built-in fraud detection and risk scoring
- **Multiple Card Networks**: Supports Visa, Mastercard, American Express, Discover, JCB, etc.

### 🔍 Payment Validation
- **Comprehensive Validation**: Luhn algorithm, expiry dates, CVV, format validation
- **BIN Lookup**: Card issuer information and country detection
- **Fraud Detection**: Integration with multiple fraud detection services
- **Risk Scoring**: Advanced risk assessment algorithms

### 🛡️ Security Features
- **Rate Limiting**: Prevents abuse and spam requests
- **Encryption**: Secure handling of sensitive card data
- **Audit Logging**: Complete transaction logging and monitoring
- **PCI Compliance Ready**: Designed with PCI DSS compliance in mind

## 📦 Installation

```bash
# Navigate to payment validation folder
cd payment_validation

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

## 🔧 Required API Keys

### Critical (Must Have)
```bash
STRIPE_SECRET_KEY=sk_test_...                    # Stripe secret key
STRIPE_PUBLISHABLE_KEY=pk_test_...               # Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_...                  # Webhook secret
```

### Optional (Enhanced Features)
```bash
BINLIST_API_KEY=your_binlist_api_key             # BIN lookup
SIFT_API_KEY=your_sift_api_key                   # Fraud detection
MAXMIND_LICENSE_KEY=your_maxmind_key             # Fraud scoring
KOUNT_API_KEY=your_kount_api_key                 # Enterprise fraud prevention
```

## 🚀 Quick Start

### 1. Start the Server
```bash
npm start
# or for development
npm run dev
```

### 2. Test with CLI
```bash
npm run validate
```

### 3. API Usage

#### Card Authorization (Charge $1 + Refund)
```bash
curl -X POST http://localhost:3001/api/authorize-card \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4242424242424242",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "cvv": "123",
    "holderName": "John Doe"
  }'
```

#### Payment Validation
```bash
curl -X POST http://localhost:3001/api/validate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4242424242424242",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "cvv": "123",
    "amount": 99.99,
    "currency": "USD"
  }'
```

## 📊 API Endpoints

### Card Authorization
- `POST /api/authorize-card` - Authorize card with $1 charge + refund
- `GET /api/refund-status/:chargeId` - Check refund status
- `POST /api/refund/:chargeId` - Manual refund
- `GET /api/authorization-stats` - Get authorization statistics

### Payment Validation
- `POST /api/validate-payment` - Comprehensive payment validation
- `GET /api/bin-lookup/:bin` - BIN lookup information
- `POST /api/detect-card-type` - Detect card type and brand
- `POST /api/validate-batch` - Batch validation (up to 50 cards)

### System
- `GET /health` - System health check
- `GET /api/stripe-health` - Stripe connection health
- `GET /api/stats` - System statistics

## 🎯 Response Examples

### Successful Card Authorization
```json
{
  "success": true,
  "authId": "auth_1234567890_abc123",
  "paymentIntentId": "pi_1234567890",
  "status": "succeeded",
  "amount": 100,
  "currency": "usd",
  "chargeId": "ch_1234567890",
  "cardDetails": {
    "last4": "4242",
    "brand": "visa",
    "funding": "credit",
    "country": "US"
  },
  "riskAssessment": {
    "riskScore": 10,
    "riskLevel": "LOW",
    "recommendation": "LOW RISK - Safe to proceed with transaction"
  },
  "processingTime": 1245
}
```

### Failed Authorization
```json
{
  "success": false,
  "authId": "auth_1234567890_abc123",
  "error": {
    "code": "card_declined",
    "type": "card_error",
    "message": "Your card was declined"
  },
  "processingTime": 856
}
```

## 🔧 Configuration

### Card Authorization Settings
```bash
CARD_VERIFICATION_AMOUNT=100          # $1.00 in cents
CARD_VERIFICATION_CURRENCY=usd        # Currency code
AUTO_REFUND_ENABLED=true             # Auto-refund after authorization
AUTHORIZATION_TIMEOUT=300000         # 5 minutes timeout
```

### Rate Limiting
```bash
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100          # Max requests per window
```

## 🧪 Testing

### Test Cards (Stripe Test Mode)
```javascript
// Successful cards
"4242424242424242"  // Visa
"5555555555554444"  // Mastercard
"378282246310005"   // American Express

// Declined cards
"4000000000000002"  // Generic decline
"4000000000009995"  // Insufficient funds
"4000000000009987"  // Lost card
```

### CLI Testing
```bash
# Interactive CLI
npm run validate

# Automated tests
node src/cli.js --test
```

## 🚀 Integration Guide

### For Multiple Platforms
This system is designed to be easily integrated into multiple platforms:

```javascript
// Example integration
const PaymentValidator = require('./payment_validation/src/validators/PaymentValidator');
const CardAuthorizationService = require('./payment_validation/src/services/CardAuthorizationService');

// Initialize services
const authService = new CardAuthorizationService();

// Use in your platform
const result = await authService.authorizeCard(cardData);
if (result.success) {
  // Card is valid - proceed with your business logic
  console.log('Card authorized successfully');
} else {
  // Handle authorization failure
  console.log('Card authorization failed:', result.error);
}
```

## 📈 Monitoring & Analytics

### Built-in Metrics
- Authorization success/failure rates
- Processing times
- Risk score distributions
- Common decline reasons
- Geographic patterns

### Logging
- Comprehensive transaction logging
- Error tracking and alerting
- Performance monitoring
- Security event logging

## 🔒 Security Best Practices

1. **Never Log Card Numbers**: System automatically masks sensitive data
2. **Use HTTPS Only**: All API calls must use SSL/TLS
3. **Implement Rate Limiting**: Prevent abuse and brute force attacks
4. **Monitor for Fraud**: Set up alerts for suspicious patterns
5. **Regular Key Rotation**: Rotate API keys regularly
6. **PCI Compliance**: Follow PCI DSS guidelines

## 🚀 Deployment

### Environment Setup
```bash
# Production environment
NODE_ENV=production
PORT=3001

# Use production Stripe keys
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📞 Support

For issues and questions:
1. Check the logs in `logs/` directory
2. Use the health check endpoints
3. Monitor system statistics
4. Review error codes and messages

## 🔄 Updates & Maintenance

- Regular dependency updates
- API key rotation
- Performance monitoring
- Security patches
- Feature enhancements

---

**Built with ❤️ for OneLast AI Platform**

Ready for integration into all 3 upcoming platforms! 🚀

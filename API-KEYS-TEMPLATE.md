# 🔑 OneLast AI API Keys Collection Template

## 📋 **Essential API Keys Required**

### **🔐 Core Authentication & Security**
```bash
# JWT Secret (Generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-here

# Session Secret
SESSION_SECRET=your-session-secret-here
```

### **💳 Payment Processing**
```bash
# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# PayPal (Alternative payment method)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### **🗄️ Database**
```bash
# MongoDB (Required for data storage)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onelastai

# Redis (Optional - for caching)
REDIS_URL=redis://localhost:6379
```

### **🤖 AI Services**
```bash
# OpenAI (Primary AI service)
OPENAI_API_KEY=sk-your-openai-api-key

# Anthropic Claude (Optional)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Google AI (Optional)
GOOGLE_AI_API_KEY=AIzaSy-your-google-ai-key

# Mistral AI (Optional)
MISTRAL_API_KEY=your-mistral-api-key
```

### **📧 Email Services**
```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SendGrid (Alternative)
SENDGRID_API_KEY=SG.your-sendgrid-key
```

### **☁️ AWS Services**
```bash
# AWS Credentials
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# S3 Bucket
AWS_S3_BUCKET=onelastai-storage
```

## 🎯 **Priority Order for Deployment**

### **Phase 1: Minimum Viable Product**
1. ✅ JWT_SECRET
2. ✅ MONGODB_URI  
3. ✅ OPENAI_API_KEY
4. ✅ STRIPE_SECRET_KEY
5. ✅ STRIPE_PUBLISHABLE_KEY

### **Phase 2: Enhanced Features**
6. SMTP configuration
7. Additional AI services (Anthropic, Google AI)
8. PayPal integration
9. AWS services

### **Phase 3: Advanced Features**
10. Analytics and monitoring
11. Additional integrations

## 🔧 **How to Update .env.production**

1. **Edit the file:**
   ```bash
   nano .env.production
   ```

2. **Replace placeholders with real values:**
   - Find: `OPENAI_API_KEY=sk-PLACEHOLDER-REPLACE-WITH-REAL-OPENAI-KEY`
   - Replace with: `OPENAI_API_KEY=sk-your-actual-openai-key`

3. **Verify configuration:**
   ```bash
   ./validate-alignment.sh
   ```

## 🔒 **Security Best Practices**

- ✅ Never commit real API keys to git
- ✅ Use environment variables in production
- ✅ Rotate keys regularly
- ✅ Use least privilege access
- ✅ Monitor API key usage

## 🚀 **Quick Start Command**

Once you have the essential keys:

```bash
# 1. Update environment file
cp .env.production .env
nano .env  # Add your real API keys

# 2. Deploy to production
./deploy-to-ec2.sh

# 3. Verify deployment
./validate-alignment.sh
```

## 📞 **Support Resources**

### **Get API Keys:**
- **OpenAI**: https://platform.openai.com/api-keys
- **Stripe**: https://dashboard.stripe.com/apikeys
- **MongoDB**: https://cloud.mongodb.com/
- **Anthropic**: https://console.anthropic.com/
- **Google AI**: https://console.developers.google.com/

### **Generate Secure Secrets:**
```bash
# Generate JWT Secret
openssl rand -hex 64

# Generate Session Secret  
openssl rand -base64 32
```

## ✅ **Pre-Deployment Checklist**

- [ ] JWT_SECRET configured
- [ ] MongoDB URI tested
- [ ] OpenAI API key validated
- [ ] Stripe keys configured (test mode first)
- [ ] SMTP email working
- [ ] Domain DNS configured
- [ ] EC2 instance ready
- [ ] SSL certificates prepared

**You're ready to deploy OneLast AI! 🎯**

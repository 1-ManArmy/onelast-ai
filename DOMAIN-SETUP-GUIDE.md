# 🌐 OneLast AI Domain Configuration Guide

## 📋 **Domain Setup Checklist**

### **Primary Domain: onelastai.com**

#### **1. AWS EC2 Setup**
```bash
# Your AWS key location
Key: c:/users/HP/Downloads/roombreaker.pem

# Instance requirements
- Ubuntu 22.04 LTS
- Minimum t3.medium (2 vCPU, 4GB RAM)
- Security groups: 80, 443, 22, 3000-3004, 5000
```

#### **2. DNS Configuration**
Set up these DNS records with your domain registrar:

```dns
# A Records (point to your EC2 IP)
onelastai.com           → YOUR_EC2_IP_ADDRESS
www.onelastai.com       → YOUR_EC2_IP_ADDRESS
api.onelastai.com       → YOUR_EC2_IP_ADDRESS
agentx.onelastai.com    → YOUR_EC2_IP_ADDRESS
emo.onelastai.com       → YOUR_EC2_IP_ADDRESS
pdfmind.onelastai.com   → YOUR_EC2_IP_ADDRESS
astrology.onelastai.com → YOUR_EC2_IP_ADDRESS

# CNAME Record (alternative)
*.onelastai.com         → onelastai.com
```

#### **3. SSL Certificate Setup**
```bash
# Let's Encrypt SSL (automated in deployment script)
sudo certbot --nginx -d onelastai.com -d www.onelastai.com \
  -d api.onelastai.com -d agentx.onelastai.com \
  -d emo.onelastai.com -d pdfmind.onelastai.com \
  -d astrology.onelastai.com
```

## 🚀 **Deployment Steps**

### **Step 1: Prepare EC2 Instance**
```bash
# Connect to your EC2 instance
ssh -i "c:/users/HP/Downloads/roombreaker.pem" ubuntu@YOUR_EC2_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install docker-compose-plugin -y

# Install Nginx and Certbot
sudo apt install nginx certbot python3-certbot-nginx -y
```

### **Step 2: Deploy Application**
```bash
# Clone repository
git clone https://github.com/1-ManArmy/onelast-ai.git
cd onelast-ai

# Switch to production branch
git checkout feature/api-configuration

# Copy production environment
cp .env.production .env

# Update with real API keys (you're collecting these)
nano .env

# Run deployment script
chmod +x deploy-to-ec2.sh
./deploy-to-ec2.sh
```

### **Step 3: Configure Domain**
```bash
# Copy Nginx configuration
sudo cp nginx-production.conf /etc/nginx/sites-available/onelastai.com
sudo ln -s /etc/nginx/sites-available/onelastai.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Setup SSL certificates
sudo certbot --nginx -d onelastai.com -d www.onelastai.com \
  -d api.onelastai.com -d agentx.onelastai.com \
  -d emo.onelastai.com -d pdfmind.onelastai.com \
  -d astrology.onelastai.com
```

## 📊 **Service Architecture**

### **Port Mapping**
```
Main Domain (onelastai.com)        → Port 3000 (Frontend)
API (api.onelastai.com)           → Port 5000 (Backend)
AgentX (agentx.onelastai.com)     → Port 3001
Emo AI (emo.onelastai.com)        → Port 3002  
PDFMind (pdfmind.onelastai.com)   → Port 3003
Astrology (astrology.onelastai.com) → Port 3004
Payment Service                    → Port 4000 (Internal)
```

### **Docker Services**
- All services run in Docker containers
- Nginx reverse proxy handles SSL and routing
- MongoDB for data persistence
- Redis for caching

## 🔑 **API Keys Required**

Based on your `.env.production`, you need to collect:

### **Essential Services**
- ✅ OpenAI API Key (`OPENAI_API_KEY`)
- ✅ Stripe Keys (`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`)
- ✅ JWT Secret (generate secure random string)
- ✅ MongoDB URI (MongoDB Atlas or local)

### **Optional Services**
- Google AI API Key
- Anthropic API Key  
- Mistral API Key
- PayPal credentials
- Firebase credentials

## 🔄 **Quick Start Command**

Once you have your EC2 instance ready:

```bash
# Single command deployment
curl -fsSL https://raw.githubusercontent.com/1-ManArmy/onelast-ai/feature/api-configuration/deploy-to-ec2.sh | bash
```

## 📞 **Support & Validation**

After deployment, validate everything works:
```bash
# Run validation script
./validate-alignment.sh

# Check all services
curl https://onelastai.com          # Frontend
curl https://api.onelastai.com/health  # API health
curl https://agentx.onelastai.com   # AgentX subdomain
```

## 🎯 **Expected Results**

- ✅ All subdomains accessible with SSL
- ✅ Frontend loads correctly
- ✅ API endpoints respond
- ✅ Payment system functional
- ✅ All services containerized and running

**Your OneLast AI platform will be live and ready for users! 🚀**

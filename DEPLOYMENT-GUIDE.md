# 🚀 ONELAST-AI EC2 DEPLOYMENT GUIDE

## Quick Setup Instructions

### 1. Prerequisites
- Ensure your `roombreaker.pem` key file is in the project root
- Make sure your EC2 instance is running (3.27.217.30)
- Verify security groups allow SSH (22), HTTP (80), and HTTPS (443)

### 2. Before Deployment - SECURITY CHECKLIST ⚠️

**CRITICAL**: Update these values in `.env.production`:
```bash
# Replace ALL placeholder values:
JWT_SECRET=your-ultra-secure-256-bit-jwt-secret-key-for-production-2025
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onelast-ai-prod
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DOMAIN_NAME=yourdomain.com

# And all other API keys and secrets!
```

### 3. Deploy to EC2
```bash
# Make script executable (already done)
chmod +x deploy-to-ec2.sh

# Deploy to production
./deploy-to-ec2.sh production
```

### 4. Post-Deployment Steps

#### Configure Domain & SSL
```bash
# SSH to your server
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com

# Setup SSL certificate (replace yourdomain.com)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

#### Monitor Application
```bash
# Check application status
docker-compose ps

# View logs
docker-compose logs -f

# Monitor system resources
htop
```

## 🔮 Futuristic Features Included

### AI & Machine Learning
- Multi-provider AI integration (OpenAI, Anthropic, Google, Mistral)
- Custom model training pipeline
- Edge computing support
- Predictive auto-scaling

### Security & Compliance
- Advanced rate limiting
- DDoS protection
- GDPR/CCPA compliance ready
- End-to-end encryption

### Performance & Scalability
- Redis caching layer
- CDN integration
- Load balancing ready
- Auto-scaling configuration

### Monitoring & Analytics
- Comprehensive logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Real-time analytics

### Communication
- Multi-channel notifications (Email, SMS, Push)
- WebSocket real-time features
- Voice AI integration
- Internationalization support

### Future-Ready Features
- Blockchain integration hooks
- IoT device support
- AR/VR compatibility
- Quantum computing readiness
- Metaverse API integration

## 🛠️ Useful Commands

### Application Management
```bash
# Restart services
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && docker-compose restart'

# Update application
./deploy-to-ec2.sh production

# View real-time logs
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && docker-compose logs -f'

# Scale services
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && docker-compose up -d --scale backend=3'
```

### System Monitoring
```bash
# Check system resources
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'htop'

# Check disk usage
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'df -h'

# Check service status
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'systemctl status nginx docker'
```

### Database Management
```bash
# Access MongoDB
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && docker-compose exec mongodb mongo'

# Backup database
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && docker-compose exec mongodb mongodump --out /backup'
```

## 🌍 DNS Configuration

Point your domain to your EC2 instance:
```
A Record: yourdomain.com → 3.27.217.30
A Record: www.yourdomain.com → 3.27.217.30
A Record: api.yourdomain.com → 3.27.217.30
```

## 🔐 Security Recommendations

1. **Change default passwords** in all services
2. **Enable fail2ban** for intrusion prevention
3. **Configure firewall** (UFW) to only allow necessary ports
4. **Set up automated backups** to S3
5. **Enable CloudWatch monitoring**
6. **Configure log rotation** to prevent disk space issues
7. **Set up monitoring alerts** for system health

## 📊 Performance Optimization

1. **Enable Redis caching** for improved performance
2. **Configure CDN** (CloudFront) for static assets
3. **Set up load balancing** for high availability
4. **Enable auto-scaling** based on CPU/memory usage
5. **Optimize database** indexes and queries

## 🚨 Emergency Procedures

### Quick Rollback
```bash
# If deployment fails, rollback to previous version
ssh -i "roombreaker.pem" ubuntu@ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com 'cd /home/ubuntu/onelast-ai && git checkout previous-working-commit && docker-compose up -d --build'
```

### Emergency Contacts & Resources
- AWS Support: [AWS Console](https://console.aws.amazon.com)
- Domain Provider: Update DNS if needed
- Monitoring Alerts: Check Sentry/New Relic dashboards
- Backup Recovery: Restore from S3 backups if configured

---

**Remember**: Always test changes in a staging environment before deploying to production!

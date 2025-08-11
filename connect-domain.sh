#!/bin/bash

# 🌐 OneLast AI Domain Connection Script
# This script helps set up domain configuration for production deployment

echo "🚀 OneLast AI Domain Connection Helper"
echo "======================================"
echo ""

# Check if running on EC2
echo "📍 Checking environment..."
if curl -s --max-time 2 http://169.254.169.254/latest/meta-data/instance-id > /dev/null 2>&1; then
    INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
    PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
    echo "✅ Running on EC2 Instance: $INSTANCE_ID"
    echo "✅ Public IP: $PUBLIC_IP"
else
    echo "⚠️  Not running on EC2 - local development mode"
    PUBLIC_IP="YOUR_EC2_IP_ADDRESS"
fi

echo ""
echo "🌐 Domain Configuration Required:"
echo "=================================="
echo ""
echo "Set up these DNS A records with your domain registrar:"
echo ""
echo "onelastai.com           → $PUBLIC_IP"
echo "www.onelastai.com       → $PUBLIC_IP"
echo "api.onelastai.com       → $PUBLIC_IP"
echo "agentx.onelastai.com    → $PUBLIC_IP"
echo "emo.onelastai.com       → $PUBLIC_IP"
echo "pdfmind.onelastai.com   → $PUBLIC_IP"
echo "astrology.onelastai.com → $PUBLIC_IP"
echo ""

# Check if domains are configured
echo "🔍 Checking domain resolution..."
echo "================================="

domains=(
    "onelastai.com"
    "www.onelastai.com"
    "api.onelastai.com"
    "agentx.onelastai.com"
    "emo.onelastai.com"
    "pdfmind.onelastai.com"
    "astrology.onelastai.com"
)

for domain in "${domains[@]}"; do
    echo -n "Checking $domain... "
    if resolved_ip=$(nslookup "$domain" 2>/dev/null | awk '/^Address: / { print $2 }' | tail -1); then
        if [ "$resolved_ip" = "$PUBLIC_IP" ]; then
            echo "✅ Configured correctly"
        else
            echo "❌ Points to $resolved_ip (should be $PUBLIC_IP)"
        fi
    else
        echo "❌ Not configured"
    fi
done

echo ""
echo "🔧 Next Steps:"
echo "=============="
echo ""
echo "1. Configure DNS records with your domain registrar"
echo "2. Wait for DNS propagation (up to 24 hours)"
echo "3. Run deployment script: ./deploy-to-ec2.sh"
echo "4. Set up SSL certificates with Let's Encrypt"
echo ""

# Offer to run deployment if on EC2
if [ "$INSTANCE_ID" != "" ]; then
    echo "🚀 Ready to deploy? (y/n)"
    read -r response
    if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
        echo "Starting deployment..."
        if [ -f "./deploy-to-ec2.sh" ]; then
            chmod +x ./deploy-to-ec2.sh
            ./deploy-to-ec2.sh
        else
            echo "❌ Deploy script not found. Please ensure you're in the project directory."
        fi
    fi
fi

echo ""
echo "📚 For detailed instructions, see: DOMAIN-SETUP-GUIDE.md"
echo "🌟 Good luck with your OneLast AI deployment! 🎯"

#!/bin/bash

# =============================================================================
# ONELAST-AI EC2 DEPLOYMENT SCRIPT
# =============================================================================
# This script automates the deployment process to your EC2 instance
# Usage: ./deploy-to-ec2.sh [environment]
# Example: ./deploy-to-ec2.sh production

set -e  # Exit on any error

# =============================================================================
# CONFIGURATION
# =============================================================================
EC2_HOST="ec2-3-27-217-30.ap-southeast-2.compute.amazonaws.com"
EC2_USER="ubuntu"
KEY_FILE="roombreaker.pem"
PROJECT_NAME="onelast-ai"
REMOTE_DIR="/home/ubuntu/onelast-ai"
ENVIRONMENT=${1:-production}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if key file exists
    if [ ! -f "$KEY_FILE" ]; then
        log_error "SSH key file '$KEY_FILE' not found!"
        exit 1
    fi
    
    # Check key file permissions
    PERMS=$(stat -c "%a" "$KEY_FILE" 2>/dev/null || stat -f "%A" "$KEY_FILE" 2>/dev/null)
    if [ "$PERMS" != "400" ]; then
        log_warning "SSH key permissions are $PERMS, setting to 400..."
        chmod 400 "$KEY_FILE"
    fi
    
    # Check if docker is installed locally
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed locally!"
        exit 1
    fi
    
    log_success "Prerequisites check passed!"
}

test_ssh_connection() {
    log_info "Testing SSH connection to EC2 instance..."
    
    if ssh -i "$KEY_FILE" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" "echo 'SSH connection successful'" > /dev/null 2>&1; then
        log_success "SSH connection successful!"
    else
        log_error "Cannot connect to EC2 instance. Please check:"
        echo "  1. EC2 instance is running"
        echo "  2. Security group allows SSH (port 22)"
        echo "  3. SSH key is correct"
        echo "  4. Internet connectivity"
        exit 1
    fi
}

prepare_deployment_package() {
    log_info "Preparing deployment package..."
    
    # Create deployment directory
    mkdir -p deploy-package
    
    # Copy essential files
    cp -r backend/ deploy-package/
    cp -r frontend/ deploy-package/
    cp -r azure/ deploy-package/
    cp docker-compose.yml deploy-package/
    cp .env.production deploy-package/.env
    
    # Create deployment info
    cat > deploy-package/deployment-info.json << EOF
{
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "environment": "$ENVIRONMENT",
    "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
    "git_branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
    "deployer": "$(whoami)",
    "version": "1.0.0"
}
EOF
    
    log_success "Deployment package prepared!"
}

upload_to_ec2() {
    log_info "Uploading files to EC2 instance..."
    
    # Create remote directory
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" "mkdir -p $REMOTE_DIR"
    
    # Upload files using rsync for efficiency
    rsync -avz --delete -e "ssh -i $KEY_FILE" \
        deploy-package/ \
        "$EC2_USER@$EC2_HOST:$REMOTE_DIR/"
    
    log_success "Files uploaded successfully!"
}

setup_ec2_environment() {
    log_info "Setting up EC2 environment..."
    
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
        # Update system
        sudo apt-get update
        
        # Install Docker if not present
        if ! command -v docker &> /dev/null; then
            echo "Installing Docker..."
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker ubuntu
            sudo systemctl enable docker
            sudo systemctl start docker
        fi
        
        # Install Docker Compose if not present
        if ! command -v docker-compose &> /dev/null; then
            echo "Installing Docker Compose..."
            sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        fi
        
        # Install Node.js and npm if not present
        if ! command -v node &> /dev/null; then
            echo "Installing Node.js..."
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
        
        # Install PM2 for process management
        if ! command -v pm2 &> /dev/null; then
            echo "Installing PM2..."
            sudo npm install -g pm2
        fi
        
        # Install Nginx for reverse proxy
        if ! command -v nginx &> /dev/null; then
            echo "Installing Nginx..."
            sudo apt-get install -y nginx
        fi
        
        # Install fail2ban for security
        if ! command -v fail2ban-server &> /dev/null; then
            echo "Installing fail2ban..."
            sudo apt-get install -y fail2ban
        fi
        
        echo "EC2 environment setup completed!"
ENDSSH
    
    log_success "EC2 environment setup completed!"
}

deploy_application() {
    log_info "Deploying application..."
    
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << ENDSSH
        cd $REMOTE_DIR
        
        # Stop existing containers
        if [ -f docker-compose.yml ]; then
            docker-compose down
        fi
        
        # Build and start containers
        docker-compose up -d --build
        
        # Wait for services to start
        sleep 30
        
        # Check if services are running
        docker-compose ps
        
        # Show logs
        docker-compose logs --tail=50
ENDSSH
    
    log_success "Application deployed successfully!"
}

configure_nginx() {
    log_info "Configuring Nginx reverse proxy..."
    
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
        # Create Nginx configuration
        sudo tee /etc/nginx/sites-available/onelast-ai << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF
        
        # Enable the site
        sudo ln -sf /etc/nginx/sites-available/onelast-ai /etc/nginx/sites-enabled/
        sudo rm -f /etc/nginx/sites-enabled/default
        
        # Test and reload Nginx
        sudo nginx -t
        sudo systemctl reload nginx
        sudo systemctl enable nginx
ENDSSH
    
    log_success "Nginx configured successfully!"
}

setup_ssl() {
    log_info "Setting up SSL with Let's Encrypt..."
    
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
        # Install certbot
        if ! command -v certbot &> /dev/null; then
            sudo apt-get install -y certbot python3-certbot-nginx
        fi
        
        echo "SSL setup ready. To complete SSL setup, run on the server:"
        echo "sudo certbot --nginx -d onelastai.com -d www.onelastai.com -d api.onelastai.com -d agentx.onelastai.com -d emo.onelastai.com -d pdfmind.onelastai.com -d astrology.onelastai.com"
ENDSSH
    
    log_success "SSL setup prepared!"
}

setup_monitoring() {
    log_info "Setting up monitoring and logging..."
    
    ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
        cd $REMOTE_DIR
        
        # Create monitoring script
        cat > monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script
echo "$(date): System Status Check" >> /var/log/onelast-ai-monitor.log
docker-compose ps >> /var/log/onelast-ai-monitor.log
df -h >> /var/log/onelast-ai-monitor.log
free -h >> /var/log/onelast-ai-monitor.log
echo "---" >> /var/log/onelast-ai-monitor.log
EOF
        
        chmod +x monitor.sh
        
        # Add to crontab (runs every 5 minutes)
        (crontab -l 2>/dev/null; echo "*/5 * * * * $REMOTE_DIR/monitor.sh") | crontab -
        
        # Setup log rotation
        sudo tee /etc/logrotate.d/onelast-ai << 'EOF'
/var/log/onelast-ai-*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    sharedscripts
}
EOF
        
        echo "Monitoring setup completed!"
ENDSSH
    
    log_success "Monitoring setup completed!"
}

cleanup() {
    log_info "Cleaning up local deployment files..."
    rm -rf deploy-package
    log_success "Cleanup completed!"
}

perform_health_check() {
    log_info "Performing health check..."
    
    # Wait a bit for services to fully start
    sleep 10
    
    # Check if the application is responding
    if curl -f "http://$EC2_HOST/health" > /dev/null 2>&1; then
        log_success "Application is responding to health checks!"
    else
        log_warning "Health check failed. Please check the application logs."
    fi
    
    # Display useful information
    echo ""
    echo "==============================================================================" 
    echo "DEPLOYMENT SUMMARY"
    echo "=============================================================================="
    echo "Application URL: http://$EC2_HOST"
    echo "API Endpoint: http://$EC2_HOST/api"
    echo "SSH Access: ssh -i $KEY_FILE $EC2_USER@$EC2_HOST"
    echo "Remote Directory: $REMOTE_DIR"
    echo ""
    echo "Useful Commands:"
    echo "  View logs: ssh -i $KEY_FILE $EC2_USER@$EC2_HOST 'cd $REMOTE_DIR && docker-compose logs'"
    echo "  Restart: ssh -i $KEY_FILE $EC2_USER@$EC2_HOST 'cd $REMOTE_DIR && docker-compose restart'"
    echo "  Update: ./deploy-to-ec2.sh $ENVIRONMENT"
    echo "=============================================================================="
}

# =============================================================================
# MAIN DEPLOYMENT PROCESS
# =============================================================================
main() {
    echo "==============================================================================" 
    echo "ONELAST-AI DEPLOYMENT TO EC2"
    echo "Environment: $ENVIRONMENT"
    echo "Target: $EC2_HOST"
    echo "=============================================================================="
    
    check_prerequisites
    test_ssh_connection
    prepare_deployment_package
    upload_to_ec2
    setup_ec2_environment
    deploy_application
    configure_nginx
    setup_ssl
    setup_monitoring
    perform_health_check
    cleanup
    
    log_success "🚀 Deployment completed successfully!"
}

# Run main function
main "$@"

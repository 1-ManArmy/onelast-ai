const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const axios = require('axios');

// Network Intelligence Tools
const netTools = {
  // Mock Nmap-like port scanning
  portScan: async (target, ports = '1-1000') => {
    // Simulate port scanning results
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995];
    const openPorts = commonPorts
      .filter(() => Math.random() > 0.7)
      .map(port => ({
        port,
        state: 'open',
        service: getServiceName(port),
        version: getServiceVersion(port)
      }));
    
    return {
      target,
      scannedPorts: ports,
      openPorts,
      scanTime: '3.2s',
      timestamp: new Date().toISOString()
    };
  },

  // IP Geolocation and Analysis
  ipAnalysis: async (ip) => {
    try {
      // Simulate IP info (in production, use real APIs)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        ip,
        country: 'United States',
        region: 'California',
        city: 'San Francisco',
        org: 'Example ISP',
        asn: 'AS12345',
        timezone: 'America/Los_Angeles',
        coordinates: {
          lat: 37.7749,
          lon: -122.4194
        },
        security: {
          isVpn: Math.random() > 0.8,
          isTor: Math.random() > 0.95,
          isProxy: Math.random() > 0.9,
          threatLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        }
      };
    } catch (error) {
      throw new Error('IP analysis failed');
    }
  },

  // Network Security Assessment
  securityScan: async (target) => {
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const vulnerabilities = [
      { id: 'CVE-2023-1234', severity: 'high', description: 'SSL/TLS vulnerability detected' },
      { id: 'CVE-2023-5678', severity: 'medium', description: 'Outdated software version' },
      { id: 'CVE-2023-9012', severity: 'low', description: 'Information disclosure' }
    ].filter(() => Math.random() > 0.6);
    
    return {
      target,
      vulnerabilities,
      riskScore: Math.floor(Math.random() * 100),
      recommendations: [
        'Update SSL/TLS certificates',
        'Close unnecessary ports',
        'Enable firewall protection',
        'Update software versions'
      ]
    };
  }
};

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
  const now = Date.now();
  const userKey = req.user.userId;
  
  if (!global.netIntelRateLimits) global.netIntelRateLimits = {};
  if (!global.netIntelRateLimits[userKey]) global.netIntelRateLimits[userKey] = [];
  
  // Clean old requests (1 hour window)
  global.netIntelRateLimits[userKey] = global.netIntelRateLimits[userKey].filter(
    time => now - time < 3600000
  );
  
  if (global.netIntelRateLimits[userKey].length >= 50) {
    return res.status(429).json({ error: 'NetIntel rate limit exceeded - too many scans' });
  }
  
  global.netIntelRateLimits[userKey].push(now);
  next();
};

// @route   POST /api/ai/netintel/portscan
// @desc    Perform port scan on target
// @access  Private
router.post('/portscan', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { target, ports = '1-1000', scanType = 'tcp' } = req.body;
    
    if (!target) {
      return res.status(400).json({ error: 'Target IP or domain is required' });
    }

    // Validate target (basic validation)
    if (!isValidTarget(target)) {
      return res.status(400).json({ error: 'Invalid target format' });
    }

    console.log(`🕵️ Starting port scan on ${target}...`);
    
    const scanResults = await netTools.portScan(target, ports);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.netintel.portScans': 1,
        'aiUsage.netintel.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        ...scanResults,
        scanType,
        warning: 'Use responsibly and only on networks you own or have permission to scan'
      }
    });

  } catch (error) {
    console.error('NetIntel port scan error:', error);
    res.status(500).json({ error: 'Port scan failed' });
  }
});

// @route   POST /api/ai/netintel/ipanalysis
// @desc    Analyze IP address for geolocation and security info
// @access  Private
router.post('/ipanalysis', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({ error: 'IP address is required' });
    }

    if (!isValidIP(ip)) {
      return res.status(400).json({ error: 'Invalid IP address format' });
    }

    console.log(`🌍 Analyzing IP: ${ip}...`);
    
    const analysis = await netTools.ipAnalysis(ip);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.netintel.ipAnalyses': 1,
        'aiUsage.netintel.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('NetIntel IP analysis error:', error);
    res.status(500).json({ error: 'IP analysis failed' });
  }
});

// @route   POST /api/ai/netintel/security
// @desc    Perform security assessment on target
// @access  Private
router.post('/security', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { target, scanDepth = 'basic' } = req.body;
    
    if (!target) {
      return res.status(400).json({ error: 'Target is required' });
    }

    console.log(`🔒 Starting security scan on ${target}...`);
    
    const securityResults = await netTools.securityScan(target);
    
    // Update user usage statistics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 
        'aiUsage.netintel.securityScans': 1,
        'aiUsage.netintel.totalUsage': 1
      }
    });

    res.json({
      success: true,
      data: {
        ...securityResults,
        scanDepth,
        disclaimer: 'Security scanning should only be performed on systems you own or have explicit permission to test'
      }
    });

  } catch (error) {
    console.error('NetIntel security scan error:', error);
    res.status(500).json({ error: 'Security scan failed' });
  }
});

// @route   POST /api/ai/netintel/voice-command
// @desc    Process voice command for network operations
// @access  Private
router.post('/voice-command', auth, rateLimitMiddleware, async (req, res) => {
  try {
    const { command, isVoice = true } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'Voice command is required' });
    }

    const lowerCommand = command.toLowerCase();
    let response = '';
    let action = null;
    
    if (lowerCommand.includes('scan') && lowerCommand.includes('port')) {
      response = '🕵️ Starting voice-controlled port scan. Please specify the target IP or domain.';
      action = 'port_scan_ready';
    } else if (lowerCommand.includes('analyze') && lowerCommand.includes('ip')) {
      response = '🌍 Ready to analyze IP address. Please provide the IP you want to investigate.';
      action = 'ip_analysis_ready';
    } else if (lowerCommand.includes('security') && lowerCommand.includes('scan')) {
      response = '🔒 Preparing security assessment. Please specify the target for vulnerability scanning.';
      action = 'security_scan_ready';
    } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = '🕵️ I can perform port scans, IP analysis, and security assessments. Just say "scan ports on [target]" or "analyze IP [address]" or "security scan [target]".';
      action = 'help';
    } else {
      response = '🕵️ NetIntel here! I can help with network scanning, IP analysis, and security assessments. What would you like me to investigate?';
      action = 'general';
    }

    res.json({
      success: true,
      response,
      action,
      voiceEnabled: isVoice,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('NetIntel voice command error:', error);
    res.status(500).json({ error: 'Voice command processing failed' });
  }
});

// @route   GET /api/ai/netintel/stats
// @desc    Get NetIntel usage statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const netIntelStats = user.aiUsage?.netintel || {};
    
    res.json({
      success: true,
      stats: {
        portScans: netIntelStats.portScans || 0,
        ipAnalyses: netIntelStats.ipAnalyses || 0,
        securityScans: netIntelStats.securityScans || 0,
        totalUsage: netIntelStats.totalUsage || 0,
        lastActivity: netIntelStats.lastActivity || null
      }
    });

  } catch (error) {
    console.error('NetIntel stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Helper Functions
function isValidTarget(target) {
  // Basic validation for IP or domain
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  
  return ipRegex.test(target) || domainRegex.test(target);
}

function isValidIP(ip) {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}

function getServiceName(port) {
  const services = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    110: 'POP3',
    143: 'IMAP',
    443: 'HTTPS',
    993: 'IMAPS',
    995: 'POP3S'
  };
  return services[port] || 'Unknown';
}

function getServiceVersion(port) {
  const versions = {
    21: 'vsftpd 3.0.3',
    22: 'OpenSSH 8.2',
    80: 'Apache 2.4.41',
    443: 'Apache 2.4.41',
    25: 'Postfix 3.4.13'
  };
  return versions[port] || 'Unknown';
}

module.exports = router;

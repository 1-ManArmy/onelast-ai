const crypto = require('crypto');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate secure password reset token
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token for storage
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  return {
    resetToken,      // Send this to user
    hashedToken      // Store this in database
  };
};

// Verify reset token
const verifyResetToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

// Generate 2FA secret
const generate2FASecret = (userEmail, serviceName = 'OneLast AI') => {
  const secret = speakeasy.generateSecret({
    name: `${serviceName} (${userEmail})`,
    issuer: serviceName,
    length: 32
  });
  
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url
  };
};

// Generate QR code for 2FA setup
const generateQRCode = async (otpauthUrl) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Verify 2FA token
const verify2FAToken = (token, secret) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 1 // Allow 1 step before/after for clock skew
  });
};

// Generate backup codes for 2FA
const generateBackupCodes = (count = 8) => {
  const codes = [];
  for (let i = 0; i < count; i++) {
    // Generate 8-digit backup code
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(code.substring(0, 4) + '-' + code.substring(4));
  }
  return codes;
};

module.exports = {
  generateResetToken,
  verifyResetToken,
  generate2FASecret,
  generateQRCode,
  verify2FAToken,
  generateBackupCodes
};

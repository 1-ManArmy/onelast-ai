const axios = require('axios');
const logger = require('../utils/logger');
const cache = require('../utils/cache');

class BINLookupService {
  constructor() {
    this.services = {
      binlist: {
        url: 'https://lookup.binlist.net',
        headers: {},
        rateLimit: 100 // requests per day for free tier
      },
      binbase: {
        url: 'https://api.binbase.com/v1',
        headers: {
          'Authorization': `Bearer ${process.env.BINBASE_API_KEY}`
        },
        rateLimit: 1000
      },
      bincodes: {
        url: 'https://api.bincodes.js.org',
        headers: {
          'X-API-Key': process.env.BINCODES_API_KEY
        },
        rateLimit: 500
      }
    };

    this.fallbackData = this.loadFallbackData();
  }

  async lookupBIN(bin) {
    if (!bin || bin.length < 6) {
      throw new Error('BIN must be at least 6 digits');
    }

    const cleanBin = bin.toString().substring(0, 8); // Use up to 8 digits for better accuracy
    const cacheKey = `bin_${cleanBin}`;

    // Check cache first
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      logger.debug('BIN lookup cache hit', { bin: cleanBin });
      return cachedResult;
    }

    // Try multiple services in order of preference
    const services = ['binlist', 'binbase', 'bincodes'];
    let lastError;

    for (const serviceName of services) {
      try {
        const result = await this.queryService(serviceName, cleanBin);
        if (result) {
          // Cache successful result
          cache.set(cacheKey, result, 24 * 60 * 60); // Cache for 24 hours
          logger.info('BIN lookup successful', { service: serviceName, bin: cleanBin });
          return result;
        }
      } catch (error) {
        logger.warn(`BIN lookup failed for service ${serviceName}`, {
          error: error.message,
          bin: cleanBin
        });
        lastError = error;
      }
    }

    // If all services fail, try fallback data
    const fallbackResult = this.getFallbackData(cleanBin);
    if (fallbackResult) {
      logger.info('Using fallback BIN data', { bin: cleanBin });
      return fallbackResult;
    }

    throw new Error(lastError?.message || 'All BIN lookup services failed');
  }

  async queryService(serviceName, bin) {
    const service = this.services[serviceName];
    if (!service) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    const timeout = 5000; // 5 second timeout
    let url, config;

    switch (serviceName) {
      case 'binlist':
        url = `${service.url}/${bin}`;
        config = {
          headers: service.headers,
          timeout
        };
        break;

      case 'binbase':
        if (!process.env.BINBASE_API_KEY) {
          throw new Error('BINBASE_API_KEY not configured');
        }
        url = `${service.url}/bin/${bin}`;
        config = {
          headers: service.headers,
          timeout
        };
        break;

      case 'bincodes':
        url = `${service.url}/bin/${bin}`;
        config = {
          headers: service.headers,
          timeout
        };
        break;

      default:
        throw new Error(`Service ${serviceName} not implemented`);
    }

    const response = await axios.get(url, config);
    return this.normalizeResponse(serviceName, response.data);
  }

  normalizeResponse(serviceName, data) {
    const normalized = {
      bin: data.bin || data.number,
      brand: null,
      type: null,
      level: null,
      bank: null,
      issuer: null,
      country: null,
      countryCode: null,
      currency: null,
      prepaid: false,
      commercial: false,
      service: serviceName,
      confidence: 'medium'
    };

    switch (serviceName) {
      case 'binlist':
        normalized.brand = data.scheme?.toUpperCase();
        normalized.type = data.type?.toLowerCase();
        normalized.level = data.brand;
        normalized.bank = data.bank?.name;
        normalized.issuer = data.bank?.name;
        normalized.country = data.country?.name;
        normalized.countryCode = data.country?.alpha2;
        normalized.currency = data.country?.currency;
        normalized.prepaid = data.prepaid === true;
        break;

      case 'binbase':
        normalized.brand = data.scheme?.toUpperCase();
        normalized.type = data.type?.toLowerCase();
        normalized.level = data.level;
        normalized.bank = data.issuer?.name;
        normalized.issuer = data.issuer?.name;
        normalized.country = data.country?.name;
        normalized.countryCode = data.country?.code;
        normalized.currency = data.country?.currency;
        normalized.prepaid = data.prepaid === true;
        normalized.commercial = data.commercial === true;
        normalized.confidence = 'high';
        break;

      case 'bincodes':
        normalized.brand = data.brand?.toUpperCase();
        normalized.type = data.type?.toLowerCase();
        normalized.level = data.level;
        normalized.bank = data.bank;
        normalized.issuer = data.issuer;
        normalized.country = data.country;
        normalized.countryCode = data.countryCode;
        normalized.currency = data.currency;
        normalized.prepaid = data.prepaid === true;
        break;
    }

    // Standardize brand names
    normalized.brand = this.standardizeBrand(normalized.brand);

    // Add risk indicators
    normalized.riskIndicators = this.calculateRiskIndicators(normalized);

    return normalized;
  }

  standardizeBrand(brand) {
    if (!brand) return 'UNKNOWN';

    const brandMap = {
      'VISA': 'VISA',
      'MASTERCARD': 'MASTERCARD',
      'MASTER': 'MASTERCARD',
      'AMEX': 'AMERICAN_EXPRESS',
      'AMERICAN EXPRESS': 'AMERICAN_EXPRESS',
      'DISCOVER': 'DISCOVER',
      'JCB': 'JCB',
      'DINERS': 'DINERS_CLUB',
      'DINERS CLUB': 'DINERS_CLUB',
      'UNIONPAY': 'UNIONPAY',
      'MAESTRO': 'MAESTRO'
    };

    return brandMap[brand.toUpperCase()] || brand.toUpperCase();
  }

  calculateRiskIndicators(binData) {
    const risks = [];
    let riskScore = 0;

    // Country-based risk
    const highRiskCountries = ['XX', 'UNKNOWN', null];
    if (highRiskCountries.includes(binData.countryCode)) {
      risks.push('Unknown or high-risk country');
      riskScore += 20;
    }

    // Prepaid cards have higher risk
    if (binData.prepaid) {
      risks.push('Prepaid card');
      riskScore += 15;
    }

    // Commercial cards might have different risk profile
    if (binData.commercial) {
      risks.push('Commercial card');
      riskScore += 5;
    }

    // Missing bank information
    if (!binData.bank && !binData.issuer) {
      risks.push('Unknown issuer');
      riskScore += 10;
    }

    return {
      factors: risks,
      score: riskScore,
      level: riskScore >= 30 ? 'HIGH' : riskScore >= 15 ? 'MEDIUM' : 'LOW'
    };
  }

  getFallbackData(bin) {
    const binPrefix = bin.substring(0, 6);
    return this.fallbackData[binPrefix] || this.getFallbackByRange(bin);
  }

  getFallbackByRange(bin) {
    const binNumber = parseInt(bin.substring(0, 6));

    // Basic BIN ranges for major card networks
    const ranges = [
      { min: 400000, max: 499999, brand: 'VISA', type: 'credit' },
      { min: 510000, max: 559999, brand: 'MASTERCARD', type: 'credit' },
      { min: 340000, max: 349999, brand: 'AMERICAN_EXPRESS', type: 'credit' },
      { min: 370000, max: 379999, brand: 'AMERICAN_EXPRESS', type: 'credit' },
      { min: 601100, max: 601199, brand: 'DISCOVER', type: 'credit' },
      { min: 350000, max: 359999, brand: 'JCB', type: 'credit' },
      { min: 300000, max: 305999, brand: 'DINERS_CLUB', type: 'credit' }
    ];

    for (const range of ranges) {
      if (binNumber >= range.min && binNumber <= range.max) {
        return {
          bin: bin.substring(0, 6),
          brand: range.brand,
          type: range.type,
          level: 'UNKNOWN',
          bank: 'UNKNOWN',
          issuer: 'UNKNOWN',
          country: 'UNKNOWN',
          countryCode: 'XX',
          currency: 'UNKNOWN',
          prepaid: false,
          commercial: false,
          service: 'fallback',
          confidence: 'low',
          riskIndicators: {
            factors: ['Fallback data used'],
            score: 25,
            level: 'MEDIUM'
          }
        };
      }
    }

    return null;
  }

  loadFallbackData() {
    // This would typically be loaded from a JSON file or database
    // For now, return some common BIN prefixes
    return {
      '411111': {
        bin: '411111',
        brand: 'VISA',
        type: 'credit',
        level: 'CLASSIC',
        bank: 'TEST BANK',
        issuer: 'TEST BANK',
        country: 'United States',
        countryCode: 'US',
        currency: 'USD',
        prepaid: false,
        commercial: false,
        service: 'fallback',
        confidence: 'high'
      },
      '555555': {
        bin: '555555',
        brand: 'MASTERCARD',
        type: 'credit',
        level: 'WORLD',
        bank: 'TEST BANK',
        issuer: 'TEST BANK',
        country: 'United States',
        countryCode: 'US',
        currency: 'USD',
        prepaid: false,
        commercial: false,
        service: 'fallback',
        confidence: 'high'
      }
    };
  }

  // Method to check service health
  async checkServiceHealth() {
    const healthStatus = {};

    for (const [serviceName, service] of Object.entries(this.services)) {
      try {
        const testBin = '411111'; // Common test BIN
        await this.queryService(serviceName, testBin);
        healthStatus[serviceName] = { status: 'healthy', lastCheck: new Date().toISOString() };
      } catch (error) {
        healthStatus[serviceName] = {
          status: 'unhealthy',
          error: error.message,
          lastCheck: new Date().toISOString()
        };
      }
    }

    return healthStatus;
  }

  // Method to get service statistics
  getServiceStats() {
    return {
      configuredServices: Object.keys(this.services).length,
      cacheStats: cache.getStats(),
      fallbackDataEntries: Object.keys(this.fallbackData).length
    };
  }
}

module.exports = BINLookupService;

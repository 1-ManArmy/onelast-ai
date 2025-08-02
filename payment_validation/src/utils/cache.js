const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: parseInt(process.env.CACHE_TTL_SECONDS) || 3600, // 1 hour default
      maxKeys: parseInt(process.env.CACHE_MAX_KEYS) || 10000,
      checkperiod: 120, // Check for expired keys every 2 minutes
      useClones: false // Better performance, but be careful with object mutations
    });

    // Statistics tracking
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0
    };

    // Bind event listeners
    this.cache.on('set', (key, value) => {
      this.stats.sets++;
    });

    this.cache.on('del', (key, value) => {
      this.stats.deletes++;
    });

    this.cache.on('expired', (key, value) => {
      // Key expired - could log this if needed
    });
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined
   */
  get(key) {
    try {
      const value = this.cache.get(key);
      if (value !== undefined) {
        this.stats.hits++;
        return value;
      } else {
        this.stats.misses++;
        return undefined;
      }
    } catch (error) {
      this.stats.errors++;
      console.error('Cache get error:', error);
      return undefined;
    }
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in seconds (optional)
   * @returns {boolean} Success status
   */
  set(key, value, ttl) {
    try {
      return this.cache.set(key, value, ttl);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * Delete value from cache
   * @param {string} key - Cache key
   * @returns {number} Number of deleted keys
   */
  del(key) {
    try {
      return this.cache.del(key);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache delete error:', error);
      return 0;
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Cache key
   * @returns {boolean} Key exists
   */
  has(key) {
    try {
      return this.cache.has(key);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache has error:', error);
      return false;
    }
  }

  /**
   * Get multiple values
   * @param {string[]} keys - Array of cache keys
   * @returns {Object} Object with key-value pairs
   */
  mget(keys) {
    try {
      const result = this.cache.mget(keys);
      // Update stats
      Object.keys(result).forEach(key => {
        if (result[key] !== undefined) {
          this.stats.hits++;
        } else {
          this.stats.misses++;
        }
      });
      return result;
    } catch (error) {
      this.stats.errors++;
      console.error('Cache mget error:', error);
      return {};
    }
  }

  /**
   * Set multiple values
   * @param {Array} keyValuePairs - Array of {key, val, ttl} objects
   * @returns {boolean} Success status
   */
  mset(keyValuePairs) {
    try {
      return this.cache.mset(keyValuePairs);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache mset error:', error);
      return false;
    }
  }

  /**
   * Get all keys
   * @returns {string[]} Array of all keys
   */
  keys() {
    try {
      return this.cache.keys();
    } catch (error) {
      this.stats.errors++;
      console.error('Cache keys error:', error);
      return [];
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    const cacheStats = this.cache.getStats();
    
    return {
      // Node-cache stats
      keys: cacheStats.keys,
      hits: cacheStats.hits,
      misses: cacheStats.misses,
      ksize: cacheStats.ksize,
      vsize: cacheStats.vsize,
      
      // Our custom stats
      customStats: this.stats,
      
      // Calculated metrics
      hitRate: this.stats.hits + this.stats.misses > 0 ? 
        (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2) : 0,
      
      // Configuration
      config: {
        stdTTL: this.cache.options.stdTTL,
        maxKeys: this.cache.options.maxKeys,
        checkperiod: this.cache.options.checkperiod
      }
    };
  }

  /**
   * Clear all cache
   * @returns {void}
   */
  flushAll() {
    try {
      this.cache.flushAll();
      // Reset stats
      this.stats = {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        errors: 0
      };
    } catch (error) {
      this.stats.errors++;
      console.error('Cache flush error:', error);
    }
  }

  /**
   * Get TTL for a key
   * @param {string} key - Cache key
   * @returns {number} TTL in seconds or 0 if key doesn't exist
   */
  getTtl(key) {
    try {
      return this.cache.getTtl(key);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache getTtl error:', error);
      return 0;
    }
  }

  /**
   * Set TTL for existing key
   * @param {string} key - Cache key
   * @param {number} ttl - New TTL in seconds
   * @returns {boolean} Success status
   */
  ttl(key, ttl) {
    try {
      return this.cache.ttl(key, ttl);
    } catch (error) {
      this.stats.errors++;
      console.error('Cache ttl error:', error);
      return false;
    }
  }

  /**
   * Get or set pattern - get from cache, or set if not exists
   * @param {string} key - Cache key
   * @param {Function} valueFunction - Function to generate value if not in cache
   * @param {number} ttl - TTL in seconds (optional)
   * @returns {Promise<*>} Cached or generated value
   */
  async getOrSet(key, valueFunction, ttl) {
    let value = this.get(key);
    
    if (value !== undefined) {
      return value;
    }

    try {
      value = await valueFunction();
      this.set(key, value, ttl);
      return value;
    } catch (error) {
      this.stats.errors++;
      console.error('Cache getOrSet error:', error);
      throw error;
    }
  }

  /**
   * Create a cache key with prefix
   * @param {string} prefix - Key prefix
   * @param {string|number} identifier - Key identifier
   * @param {string} suffix - Key suffix (optional)
   * @returns {string} Formatted cache key
   */
  createKey(prefix, identifier, suffix = '') {
    const key = `${prefix}_${identifier}`;
    return suffix ? `${key}_${suffix}` : key;
  }

  /**
   * Cache with expiration based on time of day
   * Useful for data that should refresh daily
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} hour - Hour of day (0-23) when cache should expire
   * @returns {boolean} Success status
   */
  setUntilHour(key, value, hour = 0) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(hour, 0, 0, 0);
    
    if (tomorrow <= now) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    
    const ttl = Math.floor((tomorrow - now) / 1000);
    return this.set(key, value, ttl);
  }
}

// Create and export singleton instance
const cacheService = new CacheService();
module.exports = cacheService;

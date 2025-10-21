/* Cache Manager - localStorage with TTL */

class CacheManager {
  constructor(ttlMinutes = 5) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key, value) {
    try {
      const data = {
        value,
        timestamp: Date.now()
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Cache write failed:', e);
      return false;
    }
  }

  get(key) {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;

      const data = JSON.parse(item);
      const isExpired = Date.now() - data.timestamp > this.ttl;

      if (isExpired) {
        this.remove(key);
        return null;
      }

      return data.value;
    } catch (e) {
      console.error('Cache read failed:', e);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(`cache_${key}`);
      return true;
    } catch (e) {
      console.error('Cache remove failed:', e);
      return false;
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Cache clear failed:', e);
      return false;
    }
  }

  isExpired(key) {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return true;

    try {
      const data = JSON.parse(item);
      return Date.now() - data.timestamp > this.ttl;
    } catch {
      return true;
    }
  }
}

window.cacheManager = new CacheManager(5);

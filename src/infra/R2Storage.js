/**
 * R2Storage.js - Layer 3: Infrastructure/Storage
 * Cloudflare R2-compatible storage abstraction
 */

class R2Storage {
  constructor() {
    this.storage = new Map(); // In-memory storage (simulates R2)
    this.metadata = new Map();
    this.initialized = false;
    this.stats = {
      totalObjects: 0,
      totalSize: 0,
      operations: {
        stores: 0,
        retrieves: 0,
        deletes: 0,
        lists: 0
      }
    };
  }

  async initialize() {
    this.initialized = true;
    return {
      success: true,
      message: 'R2Storage initialized',
      provider: 'Cloudflare R2 Compatible'
    };
  }

  async store(key, data, metadata = {}) {
    if (!this.initialized) {
      throw new Error('Storage not initialized');
    }

    const dataString = JSON.stringify(data);
    const size = new Blob([dataString]).size;

    // Store data
    this.storage.set(key, data);
    
    // Store metadata
    this.metadata.set(key, {
      key,
      size,
      created: Date.now(),
      modified: Date.now(),
      contentType: metadata.contentType || 'application/json',
      customMetadata: metadata,
      etag: this.generateETag(dataString)
    });

    // Update stats
    this.stats.totalObjects++;
    this.stats.totalSize += size;
    this.stats.operations.stores++;

    return {
      success: true,
      key,
      size,
      etag: this.metadata.get(key).etag
    };
  }

  async retrieve(key) {
    if (!this.initialized) {
      throw new Error('Storage not initialized');
    }

    this.stats.operations.retrieves++;

    if (!this.storage.has(key)) {
      return null;
    }

    return {
      data: this.storage.get(key),
      metadata: this.metadata.get(key)
    };
  }

  async delete(key) {
    if (!this.initialized) {
      throw new Error('Storage not initialized');
    }

    if (!this.storage.has(key)) {
      return {
        success: false,
        message: 'Object not found'
      };
    }

    const meta = this.metadata.get(key);
    this.stats.totalSize -= meta.size;
    this.stats.totalObjects--;
    this.stats.operations.deletes++;

    this.storage.delete(key);
    this.metadata.delete(key);

    return {
      success: true,
      key
    };
  }

  async list(prefix = '') {
    if (!this.initialized) {
      throw new Error('Storage not initialized');
    }

    this.stats.operations.lists++;

    const results = [];

    for (const [key, meta] of this.metadata) {
      if (key.startsWith(prefix)) {
        results.push({
          key,
          size: meta.size,
          modified: meta.modified,
          etag: meta.etag
        });
      }
    }

    return {
      objects: results,
      count: results.length,
      prefix
    };
  }

  generateETag(data) {
    // Simple ETag generation (in production, use proper hash)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `"${Math.abs(hash).toString(16)}"`;
  }

  async healthCheck() {
    return {
      status: this.initialized ? 'healthy' : 'not_initialized',
      initialized: this.initialized,
      stats: this.getStats()
    };
  }

  getStats() {
    return {
      ...this.stats,
      averageObjectSize: this.stats.totalObjects > 0 
        ? Math.round(this.stats.totalSize / this.stats.totalObjects) 
        : 0
    };
  }

  // Bulk operations
  async bulkStore(items) {
    const results = [];
    
    for (const item of items) {
      const result = await this.store(item.key, item.data, item.metadata);
      results.push(result);
    }

    return {
      success: true,
      count: results.length,
      results
    };
  }

  async bulkDelete(keys) {
    const results = [];
    
    for (const key of keys) {
      const result = await this.delete(key);
      results.push(result);
    }

    return {
      success: true,
      count: results.length,
      results
    };
  }

  // Copy operation
  async copy(sourceKey, destKey) {
    const source = await this.retrieve(sourceKey);
    
    if (!source) {
      return {
        success: false,
        message: 'Source object not found'
      };
    }

    return await this.store(destKey, source.data, source.metadata.customMetadata);
  }

  // Clear all storage (for testing/reset)
  async clear() {
    this.storage.clear();
    this.metadata.clear();
    this.stats = {
      totalObjects: 0,
      totalSize: 0,
      operations: {
        stores: 0,
        retrieves: 0,
        deletes: 0,
        lists: 0
      }
    };

    return {
      success: true,
      message: 'Storage cleared'
    };
  }
}

export default R2Storage;

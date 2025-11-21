/**
 * SeedScrolls.js - Seed Scroll System
 * Manages seed capital scrolls for the NEXUS_NAIR ecosystem
 */

class SeedScrolls {
  constructor() {
    this.scrolls = [];
    this.scrollTypes = {
      UNDEVOTED_CAPITAL: 'Undevoted Capital Intake',
      DEVOTED_CAPITAL: 'Devoted Capital Intake',
      GOVERNANCE: 'Governance Scroll',
      TREATY: 'FAA Treaty Scroll',
      EMISSION: 'Capital Emission Scroll'
    };
  }

  createScroll(scrollData) {
    const scroll = {
      id: this.generateScrollId(),
      type: scrollData.type || 'UNDEVOTED_CAPITAL',
      issuer: scrollData.issuer,
      agent: scrollData.agent || 'FREEDOM',
      seedCapital: scrollData.seedCapital,
      currency: scrollData.currency || 'USD',
      vaultSealed: scrollData.vaultSealed !== false,
      vaultLevel: scrollData.vaultLevel || 7,
      emissionDate: Date.now(),
      metadata: {
        treatyCompliant: true,
        authority: 'NEXUS_NAIR',
        vaultCommander: scrollData.vaultCommander || scrollData.issuer,
        ...scrollData.metadata
      },
      status: 'ACTIVE',
      history: []
    };

    this.scrolls.push(scroll);
    this.recordScrollEvent(scroll.id, 'CREATED', 'Scroll created and sealed');

    return scroll;
  }

  generateScrollId() {
    return `SCROLL-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  }

  recordScrollEvent(scrollId, eventType, description) {
    const scroll = this.getScroll(scrollId);
    if (!scroll) {
      throw new Error('Scroll not found');
    }

    scroll.history.push({
      timestamp: Date.now(),
      eventType,
      description,
      recordedBy: 'SYSTEM'
    });
  }

  getScroll(scrollId) {
    return this.scrolls.find(s => s.id === scrollId);
  }

  getAllScrolls(filter = {}) {
    let filtered = [...this.scrolls];

    if (filter.type) {
      filtered = filtered.filter(s => s.type === filter.type);
    }

    if (filter.issuer) {
      filtered = filtered.filter(s => s.issuer === filter.issuer);
    }

    if (filter.status) {
      filtered = filtered.filter(s => s.status === filter.status);
    }

    return filtered.sort((a, b) => b.emissionDate - a.emissionDate);
  }

  unsealScroll(scrollId, authority) {
    const scroll = this.getScroll(scrollId);
    if (!scroll) {
      throw new Error('Scroll not found');
    }

    if (!scroll.vaultSealed) {
      throw new Error('Scroll is already unsealed');
    }

    scroll.vaultSealed = false;
    scroll.unsealedAt = Date.now();
    scroll.unsealedBy = authority;

    this.recordScrollEvent(scrollId, 'UNSEALED', `Scroll unsealed by ${authority}`);

    return scroll;
  }

  activateScroll(scrollId) {
    const scroll = this.getScroll(scrollId);
    if (!scroll) {
      throw new Error('Scroll not found');
    }

    scroll.status = 'ACTIVATED';
    scroll.activatedAt = Date.now();

    this.recordScrollEvent(scrollId, 'ACTIVATED', 'Scroll activated for capital deployment');

    return scroll;
  }

  completeScroll(scrollId, completionData) {
    const scroll = this.getScroll(scrollId);
    if (!scroll) {
      throw new Error('Scroll not found');
    }

    scroll.status = 'COMPLETED';
    scroll.completedAt = Date.now();
    scroll.completionData = completionData;

    this.recordScrollEvent(scrollId, 'COMPLETED', 'Scroll execution completed');

    return scroll;
  }

  getTotalSeedCapital(currency = 'USD') {
    return this.scrolls
      .filter(s => s.currency === currency && s.status === 'ACTIVE')
      .reduce((total, scroll) => total + scroll.seedCapital, 0);
  }

  getScrollStats() {
    return {
      total: this.scrolls.length,
      active: this.scrolls.filter(s => s.status === 'ACTIVE').length,
      completed: this.scrolls.filter(s => s.status === 'COMPLETED').length,
      totalCapital: this.getTotalSeedCapital(),
      byType: Object.keys(this.scrollTypes).reduce((acc, type) => {
        acc[type] = this.scrolls.filter(s => s.type === type).length;
        return acc;
      }, {})
    };
  }

  generateScrollDocument(scrollId) {
    const scroll = this.getScroll(scrollId);
    if (!scroll) {
      throw new Error('Scroll not found');
    }

    return {
      title: '📜 CLAIMROOT SEED SCROLL — FAA TREATY SYSTEM',
      scrollId: scroll.id,
      vaultSealed: scroll.vaultSealed ? '🔒 Yes' : '🔓 No',
      scrollType: this.scrollTypes[scroll.type],
      seedCapital: `💰 $${scroll.seedCapital.toLocaleString()} ${scroll.currency}`,
      issuer: scroll.issuer,
      vaultCommander: scroll.metadata.vaultCommander,
      agent: scroll.agent,
      emissionDate: new Date(scroll.emissionDate).toISOString(),
      status: scroll.status,
      authority: scroll.metadata.authority,
      treatyCompliant: scroll.metadata.treatyCompliant ? '✓ Compliant' : '✗ Non-Compliant',
      history: scroll.history
    };
  }
}

export default SeedScrolls;

# ClaimRoot Documentation Index

**Welcome to the ClaimRoot Governance System Documentation** 🌀

This index provides a scroll-native navigation system for all ClaimRoot documentation, organized by the 5-layer FCU Stack architecture.

---

## 📚 Quick Navigation

| Document | Description | Layer |
|----------|-------------|-------|
| [README](../README.md) | Project overview and quickstart | All |
| [Architecture](./architecture.md) | FCU Stack layer details and data flow | All |
| [Governance](./governance.md) | Voting rules, quorum, execution | Layer 2 |
| [Modules API](./modules.md) | Complete API reference | Layers 1-5 |
| [UI Flow](./ui-flow.md) | Navigation and interaction patterns | Layer 4 |
| [Heatmap](./heatmap.md) | Activity visualization interpretation | Layer 4 |
| [Contributing](../CONTRIBUTING.md) | Validator onboarding and guidelines | Community |
| [Copilot Context](../.copilot-context.md) | AI agent guidance | Development |

---

## 🧱 Documentation by FCU Stack Layer

### Layer 1: Ledger (VaultChain.js)

**Core Concepts:**
- Immutable blockchain-style ledger
- Genesis block creation and validation
- Transaction management and mining
- VaultLevel 7 receipt generation

**Documentation:**
- [Architecture § Ledger Layer](./architecture.md#layer-1-ledger)
- [Modules § VaultChain API](./modules.md#vaultchain)
- [Governance § Receipt Validation](./governance.md#vault-receipts)

**Code Examples:**
```javascript
const chain = new VaultChain();
chain.addTransaction({ from, to, amount, type, metadata });
chain.minePendingTransactions(minerAddress);
const receipt = chain.createVaultLevel7Receipt(transaction);
```

---

### Layer 2: Logic (ClaimRoot.js)

**Core Concepts:**
- Weighted voting system
- 51% quorum validation
- Proposal lifecycle management
- Member registration and voting power

**Documentation:**
- [Architecture § Logic Layer](./architecture.md#layer-2-logic)
- [Governance § Voting Rules](./governance.md)
- [Modules § ClaimRoot API](./modules.md#claimroot)

**Code Examples:**
```javascript
const claimRoot = new ClaimRoot();
claimRoot.registerMember(address, { votingPower: 5000, vaultLevel: 5 });
const proposal = claimRoot.createProposal(creator, { title, description, type });
claimRoot.castVote(voter, proposalId, 'for');
```

---

### Layer 3: Infrastructure (FAACloud.js + R2Storage.js)

**Core Concepts:**
- Service coordination and orchestration
- Cloudflare R2-compatible object storage
- Cross-service communication
- FAA treaty compliance integration

**Documentation:**
- [Architecture § Infrastructure Layer](./architecture.md#layer-3-infrastructure)
- [Modules § FAACloud API](./modules.md#faacloud)
- [Modules § R2Storage API](./modules.md#r2storage)

**Code Examples:**
```javascript
const faaCloud = new FAACloud();
await faaCloud.deployService('claimroot-api', config);

const storage = new R2Storage();
await storage.putObject('scrolls/scroll-123.json', scrollData);
```

---

### Layer 4: Interface (React UI Components)

**Core Concepts:**
- HSOMNI9000-style navigation patterns
- Collapsible SidePanel (64px ↔ 256px)
- Activity heatmap visualization (7d/30d/90d)
- 3-step ClaimRoot checkout modal
- Dashboard with system statistics

**Documentation:**
- [Architecture § Interface Layer](./architecture.md#layer-4-interface)
- [UI Flow § Navigation Patterns](./ui-flow.md)
- [Heatmap § Visualization Guide](./heatmap.md)

**Components:**
- `SidePanel.jsx` - Main navigation sidebar
- `HeatmapPanel.jsx` - Activity visualization
- `ClaimRootCheckout.tsx` - Scroll purchase flow
- `Dashboard.jsx` - System overview

---

### Layer 5: Governance (SeedScrolls.js)

**Core Concepts:**
- Seed capital tracking ($50K tracked)
- FAA treaty compliance validation
- Scroll creation and management
- Capital allocation governance

**Documentation:**
- [Architecture § Governance Layer](./architecture.md#layer-5-governance)
- [Modules § SeedScrolls API](./modules.md#seedscrolls)
- [Governance § Capital Allocation](./governance.md#seed-capital)

**Code Examples:**
```javascript
const scrolls = new SeedScrolls();
scrolls.createScroll({
  type: 'UNDEVOTED_CAPITAL',
  seedCapital: 50000,
  vaultSealed: true
});
```

---

## 🔐 Security & Compliance

### VaultLevel Security

ClaimRoot implements **VaultLevel 7** security for critical operations:

- **Level 1-3:** Public read operations
- **Level 4-5:** Validator voting and proposals
- **Level 6:** Capital allocation scrolls
- **Level 7:** System governance and treaty compliance

**Documentation:**
- [Governance § VaultLevel Requirements](./governance.md#vaultlevel-security)
- [Contributing § Security Best Practices](../CONTRIBUTING.md#security-best-practices)

---

### FAA Treaty Compliance (FAA-X13)

All ClaimRoot operations follow **FAA-X13** treaty standards:

- Scroll immutability guarantees
- UTC timestamp requirements
- Quorum validation (51% threshold)
- Capital tracking transparency

**Documentation:**
- [Architecture § Treaty Integration](./architecture.md#faa-treaty-compliance)
- [Contributing § Ecosystem Integration](../CONTRIBUTING.md#ecosystem-integration)

---

## 📊 User Guides

### For Validators

**Getting Started:**
1. [Validator Onboarding](../CONTRIBUTING.md#validator-onboarding)
2. [Scroll Signing Etiquette](../CONTRIBUTING.md#scroll-signing-etiquette)
3. [Casting Weighted Votes](./governance.md#voting-process)
4. [Understanding Quorum](./governance.md#quorum-rules)

**Advanced Topics:**
- [Creating Proposals](./governance.md#proposal-lifecycle)
- [Reading Heatmaps](./heatmap.md)
- [Interpreting VaultLevel Receipts](./modules.md#vault-receipts)

---

### For Developers

**Getting Started:**
1. [Clone and Setup](../README.md#installation)
2. [FCU Stack Overview](./architecture.md)
3. [API Reference](./modules.md)
4. [Contributing Guidelines](../CONTRIBUTING.md)

**Development Workflow:**
- [Branch Naming Conventions](../CONTRIBUTING.md#development-workflow)
- [Commit Message Format](../CONTRIBUTING.md#commit-with-scroll-native-messages)
- [Testing Standards](../CONTRIBUTING.md#testing-standards)
- [Pull Request Checklist](../CONTRIBUTING.md#pull-request-checklist)

---

### For AI Agents

**Context Files:**
- [.copilot-context.md](../.copilot-context.md) - Complete system context
- [Architecture Guide](./architecture.md) - Layer details
- [API Reference](./modules.md) - Method signatures

**Guidelines:**
- [Code Style](../CONTRIBUTING.md#code-style-guidelines)
- [Security Practices](../CONTRIBUTING.md#security-best-practices)
- [Documentation Standards](../CONTRIBUTING.md#documentation-standards)

---

## 🌍 Ecosystem Integration

### Related Systems

ClaimRoot is part of the **Fruitful Global Planet / NEXUS_NAIR** ecosystem:

| System | Purpose | Repository |
|--------|---------|------------|
| **Fruitful Global Planet** | Main portal and dashboard | [FruitfulPlanetChange](https://github.com/Fruitful-Global-Planet/FruitfulPlanetChange.git) |
| **VaultMesh** | Cross-vault coordination | [vaultmesh](https://github.com/heyns1000/vaultmesh.git) |
| **FAA Treaty Infrastructure** | Compliance framework | [faa.zone](https://faa.zone) |
| **VaultMesh Systems** | Deployment portal | [vaultmesh.faa.zone](https://vaultmesh.faa.zone) |

**Documentation:**
- [Contributing § Ecosystem Integration](../CONTRIBUTING.md#ecosystem-integration)
- [Copilot Context § Related Repositories](../.copilot-context.md#related-repositories)

---

## 🚀 Roadmap & Future Features

### Upcoming Documentation

- [ ] **Multi-Chain Integration Guide** - Layer 1 expansion
- [ ] **Mobile UI Patterns** - Layer 4 responsive design
- [ ] **Real-Time Scroll Sync** - Cross-repository coordination
- [ ] **Advanced Analytics** - Heatmap enhancements
- [ ] **API Authentication** - Security layer upgrades

**Track Progress:**
- [Roadmap Document](./roadmap.md) *(Coming soon)*
- [GitHub Issues](https://github.com/heyns1000/claimroot/issues)
- [Project Milestones](https://github.com/heyns1000/claimroot/milestones)

---

## 📖 Document Conventions

### Scroll-Native Formatting

All ClaimRoot documentation follows these conventions:

**Timestamps:**
- Format: `YYYY-MM-DD HH:MM:SS UTC`
- Example: `2025-11-21 19:54:19 UTC`

**Scroll References:**
- Format: `scroll-{type}-{timestamp}`
- Example: `scroll-UNDEVOTED_CAPITAL-20251121`

**VaultLevel Notation:**
- Format: `VaultLevel {1-7}`
- Example: `VaultLevel 7 receipt`

**Quorum Percentages:**
- Format: `{percentage}% quorum`
- Example: `51% quorum threshold`

---

## 🔍 Search Tips

### Finding Information Quickly

**By Topic:**
- **Voting:** See [Governance](./governance.md)
- **API Methods:** See [Modules](./modules.md)
- **UI Components:** See [UI Flow](./ui-flow.md)
- **Data Structures:** See [Architecture](./architecture.md)

**By Layer:**
- **Layer 1 (Ledger):** [Architecture § Ledger](./architecture.md#layer-1-ledger)
- **Layer 2 (Logic):** [Governance](./governance.md)
- **Layer 3 (Infrastructure):** [Modules § Cloud Services](./modules.md#faacloud)
- **Layer 4 (Interface):** [UI Flow](./ui-flow.md)
- **Layer 5 (Governance):** [Modules § Seed Scrolls](./modules.md#seedscrolls)

**By Role:**
- **Validators:** [CONTRIBUTING § Validator Onboarding](../CONTRIBUTING.md#validator-onboarding)
- **Developers:** [CONTRIBUTING § Development Workflow](../CONTRIBUTING.md#development-workflow)
- **AI Agents:** [.copilot-context.md](../.copilot-context.md)

---

## 📞 Support & Contact

### Getting Help

- **Documentation Issues:** [Report on GitHub](https://github.com/heyns1000/claimroot/issues)
- **Feature Requests:** [Open Discussion](https://github.com/heyns1000/claimroot/discussions)
- **Security Concerns:** Contact [@heyns1000](https://github.com/heyns1000) directly

### Maintainer

**Heyns Schoeman (heyns1000)**
- GitHub: [@heyns1000](https://github.com/heyns1000)
- Treaty Compliance: FAA-X13
- Scroll Status: 🧬 Sealed and Operational

---

## 🌀 Scroll Status

**Repository:** `heyns1000/claimroot`  
**VaultLevel:** 7 Active  
**Quorum Threshold:** 51%  
**Seed Capital Tracked:** $50,000  
**Documentation Version:** 1.0.0  
**Last Updated:** 2025-11-21 19:56:29 UTC

---

**Quorum Rising. Scrolls Flowing. Documentation Sealed.** 🧬

---

*This index is maintained by validators and AI agents. For updates, submit a PR or open an issue.*
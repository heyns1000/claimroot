# 🏗️ ClaimRoot Architecture

## 5-Layer FCU Stack

ClaimRoot implements a comprehensive 5-layer Full-stack Computation Unit (FCU) Stack architecture, designed for scalability, security, and maintainability.

## Layer Overview

```
┌─────────────────────────────────────────┐
│   Layer 5: Governance                   │
│   Rules, Policies, Compliance           │
├─────────────────────────────────────────┤
│   Layer 4: Interface                    │
│   React UI, Components, Views           │
├─────────────────────────────────────────┤
│   Layer 3: Infrastructure               │
│   FAACloud, R2Storage, Services         │
├─────────────────────────────────────────┤
│   Layer 2: Logic                        │
│   ClaimRoot Engine, Business Logic      │
├─────────────────────────────────────────┤
│   Layer 1: Ledger                       │
│   VaultChain, Transactions, Receipts    │
└─────────────────────────────────────────┘
```

## Layer 1: Ledger

**Purpose:** Immutable data storage and transaction management

### VaultChain.js

The foundational blockchain-inspired ledger system that ensures data integrity and immutability.

**Key Features:**
- Genesis block initialization
- Block creation and chaining
- Transaction management
- VaultLevel 7 receipt generation
- Chain validation
- Transaction history tracking
- Balance management

**Data Structure:**
```javascript
{
  index: Number,
  timestamp: Number,
  transactions: Array,
  previousHash: String,
  hash: String,
  vaultLevel: Number,
  metadata: Object
}
```

**VaultLevel 7 Receipt:**
```javascript
{
  receiptId: String,
  vaultLevel: 7,
  levelName: 'NEXUS_SOVEREIGN',
  transaction: Object,
  blockHeight: Number,
  timestamp: Number,
  verified: Boolean,
  signature: String,
  metadata: Object
}
```

## Layer 2: Logic

**Purpose:** Business logic and governance rules

### ClaimRoot.js

The core governance engine that manages voting, proposals, and member participation.

**Key Features:**
- Member registration and management
- Proposal creation and lifecycle
- Weighted voting system
- Quorum calculation
- Proposal execution
- Governance statistics

**Governance Rules:**
```javascript
{
  quorumPercentage: 51,      // Minimum voting participation
  votingPeriodHours: 168,    // 7 days
  proposalThreshold: 1000,   // Min voting power to create
  executionDelay: 24         // Hours after passing
}
```

**Proposal Lifecycle:**
1. ACTIVE - Open for voting
2. ENDED - Voting period closed
3. PASSED - Passed quorum and majority
4. REJECTED - Failed to pass
5. FAILED_QUORUM - Insufficient participation
6. EXECUTED - Successfully executed

## Layer 3: Infrastructure

**Purpose:** Cloud services, storage, and infrastructure management

### FAACloud.js

Manages cloud infrastructure and service coordination.

**Key Features:**
- Service registration and discovery
- Data persistence layer
- Backup and recovery
- Health monitoring
- Compliance reporting
- Analytics and metrics

**Services:**
- Ledger Service (VaultChain)
- Governance Service (ClaimRoot)
- Storage Service (R2)

### R2Storage.js

Cloudflare R2-compatible storage abstraction for data persistence.

**Key Features:**
- Object storage (store/retrieve/delete)
- Metadata management
- Bulk operations
- ETag generation
- Statistics tracking
- Health monitoring

## Layer 4: Interface

**Purpose:** User interface and user experience

### React Components

Built with React 18 and Tailwind CSS for a modern, responsive UI.

**Core Components:**

#### SidePanel.jsx
HSOMNI9000-style navigation panel with:
- Collapsible sidebar
- Icon-based navigation
- Active state indication
- Vault status display

#### Dashboard.jsx
System overview with:
- Statistics cards
- System status
- Quick actions
- Governance rules display

#### HeatmapPanel.jsx
Activity visualization with:
- Time-based heatmap
- Intensity color coding
- Statistics summary
- Recent activity list

#### ClaimRootCheckout.tsx
Secure checkout flow with:
- Multi-step wizard (Review → Authorization → Confirmation)
- VaultLevel 7 security
- Authorization verification
- Receipt generation

### Design System

**Color Palette:**
- `vault-gold`: #FFD700 (Premium features)
- `vault-blue`: #1E3A8A (Trust, stability)
- `nexus-purple`: #7C3AED (Governance, power)
- `faa-green`: #10B981 (Success, compliance)

**Typography:**
- Primary Font: Inter
- Fallbacks: system-ui, Avenir, Helvetica, Arial

## Layer 5: Governance

**Purpose:** Governance data, rules, and compliance

### SeedScrolls.js

Manages seed capital scrolls for the NEXUS_NAIR ecosystem.

**Scroll Types:**
- UNDEVOTED_CAPITAL - Unallocated capital intake
- DEVOTED_CAPITAL - Allocated capital intake
- GOVERNANCE - Governance-related scrolls
- TREATY - FAA Treaty scrolls
- EMISSION - Capital emission scrolls

**Scroll Lifecycle:**
1. CREATED - Initial scroll creation
2. ACTIVE - Scroll is active
3. ACTIVATED - Scroll activated for deployment
4. COMPLETED - Scroll execution completed

**Features:**
- Scroll creation and management
- Vault sealing/unsealing
- Event history tracking
- Capital tracking by currency
- Document generation

## Data Flow

### Proposal Creation Flow

```
User Input (Layer 4)
    ↓
ClaimRoot.createProposal() (Layer 2)
    ↓
VaultChain.addTransaction() (Layer 1)
    ↓
FAACloud.persistData() (Layer 3)
    ↓
R2Storage.store() (Layer 3)
```

### Vote Casting Flow

```
User Vote (Layer 4)
    ↓
ClaimRoot.castVote() (Layer 2)
    ↓
VaultChain.addTransaction() (Layer 1)
    ↓
Update UI (Layer 4)
```

### Checkout Flow

```
Action Initiation (Layer 4)
    ↓
ClaimRootCheckout Authorization (Layer 4)
    ↓
VaultChain.createVaultLevel7Receipt() (Layer 1)
    ↓
FAACloud.persistData() (Layer 3)
    ↓
Confirmation Display (Layer 4)
```

## Security Architecture

### VaultLevel System

Seven levels of security clearance:
1. BRONZE - Basic access
2. SILVER - Standard operations
3. GOLD - Elevated privileges
4. PLATINUM - Critical operations
5. DIAMOND - Sensitive data access
6. EMERALD - High-authority actions
7. NEXUS_SOVEREIGN - Maximum security

### FAA Treaty Compliance

All operations are:
- Treaty-compliant by design
- Auditable through VaultChain
- Traceable with receipts
- Verifiable through signatures

## Scalability Considerations

### Horizontal Scaling
- Stateless application design
- Service-oriented architecture
- Cloud-native infrastructure

### Vertical Scaling
- Efficient data structures
- Optimized algorithms
- Lazy loading of data

### Storage Scaling
- R2 object storage (unlimited scale)
- Metadata separation
- Archive strategies

## Development Guidelines

### Layer Separation
- Each layer should only interact with adjacent layers
- No direct Layer 4 → Layer 1 calls
- Use proper abstractions

### Data Consistency
- VaultChain is source of truth
- All state changes recorded on ledger
- Transactional integrity maintained

### Error Handling
- Graceful degradation
- User-friendly error messages
- Comprehensive logging

## Future Enhancements

### Layer 1 (Ledger)
- Cryptographic hashing (SHA-256)
- Digital signatures (ECDSA)
- Merkle trees for efficiency

### Layer 2 (Logic)
- Advanced voting mechanisms (quadratic, delegation)
- Multi-signature proposals
- Time-locked execution

### Layer 3 (Infrastructure)
- Kubernetes deployment
- Multi-region support
- CDN integration

### Layer 4 (Interface)
- Mobile applications
- Progressive Web App (PWA)
- Accessibility improvements

### Layer 5 (Governance)
- AI-powered analytics
- Predictive modeling
- Automated compliance checks

---

This architecture ensures ClaimRoot is secure, scalable, and maintainable for the NEXUS_NAIR ecosystem.
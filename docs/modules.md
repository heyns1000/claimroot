# 📦 Modules Documentation

## Overview

ClaimRoot is organized into modular components across the 5-layer FCU Stack. This document provides detailed API documentation for each module.

---

## Layer 1: Ledger

### VaultChain.js

Blockchain-inspired immutable ledger for the ClaimRoot governance system.

#### Constructor

```javascript
new VaultChain()
```

Creates a new VaultChain instance with a genesis block.

#### Properties

- `chain` (Array): Array of blocks
- `pendingTransactions` (Array): Transactions waiting to be mined
- `vaultLevels` (Object): VaultLevel names (1-7)

#### Methods

##### createGenesisBlock()

```javascript
createGenesisBlock(): void
```

Creates the initial genesis block (Block #0).

##### calculateHash(index, timestamp, transactions, previousHash)

```javascript
calculateHash(
  index: Number,
  timestamp: Number,
  transactions: Array,
  previousHash: String
): String
```

Calculates hash for a block.

**Parameters:**
- `index` - Block index
- `timestamp` - Block creation time
- `transactions` - Array of transactions
- `previousHash` - Hash of previous block

**Returns:** Hash string

##### getLatestBlock()

```javascript
getLatestBlock(): Object
```

Returns the most recent block in the chain.

**Returns:** Block object

##### addTransaction(transaction)

```javascript
addTransaction(transaction: Object): void
```

Adds a transaction to pending transactions.

**Parameters:**
- `transaction.from` (String) - Sender address
- `transaction.to` (String) - Recipient address
- `transaction.amount` (Number) - Transaction amount
- `transaction.type` (String) - Transaction type
- `transaction.metadata` (Object) - Additional data

**Throws:** Error if from/to missing

##### minePendingTransactions(minerAddress)

```javascript
minePendingTransactions(minerAddress: String): Object
```

Mines pending transactions into a new block.

**Parameters:**
- `minerAddress` - Address of the miner

**Returns:** New block object

##### createVaultLevel7Receipt(transaction)

```javascript
createVaultLevel7Receipt(transaction: Object): Object
```

Creates a VaultLevel 7 receipt for a transaction.

**Parameters:**
- `transaction` - Transaction object

**Returns:** Receipt object with VL7 certification

##### getBalance(address)

```javascript
getBalance(address: String): Number
```

Calculates balance for an address.

**Parameters:**
- `address` - Address to check

**Returns:** Balance (Number)

##### isChainValid()

```javascript
isChainValid(): Boolean
```

Validates the entire blockchain.

**Returns:** `true` if valid, `false` otherwise

##### getChainStats()

```javascript
getChainStats(): Object
```

Returns statistics about the chain.

**Returns:**
```javascript
{
  totalBlocks: Number,
  pendingTransactions: Number,
  isValid: Boolean,
  latestBlock: Object,
  genesisBlock: Object
}
```

##### getTransactionHistory(address)

```javascript
getTransactionHistory(address: String): Array
```

Gets all transactions for an address.

**Parameters:**
- `address` - Address to query

**Returns:** Array of transactions

---

## Layer 2: Logic

### ClaimRoot.js

Core governance and voting engine.

#### Constructor

```javascript
new ClaimRoot()
```

Creates a new ClaimRoot governance instance.

#### Properties

- `vaultChain` (VaultChain): Ledger instance
- `proposals` (Array): All proposals
- `votes` (Map): Vote records
- `members` (Map): Registered members
- `governanceRules` (Object): Governance parameters

#### Methods

##### registerMember(address, profile)

```javascript
registerMember(address: String, profile: Object): Object
```

Registers a new governance member.

**Parameters:**
- `address` - Unique member identifier
- `profile` - Member details
  - `name` (String)
  - `role` (String)
  - `votingPower` (Number)
  - `vaultLevel` (Number)

**Returns:** Member object

**Throws:** Error if already registered

##### getMember(address)

```javascript
getMember(address: String): Object | undefined
```

Retrieves member by address.

**Parameters:**
- `address` - Member address

**Returns:** Member object or undefined

##### createProposal(creatorAddress, proposalData)

```javascript
createProposal(
  creatorAddress: String,
  proposalData: Object
): Object
```

Creates a new governance proposal.

**Parameters:**
- `creatorAddress` - Proposal creator
- `proposalData` - Proposal details
  - `title` (String)
  - `description` (String)
  - `type` (String)
  - `metadata` (Object)

**Returns:** Proposal object

**Throws:** Error if insufficient voting power

##### castVote(voterAddress, proposalId, voteType)

```javascript
castVote(
  voterAddress: String,
  proposalId: String,
  voteType: String
): Object
```

Casts a vote on a proposal.

**Parameters:**
- `voterAddress` - Voter's address
- `proposalId` - Target proposal ID
- `voteType` - 'for', 'against', or 'abstain'

**Returns:**
```javascript
{
  success: Boolean,
  proposal: Object,
  vote: Object
}
```

**Throws:** Error if invalid vote or already voted

##### executeProposal(proposalId, executorAddress)

```javascript
executeProposal(
  proposalId: String,
  executorAddress: String
): Object
```

Executes a passed proposal.

**Parameters:**
- `proposalId` - Proposal to execute
- `executorAddress` - Executor's address

**Returns:**
```javascript
{
  proposal: Object,
  receipt: Object
}
```

**Throws:** Error if not passed or delay not elapsed

##### getProposal(proposalId)

```javascript
getProposal(proposalId: String): Object | undefined
```

Retrieves a specific proposal.

**Parameters:**
- `proposalId` - Proposal ID

**Returns:** Proposal object or undefined

##### getAllProposals(filter)

```javascript
getAllProposals(filter: Object): Array
```

Gets all proposals with optional filtering.

**Parameters:**
- `filter` (optional)
  - `status` (String)
  - `creator` (String)

**Returns:** Array of proposals (sorted by date)

##### getGovernanceStats()

```javascript
getGovernanceStats(): Object
```

Returns governance statistics.

**Returns:**
```javascript
{
  totalMembers: Number,
  totalProposals: Number,
  activeProposals: Number,
  passedProposals: Number,
  executedProposals: Number,
  totalVotingPower: Number,
  governanceRules: Object,
  chainStats: Object
}
```

---

## Layer 3: Infrastructure

### FAACloud.js

Cloud infrastructure management and service coordination.

#### Constructor

```javascript
new FAACloud(config: Object)
```

Creates a new FAACloud instance.

**Parameters:**
- `config` (optional)
  - `region` (String)
  - `environment` (String)

#### Methods

##### initialize()

```javascript
async initialize(): Promise<Object>
```

Initializes cloud services.

**Returns:**
```javascript
{
  success: Boolean,
  message: String,
  config: Object
}
```

##### registerService(serviceId, serviceConfig)

```javascript
registerService(serviceId: String, serviceConfig: Object): void
```

Registers a cloud service.

**Parameters:**
- `serviceId` - Unique service identifier
- `serviceConfig` - Service configuration

##### persistData(key, data, options)

```javascript
async persistData(
  key: String,
  data: Any,
  options: Object
): Promise<Object>
```

Stores data in cloud storage.

**Parameters:**
- `key` - Storage key
- `data` - Data to store
- `options` - Storage options

**Returns:** Storage result

##### retrieveData(key)

```javascript
async retrieveData(key: String): Promise<Any>
```

Retrieves data from cloud storage.

**Parameters:**
- `key` - Storage key

**Returns:** Stored data or null

##### healthCheck()

```javascript
async healthCheck(): Promise<Object>
```

Checks health of all services.

**Returns:**
```javascript
{
  status: String,
  timestamp: Number,
  services: Object,
  storage: Object
}
```

### R2Storage.js

Cloudflare R2-compatible object storage.

#### Constructor

```javascript
new R2Storage()
```

Creates a new R2Storage instance.

#### Methods

##### initialize()

```javascript
async initialize(): Promise<Object>
```

Initializes storage system.

**Returns:** Initialization result

##### store(key, data, metadata)

```javascript
async store(
  key: String,
  data: Any,
  metadata: Object
): Promise<Object>
```

Stores an object.

**Parameters:**
- `key` - Object key
- `data` - Data to store
- `metadata` - Object metadata

**Returns:**
```javascript
{
  success: Boolean,
  key: String,
  size: Number,
  etag: String
}
```

##### retrieve(key)

```javascript
async retrieve(key: String): Promise<Object | null>
```

Retrieves an object.

**Parameters:**
- `key` - Object key

**Returns:**
```javascript
{
  data: Any,
  metadata: Object
}
```

##### delete(key)

```javascript
async delete(key: String): Promise<Object>
```

Deletes an object.

**Parameters:**
- `key` - Object key

**Returns:** Deletion result

##### list(prefix)

```javascript
async list(prefix: String): Promise<Object>
```

Lists objects with prefix.

**Parameters:**
- `prefix` - Key prefix filter

**Returns:**
```javascript
{
  objects: Array,
  count: Number,
  prefix: String
}
```

##### getStats()

```javascript
getStats(): Object
```

Returns storage statistics.

**Returns:**
```javascript
{
  totalObjects: Number,
  totalSize: Number,
  operations: Object,
  averageObjectSize: Number
}
```

---

## Layer 5: Governance Data

### SeedScrolls.js

Seed capital scroll management system.

#### Constructor

```javascript
new SeedScrolls()
```

Creates a new SeedScrolls instance.

#### Properties

- `scrolls` (Array): All seed scrolls
- `scrollTypes` (Object): Scroll type definitions

#### Methods

##### createScroll(scrollData)

```javascript
createScroll(scrollData: Object): Object
```

Creates a new seed scroll.

**Parameters:**
- `scrollData`
  - `type` (String)
  - `issuer` (String)
  - `seedCapital` (Number)
  - `currency` (String)
  - `vaultLevel` (Number)
  - `metadata` (Object)

**Returns:** Scroll object

##### getScroll(scrollId)

```javascript
getScroll(scrollId: String): Object | undefined
```

Retrieves a scroll by ID.

**Parameters:**
- `scrollId` - Scroll identifier

**Returns:** Scroll object or undefined

##### getAllScrolls(filter)

```javascript
getAllScrolls(filter: Object): Array
```

Gets all scrolls with optional filtering.

**Parameters:**
- `filter` (optional)
  - `type` (String)
  - `issuer` (String)
  - `status` (String)

**Returns:** Array of scrolls

##### unsealScroll(scrollId, authority)

```javascript
unsealScroll(scrollId: String, authority: String): Object
```

Unseals a vault-sealed scroll.

**Parameters:**
- `scrollId` - Scroll to unseal
- `authority` - Unsealing authority

**Returns:** Updated scroll

**Throws:** Error if not found or already unsealed

##### activateScroll(scrollId)

```javascript
activateScroll(scrollId: String): Object
```

Activates a scroll for capital deployment.

**Parameters:**
- `scrollId` - Scroll to activate

**Returns:** Updated scroll

##### getTotalSeedCapital(currency)

```javascript
getTotalSeedCapital(currency: String): Number
```

Calculates total seed capital in currency.

**Parameters:**
- `currency` - Currency code (default: 'USD')

**Returns:** Total amount

##### getScrollStats()

```javascript
getScrollStats(): Object
```

Returns scroll statistics.

**Returns:**
```javascript
{
  total: Number,
  active: Number,
  completed: Number,
  totalCapital: Number,
  byType: Object
}
```

##### generateScrollDocument(scrollId)

```javascript
generateScrollDocument(scrollId: String): Object
```

Generates formatted scroll document.

**Parameters:**
- `scrollId` - Scroll ID

**Returns:** Formatted scroll document

**Throws:** Error if scroll not found

---

## Usage Examples

### Example 1: Complete Governance Flow

```javascript
import ClaimRoot from './logic/ClaimRoot.js';

// Initialize
const claimRoot = new ClaimRoot();

// Register member
const member = claimRoot.registerMember('USER-001', {
  name: 'Alice',
  role: 'Council Member',
  votingPower: 5000,
  vaultLevel: 5
});

// Create proposal
const proposal = claimRoot.createProposal('USER-001', {
  title: 'Upgrade Infrastructure',
  description: 'Proposal to upgrade cloud infrastructure',
  type: 'TECHNICAL',
  metadata: { priority: 'high' }
});

// Cast vote
const vote = claimRoot.castVote('USER-001', proposal.id, 'for');

// Check stats
const stats = claimRoot.getGovernanceStats();
console.log(stats);
```

### Example 2: Seed Scroll Management

```javascript
import SeedScrolls from './data/SeedScrolls.js';

// Initialize
const scrolls = new SeedScrolls();

// Create scroll
const scroll = scrolls.createScroll({
  type: 'UNDEVOTED_CAPITAL',
  issuer: 'Heyns Schoeman',
  seedCapital: 50000,
  currency: 'USD',
  vaultLevel: 7
});

// Generate document
const doc = scrolls.generateScrollDocument(scroll.id);
console.log(doc);

// Get statistics
const stats = scrolls.getScrollStats();
console.log(stats);
```

### Example 3: Cloud Storage

```javascript
import FAACloud from './infra/FAACloud.js';

// Initialize
const cloud = new FAACloud({
  region: 'us-east-1',
  environment: 'production'
});

await cloud.initialize();

// Store data
await cloud.persistData('proposals/prop-001', {
  title: 'Test Proposal',
  status: 'active'
});

// Retrieve data
const data = await cloud.retrieveData('proposals/prop-001');

// Health check
const health = await cloud.healthCheck();
console.log(health);
```

---

## Type Definitions

### Proposal Object

```typescript
{
  id: string;
  creator: string;
  title: string;
  description: string;
  type: 'GENERAL' | 'CAPITAL' | 'TECHNICAL' | 'EMERGENCY' | 'CONSTITUTIONAL';
  status: 'ACTIVE' | 'ENDED' | 'PASSED' | 'REJECTED' | 'FAILED_QUORUM' | 'EXECUTED';
  createdAt: number;
  votingEndsAt: number;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  voters: Set<string>;
  metadata: object;
}
```

### Member Object

```typescript
{
  address: string;
  name: string;
  role: string;
  votingPower: number;
  registeredAt: number;
  reputation: number;
  vaultLevel: number;
}
```

### Block Object

```typescript
{
  index: number;
  timestamp: number;
  transactions: Array<Transaction>;
  previousHash: string;
  hash: string;
  vaultLevel: number;
  metadata: object;
}
```

---

## Error Handling

All modules throw descriptive errors:

```javascript
try {
  claimRoot.castVote('USER-001', 'PROP-123', 'for');
} catch (error) {
  console.error('Vote failed:', error.message);
  // Handle: 'Member has already voted on this proposal'
}
```

Common error types:
- Missing required parameters
- Insufficient permissions
- Invalid state transitions
- Not found errors
- Validation failures

---

This documentation covers all core modules in the ClaimRoot system. For implementation details, refer to the source code.
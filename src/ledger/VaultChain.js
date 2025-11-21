/**
 * VaultChain.js - Layer 1: Ledger System
 * Blockchain-inspired ledger for ClaimRoot governance
 * Manages VaultLevel 7 receipts and transaction history
 */

class VaultChain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.vaultLevels = {
      1: 'BRONZE',
      2: 'SILVER', 
      3: 'GOLD',
      4: 'PLATINUM',
      5: 'DIAMOND',
      6: 'EMERALD',
      7: 'NEXUS_SOVEREIGN'
    };
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesis = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: this.calculateHash(0, Date.now(), [], '0'),
      vaultLevel: 7,
      metadata: {
        type: 'GENESIS',
        issuer: 'NEXUS_NAIR',
        description: 'ClaimRoot Genesis Block'
      }
    };
    this.chain.push(genesis);
  }

  calculateHash(index, timestamp, transactions, previousHash) {
    const data = `${index}${timestamp}${JSON.stringify(transactions)}${previousHash}`;
    // Simple hash function for demonstration purposes
    // SECURITY NOTE: In production, use a cryptographic hash function like SHA-256
    // for secure, collision-resistant hashing
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    if (!transaction.from || !transaction.to) {
      throw new Error('Transaction must include from and to addresses');
    }
    
    this.pendingTransactions.push({
      ...transaction,
      timestamp: Date.now(),
      id: this.generateTransactionId()
    });
  }

  generateTransactionId() {
    return `TX-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  minePendingTransactions(minerAddress) {
    const block = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      previousHash: this.getLatestBlock().hash,
      vaultLevel: 7,
      miner: minerAddress
    };

    block.hash = this.calculateHash(
      block.index,
      block.timestamp,
      block.transactions,
      block.previousHash
    );

    this.chain.push(block);
    this.pendingTransactions = [];

    return block;
  }

  createVaultLevel7Receipt(transaction) {
    return {
      receiptId: `VL7-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      vaultLevel: 7,
      levelName: this.vaultLevels[7],
      transaction: transaction,
      blockHeight: this.chain.length,
      timestamp: Date.now(),
      verified: true,
      signature: this.signReceipt(transaction),
      metadata: {
        issuer: 'VaultChain',
        authority: 'NEXUS_NAIR',
        compliance: 'FAA-TREATY-COMPLIANT'
      }
    };
  }

  signReceipt(transaction) {
    const data = JSON.stringify(transaction);
    return `VAULT7-${this.calculateHash(0, Date.now(), [transaction], '0')}`;
  }

  getBalance(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.from === address) {
          balance -= trans.amount;
        }
        if (trans.to === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      const currentHash = this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash
      );

      if (currentBlock.hash !== currentHash) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  getChainStats() {
    return {
      totalBlocks: this.chain.length,
      pendingTransactions: this.pendingTransactions.length,
      isValid: this.isChainValid(),
      latestBlock: this.getLatestBlock(),
      genesisBlock: this.chain[0]
    };
  }

  getTransactionHistory(address) {
    const history = [];
    
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.from === address || trans.to === address) {
          history.push({
            ...trans,
            blockIndex: block.index,
            blockHash: block.hash,
            blockTimestamp: block.timestamp
          });
        }
      }
    }

    return history;
  }
}

export default VaultChain;

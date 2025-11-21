/**
 * ClaimRoot.js - Layer 2: Logic/Voting Engine
 * Core governance and voting logic for NEXUS_NAIR ecosystem
 */

import VaultChain from '../ledger/VaultChain.js';

class ClaimRoot {
  constructor() {
    this.vaultChain = new VaultChain();
    this.proposals = [];
    this.votes = new Map();
    this.members = new Map();
    this.governanceRules = {
      quorumPercentage: 51,
      votingPeriodHours: 168, // 7 days
      proposalThreshold: 1000, // Min voting power to create proposal
      executionDelay: 24 // Hours after passing before execution
    };
  }

  // Member Management
  registerMember(address, profile) {
    if (this.members.has(address)) {
      throw new Error('Member already registered');
    }

    const member = {
      address,
      ...profile,
      votingPower: profile.votingPower || 1,
      registeredAt: Date.now(),
      reputation: 100,
      vaultLevel: profile.vaultLevel || 1
    };

    this.members.set(address, member);

    // Record registration on VaultChain
    this.vaultChain.addTransaction({
      from: 'SYSTEM',
      to: address,
      amount: member.votingPower,
      type: 'MEMBER_REGISTRATION',
      metadata: profile
    });

    return member;
  }

  getMember(address) {
    return this.members.get(address);
  }

  // Proposal Management
  createProposal(creatorAddress, proposalData) {
    const creator = this.members.get(creatorAddress);
    
    if (!creator) {
      throw new Error('Creator must be a registered member');
    }

    if (creator.votingPower < this.governanceRules.proposalThreshold) {
      throw new Error('Insufficient voting power to create proposal');
    }

    const proposal = {
      id: this.generateProposalId(),
      creator: creatorAddress,
      title: proposalData.title,
      description: proposalData.description,
      type: proposalData.type || 'GENERAL',
      status: 'ACTIVE',
      createdAt: Date.now(),
      votingEndsAt: Date.now() + (this.governanceRules.votingPeriodHours * 60 * 60 * 1000),
      votes: {
        for: 0,
        against: 0,
        abstain: 0
      },
      voters: new Set(),
      metadata: proposalData.metadata || {}
    };

    this.proposals.push(proposal);

    // Record on VaultChain
    this.vaultChain.addTransaction({
      from: creatorAddress,
      to: 'GOVERNANCE',
      amount: 0,
      type: 'PROPOSAL_CREATED',
      metadata: {
        proposalId: proposal.id,
        title: proposal.title
      }
    });

    return proposal;
  }

  generateProposalId() {
    return `PROP-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  // Voting Logic
  castVote(voterAddress, proposalId, voteType) {
    const voter = this.members.get(voterAddress);
    const proposal = this.proposals.find(p => p.id === proposalId);

    if (!voter) {
      throw new Error('Voter must be a registered member');
    }

    if (!proposal) {
      throw new Error('Proposal not found');
    }

    if (proposal.status !== 'ACTIVE') {
      throw new Error('Proposal is not active');
    }

    if (Date.now() > proposal.votingEndsAt) {
      proposal.status = 'ENDED';
      throw new Error('Voting period has ended');
    }

    if (proposal.voters.has(voterAddress)) {
      throw new Error('Member has already voted on this proposal');
    }

    // Valid vote types: 'for', 'against', 'abstain'
    if (!['for', 'against', 'abstain'].includes(voteType)) {
      throw new Error('Invalid vote type');
    }

    // Cast vote with voting power
    proposal.votes[voteType] += voter.votingPower;
    proposal.voters.add(voterAddress);

    // Store vote
    const voteKey = `${proposalId}-${voterAddress}`;
    this.votes.set(voteKey, {
      proposalId,
      voter: voterAddress,
      voteType,
      votingPower: voter.votingPower,
      timestamp: Date.now()
    });

    // Record on VaultChain
    this.vaultChain.addTransaction({
      from: voterAddress,
      to: 'GOVERNANCE',
      amount: voter.votingPower,
      type: 'VOTE_CAST',
      metadata: {
        proposalId,
        voteType
      }
    });

    // Check if proposal should be executed
    this.checkProposalStatus(proposal);

    return {
      success: true,
      proposal: proposal,
      vote: this.votes.get(voteKey)
    };
  }

  checkProposalStatus(proposal) {
    if (Date.now() > proposal.votingEndsAt && proposal.status === 'ACTIVE') {
      proposal.status = 'ENDED';
    }

    if (proposal.status === 'ENDED') {
      const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
      const totalVotingPower = this.getTotalVotingPower();
      const quorum = (totalVotes / totalVotingPower) * 100;

      if (quorum >= this.governanceRules.quorumPercentage) {
        if (proposal.votes.for > proposal.votes.against) {
          proposal.status = 'PASSED';
          proposal.executionTime = Date.now() + (this.governanceRules.executionDelay * 60 * 60 * 1000);
        } else {
          proposal.status = 'REJECTED';
        }
      } else {
        proposal.status = 'FAILED_QUORUM';
      }
    }
  }

  getTotalVotingPower() {
    let total = 0;
    for (const [, member] of this.members) {
      total += member.votingPower;
    }
    return total;
  }

  // Execute Proposal
  executeProposal(proposalId, executorAddress) {
    const proposal = this.proposals.find(p => p.id === proposalId);

    if (!proposal) {
      throw new Error('Proposal not found');
    }

    if (proposal.status !== 'PASSED') {
      throw new Error('Proposal has not passed');
    }

    if (Date.now() < proposal.executionTime) {
      throw new Error('Execution delay has not elapsed');
    }

    proposal.status = 'EXECUTED';
    proposal.executedAt = Date.now();
    proposal.executedBy = executorAddress;

    // Create VaultLevel 7 Receipt
    const receipt = this.vaultChain.createVaultLevel7Receipt({
      from: 'GOVERNANCE',
      to: executorAddress,
      amount: 0,
      type: 'PROPOSAL_EXECUTED',
      metadata: {
        proposalId: proposal.id,
        title: proposal.title,
        result: 'EXECUTED'
      }
    });

    return {
      proposal,
      receipt
    };
  }

  // Query Methods
  getProposal(proposalId) {
    return this.proposals.find(p => p.id === proposalId);
  }

  getAllProposals(filter = {}) {
    let filtered = [...this.proposals];

    if (filter.status) {
      filtered = filtered.filter(p => p.status === filter.status);
    }

    if (filter.creator) {
      filtered = filtered.filter(p => p.creator === filter.creator);
    }

    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  getVotesByProposal(proposalId) {
    const votes = [];
    for (const [key, vote] of this.votes) {
      if (vote.proposalId === proposalId) {
        votes.push(vote);
      }
    }
    return votes;
  }

  getGovernanceStats() {
    return {
      totalMembers: this.members.size,
      totalProposals: this.proposals.length,
      activeProposals: this.proposals.filter(p => p.status === 'ACTIVE').length,
      passedProposals: this.proposals.filter(p => p.status === 'PASSED').length,
      executedProposals: this.proposals.filter(p => p.status === 'EXECUTED').length,
      totalVotingPower: this.getTotalVotingPower(),
      governanceRules: this.governanceRules,
      chainStats: this.vaultChain.getChainStats()
    };
  }
}

export default ClaimRoot;

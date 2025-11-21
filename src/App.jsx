/**
 * App.jsx - Main Application Component
 * Integrates all 5 layers of the FCU Stack
 */

import React, { useState, useEffect } from 'react';
import SidePanel from './components/SidePanel';
import Dashboard from './components/Dashboard';
import HeatmapPanel from './components/HeatmapPanel';
import ClaimRootCheckout from './components/ClaimRootCheckout';
import ClaimRoot from './logic/ClaimRoot';
import FAACloud from './infra/FAACloud';
import SeedScrolls from './data/SeedScrolls';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [claimRoot] = useState(() => new ClaimRoot());
  const [faaCloud] = useState(() => new FAACloud());
  const [seedScrolls] = useState(() => new SeedScrolls());
  const [stats, setStats] = useState({});
  const [checkoutAction, setCheckoutAction] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    // Initialize FAA Cloud
    await faaCloud.initialize();

    // Register initial member (check if not already registered)
    if (!claimRoot.getMember('VAULT-COMMANDER-001')) {
      claimRoot.registerMember('VAULT-COMMANDER-001', {
        name: 'Heyns Schoeman',
        role: 'VaultCommander',
        votingPower: 10000,
        vaultLevel: 7
      });
    }

    // Create initial seed scroll (check if not already created)
    if (seedScrolls.getAllScrolls().length === 0) {
      seedScrolls.createScroll({
        type: 'UNDEVOTED_CAPITAL',
        issuer: 'Heyns Schoeman',
        vaultCommander: 'Heyns Schoeman',
        agent: 'FREEDOM',
        seedCapital: 50000,
        currency: 'USD',
        vaultLevel: 7
      });
    }

    // Update stats
    updateStats();
  };

  const updateStats = () => {
    const governanceStats = claimRoot.getGovernanceStats();
    const scrollStats = seedScrolls.getScrollStats();
    
    setStats({
      totalMembers: governanceStats.totalMembers,
      activeProposals: governanceStats.activeProposals,
      totalVotingPower: governanceStats.totalVotingPower,
      totalScrolls: scrollStats.total,
      chainStats: governanceStats.chainStats
    });
  };

  const handleCheckoutComplete = (receipt) => {
    console.log('Checkout completed:', receipt);
    setShowCheckout(false);
    setCheckoutAction(null);
    updateStats();
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      
      case 'governance':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Governance</h1>
              <p className="text-gray-400 mt-1">ClaimRoot Voting Engine</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Create Proposal</h2>
              <button
                onClick={() => {
                  setCheckoutAction({
                    type: 'CREATE_PROPOSAL',
                    details: 'Creating a new governance proposal'
                  });
                  setShowCheckout(true);
                }}
                className="px-6 py-3 bg-nexus-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                New Proposal
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Active Proposals</h2>
              <p className="text-gray-400">No active proposals at this time.</p>
            </div>
          </div>
        );
      
      case 'scrolls':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Seed Scrolls</h1>
              <p className="text-gray-400 mt-1">FAA Treaty Seed Capital System</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {seedScrolls.getAllScrolls().map((scroll) => {
                const doc = seedScrolls.generateScrollDocument(scroll.id);
                return (
                  <div key={scroll.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-vault-gold">{doc.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">Scroll ID: {doc.scrollId}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        scroll.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {scroll.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Vault Sealed:</span>
                        <span className="text-white ml-2">{doc.vaultSealed}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Scroll Type:</span>
                        <span className="text-white ml-2">{doc.scrollType}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Seed Capital:</span>
                        <span className="text-vault-gold ml-2">{doc.seedCapital}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Issuer:</span>
                        <span className="text-white ml-2">{doc.issuer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'heatmap':
        return <HeatmapPanel governanceData={stats} />;
      
      case 'vault':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">VaultChain</h1>
              <p className="text-gray-400 mt-1">Layer 1: Ledger System</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Chain Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Total Blocks</div>
                  <div className="text-white text-2xl font-bold">{stats.chainStats?.totalBlocks || 0}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Chain Status</div>
                  <div className="text-green-400 text-2xl font-bold">
                    {stats.chainStats?.isValid ? '✓ Valid' : '✗ Invalid'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'checkout':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Checkout</h1>
              <p className="text-gray-400 mt-1">Secure Action Processing</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400">Click any action button to open the checkout interface.</p>
              <button
                onClick={() => {
                  setCheckoutAction({
                    type: 'TEST_ACTION',
                    details: 'This is a test action'
                  });
                  setShowCheckout(true);
                }}
                className="mt-4 px-6 py-3 bg-nexus-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Open Test Checkout
              </button>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400 mt-1">System Configuration</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">System Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compliance:</span>
                  <span className="text-faa-green">FAA-TREATY-COMPLIANT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Authority:</span>
                  <span className="text-white">NEXUS_NAIR</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <SidePanel activeView={activeView} onViewChange={setActiveView} />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {showCheckout && (
        <ClaimRootCheckout
          action={checkoutAction}
          onComplete={handleCheckoutComplete}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}

export default App;

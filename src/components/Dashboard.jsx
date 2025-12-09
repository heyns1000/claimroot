/**
 * Dashboard.jsx - Main Dashboard View
 */

import React from 'react';
import { TrendingUp, Users, Vote, FileText, Shield } from 'lucide-react';
import { TreeCounter } from './TreeCounter';

const Dashboard = ({ stats }) => {
  const cards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Active Proposals',
      value: stats?.activeProposals || 0,
      icon: Vote,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Total Votes',
      value: stats?.totalVotingPower || 0,
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Seed Scrolls',
      value: stats?.totalScrolls || 0,
      icon: FileText,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to ClaimRoot Governance System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className={`${card.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-400">{card.title}</div>
            </div>
          );
        })}
      </div>

      {/* System Status */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white">VaultChain Ledger</span>
            </div>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white">Governance Engine</span>
            </div>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white">FAA Cloud</span>
            </div>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white">R2 Storage</span>
            </div>
            <span className="text-green-400">Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-nexus-purple rounded-lg hover:bg-purple-600 transition-colors text-white font-medium">
            Create Proposal
          </button>
          <button className="p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white font-medium">
            View Proposals
          </button>
          <button className="p-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-white font-medium">
            Create Seed Scroll
          </button>
        </div>
      </div>

      {/* Governance Rules */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Governance Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Quorum Percentage</div>
            <div className="text-white text-lg font-semibold">51%</div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Voting Period</div>
            <div className="text-white text-lg font-semibold">7 days</div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Proposal Threshold</div>
            <div className="text-white text-lg font-semibold">1000 votes</div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Execution Delay</div>
            <div className="text-white text-lg font-semibold">24 hours</div>
          </div>
        </div>
      </div>

      {/* Planetary Health Tracker */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">🌍 Planetary Health Tracker</h2>
        <p className="text-gray-400 mb-4">Our contribution to global reforestation:</p>
        <div className="flex justify-center">
          <TreeCounter 
            widgetUrl="https://widgets.plant-for-the-planet.org/YOUR_WIDGET_URL"
            maxWidth="400px"
            height="300px"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong>Note:</strong> To activate this widget, register at{' '}
            <a 
              href="https://widgets.plant-for-the-planet.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300"
            >
              widgets.plant-for-the-planet.org
            </a>
            {' '}and replace YOUR_WIDGET_URL with your generated URL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

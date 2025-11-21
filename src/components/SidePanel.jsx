/**
 * SidePanel.jsx - HSOMNI9000-style Side Navigation Panel
 * Layer 4: Interface component
 */

import React, { useState } from 'react';
import { Home, Vote, FileText, BarChart3, Settings, Shield, Lock } from 'lucide-react';

const SidePanel = ({ activeView, onViewChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-500' },
    { id: 'governance', icon: Vote, label: 'Governance', color: 'text-purple-500' },
    { id: 'scrolls', icon: FileText, label: 'Seed Scrolls', color: 'text-yellow-500' },
    { id: 'heatmap', icon: BarChart3, label: 'Heatmap', color: 'text-red-500' },
    { id: 'vault', icon: Lock, label: 'VaultChain', color: 'text-green-500' },
    { id: 'checkout', icon: Shield, label: 'Checkout', color: 'text-indigo-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-500' },
  ];

  return (
    <div 
      className={`
        ${isExpanded ? 'w-64' : 'w-20'}
        bg-gradient-to-b from-gray-900 to-gray-800 
        text-white 
        transition-all duration-300 ease-in-out
        border-r border-gray-700
        flex flex-col
        h-screen
        fixed left-0 top-0
        z-50
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-vault-gold to-yellow-400 bg-clip-text text-transparent">
                ClaimRoot
              </h1>
              <p className="text-xs text-gray-400">NEXUS_NAIR</p>
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-gray-700 shadow-lg ring-2 ring-vault-gold ring-opacity-50' 
                  : 'hover:bg-gray-700/50'
                }
                ${!isExpanded && 'justify-center'}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400'}`} />
              {isExpanded && (
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer - Vault Status */}
      <div className="p-4 border-t border-gray-700">
        {isExpanded ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>VaultChain Active</span>
            </div>
            <div className="text-xs text-gray-500">
              Level 7: NEXUS_SOVEREIGN
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;

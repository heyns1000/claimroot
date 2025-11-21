/**
 * HeatmapPanel.jsx - Visualization Panel for Governance Activity
 * Layer 4: Interface component
 */

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const HeatmapPanel = ({ governanceData }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    generateHeatmapData();
  }, [governanceData, timeRange]);

  const generateHeatmapData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate activity data
      const activity = Math.floor(Math.random() * 100);
      const votes = Math.floor(Math.random() * 50);
      const proposals = Math.floor(Math.random() * 10);
      
      data.push({
        date: date.toISOString().split('T')[0],
        activity,
        votes,
        proposals,
        intensity: activity / 100
      });
    }
    
    setHeatmapData(data);
  };

  const getIntensityColor = (intensity) => {
    if (intensity >= 0.8) return 'bg-red-600';
    if (intensity >= 0.6) return 'bg-orange-500';
    if (intensity >= 0.4) return 'bg-yellow-500';
    if (intensity >= 0.2) return 'bg-green-500';
    return 'bg-blue-400';
  };

  const stats = {
    totalActivity: heatmapData.reduce((sum, d) => sum + d.activity, 0),
    totalVotes: heatmapData.reduce((sum, d) => sum + d.votes, 0),
    totalProposals: heatmapData.reduce((sum, d) => sum + d.proposals, 0),
    avgActivity: Math.round(heatmapData.reduce((sum, d) => sum + d.activity, 0) / heatmapData.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Activity Heatmap</h2>
          <p className="text-gray-400">Governance activity visualization</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${timeRange === range 
                  ? 'bg-nexus-purple text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Total Activity</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalActivity}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Total Votes</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalVotes}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Proposals</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalProposals}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Avg Activity</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.avgActivity}</div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Daily Activity Heatmap</h3>
        <div className="grid grid-cols-7 gap-2">
          {heatmapData.map((day, index) => (
            <div key={index} className="space-y-1">
              <div
                className={`
                  ${getIntensityColor(day.intensity)}
                  rounded-lg p-4 
                  hover:scale-105 transition-transform cursor-pointer
                  relative group
                `}
                title={`${day.date}: ${day.activity} activities`}
              >
                <div className="text-white text-sm font-medium">{day.activity}</div>
                
                {/* Tooltip */}
                <div className="
                  absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                  bg-gray-900 text-white text-xs rounded-lg p-2
                  opacity-0 group-hover:opacity-100 transition-opacity
                  pointer-events-none z-10 whitespace-nowrap
                ">
                  <div>{day.date}</div>
                  <div>Activity: {day.activity}</div>
                  <div>Votes: {day.votes}</div>
                  <div>Proposals: {day.proposals}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-blue-400 rounded"></div>
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <div className="w-6 h-6 bg-red-600 rounded"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {heatmapData.slice(-5).reverse().map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${getIntensityColor(day.intensity)} rounded-full`}></div>
                <span className="text-white font-medium">{day.date}</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{day.activity} activities</span>
                <span>{day.votes} votes</span>
                <span>{day.proposals} proposals</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapPanel;

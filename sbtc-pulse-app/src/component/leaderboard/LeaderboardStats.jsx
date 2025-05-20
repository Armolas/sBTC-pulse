'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Award, Wallet } from 'lucide-react';

const LeaderboardStats = ({ stats }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Leaderboard Stats</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-400 text-sm">Total Participants</div>
              <div className="p-2 rounded-full bg-gray-700">
                <Users className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">+428 (30d)</div>
          </div>
          
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-400 text-sm">Total Rewards</div>
              <div className="p-2 rounded-full bg-gray-700">
                <Wallet className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalRewards.toFixed(3)} BTC</div>
            <div className="text-xs text-green-400 mt-1">+2.183 (30d)</div>
          </div>
          
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-400 text-sm">Average Score</div>
              <div className="p-2 rounded-full bg-gray-700">
                <BarChart3 className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.averageHealthScore}/100</div>
            <div className="text-xs text-green-400 mt-1">+3 pts (30d)</div>
          </div>
          
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-400 text-sm">Top Tier Users</div>
              <div className="p-2 rounded-full bg-gray-700">
                <Award className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.topTierCount}</div>
            <div className="text-xs text-green-400 mt-1">+5 (30d)</div>
          </div>
        </div>
        
        {/* Distribution Graph */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex justify-between items-end mb-4">
            <h4 className="text-white font-medium">User Distribution by Tier</h4>
            <div className="text-xs text-gray-400">Network-wide</div>
          </div>
          
          <div className="h-16 relative">
            {/* Bar chart visualization */}
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {/* Sample tier distribution - in real app, use actual distribution data */}
              {[
                { tier: 'Bronze', percentage: 65, color: 'bg-amber-700' },
                { tier: 'Silver', percentage: 25, color: 'bg-gray-400' },
                { tier: 'Gold', percentage: 8, color: 'bg-yellow-500' },
                { tier: 'Diamond', percentage: 2, color: 'bg-blue-500' }
              ].map((tierData, i) => (
                <motion.div
                  key={tierData.tier}
                  initial={{ height: 0 }}
                  animate={{ height: `${tierData.percentage}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex-1 rounded-t ${tierData.color}`}
                >
                  <div className="w-full flex justify-center -mt-6">
                    <span className="text-xs text-white">{tierData.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 translate-y-6 inset-x-0 flex justify-between text-xs text-gray-500">
              <span>Bronze</span>
              <span>Silver</span>
              <span>Gold</span>
              <span>Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
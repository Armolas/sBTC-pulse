'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const LeaderboardTable = ({ leaders = [], formatBTCValue }) => {
  if (!leaders || leaders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No leaderboard data available yet.</p>
      </div>
    );
  }

  const getTrophyColor = (index) => {
    switch (index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-300';
      case 2: return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  // Get tier badge color
  const getTierColor = (tier) => {
    switch (tier) {
      case 'Diamond': return 'bg-blue-500/20 text-blue-300';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-300';
      case 'Silver': return 'bg-gray-400/20 text-gray-300';
      default: return 'bg-amber-700/20 text-amber-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Streak</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rewards</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tier</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <motion.tr 
              key={leader.address || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/30'} hover:bg-gray-800 transition-colors`}
            >
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  {index < 3 ? (
                    <Trophy className={`h-4 w-4 mr-1 ${getTrophyColor(index)}`} />
                  ) : (
                    <span className="w-5 text-center">{index + 1}</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 flex items-center justify-center mr-3 text-white font-medium">
                    {leader.alias ? leader.alias.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{leader.alias || `User ${index + 1}`}</div>
                    <div className="text-xs text-gray-400">
                      {leader.address ? 
                        `${leader.address.slice(0, 5)}...${leader.address.slice(-4)}` : 
                        '-'
                      }
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm text-gray-300">{leader.streak || 0}</div>
                  <div className="text-xs text-gray-500 ml-1">days</div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-300">{formatBTCValue(leader.rewards || 0)} sBTC</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(leader.tier)}`}>
                  {leader.tier || 'Bronze'}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
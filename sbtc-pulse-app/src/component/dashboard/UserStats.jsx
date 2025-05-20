'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Coins, ArrowRight } from 'lucide-react';
import { formatBTCValue, formatUSDValue } from '@/services/stacksService';

const UserStats = ({ streak, rewards, tier, btcPrice, isAuthenticated, onConnectWallet }) => {
  const getTierName = (tier) => {
    switch (tier) {
      case 0: return 'Bronze';
      case 1: return 'Silver';
      case 2: return 'Gold';
      case 3: return 'Platinum';
      case 4: return 'Diamond';
      default: return 'Bronze';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 0: return 'from-amber-700 to-amber-900';
      case 1: return 'from-gray-400 to-gray-600';
      case 2: return 'from-yellow-400 to-yellow-600';
      case 3: return 'from-cyan-400 to-cyan-600';
      case 4: return 'from-blue-400 to-purple-600';
      default: return 'from-amber-700 to-amber-900';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Your sBTC Pulse Stats</h2>
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-300 mb-6 text-center">
            Connect your wallet to view your stats and start earning rewards.
          </p>
          <motion.button
            onClick={onConnectWallet}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-500 dark:to-purple-600 text-white font-medium flex items-center gap-2"
          >
            Connect Wallet
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Your sBTC Pulse Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4 flex items-center">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full p-3 mr-4">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Current Streak</p>
            <p className="text-white text-2xl font-bold">{streak} days</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 flex items-center">
          <div className={`bg-gradient-to-br ${getTierColor(tier)} rounded-full p-3 mr-4`}>
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Current Tier</p>
            <p className="text-white text-2xl font-bold">{getTierName(tier)}</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 flex items-center">
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full p-3 mr-4">
            <Coins className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Rewards</p>
            <p className="text-white text-2xl font-bold">{formatBTCValue(rewards)} sBTC</p>
            <p className="text-gray-400 text-xs">{formatUSDValue(rewards, btcPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

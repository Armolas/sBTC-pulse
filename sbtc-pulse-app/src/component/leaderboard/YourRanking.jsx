'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, TrendingUp, Medal, Clock, Calendar } from 'lucide-react';

const YourRanking = ({ ranking, formatBTCValue }) => {
  // Get tier color
  const getTierColor = (tier) => {
    switch (tier) {
      case 'Diamond':
        return 'from-blue-500 to-indigo-600';
      case 'Gold':
        return 'from-yellow-500 to-amber-600';
      case 'Silver':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-amber-700 to-amber-800';
    }
  };
  
  // Get tier badge color
  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Diamond': return 'bg-blue-500/20 text-blue-300';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-300';
      case 'Silver': return 'bg-gray-400/20 text-gray-300';
      default: return 'bg-amber-700/20 text-amber-600';
    }
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <User className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Your Ranking</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${getTierColor(ranking.tier)} flex items-center justify-center text-white text-lg font-bold`}>
              #{ranking.rank}
            </div>
            
            <div>
              <h4 className="text-white font-medium">{ranking.alias}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierBadgeColor(ranking.tier)}`}>
                  {ranking.tier}
                </span>
                <span className="text-gray-400 text-xs">
                  Top {(ranking.percentile).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg"
          >
            <Medal className="h-5 w-5 text-white" />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              <span className="text-xs text-gray-400">Rewards</span>
            </div>
            <div className="text-sm text-white">{formatBTCValue(ranking.rewards)} sBTC</div>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              <span className="text-xs text-gray-400">Streak</span>
            </div>
            <div className="text-sm text-white">{ranking.streak} days</div>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-pink-500 dark:text-blue-400" />
              <span className="text-xs text-gray-400">Lock</span>
            </div>
            <div className="text-sm text-white">{ranking.lockDuration} days</div>
          </div>
        </div>
        
        {/* Rank Progress */}
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-400">Rank Progress</span>
            <span className="text-xs text-gray-400">{ranking.rank} of {ranking.totalRanks}</span>
          </div>
          
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${100 - (ranking.rank / ranking.totalRanks * 100)}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
            ></motion.div>
          </div>
        </div>
        
        {/* Next Rank */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-gray-700 flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-pink-500 dark:text-blue-400" />
            </div>
            <div>
              <h5 className="text-white text-sm font-medium">Next Rank: #{ranking.rank - 1}</h5>
              <p className="text-gray-400 text-xs mt-1">
                You need 0.00079 more sBTC in rewards to reach the next rank.
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ x: 0 }}
                className="mt-3 text-pink-400 dark:text-blue-400 text-xs flex items-center"
              >
                View rewards guide
                <TrendingUp className="h-3 w-3 ml-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourRanking;
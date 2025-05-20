'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Award, Bookmark, TrendingUp, ArrowRight } from 'lucide-react';

const HealthStatusCard = ({ statusData, score }) => {
  // Determine liquidation risk color
  const getLiquidationRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };
  
  // Determine the progress to next tier
  const progressToNextTier = (score / statusData.nextTier.threshold) * 100;
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors h-full">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Health Status</h3>
        </div>
      </div>
      
      <div className="p-5">
        {/* Risk Level */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">Liquidation Risk</div>
            <div className={`font-medium ${getLiquidationRiskColor(statusData.liquidationRisk)}`}>
              {statusData.liquidationRisk}
            </div>
          </div>
          
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 
                statusData.liquidationRisk.toLowerCase() === 'low' ? '20%' : 
                statusData.liquidationRisk.toLowerCase() === 'medium' ? '50%' : '80%' 
              }}
              transition={{ duration: 0.8 }}
              className={`h-full ${
                statusData.liquidationRisk.toLowerCase() === 'low' ? 'bg-green-500' : 
                statusData.liquidationRisk.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            ></motion.div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
        
        {/* Reward Tier */}
        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-3">Current Reward Tier</div>
          
          <div className="p-4 border border-gray-700 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600">
                  <Award className="h-5 w-5 text-gray-900" />
                </div>
                <div className="ml-3">
                  <div className="text-white font-medium">{statusData.rewardTier}</div>
                  <div className="text-gray-400 text-xs">Reward Tier</div>
                </div>
              </div>
              
              <Bookmark className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        {/* Next Tier */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">Next Tier: {statusData.nextTier.name}</div>
            <div className="text-gray-400 text-xs">{score}/{statusData.nextTier.threshold} pts</div>
          </div>
          
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressToNextTier, 100)}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
            ></motion.div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-xs text-gray-400">
              {Math.max(0, statusData.nextTier.threshold - score)} points to reach {statusData.nextTier.name}
            </div>
            <div className="text-xs text-gray-400">
              {Math.round(progressToNextTier)}%
            </div>
          </div>
        </div>
        
        {/* Next Tier Benefits */}
        <div className="mb-6 bg-gray-800/40 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-pink-500 dark:text-blue-400 mr-2" />
            <h4 className="text-white font-medium">{statusData.nextTier.name} Tier Benefits</h4>
          </div>
          
          <p className="text-gray-300 text-sm">
            {statusData.nextTier.benefits}
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="text-gray-400 text-sm">Position Rank</div>
            <div className="text-white">Top 18%</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-gray-400 text-sm">Account Age</div>
            <div className="text-white">124 days</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-gray-400 text-sm">Last Score Change</div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5 pts
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white flex items-center justify-center gap-2"
          >
            Improve Score <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HealthStatusCard;
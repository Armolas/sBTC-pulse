'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Clock, Info } from 'lucide-react';

const ScoreBreakdownCard = ({ breakdown }) => {
  // Calculate weighted scores
  const collateralScore = Math.round(breakdown.collateralRatio * 0.4);
  const rewardScore = Math.round(breakdown.rewardEfficiency * 0.4);
  const lockScore = Math.round(breakdown.lockDuration * 0.2);
  const totalScore = collateralScore + rewardScore + lockScore;
  
  // Get status color based on score
  const getStatusColor = (score, threshold) => {
    if (score >= threshold * 0.9) return 'bg-green-500';
    if (score >= threshold * 0.75) return 'bg-green-600';
    if (score >= threshold * 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get text color based on score
  const getTextColor = (score, threshold) => {
    if (score >= threshold * 0.9) return 'text-green-400';
    if (score >= threshold * 0.75) return 'text-green-500';
    if (score >= threshold * 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Score Breakdown</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Collateral Ratio */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-pink-500 dark:text-blue-400 mr-2" />
              <h4 className="text-white font-medium">Collateral Ratio</h4>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">Current Level</span>
              <span className={`text-sm font-medium ${getTextColor(breakdown.collateralRatio, 100)}`}>
                {breakdown.collateralRatio}%
              </span>
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${breakdown.collateralRatio}%` }}
                transition={{ duration: 1 }}
                className={`h-full ${getStatusColor(breakdown.collateralRatio, 100)}`}
              ></motion.div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Weight</span>
              <span className="text-white">40%</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
              <span className="text-gray-400 text-sm">Contribution</span>
              <span className="text-lg font-bold text-white">{collateralScore} pts</span>
            </div>
          </div>
          
          {/* Reward Efficiency */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Zap className="h-5 w-5 text-pink-500 dark:text-blue-400 mr-2" />
              <h4 className="text-white font-medium">Reward Efficiency</h4>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">Current Level</span>
              <span className={`text-sm font-medium ${getTextColor(breakdown.rewardEfficiency, 100)}`}>
                {breakdown.rewardEfficiency}%
              </span>
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${breakdown.rewardEfficiency}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full ${getStatusColor(breakdown.rewardEfficiency, 100)}`}
              ></motion.div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Weight</span>
              <span className="text-white">40%</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
              <span className="text-gray-400 text-sm">Contribution</span>
              <span className="text-lg font-bold text-white">{rewardScore} pts</span>
            </div>
          </div>
          
          {/* Lock Duration */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-pink-500 dark:text-blue-400 mr-2" />
              <h4 className="text-white font-medium">Lock Duration</h4>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">Current Level</span>
              <span className={`text-sm font-medium ${getTextColor(breakdown.lockDuration, 100)}`}>
                {breakdown.lockDuration}%
              </span>
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${breakdown.lockDuration}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                className={`h-full ${getStatusColor(breakdown.lockDuration, 100)}`}
              ></motion.div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Weight</span>
              <span className="text-white">20%</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
              <span className="text-gray-400 text-sm">Contribution</span>
              <span className="text-lg font-bold text-white">{lockScore} pts</span>
            </div>
          </div>
        </div>
        
        {/* Total Score */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h4 className="text-white font-medium mb-1">Total Health Score</h4>
              <p className="text-gray-400 text-sm">Sum of all weighted components</p>
            </div>
            
            <div className="mt-2 md:mt-0">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-white">{totalScore}</span>
                  <span className="text-xs text-gray-400">out of 100</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center relative">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 absolute">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <motion.path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#circleGradient)"
                      strokeWidth="3"
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${totalScore}, 100` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      strokeDasharray={`${totalScore}, 100`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" className="dark:hidden" />
                        <stop offset="100%" stopColor="#9333ea" className="dark:hidden" />
                        <stop offset="0%" stopColor="#60a5fa" className="hidden dark:inline" />
                        <stop offset="100%" stopColor="#7c3aed" className="hidden dark:inline" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-sm font-medium text-white">{totalScore}%</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-start gap-2">
              <div className="text-blue-400 flex-shrink-0 mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <p className="text-sm text-gray-400">
                Your health score is calculated based on these three key metrics. Improve any component to increase your overall score.
              </p>
            </div>
          </div>
        </div>
        
        {/* Score Details */}
        <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Component Details</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-white mb-1 flex items-center">
                <Shield className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-1" />
                Collateral Ratio
              </h5>
              <p className="text-xs text-gray-400">
                Measures how much sBTC collateral you have relative to the position size. Higher values reduce liquidation risk.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm text-white mb-1 flex items-center">
                <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-1" />
                Reward Efficiency
              </h5>
              <p className="text-xs text-gray-400">
                Measures how efficiently your position is earning rewards compared to the maximum potential. Affected by staking strategy.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm text-white mb-1 flex items-center">
                <Clock className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-1" />
                Lock Duration
              </h5>
              <p className="text-xs text-gray-400">
                Based on how long you've locked your sBTC. Longer lock periods improve score and increase reward potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdownCard;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, Calendar, Award, PlusCircle, RefreshCw } from 'lucide-react';

const LockPositionCard = ({ lockData }) => {
  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Calculate days remaining
  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = calculateDaysRemaining(lockData.lockEnds);
  const lockPercentage = (lockData.lockedAmount / lockData.sbtcBalance) * 100;
  
  // Calculate the percentage of time elapsed in the lock period
  // Assuming a 90-day standard lock period
  const lockPeriod = 90;
  const timeElapsedPercentage = ((lockPeriod - daysRemaining) / lockPeriod) * 100;
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <Lock className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Lock Position</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lock Amount */}
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="text-gray-400 text-sm mb-1">Locked sBTC</div>
                <div className="text-2xl font-bold text-white">{lockData.lockedAmount} sBTC</div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Lock Percentage</span>
                    <span className="text-gray-300">{lockPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${lockPercentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-gray-400 text-sm mb-1">Lock Period</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-white">{daysRemaining} days</div>
                  <div className="text-gray-400 text-sm mb-1">remaining</div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Time Elapsed</span>
                    <span className="text-gray-300">{timeElapsedPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${timeElapsedPercentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-400">Lock End Date</div>
                    <div className="text-sm text-white">{formatDate(lockData.lockEnds)}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-400">Total Rewards</div>
                    <div className="text-sm text-white">{lockData.rewards.total} BTC</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-400">Next Epoch</div>
                    <div className="text-sm text-white">7 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg text-white"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add to Lock</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Extend Lock</span>
              </motion.button>
            </div>
          </div>
          
          {/* Rewards Visualization */}
          <div className="relative">
            <div className="text-gray-400 text-sm mb-4">Rewards Projection</div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="mb-4">
                <div className="text-xs text-gray-400">Last Epoch Rewards</div>
                <div className="text-lg font-medium text-white">{lockData.rewards.lastEpoch} BTC</div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-gray-400">Projected Next Epoch</div>
                <div className="text-lg font-medium text-green-400">{lockData.rewards.projected.nextEpoch} BTC</div>
                <div className="text-xs text-green-400">+{((lockData.rewards.projected.nextEpoch - lockData.rewards.lastEpoch) / lockData.rewards.lastEpoch * 100).toFixed(1)}%</div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-gray-400">Projected Annual</div>
                <div className="text-lg font-medium text-white">{lockData.rewards.projected.annual} BTC</div>
              </div>
              
              {/* Mini Rewards Chart */}
              <div className="h-24 relative">
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    d="M0,35 L10,32 L20,28 L30,25 L40,20 L50,18 L60,15 L70,13 L80,10 L90,8 L100,5"
                    fill="none"
                    stroke="url(#rewardsGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="rewardsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div className="mt-2 text-center">
                <a href="#" className="text-xs text-pink-400 dark:text-blue-400 hover:underline">View detailed projections</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockPositionCard;
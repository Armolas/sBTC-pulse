'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockKeyhole, TrendingUp, Award, Clock, Check, Info } from 'lucide-react';

const StakingOptionsCard = ({ walletData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('90days');
  
  // Staking options
  const stakingOptions = [
    { 
      id: '30days', 
      label: '30 Days',
      apy: 4.2,
      minLock: 0.1,
      lockupPeriod: '30 days',
      available: true
    },
    { 
      id: '90days', 
      label: '90 Days',
      apy: 5.1,
      minLock: 0.1,
      lockupPeriod: '90 days',
      available: true,
      recommended: true
    },
    { 
      id: '180days', 
      label: '180 Days',
      apy: 5.8,
      minLock: 0.25,
      lockupPeriod: '180 days',
      available: true
    },
    { 
      id: '365days', 
      label: '365 Days',
      apy: 6.5,
      minLock: 0.5,
      lockupPeriod: '365 days',
      available: walletData.sbtcBalance >= 0.5
    }
  ];
  
  // Get the selected option
  const selectedOption = stakingOptions.find(option => option.id === selectedPeriod);
  
  // Calculate estimated rewards based on available amount and APY
  const calculateRewards = (amount, apy, days) => {
    return amount * (apy / 100) * (days / 365);
  };
  
  // Format BTC value with up to 8 decimal places
  const formatBTC = (value) => {
    return parseFloat(value).toFixed(8).replace(/\.?0+$/, '');
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <LockKeyhole className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Staking Options</h3>
        </div>
      </div>
      
      <div className="p-5">
        {/* Period Selection */}
        <div className="mb-5">
          <div className="text-sm text-gray-400 mb-2">Select Lock Period</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stakingOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPeriod(option.id)}
                disabled={!option.available}
                className={`relative p-3 rounded-lg border text-center ${
                  selectedPeriod === option.id
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 border-pink-500/40 dark:border-blue-500/40 text-white'
                    : option.available 
                      ? 'border-gray-700 text-gray-300 hover:border-gray-600'
                      : 'border-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-xs">{option.apy}% APY</div>
                
                {/* Recommended Badge */}
                {option.recommended && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-0.5" />
                      <span>Best</span>
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Selected Option Details */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <div className="mb-2 sm:mb-0">
              <h4 className="text-white font-medium">{selectedOption.label} Lock</h4>
              <div className="text-sm text-gray-400">Lock until {
                new Date(Date.now() + parseInt(selectedOption.id) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }</div>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium">
              {selectedOption.apy}% APY
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-gray-700">
                <Clock className="h-4 w-4 text-gray-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">Lock Period</div>
                <div className="text-xs text-gray-400">{selectedOption.lockupPeriod} minimum lockup</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-gray-700">
                <TrendingUp className="h-4 w-4 text-gray-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">Minimum Lock</div>
                <div className="text-xs text-gray-400">{selectedOption.minLock} sBTC minimum required</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-gray-700">
                <Award className="h-4 w-4 text-gray-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">Estimated Rewards</div>
                <div className="text-xs text-gray-400">
                  {formatBTC(calculateRewards(walletData.availableAmount, selectedOption.apy, parseInt(selectedOption.id)))} BTC
                  over {selectedOption.lockupPeriod}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Information Note */}
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mb-5">
          <div className="flex gap-2">
            <div className="text-blue-400">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="text-white text-sm">Early Unlock Penalty</p>
              <p className="text-gray-300 text-xs">
                If you unlock before the full period, you will only receive 50% of the accumulated rewards.
              </p>
            </div>
          </div>
        </div>
        
        {/* Lock Amount Input */}
        <div className="mb-5">
          <label className="block text-gray-400 text-sm mb-2">Amount to Lock</label>
          <div className="flex">
            <input 
              type="number" 
              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400"
              placeholder="0.00"
              min={selectedOption.minLock}
              max={walletData.availableAmount}
              defaultValue={selectedOption.minLock}
            />
            <div className="bg-gray-700 px-4 py-2 rounded-r-lg flex items-center text-white">sBTC</div>
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-gray-400">Min: {selectedOption.minLock} sBTC</span>
            <span className="text-gray-400">Available: {walletData.availableAmount} sBTC</span>
          </div>
        </div>
        
        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium"
        >
          Lock sBTC Now
        </motion.button>
      </div>
    </div>
  );
};

export default StakingOptionsCard;
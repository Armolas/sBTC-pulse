'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Copy, ExternalLink, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const WalletBalanceCard = ({ walletData }) => {
  // Format USD value with commas
  const formatUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Format BTC value with up to 8 decimal places
  const formatBTC = (value) => {
    return parseFloat(value).toFixed(8).replace(/\.?0+$/, '');
  };
  
  // Copy wallet address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address.replace('...', ''));
    // In a real app, you would show a toast notification here
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
            <h3 className="text-xl font-bold text-white">Wallet Balance</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 truncate">{walletData.address}</span>
            <button 
              onClick={copyAddress}
              className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              aria-label="Copy address"
            >
              <Copy className="h-4 w-4" />
            </button>
            <a 
              href={`https://explorer.stacks.co/address/${walletData.address.replace('...', '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              aria-label="View on explorer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* sBTC Balance */}
        <div>
          <div className="mb-2">
            <div className="text-gray-400 text-sm">sBTC Balance</div>
            <div className="flex items-end gap-2">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold text-white"
              >
                {formatBTC(walletData.sbtcBalance)} sBTC
              </motion.div>
              <div className="text-gray-400 text-sm mb-1">
                {formatUSD(walletData.sbtcValue)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-800/60 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Available</div>
              <div className="text-lg font-medium text-white">{formatBTC(walletData.availableAmount)} sBTC</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Locked</div>
              <div className="text-lg font-medium text-white">{formatBTC(walletData.lockedAmount)} sBTC</div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors"
            >
              <ArrowDownRight className="h-3 w-3 text-green-400" />
              Peg-in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors"
            >
              <ArrowUpRight className="h-3 w-3 text-blue-400" />
              Peg-out
            </motion.button>
          </div>
        </div>
        
        {/* BTC Balance & Charts */}
        <div>
          <div className="mb-2">
            <div className="text-gray-400 text-sm">BTC Balance</div>
            <div className="flex items-end gap-2">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold text-white"
              >
                {formatBTC(walletData.btcBalance)} BTC
              </motion.div>
              <div className="text-gray-400 text-sm mb-1">
                {formatUSD(walletData.btcBalance * 87245.32)} {/* Using a sample BTC price */}
              </div>
            </div>
          </div>
          
          {/* Mini Balance Distribution Chart */}
          <div className="mt-4 bg-gray-800/60 rounded-lg p-4">
            <div className="text-sm text-white mb-2">Balance Distribution</div>
            
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(walletData.sbtcBalance / (walletData.sbtcBalance + walletData.btcBalance)) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
              ></motion.div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"></div>
                <span className="text-gray-300">sBTC</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <span className="text-gray-300">BTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Balance History Graph Placeholder */}
      <div className="px-5 pb-5">
        <div className="bg-gray-800/40 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-white">7-Day Balance History</span>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-300">
              <option value="7days">7 Days</option>
              <option value="30days">30 Days</option>
              <option value="90days">90 Days</option>
            </select>
          </div>
          
          <div className="h-40 relative">
            {/* Placeholder for chart - in a real app, use something like Recharts */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d="M0,35 L5,30 L10,32 L15,25 L20,28 L25,20 L30,22 L35,18 L40,15 L45,18 L50,15 L55,10 L60,12 L65,8 L70,15 L75,10 L80,8 L85,12 L90,6 L95,8 L100,5"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" className="dark:hidden" />
                    <stop offset="100%" stopColor="#9333ea" className="dark:hidden" />
                    <stop offset="0%" stopColor="#60a5fa" className="hidden dark:inline" />
                    <stop offset="100%" stopColor="#7c3aed" className="hidden dark:inline" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
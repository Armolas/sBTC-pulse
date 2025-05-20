'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Clock, ArrowRight, Plus, ArrowUpRight, ArrowDownRight, History, Repeat } from 'lucide-react';
import WalletBalanceCard from './my-sbtc/WalletBalanceCard';
import LockPositionCard from './my-sbtc/LockPositionCard';
import StakingOptionsCard from './my-sbtc/StakingOptionsCard';
import TransactionHistoryCard from './my-sbtc/TransactionHistoryCard';
import ActionCard from './my-sbtc/ActionCard';

const MySbtcPage = () => {
  // State for active tabs and modals
  const [activeTransactionTab, setActiveTransactionTab] = useState('all');
  const [showPegModal, setShowPegModal] = useState(false);
  const [pegType, setPegType] = useState('');
  
  // Sample transaction data
  const transactions = [
    {
      id: 't1',
      type: 'peg-in',
      amount: '0.25 BTC',
      date: '2025-05-10T14:32:00Z',
      status: 'confirmed',
      txId: '0x8e7c...3f92'
    },
    {
      id: 't2',
      type: 'lock',
      amount: '0.5 sBTC',
      date: '2025-05-05T09:15:00Z',
      status: 'confirmed',
      duration: '90 days'
    },
    {
      id: 't3',
      type: 'reward',
      amount: '0.0023 BTC',
      date: '2025-05-01T00:00:00Z',
      status: 'confirmed',
      epoch: '#41'
    },
    {
      id: 't4',
      type: 'peg-out',
      amount: '0.1 sBTC',
      date: '2025-04-28T16:45:00Z',
      status: 'confirmed',
      txId: '0x3a9b...7d21'
    }
  ];
  
  // Wallet data
  const walletData = {
    address: '0x82a...37f9',
    btcBalance: 1.25,
    sbtcBalance: 0.8732,
    sbtcValue: 76186.25, // in USD
    lockedAmount: 0.5,
    availableAmount: 0.3732,
    lockEnds: '2025-08-15T00:00:00Z',
    rewards: {
      total: 0.0452,
      lastEpoch: 0.0023,
      projected: { 
        nextEpoch: 0.0025,
        annual: 0.0540
      }
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Filter transactions based on active tab
  const filteredTransactions = activeTransactionTab === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === activeTransactionTab);

  // Handle peg-in/out modal open
  const handlePegModalOpen = (type) => {
    setPegType(type);
    setShowPegModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My sBTC</h1>
          <p className="text-gray-400">Manage your sBTC holdings, locks, and rewards</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePegModalOpen('peg-in')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white"
          >
            <ArrowDownRight className="h-4 w-4" />
            <span>Peg-in BTC</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePegModalOpen('peg-out')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>Peg-out sBTC</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Lock sBTC</span>
          </motion.button>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Balance Card */}
          <motion.div variants={itemVariants}>
            <WalletBalanceCard walletData={walletData} />
          </motion.div>
          
          {/* Lock Position Card */}
          <motion.div variants={itemVariants}>
            <LockPositionCard lockData={walletData} />
          </motion.div>
          
          {/* Transaction History */}
          <motion.div variants={itemVariants}>
            <TransactionHistoryCard 
              transactions={filteredTransactions}
              activeTab={activeTransactionTab}
              setActiveTab={setActiveTransactionTab}
            />
          </motion.div>
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          {/* Staking Options Card */}
          <motion.div variants={itemVariants}>
            <StakingOptionsCard walletData={walletData} />
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              </div>
              
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ActionCard 
                  icon={<Repeat className="h-5 w-5 text-white" />}
                  title="Extend Lock"
                  description="Extend your current lock period to earn more rewards"
                  buttonText="Extend Now"
                  bgColor="from-yellow-500 to-orange-600"
                />
                
                <ActionCard 
                  icon={<Plus className="h-5 w-5 text-white" />}
                  title="Add Collateral"
                  description="Add more sBTC to your position to increase your health score"
                  buttonText="Add sBTC"
                  bgColor="from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
                />
                
                <ActionCard 
                  icon={<History className="h-5 w-5 text-white" />}
                  title="Claim Rewards"
                  description="Claim your accumulated staking rewards"
                  buttonText="Claim Now"
                  bgColor="from-green-500 to-green-600"
                />
                
                <ActionCard 
                  icon={<ArrowRight className="h-5 w-5 text-white" />}
                  title="Explore Pools"
                  description="Discover additional yield opportunities for your sBTC"
                  buttonText="Explore"
                  bgColor="from-blue-500 to-blue-600"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Network Stats Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Network Stats</h3>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current APY</span>
                    <span className="text-white font-medium">5.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Value Locked</span>
                    <span className="text-white font-medium">1,350 BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Epoch</span>
                    <span className="text-white font-medium">#42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Epoch</span>
                    <span className="text-white font-medium">7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Position Rank</span>
                    <span className="text-white font-medium">127 / 12,450</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <a href="#" className="text-pink-400 dark:text-blue-400 hover:underline text-sm flex items-center justify-center gap-1">
                    View detailed analytics <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Peg Modal */}
      {showPegModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {pegType === 'peg-in' ? 'Peg-in BTC to sBTC' : 'Peg-out sBTC to BTC'}
            </h3>
            
            <p className="text-gray-300 mb-6">
              {pegType === 'peg-in' 
                ? 'Convert your BTC to sBTC to participate in stacking and DeFi on Stacks.' 
                : 'Convert your sBTC back to BTC.'}
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Amount</label>
              <div className="flex">
                <input 
                  type="number" 
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400"
                  placeholder="0.00"
                />
                <div className="bg-gray-700 px-4 py-2 rounded-r-lg flex items-center text-white">
                  {pegType === 'peg-in' ? 'BTC' : 'sBTC'}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">You will receive</label>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                <div className="flex justify-between">
                  <span className="text-white">0.00</span>
                  <span className="text-gray-400">{pegType === 'peg-in' ? 'sBTC' : 'BTC'}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
              <div className="flex gap-2">
                <div className="text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Processing Time</p>
                  <p className="text-gray-300 text-xs">
                    {pegType === 'peg-in' 
                      ? 'Peg-in typically takes 5-10 minutes to complete.' 
                      : 'Peg-out typically takes 30-60 minutes to complete.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPegModal(false)}
                className="flex-1 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                className={`flex-1 px-4 py-2 rounded-lg text-white ${
                  pegType === 'peg-in' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
              >
                Confirm {pegType === 'peg-in' ? 'Peg-in' : 'Peg-out'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MySbtcPage;
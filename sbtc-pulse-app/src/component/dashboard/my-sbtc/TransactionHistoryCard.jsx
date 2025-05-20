'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { History, ArrowDownRight, ArrowUpRight, Award, Lock, ExternalLink, Search } from 'lucide-react';

const TransactionHistoryCard = ({ transactions, activeTab, setActiveTab }) => {
  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get transaction icon based on type
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'peg-in':
        return <ArrowDownRight className="h-5 w-5 text-green-400" />;
      case 'peg-out':
        return <ArrowUpRight className="h-5 w-5 text-blue-400" />;
      case 'reward':
        return <Award className="h-5 w-5 text-yellow-400" />;
      case 'lock':
        return <Lock className="h-5 w-5 text-purple-400" />;
      default:
        return <History className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Get transaction status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };
  
  // Get transaction label based on type
  const getTransactionLabel = (transaction) => {
    switch (transaction.type) {
      case 'peg-in':
        return `Peg-in ${transaction.amount}`;
      case 'peg-out':
        return `Peg-out ${transaction.amount}`;
      case 'reward':
        return `Reward from Epoch ${transaction.epoch}`;
      case 'lock':
        return `Locked ${transaction.amount} for ${transaction.duration}`;
      default:
        return `Transaction ${transaction.id}`;
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <History className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Transaction History</h3>
        </div>
      </div>
      
      <div className="p-5">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('peg-in')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
              activeTab === 'peg-in'
                ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="h-3 w-3" />
            Peg-in
          </button>
          <button
            onClick={() => setActiveTab('peg-out')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
              activeTab === 'peg-out'
                ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="h-3 w-3" />
            Peg-out
          </button>
          <button
            onClick={() => setActiveTab('reward')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
              activeTab === 'reward'
                ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Award className="h-3 w-3" />
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('lock')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
              activeTab === 'lock'
                ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Lock className="h-3 w-3" />
            Locks
          </button>
        </div>
        
        {/* Search Box */}
        <div className="flex mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400"
              placeholder="Search transactions"
            />
          </div>
        </div>
        
        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-800">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{getTransactionLabel(transaction)}</h4>
                        <div className="text-xs text-gray-400">{formatDate(transaction.date)}</div>
                      </div>
                      <div className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                    
                    {transaction.txId && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                        <span className="truncate">TX: {transaction.txId}</span>
                        <a 
                          href={`https://explorer.stacks.co/txid/${transaction.txId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                          aria-label="View on explorer"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gray-800 rounded-full">
                  <History className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <p className="text-gray-400">No transactions found</p>
              <p className="text-sm text-gray-500 mt-1">Try changing your filters or start a new transaction</p>
            </div>
          )}
        </div>
        
        {/* View More Button */}
        {transactions.length > 0 && (
          <div className="text-center mt-5">
            <button className="text-sm text-pink-400 dark:text-blue-400 hover:underline">
              View all transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryCard;
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Loader2, AlertCircle } from 'lucide-react';
import { claimRewards, formatBTCValue } from '@/services/stacksService';
import { useStacksAuth } from '@/context/StacksAuthContext';

const ClaimRewardsButton = ({ rewards, onClaimSuccess }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState(null);
  const [txId, setTxId] = useState(null);
  const { isAuthenticated } = useStacksAuth();

  const handleClaimRewards = async () => {
    if (!isAuthenticated || rewards <= 0 || isClaiming) return;
    
    try {
      setIsClaiming(true);
      setError(null);
      
      const response = await claimRewards();
      setTxId(response.txid);
      
      if (onClaimSuccess) {
        onClaimSuccess(response.txid);
      }
    } catch (error) {
      console.error('Claim rewards failed:', error);
      setError(error.message || 'Failed to claim rewards. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (txId) {
    return (
      <div className="p-4 rounded-lg bg-green-900/30 border border-green-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Coins className="h-5 w-5 text-green-400" />
          <p className="text-green-300 font-medium">Rewards claimed!</p>
        </div>
        <p className="text-gray-400 text-sm">Transaction ID: {txId.slice(0, 8)}...{txId.slice(-8)}</p>
        <a 
          href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
        >
          View transaction
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-300 font-medium">Failed to claim rewards</p>
        </div>
        <p className="text-gray-300 text-sm">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-3 px-4 py-2 bg-red-800/50 hover:bg-red-800 rounded-lg text-white text-sm transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleClaimRewards}
      disabled={rewards <= 0 || isClaiming}
      whileHover={rewards > 0 && !isClaiming ? { scale: 1.03 } : {}}
      whileTap={rewards > 0 && !isClaiming ? { scale: 0.98 } : {}}
      className={`w-full p-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
        rewards > 0 && !isClaiming
          ? 'bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700 text-white hover:opacity-90'
          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isClaiming ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : rewards > 0 ? (
        <>
          <Coins className="h-5 w-5" />
          Claim {formatBTCValue(rewards)} sBTC
        </>
      ) : (
        <>
          <Coins className="h-5 w-5" />
          No rewards to claim
        </>
      )}
    </motion.button>
  );
};

export default ClaimRewardsButton;
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { checkIn } from '@/services/stacksService';
import { useStacksAuth } from '@/context/StacksAuthContext';

const CheckInButton = ({ canCheckIn, onCheckInSuccess }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);
  const [txId, setTxId] = useState(null);
  const { isAuthenticated } = useStacksAuth();

  const handleCheckIn = async () => {
    if (!isAuthenticated || !canCheckIn || isChecking) return;
    
    try {
      setIsChecking(true);
      setError(null);
      
      const response = await checkIn();
      setTxId(response.txid);
      
      if (onCheckInSuccess) {
        onCheckInSuccess(response.txid);
      }
    } catch (error) {
      console.error('Check-in failed:', error);
      setError(error.message || 'Failed to check in. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
        <p className="text-gray-300 mb-2">Connect your wallet to check in</p>
      </div>
    );
  }

  if (txId) {
    return (
      <div className="p-4 rounded-lg bg-green-900/30 border border-green-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <p className="text-green-300 font-medium">Check-in successful!</p>
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
          <p className="text-red-300 font-medium">Check-in failed</p>
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
      onClick={handleCheckIn}
      disabled={!canCheckIn || isChecking}
      whileHover={canCheckIn && !isChecking ? { scale: 1.03 } : {}}
      whileTap={canCheckIn && !isChecking ? { scale: 0.98 } : {}}
      className={`w-full p-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
        canCheckIn && !isChecking
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-500 dark:to-purple-600 text-white hover:opacity-90'
          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isChecking ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : canCheckIn ? (
        <>
          <CheckCircle className="h-5 w-5" />
          Check in today
        </>
      ) : (
        <>
          <CheckCircle className="h-5 w-5" />
          Already checked in today
        </>
      )}
    </motion.button>
  );
};

export default CheckInButton;

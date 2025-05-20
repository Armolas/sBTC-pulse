'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useStacksAuth } from '@/context/StacksAuthContext';

const ConnectWalletModal = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  
  // Use try/catch to handle potential errors with useStacksAuth
  let authData = { authenticate: async () => {}, isLoading: false };
  try {
    authData = useStacksAuth();
  } catch (error) {
    console.warn('Auth context not available yet');
  }
  
  const { authenticate, isLoading } = authData;

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      await authenticate();
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setError('Failed to connect wallet. Please make sure you have a Stacks wallet installed.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Connect your Stacks wallet to check in daily and earn rewards.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting || isLoading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
            >
              {(isConnecting || isLoading) ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
            
            <p className="text-gray-400 text-xs mt-4 text-center">
              By connecting, you agree to the terms of service and privacy policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectWalletModal;

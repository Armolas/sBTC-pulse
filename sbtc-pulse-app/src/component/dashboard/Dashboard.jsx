'use client';

import React, { useState, useEffect } from 'react';
import { useStacksAuth } from '@/context/StacksAuthContext';
import { useContractData } from '@/hooks/useContractData';
import { useLeaderboardData } from '@/hooks/useLeaderboardData';
import { formatBTCValue, formatUSDValue } from '@/services/stacksService';
import { Loader2 } from 'lucide-react';
import UserStats from './UserStats';
import CheckInButton from './CheckInButton';
import ClaimRewardsButton from './ClaimRewardsButton';
import LeaderboardTable from './LeaderboardTable';
import ConnectWalletModal from '../layout/ConnectWalletModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcPrice, setBtcPrice] = useState(65000); // Default BTC price in USD
  const { isAuthenticated, isLoading: authLoading } = useStacksAuth();
  const { 
    streak, 
    rewards, 
    tier, 
    canCheckIn, 
    loading: contractDataLoading, 
    error: contractDataError 
  } = useContractData();
  
  const { 
    leaders, 
    totalUsers, 
    loading: leaderboardLoading, 
    error: leaderboardError 
  } = useLeaderboardData(10);

  // Fetch BTC price
  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        if (data && data.bitcoin && data.bitcoin.usd) {
          setBtcPrice(data.bitcoin.usd);
        }
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
      }
    };

    fetchBtcPrice();
    // Refresh price every 5 minutes
    const intervalId = setInterval(fetchBtcPrice, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleCheckInSuccess = (txId) => {
    console.log('Check-in successful with txId:', txId);
    // We don't need to manually update the UI as the useContractData hook
    // will refresh the data automatically
  };

  const handleClaimSuccess = (txId) => {
    console.log('Rewards claimed with txId:', txId);
    // We don't need to manually update the UI as the useContractData hook
    // will refresh the data automatically
  };

  const handleConnectWallet = () => {
    setIsModalOpen(true);
  };

  const isLoading = authLoading || contractDataLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
        <p className="text-gray-400">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - User stats */}
        <div className="lg:col-span-2 space-y-6">
          <UserStats 
            streak={streak} 
            rewards={rewards} 
            tier={tier} 
            btcPrice={btcPrice} 
            isAuthenticated={isAuthenticated}
            onConnectWallet={handleConnectWallet}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Daily Check-in</h3>
              <p className="text-gray-300 mb-6">
                Check in daily to increase your streak and earn more rewards.
              </p>
              <CheckInButton 
                canCheckIn={canCheckIn} 
                onCheckInSuccess={handleCheckInSuccess} 
              />
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Claim Rewards</h3>
              <p className="text-gray-300 mb-6">
                Claim your accumulated rewards as sBTC tokens.
              </p>
              <ClaimRewardsButton 
                rewards={rewards} 
                onClaimSuccess={handleClaimSuccess} 
              />
            </div>
          </div>
        </div>
        
        {/* Right column - Leaderboard */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
          <p className="text-gray-300 mb-6">
            Top users by streak and rewards. Total users: {totalUsers}
          </p>
          
          {leaderboardLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-4" />
              <p className="text-gray-400">Loading leaderboard...</p>
            </div>
          ) : leaderboardError ? (
            <div className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-center">
              <p className="text-red-300">Failed to load leaderboard data</p>
            </div>
          ) : (
            <LeaderboardTable leaders={leaders} />
          )}
        </div>
      </div>
      
      <ConnectWalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
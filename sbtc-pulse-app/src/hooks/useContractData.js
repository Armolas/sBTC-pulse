'use client';

import { useState, useEffect } from 'react';
import { useStacksAuth } from '../context/StacksAuthContext';
import { getStreak, getRewards, getTier } from '../services/stacksService';

export const useContractData = () => {
  const { isAuthenticated, userData } = useStacksAuth();
  const [contractData, setContractData] = useState({
    streak: 0,
    rewards: 0,
    tier: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchContractData = async () => {
      if (!isAuthenticated || !userData) {
        setContractData(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const userAddress = userData.profile.stxAddress.mainnet; // or .testnet for testnet
        
        const [streak, rewards, tier] = await Promise.all([
          getStreak(userAddress),
          getRewards(userAddress),
          getTier(userAddress)
        ]);

        setContractData({
          streak,
          rewards,
          tier,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching contract data:', error);
        setContractData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load data from contract'
        }));
      }
    };

    fetchContractData();
  }, [isAuthenticated, userData]);

  return contractData;
};
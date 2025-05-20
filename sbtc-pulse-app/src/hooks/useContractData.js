'use client';

import { useState, useEffect } from 'react';
import { useStacksAuth } from '../context/StacksAuthContext';
import { 
  getStreak, 
  getRewards, 
  getTier, 
  getLastCheckIn, 
  canCheckInToday,
  getCurrentAddress
} from '../services/stacksService';

export const useContractData = () => {
  const { isAuthenticated, userData } = useStacksAuth();
  const [contractData, setContractData] = useState({
    streak: 0,
    rewards: 0,
    tier: 0,
    lastCheckIn: 0,
    canCheckIn: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchContractData = async () => {
      if (!isAuthenticated) {
        setContractData(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const userAddress = getCurrentAddress();
        if (!userAddress) {
          throw new Error('No user address found');
        }
        
        const [streak, rewards, tier, lastCheckIn, canCheckInResult] = await Promise.all([
          getStreak(userAddress),
          getRewards(userAddress),
          getTier(userAddress),
          getLastCheckIn(userAddress),
          canCheckInToday(userAddress)
        ]);

        setContractData({
          streak,
          rewards,
          tier,
          lastCheckIn,
          canCheckIn: canCheckInResult,
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
    
    // Set up a refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchContractData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [isAuthenticated, userData]);

  return contractData;
};

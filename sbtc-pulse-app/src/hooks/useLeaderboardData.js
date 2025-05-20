'use client';

import { useState, useEffect } from 'react';
import { getLeaderboard, getTotalUsers } from '../services/stacksService';

export const useLeaderboardData = (limit = 10) => {
  const [leaderboardData, setLeaderboardData] = useState({
    leaders: [],
    totalUsers: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const [leaders, totalUsers] = await Promise.all([
          getLeaderboard(limit),
          getTotalUsers()
        ]);

        setLeaderboardData({
          leaders,
          totalUsers,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLeaderboardData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load leaderboard data'
        }));
      }
    };

    fetchLeaderboardData();
    
    // Set up a refresh interval (every 10 minutes)
    const intervalId = setInterval(fetchLeaderboardData, 10 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [limit]);

  return leaderboardData;
};
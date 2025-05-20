'use client';

import React from 'react';
import LeaderboardPage from '@/component/leaderboard/LeaderboardPage';

export const metadata = {
  title: 'Leaderboard | sBTC Pulse',
  description: 'View the top sBTC holders and their rewards',
};

export default function Leaderboard() {
  return <LeaderboardPage />;
}
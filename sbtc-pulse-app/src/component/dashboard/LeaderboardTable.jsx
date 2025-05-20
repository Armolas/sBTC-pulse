'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import { formatBTCValue } from '@/services/stacksService';

const LeaderboardTable = ({ leaders = [] }) => {
  if (!leaders || leaders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No leaderboard data available yet.</p>
      </div>
    );
  }

  const getTrophyColor = (index) => {
    switch (index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-300';
      case 2: return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Streak</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rewards</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr 
              key={leader.address || index} 
              className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/30'} hover:bg-gray-800 transition-colors`}
            >
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  {index < 3 ? (
                    <Trophy className={`h-4 w-4 mr-1 ${getTrophyColor(index)}`} />
                  ) : (
                    <span className="w-5 text-center">{index + 1}</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {leader.address ? 
                    `${leader.address.slice(0, 5)}...${leader.address.slice(-4)}` : 
                    `User ${index + 1}`
                  }
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-300">{leader.streak || 0}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-300">{formatBTCValue(leader.rewards || 0)} sBTC</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
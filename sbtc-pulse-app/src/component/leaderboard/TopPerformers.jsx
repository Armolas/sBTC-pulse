'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Award } from 'lucide-react';

const TopPerformers = ({ leaders, formatBTCValue }) => {
  // Badge configurations for top 3 positions
  const badges = [
    { 
      position: 1, 
      label: '1st Place',
      icon: <Trophy className="h-4 w-4" />,
      gradient: 'from-yellow-500 to-amber-600',
      textColor: 'text-amber-400',
      size: 'h-16 w-16'
    },
    { 
      position: 2, 
      label: '2nd Place',
      icon: <Medal className="h-4 w-4" />,
      gradient: 'from-gray-400 to-gray-500',
      textColor: 'text-gray-300',
      size: 'h-14 w-14'
    },
    { 
      position: 3, 
      label: '3rd Place',
      icon: <Award className="h-4 w-4" />,
      gradient: 'from-amber-700 to-amber-800',
      textColor: 'text-amber-600',
      size: 'h-12 w-12'
    }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <Trophy className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Hall of Fame</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Trophy Illustration */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="relative mb-4"
          >
            <Trophy className="h-16 w-16 text-yellow-400" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 h-16 w-16 rounded-full bg-yellow-400/20"
            ></motion.div>
          </motion.div>
          
          <h4 className="text-white font-medium text-center">Top Performers</h4>
          <p className="text-gray-400 text-sm text-center">Users with highest rewards earned</p>
        </div>
        
        {/* Top 3 Users */}
        <div className="space-y-4">
          {leaders.map((leader, index) => {
            const badge = badges[index];
            
            return (
              <motion.div
                key={leader.address || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`relative flex items-center justify-center ${badge.size}`}>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${badge.gradient} opacity-20`}></div>
                    <span className={`${badge.textColor} font-bold text-lg`}>#{badge.position}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-white font-medium">{leader.alias}</h5>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        leader.tier === 'Diamond' ? 'bg-blue-500/20 text-blue-300' : 
                        leader.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-gray-400/20 text-gray-300'
                      }`}>
                        {leader.tier}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      {leader.address ? 
                        `${leader.address.slice(0, 4)}...${leader.address.slice(-4)}` : 
                        'Anonymous'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-medium">{formatBTCValue(leader.rewards)} sBTC</div>
                  <div className="text-xs text-gray-400">{leader.streak} day streak</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Motivational Section */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 dark:from-blue-500/10 dark:to-purple-600/10 rounded-lg border border-pink-500/20 dark:border-blue-500/20 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-gray-800">
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <h5 className="text-white text-sm font-medium">Want to join the hall of fame?</h5>
                <p className="text-gray-300 text-xs mt-1">
                  Increase your locked sBTC amount and extend your lock duration to maximize rewards.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg text-xs text-white"
                >
                  Lock More sBTC
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp } from 'lucide-react';

const ComparisonCard = ({ comparison, userScore }) => {
  // Create percentage chart data
  const percentiles = [0, 25, 50, 75, 100];
  
  // Determine user position marker
  const userPosition = comparison.userPercentile;
  
  // Calculate circle positions for different metrics
  const getPosition = (value) => {
    // Scale the percentile to the range 0-100
    return value;
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Network Comparison</h3>
        </div>
      </div>
      
      <div className="p-5">
        {/* Percentile Chart */}
        <div className="mb-8">
          <div className="text-white font-medium mb-2">Your Score Percentile</div>
          <p className="text-gray-400 text-sm mb-6">
            Your health score is better than {comparison.userPercentile}% of all sBTC holders.
          </p>
          
          <div className="relative h-10 mb-1">
            <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${userPosition}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
              ></motion.div>
            </div>
            
            {/* Percentile markers */}
            {percentiles.map((percentile) => (
              <div 
                key={percentile} 
                className="absolute top-0 h-full flex items-center justify-center"
                style={{ left: `${percentile}%`, transform: 'translateX(-50%)' }}
              >
                <div className="h-4 w-0.5 bg-gray-600"></div>
              </div>
            ))}
            
            {/* Animated User Position Marker */}
            <motion.div
              initial={{ left: 0, opacity: 0 }}
              animate={{ left: `${userPosition}%`, opacity: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15 }}
              className="absolute top-0 -translate-x-1/2"
            >
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 flex items-center justify-center">
                  <Award className="h-3 w-3 text-white" />
                </div>
                <div className="w-0.5 h-2 bg-gray-400"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Percentile labels */}
          <div className="flex justify-between text-xs text-gray-500">
            {percentiles.map((percentile) => (
              <span key={percentile}>{percentile}%</span>
            ))}
          </div>
        </div>
        
        {/* Comparison Metrics */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 text-xs">Network Average</div>
                  <div className="text-white text-lg font-medium">{comparison.averageScore}</div>
                </div>
                <div className={`flex items-center text-xs ${userScore > comparison.averageScore ? 'text-green-400' : 'text-red-400'}`}>
                  {userScore > comparison.averageScore ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{userScore - comparison.averageScore}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                      {userScore - comparison.averageScore}
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(comparison.averageScore / 100) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gray-500"
                ></motion.div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 text-xs">Network Median</div>
                  <div className="text-white text-lg font-medium">{comparison.medianScore}</div>
                </div>
                <div className={`flex items-center text-xs ${userScore > comparison.medianScore ? 'text-green-400' : 'text-red-400'}`}>
                  {userScore > comparison.medianScore ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{userScore - comparison.medianScore}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                      {userScore - comparison.medianScore}
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(comparison.medianScore / 100) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="h-full bg-gray-500"
                ></motion.div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-xs">Top Performers</div>
                <div className="text-white text-lg font-medium">{comparison.topPerformers}</div>
              </div>
              <div className={`flex items-center text-xs ${userScore > comparison.topPerformers ? 'text-green-400' : 'text-yellow-400'}`}>
                {userScore > comparison.topPerformers ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{userScore - comparison.topPerformers}
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                    {userScore - comparison.topPerformers}
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(comparison.topPerformers / 100) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-green-500 to-green-600"
              ></motion.div>
            </div>
          </div>
        </div>
        
        {/* Visual Comparison */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex justify-between items-end mb-4">
            <h4 className="text-white font-medium">Score Distribution</h4>
            <div className="text-xs text-gray-400">Network-wide</div>
          </div>
          
          <div className="h-40 relative">
            {/* Bar chart visualization */}
            <div className="absolute inset-0 flex items-end justify-between gap-1">
              {/* Sample distribution - in real app, use actual distribution data */}
              {[5, 12, 18, 25, 20, 10, 5, 3, 1, 1].map((height, i) => {
                const scoreRange = i * 10;
                const isUserRange = userScore >= scoreRange && userScore < scoreRange + 10;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height * 3}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`flex-1 rounded-t ${
                      isUserRange 
                        ? 'bg-gradient-to-t from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600' 
                        : 'bg-gray-700'
                    }`}
                  >
                    {isUserRange && (
                      <div className="w-full flex justify-center -mt-6">
                        <div className="w-2 h-2 bg-pink-500 dark:bg-blue-400 rounded-full"></div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 translate-y-6 inset-x-0 flex justify-between text-xs text-gray-500">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
                <span key={value}>{value}</span>
              ))}
              <span>100</span>
            </div>
            
            {/* Y-axis label */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500">
              Users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
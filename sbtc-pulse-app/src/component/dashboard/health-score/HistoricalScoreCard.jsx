'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, Calendar, ChevronDown } from 'lucide-react';

const HistoricalScoreCard = ({ history }) => {
  const [timeRange, setTimeRange] = useState('6months');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };
  
  // Calculate the score change from first to last entry
  const firstScore = history[0].score;
  const lastScore = history[history.length - 1].score;
  const scoreChange = lastScore - firstScore;
  const percentChange = (scoreChange / firstScore * 100).toFixed(1);
  
  // Time range options
  const timeRangeOptions = [
    { id: '3months', label: 'Last 3 Months' },
    { id: '6months', label: 'Last 6 Months' },
    { id: '1year', label: 'Last 12 Months' },
    { id: 'all', label: 'All Time' }
  ];
  
  // Get the selected time range label
  const selectedRange = timeRangeOptions.find(option => option.id === timeRange);
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <History className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
            <h3 className="text-xl font-bold text-white">Historical Score</h3>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white text-sm"
            >
              <Calendar className="h-4 w-4" />
              <span>{selectedRange.label}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {timeRangeOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setTimeRange(option.id);
                      setShowDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      timeRange === option.id 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-medium">Score Progression</h4>
              <div className={`flex items-center text-sm ${scoreChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${scoreChange < 0 ? 'transform rotate-180' : ''}`} />
                <span>{scoreChange >= 0 ? '+' : ''}{scoreChange} pts ({scoreChange >= 0 ? '+' : ''}{percentChange}%)</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">From {formatDate(history[0].date)} to {formatDate(history[history.length - 1].date)}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-pink-500 dark:bg-blue-400"></div>
              <span className="text-xs text-gray-400">Health Score</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span className="text-xs text-gray-400">Network Avg</span>
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-72 relative">
          <div className="absolute inset-0">
            {/* Chart grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((_, i) => (
                <div key={i} className="border-t border-gray-800 w-full h-0 z-0" />
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-4">
              {[100, 75, 50, 25, 0].map((value, i) => (
                <div key={i} className="text-xs text-gray-500">{value}</div>
              ))}
            </div>
            
            {/* Chart lines */}
            <svg className="absolute inset-0 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Network average line (illustrative) */}
              <motion.path
                d="M0,40 L16.7,38 L33.4,42 L50,46 L66.7,50 L83.4,47 L100,50"
                stroke="#4b5563"
                fill="none"
                strokeWidth="1"
                strokeDasharray="2,2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              
              {/* User score line */}
              <motion.path
                d={`
                  M0,${100 - history[0].score} 
                  ${history.map((point, index) => {
                    const x = index * (100 / (history.length - 1));
                    const y = 100 - point.score;
                    return `L${x},${y}`;
                  }).join(' ')}
                `}
                stroke="url(#lineGradient)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2 }}
              />
              
              {/* Area fill */}
              <motion.path
                d={`
                  M0,${100 - history[0].score} 
                  ${history.map((point, index) => {
                    const x = index * (100 / (history.length - 1));
                    const y = 100 - point.score;
                    return `L${x},${y}`;
                  }).join(' ')}
                  L${100},${100 - lastScore} L100,100 L0,100 Z
                `}
                fill="url(#areaGradient)"
                opacity="0.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: 1 }}
              />
              
              {/* Data points */}
              {history.map((point, index) => {
                const x = index * (100 / (history.length - 1));
                const y = 100 - point.score;
                
                return (
                  <motion.circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="white"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
                  />
                );
              })}
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" className="dark:hidden" />
                  <stop offset="100%" stopColor="#9333ea" className="dark:hidden" />
                  <stop offset="0%" stopColor="#60a5fa" className="hidden dark:inline" />
                  <stop offset="100%" stopColor="#7c3aed" className="hidden dark:inline" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" className="dark:hidden" />
                  <stop offset="100%" stopColor="#9333ea" className="dark:hidden" />
                  <stop offset="0%" stopColor="#60a5fa" className="hidden dark:inline" />
                  <stop offset="100%" stopColor="#7c3aed" className="hidden dark:inline" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {history.map((point, index) => (
                <div key={index} className="text-xs text-gray-500">
                  {formatDate(point.date).split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Key Events */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="text-white font-medium mb-3">Key Score Changes</h4>
          
          <div className="space-y-3">
            {/* Sample key events - in a real app, this would be dynamic */}
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-gray-800 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="text-white text-sm">+5 points on Apr 1, 2025</div>
                <div className="text-gray-400 text-xs">Increased lock duration by 60 days</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-gray-800 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="text-white text-sm">+3 points on Feb 15, 2025</div>
                <div className="text-gray-400 text-xs">Added 0.05 BTC to position, improving collateral ratio</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-gray-800 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="text-white text-sm">+7 points on Jan 10, 2025</div>
                <div className="text-gray-400 text-xs">Optimized stacking strategy, boosting reward efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalScoreCard;
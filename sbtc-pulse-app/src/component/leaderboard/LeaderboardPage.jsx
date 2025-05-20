'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Share2, Download, Search, Filter, Calendar, ChevronDown, Medal, TrendingUp, Trophy, Flag, Activity } from 'lucide-react';
import LeaderboardTable from './LeaderboardTable';
import LeaderboardStats from './LeaderboardStats';
import TopPerformers from './TopPerformers';
import YourRanking from './YourRanking';

// Mock utility function to format BTC values
const formatBTCValue = (value) => {
  return value.toFixed(6);
};

const LeaderboardPage = () => {
  // State for animation control
  const [showPage, setShowPage] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('rewards');
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock leaderboard data
  const mockLeaders = [
    { 
      address: '0x8e7c3f92a74d5b6',
      alias: 'SatoshiFan',
      streak: 124,
      rewards: 0.034256,
      healthScore: 94,
      lockDuration: 180,
      tier: 'Diamond' 
    },
    { 
      address: '0x9f7b2d4e5a8c1f3',
      alias: 'StackerJack',
      streak: 118,
      rewards: 0.028524,
      healthScore: 89,
      lockDuration: 90,
      tier: 'Diamond' 
    },
    { 
      address: '0x2d4e5a8c1f39f7b',
      alias: 'BTCmaxi21',
      streak: 103,
      rewards: 0.023158,
      healthScore: 87,
      lockDuration: 90,
      tier: 'Gold' 
    },
    { 
      address: '0x5a8c1f39f7b2d4e',
      alias: 'Nakamoto22',
      streak: 97,
      rewards: 0.018765,
      healthScore: 82,
      lockDuration: 60,
      tier: 'Gold' 
    },
    { 
      address: '0x1f39f7b2d4e5a8c',
      alias: 'Satsstacker',
      streak: 86,
      rewards: 0.016442,
      healthScore: 79,
      lockDuration: 30,
      tier: 'Silver' 
    },
    { 
      address: '0x9f7b2d4e5a8c1f3',
      alias: 'BTCbull',
      streak: 78,
      rewards: 0.014218,
      healthScore: 75,
      lockDuration: 60,
      tier: 'Silver' 
    },
    { 
      address: '0x7b2d4e5a8c1f39f',
      alias: 'stacksDevGirl',
      streak: 72,
      rewards: 0.012643,
      healthScore: 73,
      lockDuration: 90,
      tier: 'Silver' 
    },
    { 
      address: '0x4e5a8c1f39f7b2d',
      alias: 'BugHunter',
      streak: 65,
      rewards: 0.011295,
      healthScore: 70,
      lockDuration: 30,
      tier: 'Bronze' 
    },
    { 
      address: '0xa8c1f39f7b2d4e5',
      alias: 'DegenTrader',
      streak: 58,
      rewards: 0.009873,
      healthScore: 68,
      lockDuration: 60,
      tier: 'Bronze' 
    },
    { 
      address: '0xc1f39f7b2d4e5a8',
      alias: 'CryptoPenguin',
      streak: 52,
      rewards: 0.008654,
      healthScore: 65,
      lockDuration: 30,
      tier: 'Bronze' 
    },
    // Add more mock data as needed
  ];
  
  // Filter leaders based on search query
  const filteredLeaders = mockLeaders.filter(leader => 
    leader.alias?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leader.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Current user ranking (mock data)
  const userRanking = {
    rank: 18,
    totalRanks: 12450,
    percentile: 99.85,
    address: '0x82a37f9',
    alias: 'Satoshi.btc',
    streak: 42,
    rewards: 0.005678,
    healthScore: 87,
    lockDuration: 90,
    tier: 'Gold'
  };
  
  // Leaderboard stats
  const leaderboardStats = {
    totalParticipants: 12450,
    totalRewards: 25.376,
    averageHealthScore: 73,
    topTierCount: 38
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Timeframe options
  const timeframeOptions = [
    { id: 'all-time', label: 'All Time' },
    { id: 'this-month', label: 'This Month' },
    { id: 'this-week', label: 'This Week' },
    { id: 'today', label: 'Today' }
  ];
  
  // Category options
  const categoryOptions = [
    { id: 'rewards', label: 'Rewards', icon: <Trophy className="h-4 w-4" /> },
    { id: 'streak', label: 'Streak', icon: <Flag className="h-4 w-4" /> },
    { id: 'health-score', label: 'Health Score', icon: <Activity className="h-4 w-4" /> }
  ];
  
  // Show page with slight delay for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get selected options labels
  const selectedTimeframeLabel = timeframeOptions.find(option => option.id === selectedTimeframe)?.label;
  const selectedCategoryLabel = categoryOptions.find(option => option.id === selectedCategory)?.label;
  const selectedCategoryIcon = categoryOptions.find(option => option.id === selectedCategory)?.icon;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-gray-400">Compete with other sBTC holders and climb the ranks</p>
      </div>
      
      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={showPage ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leaderboard Card */}
          <motion.div variants={itemVariants} className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
            <div className="p-5 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">Top Performers</h3>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              {/* Filter Controls */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white text-sm"
                    >
                      {selectedCategoryIcon}
                      <span>{selectedCategoryLabel}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showCategoryDropdown && (
                      <div className="absolute mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                        {categoryOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSelectedCategory(option.id);
                              setShowCategoryDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                              selectedCategory === option.id 
                                ? 'bg-gray-700 text-white' 
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            {option.icon}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Timeframe Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white text-sm"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{selectedTimeframeLabel}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showTimeframeDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showTimeframeDropdown && (
                      <div className="absolute mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                        {timeframeOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSelectedTimeframe(option.id);
                              setShowTimeframeDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              selectedTimeframe === option.id 
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
                
                {/* Search Box */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400"
                    placeholder="Search users or addresses"
                  />
                </div>
              </div>
              
              {/* Leaderboard Table */}
              <LeaderboardTable leaders={filteredLeaders} formatBTCValue={formatBTCValue} />
              
              {/* Pagination */}
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Showing <span className="text-white">1-10</span> of <span className="text-white">{leaderboardStats.totalParticipants}</span> users
                </div>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:text-white text-sm">Previous</button>
                  <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white text-sm">Next</button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Leaderboard Stats Card */}
          <motion.div variants={itemVariants}>
            <LeaderboardStats stats={leaderboardStats} />
          </motion.div>
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          {/* Your Ranking Card */}
          <motion.div variants={itemVariants}>
            <YourRanking ranking={userRanking} formatBTCValue={formatBTCValue} />
          </motion.div>
          
          {/* Top Performers Card */}
          <motion.div variants={itemVariants}>
            <TopPerformers leaders={mockLeaders.slice(0, 3)} formatBTCValue={formatBTCValue} />
          </motion.div>
          
          {/* Rules Card */}
          <motion.div variants={itemVariants} className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
            <div className="p-5 border-b border-gray-800">
              <div className="flex items-center">
                <Flag className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Leaderboard Rules</h3>
              </div>
            </div>
            
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">1</span>
                  </div>
                  <p className="text-gray-300 text-sm">Rankings are calculated based on total rewards earned, streak days, and health score.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">2</span>
                  </div>
                  <p className="text-gray-300 text-sm">Streaks are counted as consecutive days with active sBTC staking.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">3</span>
                  </div>
                  <p className="text-gray-300 text-sm">Tiers are awarded based on a combination of metrics and time spent in the ecosystem.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">4</span>
                  </div>
                  <p className="text-gray-300 text-sm">Seasonal competitions reset at the beginning of each quarter.</p>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="text-pink-400 dark:text-blue-400 text-sm hover:underline">View complete rules</a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;

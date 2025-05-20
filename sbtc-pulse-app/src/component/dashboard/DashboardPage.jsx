'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, Wallet, TrendingUp, Users, Clock, Bell, ArrowRight, Gauge, LineChart, BarChart3, DollarSign } from 'lucide-react';
import  HealthScoreComponent  from './HealthScoreComponent';

const DashboardPage = () => {
  // State for the welcome notification dismiss
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Animation variants for staggered animations
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
  
  // Quick stats for the dashboard
  const quickStats = [
    { 
      icon: <Wallet className="h-5 w-5 text-white" />, 
      label: "sBTC Balance", 
      value: "0.8732",
      subValue: "+0.0123 (24h)",
      color: "from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-700" 
    },
    { 
      icon: <Activity className="h-5 w-5 text-white" />, 
      label: "Health Score", 
      value: "87/100",
      subValue: "+3 points (7d)",
      color: "from-green-400 to-green-600 dark:from-green-400 dark:to-green-700" 
    },
    { 
      icon: <TrendingUp className="h-5 w-5 text-white" />, 
      label: "Rewards Earned", 
      value: "0.0452 BTC",
      subValue: "$3,943.51",
      color: "from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-700" 
    },
    { 
      icon: <Clock className="h-5 w-5 text-white" />, 
      label: "Lock Remaining", 
      value: "37 days",
      subValue: "Next epoch: 7d",
      color: "from-orange-400 to-orange-600 dark:from-orange-400 dark:to-orange-700" 
    }
  ];

  // Recent activity data
  const recentActivity = [
    { 
      type: "reward",
      title: "Epoch Reward Received",
      amount: "+0.0023 BTC",
      time: "2 hours ago",
      icon: <DollarSign className="h-5 w-5 text-green-400" />
    },
    { 
      type: "health",
      title: "Health Score Improved",
      amount: "+5 points",
      time: "1 day ago",
      icon: <Activity className="h-5 w-5 text-blue-400" />
    },
    { 
      type: "lock",
      title: "sBTC Lock Extended",
      amount: "90 days",
      time: "2 days ago",
      icon: <Clock className="h-5 w-5 text-purple-400" />
    },
    { 
      type: "pegin",
      title: "sBTC Peg-in",
      amount: "+0.15 BTC",
      time: "5 days ago",
      icon: <TrendingUp className="h-5 w-5 text-pink-400" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome notification */}
      {showWelcome && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 backdrop-blur-lg border border-pink-500/20 dark:border-blue-500/20 rounded-xl p-4 relative"
        >
          <button 
            onClick={() => setShowWelcome(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
            aria-label="Dismiss"
          >
            &times;
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Welcome to sBTC Pulse</h3>
              <p className="text-gray-300">
                Your personal sBTC analytics dashboard is ready. Explore your health score and optimize your position!
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Quick stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
          >
            <div className="p-1">
              <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-3 flex items-center gap-3`}>
                <div className="p-2 bg-black/20 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xs font-medium text-white/80">{stat.label}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 flex justify-between items-center">
              <div className="text-xs text-green-400">{stat.subValue}</div>
              <Link 
                href={`/dashboard/${stat.label.toLowerCase().replace(' ', '-')}`}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                Details <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Main dashboard content - 2 columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health score card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HealthScoreComponent />
          </motion.div>
          
          {/* Rewards chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <LineChart className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Rewards History</h3>
              </div>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400">
                <option value="6months">Last 6 Months</option>
                <option value="year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <div className="h-64 relative">
              {/* Placeholder for chart - would be implemented with recharts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full flex items-end gap-1 px-2">
                  {[35, 42, 28, 56, 48, 62, 78, 65, 50, 68, 72, 45].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-sm relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        0.00{Math.floor(height/10)}2 BTC
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <div className="text-gray-400">Total Rewards</div>
                <div className="text-white font-medium">0.0452 BTC</div>
              </div>
              <div>
                <div className="text-gray-400">Last Month</div>
                <div className="text-white font-medium">0.0045 BTC</div>
              </div>
              <div>
                <div className="text-gray-400">Projected Annual</div>
                <div className="text-white font-medium">0.0540 BTC</div>
              </div>
            </div>
          </motion.div>
          
          {/* Network overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center mb-6">
              <BarChart3 className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Network Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Total Value Locked</div>
                <div className="text-xl font-bold text-white">1,350 BTC</div>
                <div className="text-xs text-green-400 mt-1">+14.2% (30d)</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Active Users</div>
                <div className="text-xl font-bold text-white">12,450</div>
                <div className="text-xs text-green-400 mt-1">+428 (30d)</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Current APY</div>
                <div className="text-xl font-bold text-white">5.1%</div>
                <div className="text-xs text-green-400 mt-1">+0.3% (30d)</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/dashboard/analytics">
                <button className="text-sm text-pink-400 dark:text-blue-400 hover:underline flex items-center gap-1 mx-auto">
                  View detailed analytics <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Right column - 1/3 width */}
        <div className="space-y-6">
          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <Link href="/dashboard/activity">
                <button className="text-xs text-gray-400 hover:text-white">
                  View All
                </button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-800 rounded-full mt-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {recentActivity.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No recent activity</p>
              </div>
            )}
          </motion.div>
          
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="text-sm font-medium text-white mb-1">New Epoch Started</div>
                <p className="text-xs text-gray-300">
                  Epoch #42 has started. Lock your sBTC to maximize rewards.
                </p>
                <div className="flex justify-end mt-2">
                  <Link href="/dashboard/my-sbtc">
                    <button className="text-xs text-pink-400 dark:text-blue-400 hover:underline">
                      Lock sBTC
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="text-sm font-medium text-white mb-1">Health Score Alert</div>
                <p className="text-xs text-gray-300">
                  Your health score could be improved by adding more collateral.
                </p>
                <div className="flex justify-end mt-2">
                  <Link href="/dashboard/health-score">
                    <button className="text-xs text-pink-400 dark:text-blue-400 hover:underline">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/dashboard/notifications">
                <button className="text-sm text-pink-400 dark:text-blue-400 hover:underline flex items-center gap-1 mx-auto">
                  Manage notifications <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <Link href="/dashboard/my-sbtc">
                <button className="w-full p-3 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all">
                  Lock More sBTC
                </button>
              </Link>
              
              <Link href="/dashboard/analytics">
                <button className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                  View Analytics
                </button>
              </Link>
              
              <Link href="/dashboard/leaderboard">
                <button className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
                  Check Leaderboard
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Clock, Shield, Info, ChevronRight, ChevronDown } from 'lucide-react';

export const HealthScoreComponent = ({ initialScore = 87 }) => {
  const [score, setScore] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Component metrics
  const metrics = {
    collateralRatio: 85,
    rewardEfficiency: 92,
    lockDuration: 76,
  };
  
  // Recommendations based on metrics
  const recommendations = [
    { 
      id: 1,
      title: "Extend Lock Duration",
      description: "Increasing your lock duration by 30 days could boost your score by +4 points.",
      impact: "medium",
      metric: "lockDuration"
    },
    { 
      id: 2,
      title: "Increase Collateral",
      description: "Adding 0.1 BTC to your position would improve your score by +6 points.",
      impact: "high",
      metric: "collateralRatio"
    },
    { 
      id: 3,
      title: "Optimize Stacking Strategy",
      description: "Adjust your stacking delegation to increase reward efficiency.",
      impact: "low",
      metric: "rewardEfficiency"
    }
  ];

  // Animate score on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(initialScore);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [initialScore]);
  
  // Get color based on score value
  const getScoreColor = (value) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 75) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Get color for progress bar
  const getProgressColor = (value) => {
    if (value >= 90) return 'bg-green-400';
    if (value >= 75) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get background color for recommendations based on impact
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 border-pink-500/30 dark:border-blue-500/30';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-yellow-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };
  
  // History data for the chart
  const historyData = [
    { date: 'Jan', score: 68 },
    { date: 'Feb', score: 72 },
    { date: 'Mar', score: 75 },
    { date: 'Apr', score: 80 },
    { date: 'May', score: 87 }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-7 w-7 text-pink-500 dark:text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Health Score</h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
            {/* Score Gauge */}
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="16"
                />
                
                {/* Score Progress */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="stroke-pink-500 dark:stroke-blue-400"
                />
              </svg>
              
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <motion.p 
                  className={`text-4xl font-bold ${getScoreColor(score)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {score}
                </motion.p>
                <p className="text-gray-400 text-sm">/ 100</p>
              </motion.div>
            </div>
            
            {/* Score Components */}
            <div className="flex-1 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-2" />
                    <span className="text-gray-300 text-sm">Collateral Ratio</span>
                  </div>
                  <span className={`text-sm ${getScoreColor(metrics.collateralRatio)}`}>{metrics.collateralRatio}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${getProgressColor(metrics.collateralRatio)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.collateralRatio}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-2" />
                    <span className="text-gray-300 text-sm">Reward Efficiency</span>
                  </div>
                  <span className={`text-sm ${getScoreColor(metrics.rewardEfficiency)}`}>{metrics.rewardEfficiency}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${getProgressColor(metrics.rewardEfficiency)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.rewardEfficiency}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-pink-500 dark:text-blue-400 mr-2" />
                    <span className="text-gray-300 text-sm">Lock Duration</span>
                  </div>
                  <span className={`text-sm ${getScoreColor(metrics.lockDuration)}`}>{metrics.lockDuration}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${getProgressColor(metrics.lockDuration)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.lockDuration}%` }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="flex items-center mt-2 text-sm text-gray-400 gap-1">
                <Info className="h-4 w-4" />
                <span>Health score is calculated based on collateral, rewards, and lock duration.</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`px-4 py-2 border-b-2 ${
                  selectedTab === 'overview' 
                    ? 'border-pink-500 dark:border-blue-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                } transition-colors`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`px-4 py-2 border-b-2 ${
                  selectedTab === 'history' 
                    ? 'border-pink-500 dark:border-blue-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                } transition-colors`}
              >
                History
              </button>
              <button
                onClick={() => setSelectedTab('recommendations')}
                className={`px-4 py-2 border-b-2 ${
                  selectedTab === 'recommendations' 
                    ? 'border-pink-500 dark:border-blue-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                } transition-colors`}
              >
                Recommendations
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[200px]">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Score Breakdown</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex-1 min-w-[120px] bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-400">Collateral</div>
                      <div className="text-lg font-bold text-white">{Math.round(metrics.collateralRatio * 0.4)} pts</div>
                      <div className="text-xs text-gray-500">40% weight</div>
                    </div>
                    <div className="flex-1 min-w-[120px] bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-400">Rewards</div>
                      <div className="text-lg font-bold text-white">{Math.round(metrics.rewardEfficiency * 0.4)} pts</div>
                      <div className="text-xs text-gray-500">40% weight</div>
                    </div>
                    <div className="flex-1 min-w-[120px] bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-400">Lock</div>
                      <div className="text-lg font-bold text-white">{Math.round(metrics.lockDuration * 0.2)} pts</div>
                      <div className="text-xs text-gray-500">20% weight</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Health Score Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                      <span className="text-gray-300 text-sm">Higher rewards tier access (90+ score)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                      <span className="text-gray-300 text-sm">Lower liquidation risk (80+ score)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                      <span className="text-gray-300 text-sm">Better leaderboard ranking (85+ score)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
            
            {/* History Tab */}
            {selectedTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex justify-between items-center">
                  <h4 className="text-white font-medium">Recent History</h4>
                  <select className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm text-gray-300">
                    <option value="6months">Last 6 Months</option>
                    <option value="year">Last Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                
                <div className="h-64 relative">
                  <div className="absolute inset-0">
                    <div className="w-full h-full flex items-end">
                      <div className="w-full h-full flex items-end justify-between px-2">
                        {historyData.map((item, i) => (
                          <div key={i} className="flex flex-col items-center w-16">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${(item.score / 100) * 80}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className={`w-8 rounded-t-md ${getProgressColor(item.score)}`}
                            ></motion.div>
                            <div className="mt-2 text-xs text-gray-400">{item.date}</div>
                            <div className="text-xs text-white">{item.score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Horizontal guide lines */}
                    <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none">
                      {[0, 1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="border-t border-gray-700 w-full h-0" />
                      ))}
                    </div>
                    
                    {/* Score labels */}
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-10 pointer-events-none">
                      {[100, 75, 50, 25, 0].map((score, i) => (
                        <div key={i} className="text-xs text-gray-500">{score}</div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-400">Score Change (30d)</div>
                      <div className="flex items-center">
                        <span className="text-green-400 text-lg font-medium">+7 points</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">All Time High</div>
                      <div className="text-white text-lg font-medium">87 points</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Recommendations Tab */}
            {selectedTab === 'recommendations' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${getImpactColor(rec.impact)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{rec.title}</h4>
                        <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                      </div>
                      <div className="px-2 py-1 bg-gray-900/60 rounded text-xs font-medium text-white">
                        {rec.impact === 'high' ? 'High Impact' : rec.impact === 'medium' ? 'Medium Impact' : 'Low Impact'}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {recommendations.length === 0 && (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                      <Activity className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-gray-400">No recommendations at this time. Your score is optimized!</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthScoreComponent;
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Shield, Clock, Zap, Info, Download, Share2 } from 'lucide-react';
import HealthScoreGauge from './health-score/healthScoreGauge';
import ScoreBreakdownCard from './health-score/ScoreBreakdownCard';
import HistoricalScoreCard from './health-score/HistoricalScoreCard';
import RecommendationsCard from './health-score/RecommendationsCard';
import ComparisonCard from './health-score/ComparisonCard';
import HealthStatusCard from './health-score/HealthStatusCard';

const HealthScorePage = () => {
  // State for animation control
  const [showPage, setShowPage] = useState(false);
  
  // Health score data
  const healthScoreData = {
    currentScore: 87,
    previousScore: 82,
    lastUpdated: '2025-05-15T10:30:00Z',
    breakdown: {
      collateralRatio: 85, // 40% weight
      rewardEfficiency: 92, // 40% weight
      lockDuration: 76, // 20% weight
    },
    history: [
      { date: '2024-12-01', score: 68 },
      { date: '2025-01-01', score: 72 },
      { date: '2025-02-01', score: 75 },
      { date: '2025-03-01', score: 80 },
      { date: '2025-04-01', score: 82 },
      { date: '2025-05-01', score: 87 }
    ],
    recommendations: [
      { 
        id: 1,
        title: "Extend Lock Duration",
        description: "Increasing your lock duration by 30 days could boost your score by +4 points.",
        impact: "medium",
        metric: "lockDuration",
        actionLabel: "Extend Lock"
      },
      { 
        id: 2,
        title: "Increase Collateral",
        description: "Adding 0.1 BTC to your position would improve your score by +6 points.",
        impact: "high",
        metric: "collateralRatio",
        actionLabel: "Add Collateral"
      },
      { 
        id: 3,
        title: "Optimize Stacking Strategy",
        description: "Adjust your stacking delegation to increase reward efficiency.",
        impact: "low",
        metric: "rewardEfficiency",
        actionLabel: "View Options"
      }
    ],
    networkComparison: {
      userPercentile: 82,
      averageScore: 73,
      medianScore: 76,
      topPerformers: 92
    },
    status: {
      liquidationRisk: "Low",
      rewardTier: "Gold",
      nextTier: {
        name: "Platinum",
        threshold: 90,
        benefits: "Priority peg-out, reduced fees"
      }
    }
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
  
  // Calculate the change in score
  const scoreChange = healthScoreData.currentScore - healthScoreData.previousScore;
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show page with slight delay for smooth animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Health Score</h1>
        <p className="text-gray-400">Monitor and optimize your sBTC position</p>
      </div>
      
      {/* Top Stats & Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div 
          className="lg:col-span-2 bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={showPage ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div>
              <HealthScoreGauge score={healthScoreData.currentScore} />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Your Health Score</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400">Previous: {healthScoreData.previousScore}</span>
                  <span className={`flex items-center text-sm ${scoreChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {scoreChange >= 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{scoreChange} pts
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                        {scoreChange} pts
                      </>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400">Collateral Ratio</div>
                      <div className="text-sm text-white">{healthScoreData.breakdown.collateralRatio}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400">Reward Efficiency</div>
                      <div className="text-sm text-white">{healthScoreData.breakdown.rewardEfficiency}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-pink-500 dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400">Lock Duration</div>
                      <div className="text-sm text-white">{healthScoreData.breakdown.lockDuration}%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-400 gap-1">
                <Info className="h-3 w-3" />
                <span>Last updated: {formatDate(healthScoreData.lastUpdated)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-800">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
            >
              <Download className="h-4 w-4" />
              <span>Export Score Report</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Report</span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Health Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showPage ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HealthStatusCard statusData={healthScoreData.status} score={healthScoreData.currentScore} />
        </motion.div>
      </div>
      
      {/* Main Content Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={showPage ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Breakdown Card */}
          <motion.div variants={itemVariants}>
            <ScoreBreakdownCard breakdown={healthScoreData.breakdown} />
          </motion.div>
          
          {/* Historical Score Card */}
          <motion.div variants={itemVariants}>
            <HistoricalScoreCard history={healthScoreData.history} />
          </motion.div>
          
          {/* Comparison Card */}
          <motion.div variants={itemVariants}>
            <ComparisonCard comparison={healthScoreData.networkComparison} userScore={healthScoreData.currentScore} />
          </motion.div>
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          {/* Recommendations Card */}
          <motion.div variants={itemVariants}>
            <RecommendationsCard recommendations={healthScoreData.recommendations} />
          </motion.div>
          
          {/* Resources Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Resources</h3>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors">
                  <h4 className="text-white font-medium mb-1">Health Score Guide</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Learn how the health score is calculated and how to optimize your position.
                  </p>
                  <a href="#" className="text-pink-400 dark:text-blue-400 text-sm hover:underline">Read Guide</a>
                </div>
                
                <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors">
                  <h4 className="text-white font-medium mb-1">Optimization Strategies</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Advanced strategies to maximize your rewards and health score.
                  </p>
                  <a href="#" className="text-pink-400 dark:text-blue-400 text-sm hover:underline">View Strategies</a>
                </div>
                
                <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors">
                  <h4 className="text-white font-medium mb-1">Video Tutorial</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Watch a step-by-step guide on managing your health score.
                  </p>
                  <a href="#" className="text-pink-400 dark:text-blue-400 text-sm hover:underline">Watch Now</a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* FAQ Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">FAQs</h3>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <h4 className="text-white font-medium mb-1">What is the Health Score?</h4>
                  <p className="text-gray-400 text-sm">
                    The Health Score is a measure of your sBTC position's stability, efficiency, and reward potential.
                  </p>
                </div>
                
                <div className="border-b border-gray-800 pb-4">
                  <h4 className="text-white font-medium mb-1">How often is my score updated?</h4>
                  <p className="text-gray-400 text-sm">
                    Your Health Score is updated in real-time when you make changes to your position, and once daily otherwise.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-1">What happens if my score drops too low?</h4>
                  <p className="text-gray-400 text-sm">
                    A low Health Score increases liquidation risk and reduces your reward efficiency. We'll notify you when action is needed.
                  </p>
                </div>
                
                <div className="mt-4 pt-2">
                  <a href="#" className="text-pink-400 dark:text-blue-400 text-sm hover:underline">View all FAQs</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthScorePage;
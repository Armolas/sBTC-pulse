'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, Shield, Zap, Clock, TrendingUp, ChevronRight } from 'lucide-react';

const RecommendationsCard = ({ recommendations }) => {
  // Get icon based on metric
  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'collateralRatio':
        return <Shield className="h-5 w-5 text-white" />;
      case 'rewardEfficiency':
        return <Zap className="h-5 w-5 text-white" />;
      case 'lockDuration':
        return <Clock className="h-5 w-5 text-white" />;
      default:
        return <TrendingUp className="h-5 w-5 text-white" />;
    }
  };
  
  // Get background color based on impact
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'from-pink-500 to-purple-600 dark:from-blue-500 dark:to-purple-600';
      case 'medium':
        return 'from-yellow-500 to-orange-600';
      case 'low':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  // Get impact label
  const getImpactLabel = (impact) => {
    switch (impact) {
      case 'high':
        return 'High Impact';
      case 'medium':
        return 'Medium Impact';
      case 'low':
        return 'Low Impact';
      default:
        return 'Impact Unknown';
    }
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center">
          <LightbulbIcon className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-bold text-white">Recommendations</h3>
        </div>
      </div>
      
      <div className="p-5">
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-gray-800/40 border border-gray-700 rounded-lg p-5 hover:bg-gray-800/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${getImpactColor(recommendation.impact)}`}>
                    {getMetricIcon(recommendation.metric)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-white font-medium">{recommendation.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        recommendation.impact === 'high' 
                          ? 'bg-pink-500/20 text-pink-400 dark:bg-blue-500/20 dark:text-blue-400' 
                          : recommendation.impact === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {getImpactLabel(recommendation.impact)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mt-2 mb-4">{recommendation.description}</p>
                    
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1 text-sm ${
                        recommendation.impact === 'high'
                          ? 'text-pink-400 dark:text-blue-400'
                          : recommendation.impact === 'medium'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      {recommendation.actionLabel} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
                
                {recommendation.impact === 'high' && (
                  <motion.div
                    initial={{ opacity: 0, width: '0%' }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-500 dark:to-purple-600"
                  />
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-800 rounded-full">
                <LightbulbIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <p className="text-gray-400">No recommendations available</p>
            <p className="text-sm text-gray-500 mt-1">Your health score is already optimized!</p>
          </div>
        )}
        
        {/* Understanding Section */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="text-white font-medium mb-3">Understanding Recommendations</h4>
          
          <div className="bg-gray-800/40 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-pink-400 dark:text-blue-400 mt-0.5">
                <LightbulbIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  Recommendations are personalized suggestions to improve your health score. Higher impact actions provide greater score improvements.
                </p>
                <a href="#" className="text-pink-400 dark:text-blue-400 text-xs mt-2 inline-block hover:underline">
                  Learn more about optimization strategies
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="text-white font-medium mb-3">Quick Actions</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="p-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-600/10 dark:from-blue-500/10 dark:to-purple-600/10 border border-pink-500/20 dark:border-blue-500/20"
            >
              <div className="flex flex-col items-center">
                <Shield className="h-6 w-6 text-pink-400 dark:text-blue-400 mb-1" />
                <span className="text-white text-sm">Add Collateral</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-600/10 border border-purple-500/20"
            >
              <div className="flex flex-col items-center">
                <Zap className="h-6 w-6 text-purple-400 mb-1" />
                <span className="text-white text-sm">Optimize Rewards</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border border-yellow-500/20"
            >
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-yellow-400 mb-1" />
                <span className="text-white text-sm">Extend Lock</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsCard;
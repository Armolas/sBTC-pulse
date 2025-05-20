'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Activity, BarChart3, Award, Bell, LineChart, Lock, Zap } from 'lucide-react';
import { Github as GitHub } from 'lucide-react';

// Animation component that appears from left or right
const AnimatedSection = ({ children, direction = "left", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ x: direction === "left" ? -100 : 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: direction === "left" ? -100 : 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const HomePage = () => {
  const scrollRef = useRef(null);
  
  // Features data
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "Personal Dashboard",
      description: "View your locked sBTC amount, rewards earned, lock duration, and peg-in/out history with real-time TVL and BTC price metrics."
    },
    {
      icon: <Activity className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "sBTC Health Score",
      description: "Smart scoring system to understand and improve your position with collateral ratio, reward efficiency, and lock duration metrics."
    },
    {
      icon: <Award className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "Gamified Leaderboard",
      description: "Rank wallets based on rewards, efficiency, and activity. Earn badges, streaks, and climb tiers from Bronze to Diamond."
    },
    {
      icon: <LineChart className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "Ecosystem Insights",
      description: "Monitor network-wide metrics including total sBTC locked, average health score, yield trends, and wallet activity."
    },
    {
      icon: <Bell className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "Smart Alerts",
      description: "Customize triggers for price movements, epoch changes, or health score drops with notifications via email or Telegram."
    },
    {
      icon: <Lock className="h-10 w-10 text-pink-400 dark:text-blue-400" />,
      title: "Secure Integration",
      description: "Connect securely with popular Bitcoin and Stacks wallets with no server-side storage of private keys."
    }
  ];

  return (
    <div ref={scrollRef}>
      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 dark:from-blue-300 dark:via-purple-400 dark:to-blue-400">
              sBTC Pulse
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
              Track. Score. Dominate the Bitcoin DeFi game.
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              An interactive analytics and monitoring dashboard tailored for users in the sBTC ecosystem. 
              Transform raw blockchain data into personalized insights and simplify DeFi through intuitive UX.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <button 
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all"
                >
                  Launch App <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </motion.div>
            
            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <button 
                  className="px-8 py-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  View on GitHub <GitHub className="h-5 w-5" />
                </button>
              </a>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Features Section with alternating animations */}
      <section id="features" className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 dark:from-blue-300 dark:to-purple-500">
                Core Features
              </h2>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Powerful tools designed to enhance your sBTC experience and maximize your DeFi potential
              </p>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"} 
                delay={0.1 * index}
              >
                <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 dark:hover:border-blue-500/30 transition-colors h-full">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 dark:from-blue-300 dark:to-purple-500">
                Personal Analytics Dashboard
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Get a comprehensive view of your sBTC holdings, rewards, and performance metrics all in one place. 
                Make informed decisions with real-time data and personalized insights.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Real-time sBTC balance tracking",
                  "Visualize rewards across epochs",
                  "Health score with actionable recommendations",
                  "Historical peg-in and peg-out activity"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Zap className="h-5 w-5 text-pink-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/dashboard">
                <button 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all"
                >
                  Preview Dashboard
                </button>
              </Link>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-sm text-gray-400">sBTC Pulse Dashboard</div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Total sBTC Locked</div>
                      <div className="text-xl font-bold text-white">0.8732 sBTC</div>
                      <div className="text-xs text-green-400 mt-1">+0.0123 (24h)</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Health Score</div>
                      <div className="text-xl font-bold text-white">87/100</div>
                      <div className="text-xs text-green-400 mt-1">+3 points (7d)</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-400 mb-2">Rewards History</div>
                    <div className="h-40 flex items-end gap-1">
                      {[30, 45, 25, 60, 40, 75, 90, 70, 50, 65, 80, 35].map((height, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Health Score Components</div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">Collateral Ratio</span>
                          <span className="text-gray-300">85%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">Reward Efficiency</span>
                          <span className="text-gray-300">92%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">Lock Duration</span>
                          <span className="text-gray-300">76%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview Section */}
      <section id="leaderboard" className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 dark:from-blue-300 dark:to-purple-500">
                Gamified Leaderboard
              </h2>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Compete with other sBTC holders, earn badges and streaks, and claim your spot among the elite
              </p>
            </AnimatedSection>
          </div>
          
          <AnimatedSection direction="left" delay={0.4}>
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800/80">
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Rank</th>
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Alias</th>
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Health Score</th>
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Total Rewards</th>
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Active Days</th>
                      <th className="py-4 px-6 text-left text-gray-300 font-semibold">Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, alias: "SatoshiFan", score: 94, rewards: "0.0342 BTC", days: 124, tier: "Diamond" },
                      { rank: 2, alias: "StackerJack", score: 89, rewards: "0.0285 BTC", days: 118, tier: "Diamond" },
                      { rank: 3, alias: "BTCmaxi21", score: 87, rewards: "0.0231 BTC", days: 103, tier: "Gold" },
                      { rank: 4, alias: "Nakamoto22", score: 82, rewards: "0.0187 BTC", days: 97, tier: "Gold" },
                      { rank: 5, alias: "Satsstacker", score: 79, rewards: "0.0164 BTC", days: 86, tier: "Silver" },
                    ].map((user, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`border-t border-gray-800 ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : ''}`}
                      >
                        <td className="py-4 px-6">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full 
                            ${index === 0 ? 'bg-yellow-500 text-gray-900' : 
                              index === 1 ? 'bg-gray-300 text-gray-900' : 
                              index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-700 text-white'}`}>
                            {user.rank}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white font-medium">{user.alias}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <span className={`
                              ${user.score >= 90 ? 'text-green-400' : 
                                user.score >= 80 ? 'text-green-500' : 
                                user.score >= 70 ? 'text-yellow-500' : 'text-red-500'}
                            `}>{user.score}</span>
                            <span className="text-gray-400">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-300">{user.rewards}</td>
                        <td className="py-4 px-6 text-gray-300">{user.days}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium
                            ${user.tier === 'Diamond' ? 'bg-blue-500/20 text-blue-300' : 
                              user.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                              user.tier === 'Silver' ? 'bg-gray-400/20 text-gray-300' : 'bg-amber-700/20 text-amber-600'}
                          `}>
                            {user.tier}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center p-6 bg-gray-800/50">
                <Link href="/leaderboard">
                  <button 
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all"
                  >
                    View Full Leaderboard
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 backdrop-blur-lg border border-pink-500/20 dark:border-blue-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to elevate your sBTC experience?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the community of savvy DeFi users who are maximizing their returns and staying ahead of the curve with sBTC Pulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button 
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-blue-400/20 transition-all"
                >
                  Connect Wallet
                </button>
              </Link>
              <Link href="#features">
                <button 
                  className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-medium text-lg hover:bg-white/15 transition-colors"
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Users, LineChart, Bell, Wallet, Menu, X, Home, Award, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const DashboardLayout = ({ children }) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Wallet className="h-5 w-5" />, label: 'My sBTC', path: '/dashboard/my-sbtc' },
    { icon: <Activity className="h-5 w-5" />, label: 'Health Score', path: '/dashboard/health-score' },
    { icon: <LineChart className="h-5 w-5" />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <Bell className="h-5 w-5" />, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: <Award className="h-5 w-5" />, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/90 backdrop-blur-lg border-r border-gray-800 z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 py-4 border-b border-gray-800">
            <Link href="/" className="flex items-center">
              <Activity className="h-7 w-7 text-pink-500 dark:text-blue-400 mr-2" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                sBTC Pulse
              </h1>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      pathname === item.path 
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 text-white' 
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    
                    {pathname === item.path && (
                      <motion.div 
                        layoutId="sidebar-indicator"
                        className="absolute left-0 w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-r"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile & Settings */}
          <div className="border-t border-gray-800 px-4 py-4">
            <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 flex items-center justify-center text-white font-medium">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Satoshi.btc</div>
                    <div className="text-xs text-gray-400">0x82...37f9</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <Link 
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Link 
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut className="h-5 w-5" />
                <span>Disconnect</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md bg-gray-800/50 text-gray-400 hover:text-white lg:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <h1 className="text-xl font-bold text-white">
                {menuItems.find(item => item.path === pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300">BTC: $87,245.32</span>
              </div>
              
              <Link href="/dashboard/notifications">
                <button className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-pink-500 dark:bg-blue-400 ring-2 ring-gray-900"></span>
                </button>
              </Link>
              
              <Link href="/dashboard/settings">
                <button className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white">
                  <Settings className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
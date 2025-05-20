'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, Sun, Moon, Menu, X, Wallet } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useStacksAuth } from '@/context/StacksAuthContext';
import ConnectWalletModal from './ConnectWalletModal';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Use try/catch to handle potential errors with useStacksAuth
  let authData = { isAuthenticated: false, userData: null, logout: () => {}, authenticate: () => {} };
  try {
    authData = useStacksAuth();
  } catch (error) {
    console.warn('Auth context not available yet');
  }
  
  const { isAuthenticated, userData, logout } = authData;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 py-4 px-4 md:px-8 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-pink-500 dark:text-blue-400 mr-2" />
            <Link href="/">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                sBTC Pulse
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-${pathname === link.path ? 'white font-medium' : 'gray-300 hover:text-white'} transition-colors`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-gray-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Wallet Connection Button */}
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 text-white font-medium"
              >
                <Wallet className="h-4 w-4" />
                <span>{formatAddress(userData?.profile?.stxAddress?.mainnet)}</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openWalletModal}
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </motion.button>
            )}
            
            {/* <motion.a 
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium"
            >
              Launch App
            </motion.a> */}
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 rounded-md md:hidden text-gray-300 hover:text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-4 pb-2"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`py-2 px-4 rounded-lg ${
                    pathname === link.path
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-blue-400/20 dark:to-purple-600/20 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } transition-colors`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Wallet Button */}
              {isAuthenticated ? (
                <button
                  className="py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-2"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  <Wallet className="h-5 w-5" />
                  <span>{formatAddress(userData?.profile?.stxAddress?.mainnet)}</span>
                </button>
              ) : (
                <button
                  className="py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-2"
                  onClick={() => {
                    openWalletModal();
                    toggleMenu();
                  }}
                >
                  <Wallet className="h-5 w-5" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Wallet Connection Modal */}
      <ConnectWalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
    </>
  );
};

export default Navbar;

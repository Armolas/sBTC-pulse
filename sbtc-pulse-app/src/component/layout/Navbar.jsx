'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, Sun, Moon, Menu, X } from 'lucide-react';
import { Github as GitHub } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
          
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <GitHub className="h-5 w-5" />
            <span>GitHub</span>
          </motion.a>
          
          <motion.a 
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 text-white font-medium"
          >
            Launch App
          </motion.a>
          
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
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <GitHub className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
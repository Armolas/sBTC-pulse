'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Twitter, MessageSquare, Mail } from 'lucide-react';
import { Github as GitHub } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-4 md:px-8 border-t border-gray-800 bg-gray-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-pink-500 dark:text-blue-400 mr-2" />
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                sBTC Pulse
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Track. Score. Dominate the Bitcoin DeFi game.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors" aria-label="GitHub">
                <GitHub className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors" aria-label="Discord">
                <MessageSquare className="h-6 w-6" />
              </a>
              <a href="mailto:info@sbtcpulse.com" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">API</Link></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><Link href="/whitepaper" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Whitepaper</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-3">
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Discord</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Twitter</a></li>
                <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Telegram</a></li>
                <li><a href="https://forum.sbtcpulse.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-blue-400 transition-colors">Forum</a></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-blue-400"
                aria-label="Email address"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600 rounded-r-lg px-4 py-2 text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} sBTC Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
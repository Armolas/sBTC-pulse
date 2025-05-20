'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ActionCard = ({ icon, title, description, buttonText, bgColor = "from-pink-500 to-purple-600 dark:from-blue-400 dark:to-purple-600" }) => {
  return (
    <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${bgColor} flex items-center justify-center mb-3`}>
            {icon}
          </div>
          
          <h4 className="text-white font-medium mb-1">{title}</h4>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
        </div>
        
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm text-pink-400 dark:text-blue-400 hover:underline flex items-center gap-1 self-start"
        >
          {buttonText} <ArrowRight className="h-3 w-3 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};

export default ActionCard;
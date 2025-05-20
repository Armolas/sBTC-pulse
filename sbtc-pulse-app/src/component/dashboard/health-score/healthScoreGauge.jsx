'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HealthScoreGauge = ({ score = 0, size = 200 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animate the score on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  // Calculate the angle for the gauge based on the score
  const angle = (animatedScore / 100) * 270 - 135;
  
  // Determine color based on score
  const getScoreColor = () => {
    if (animatedScore >= 90) return 'text-green-400';
    if (animatedScore >= 75) return 'text-green-500';
    if (animatedScore >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Calculate path for the SVG arc
  const getArcPath = (radius, startAngle, endAngle) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };
  
  // Radius of the gauge
  const radius = size / 2 - 10;
  
  // Arcs for the background and the score
  const backgroundArc = getArcPath(radius, -135, 135);
  const scoreArc = getArcPath(radius, -135, angle);
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#374151"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="750, 1000"
          strokeDashoffset="125"
        />
        
        {/* Score Path */}
        <motion.path
          d={backgroundArc}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animatedScore / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" className="dark:hidden" />
            <stop offset="100%" stopColor="#9333ea" className="dark:hidden" />
            <stop offset="0%" stopColor="#60a5fa" className="hidden dark:inline" />
            <stop offset="100%" stopColor="#7c3aed" className="hidden dark:inline" />
          </linearGradient>
        </defs>
        
        {/* Score Text */}
        <text
          x={size / 2}
          y={size / 2 + 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="2.5rem"
          fontWeight="bold"
          className={getScoreColor()}
        >
          <motion.tspan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {animatedScore}
          </motion.tspan>
        </text>
        
        {/* Labels */}
        <text
          x={10}
          y={size - 20}
          fontSize="0.75rem"
          fill="#9ca3af"
        >
          0
        </text>
        <text
          x={size - 25}
          y={size - 20}
          fontSize="0.75rem"
          fill="#9ca3af"
        >
          100
        </text>
        
        {/* Needle indicator */}
        <motion.g
          initial={{ rotate: -135, originX: size / 2, originY: size / 2 }}
          animate={{ rotate: angle, originX: size / 2, originY: size / 2 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.5 }}
        >
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={20}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="8"
            fill="white"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default HealthScoreGauge;
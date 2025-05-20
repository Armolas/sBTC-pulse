'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate particles only on client side
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * windowWidth,
      startY: Math.random() * windowHeight,
      size: Math.random() * 300 + 100,
      duration: Math.random() * 50 + 50,
      delay: Math.random() * 2,
    }));
    
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-br from-black via-purple-950 to-black opacity-90 dark:opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-700 dark:from-blue-400 dark:to-purple-700 opacity-20"
            initial={{
              x: particle.startX,
              y: particle.startY,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                particle.startX,
                particle.startX + (Math.random() * 400 - 200),
                particle.startX + (Math.random() * 400 - 200),
                particle.startX,
              ],
              y: [
                particle.startY,
                particle.startY + (Math.random() * 400 - 200),
                particle.startY + (Math.random() * 400 - 200),
                particle.startY,
              ],
              scale: [
                Math.random() * 0.5 + 0.5,
                Math.random() * 1 + 1,
                Math.random() * 0.8 + 0.8,
                Math.random() * 0.5 + 0.5,
              ],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              filter: 'blur(80px)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
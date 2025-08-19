'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Meteors = ({ number = 10 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100),
      delay: Math.random() * 0.6,
      duration: Math.random() * 0.6 + 0.4,
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          initial={{
            top: -50,
            left: `${meteor.left}%`,
            opacity: 1,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 200 + 100,
          }}
          animate={{
            top: '100%',
            opacity: 0,
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
          }}
          className="absolute bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] rounded-full"
          style={{
            transformOrigin: 'top left',
            boxShadow: '0 0 15px 1px rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </div>
  );
};
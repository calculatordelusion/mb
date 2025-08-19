"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  className = '',
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );

      gradient.addColorStop(0, `hsla(${(time * 50) % 360}, 70%, 50%, 0.3)`);
      gradient.addColorStop(0.5, `hsla(${(time * 50 + 120) % 360}, 70%, 50%, 0.2)`);
      gradient.addColorStop(1, `hsla(${(time * 50 + 240) % 360}, 70%, 50%, 0.1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add floating particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time + i) * canvas.width / 2) + canvas.width / 2;
        const y = (Math.cos(time + i * 0.5) * canvas.height / 2) + canvas.height / 2;
        const size = Math.sin(time + i) * 3 + 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(time * 50 + i * 20) % 360}, 70%, 70%, 0.6)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      />
      {children}
    </div>
  );
};

export const FloatingOrbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const orbs = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, hsla(${index * 60}, 70%, 50%, 0.3) 0%, transparent 70%)`,
            left: `${20 + index * 15}%`,
            top: `${10 + index * 20}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{
          y: [0, -100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const GlowingBorder: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
      <div className="relative bg-black rounded-3xl p-8 border border-white/10">
        {children}
      </div>
    </div>
  );
};


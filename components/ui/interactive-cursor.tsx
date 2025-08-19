"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveCursorProps {
  className?: string;
  size?: number;
  color?: string;
  trailLength?: number;
}

export const InteractiveCursor: React.FC<InteractiveCursorProps> = ({
  className = '',
  size = 20,
  color = '#3B82F6',
  trailLength = 5
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 ${className}`}
      style={{
        left: mousePosition.x - size / 2,
        top: mousePosition.y - size / 2,
        width: size,
        height: size,
      }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 100%)`,
          border: `2px solid ${color}`,
        }}
      />
    </motion.div>
  );
};

export const CursorTrail: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const trailId = React.useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId.current }];
        trailId.current += 1;
        
        // Keep only the last 10 positions
        if (newTrail.length > 10) {
          return newTrail.slice(-10);
        }
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className={`fixed pointer-events-none z-40 ${className}`}>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 bg-blue-500 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            opacity: (index + 1) / trail.length,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.02,
          }}
        />
      ))}
    </div>
  );
};

export const MagneticCursor: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 ${className}`}
      style={{
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
      }}
      animate={{
        scale: isVisible ? (isHovering ? 1.5 : 1) : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <div
        className={`w-10 h-10 rounded-full transition-all duration-300 ${
          isHovering 
            ? 'bg-blue-500/20 border-2 border-blue-500' 
            : 'bg-blue-500/10 border border-blue-500/50'
        }`}
      />
    </motion.div>
  );
};

export const GlowCursor: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-30 ${className}`}
      style={{
        left: mousePosition.x - 100,
        top: mousePosition.y - 100,
      }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 0.3 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div
        className="w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};



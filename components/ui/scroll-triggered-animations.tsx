"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: 50, opacity: 0 };
      case 'right':
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  duration = 0.6,
  threshold = 0.1
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { threshold, once: true });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: 50, opacity: 0 };
      case 'right':
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialPosition()}
          animate={isInView ? getAnimatePosition() : getInitialPosition()}
          transition={{
            duration,
            delay: isInView ? index * staggerDelay : 0,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  threshold?: number;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = '',
  speed = 0.5,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: isInView ? 0 : 100 * speed,
        opacity: isInView ? 1 : 0.5
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  scale?: number;
}

export const ScaleReveal: React.FC<ScaleRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  scale = 0.8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

interface FadeInRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const FadeInReveal: React.FC<FadeInRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

interface RotateRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  rotation?: number;
}

export const RotateReveal: React.FC<RotateRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  rotation = 10
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ rotate: rotation, opacity: 0 }}
      animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: rotation, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
};






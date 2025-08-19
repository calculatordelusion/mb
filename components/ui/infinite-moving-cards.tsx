'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface InfiniteMovingCardsProps {
  items: { quote: string; name: string; title: string }[];
  direction?: 'left' | 'right';
  speed?: number | 'slow' | 'medium' | 'fast';
  className?: string;
}

const speedMap: Record<string, number> = { slow: 40, medium: 20, fast: 10 };

export const InfiniteMovingCards = ({
  items,
  direction = 'right',
  speed = 'medium',
  className,
}: InfiniteMovingCardsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const moveSpeed = typeof speed === 'number' ? speed : speedMap[speed];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationFrame: number;

    const step = () => {
      el.scrollLeft += direction === 'right' ? 1 : -1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [direction]);

  // Duplicate items for infinite scroll
  const doubledItems = [...items, ...items];

  return (
    <div
      ref={scrollRef}
      className={`flex gap-4 overflow-hidden whitespace-nowrap ${className}`}
    >
      {doubledItems.map((item, idx) => (
        <div key={idx} className="flex-none w-72 p-4 bg-white dark:bg-black rounded-xl shadow-lg">
          <p className="text-gray-700 dark:text-gray-300 mb-2">&quot;{item.quote}&quot;</p>
          <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

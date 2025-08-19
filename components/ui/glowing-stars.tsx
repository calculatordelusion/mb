'use client';

import React from 'react';
import clsx from 'clsx';

interface GlowingStarsBackgroundCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowingStarsBackgroundCard = ({ children, className }: GlowingStarsBackgroundCardProps) => {
  return (
    <div
      className={clsx(
        'relative p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-2xl overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 bg-white/5 blur-3xl animate-pulse pointer-events-none" />
      {children}
    </div>
  );
};

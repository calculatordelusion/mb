'use client';

import React from 'react';

interface WavyBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const WavyBackground = ({ children, className }: WavyBackgroundProps) => {
  return (
    <div className={className}>
      <div className="relative w-full">
        <svg
          className="absolute -top-24 w-full h-32 text-blue-200 dark:text-blue-900"
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0,64L80,80C160,96,320,128,480,138.7C640,149,800,139,960,133.3C1120,128,1280,128,1360,128L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

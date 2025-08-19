'use client';

import React from 'react';

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Example gradient beams */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 opacity-20 blur-3xl rotate-45 origin-center"></div>
      <div className="absolute bottom-0 right-1/3 w-1/2 h-full bg-gradient-to-r from-blue-400 via-green-400 to-yellow-300 opacity-20 blur-3xl rotate-12 origin-center"></div>
    </div>
  );
};

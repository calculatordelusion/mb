'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles';
import { loadFull } from 'tsparticles';

interface SparklesProps {
  id: string;
  background?: string;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
}

export const SparklesCore = ({
  id,
  background = 'transparent',
  particleColor = '#FFFFFF',
  minSize = 0.5,
  maxSize = 1.5,
  particleDensity = 50,
  className,
}: SparklesProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id={id}
      className={className}
      init={particlesInit}
      options={{
        background: { color: background },
        fpsLimit: 60,
        particles: {
          color: { value: particleColor },
          links: { enable: false },
          move: { enable: true, speed: 0.5 },
          number: { value: particleDensity, density: { enable: true, area: 800 } },
          opacity: { value: 0.8 },
          shape: { type: 'circle' },
          size: { value: { min: minSize, max: maxSize } },
        },
        detectRetina: true,
      }}
    />
  );
};

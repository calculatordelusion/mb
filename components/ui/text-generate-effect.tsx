'use client';

import React, { useEffect, useState } from 'react';

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  speed?: number;
}

export const TextGenerateEffect = ({ words, className, speed = 50 }: TextGenerateEffectProps) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + words[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, words, speed]);

  return <p className={className}>{displayed}</p>;
};

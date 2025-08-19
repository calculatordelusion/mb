'use client';

import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  words: { text: string; className?: string }[];
  className?: string;
  speed?: number;
}

export const TypewriterEffect = ({ words, className, speed = 150 }: TypewriterEffectProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (subIndex < words[index].text.length) {
        setSubIndex(subIndex + 1);
      } else {
        setTimeout(() => {
          setSubIndex(0);
          setIndex((index + 1) % words.length);
        }, 1000);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, words, speed]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <h1 className={className}>
      {words[index].text.substring(0, subIndex)}
      <span className="inline-block w-1 ml-1">{blink ? '|' : ' '}</span>
    </h1>
  );
};

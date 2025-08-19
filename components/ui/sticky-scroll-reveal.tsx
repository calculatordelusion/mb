'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface StickyScrollProps {
  content: { title: string; description: string; content: React.ReactNode }[];
}

export const StickyScroll = ({ content }: StickyScrollProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {content.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="flex-1"
        >
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
          {item.content}
        </motion.div>
      ))}
    </div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Link from 'next/link';

export const CtaSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Create Stunning Designs?
      </h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
        Join thousands of creators and businesses who are already making eye-catching content with our tool.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/app" className="w-full sm:w-auto">
          <HoverBorderGradient
            containerClassName="rounded-full w-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3 w-full justify-center"
          >
            <span>Start Creating Free</span>
          </HoverBorderGradient>
        </Link>
        <Link href="/pricing" className="w-full sm:w-auto">
          <Button variant="outline" className="px-8 py-3 w-full">
            View Pricing
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
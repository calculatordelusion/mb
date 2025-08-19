'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const FAQSection = () => {
  const faqs = [
    {
      question: "What is text-behind-image design?",
      answer: "Text-behind-image is a design technique where text appears to be behind parts of an image, creating a visually striking effect that makes your content stand out."
    },
    {
      question: "Do I need design skills to use this tool?",
      answer: "No design skills needed! Our tool provides intuitive controls and AI-powered suggestions to help you create professional-looking designs in minutes."
    },
    {
      question: "What file formats can I export my designs in?",
      answer: "You can export your designs as PNG, JPG, or WebP files in various resolutions. Pro users get access to high-resolution exports."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Yes, all designs created with our tool are royalty-free and can be used for personal or commercial projects."
    },
    {
      question: "How does the free plan differ from paid plans?",
      answer: "The free plan allows limited designs per month with basic features. Paid plans offer unlimited designs, premium templates, higher resolution exports, and priority support."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <AccordionItem value={`item-${index}`} className="border-b">
            <AccordionTrigger className="text-left hover:no-underline">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600 dark:text-neutral-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
};
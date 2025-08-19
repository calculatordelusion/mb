'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const features = [
  {
    icon: <Icons.magicWand className="w-8 h-8" />,
    title: "AI-Powered Design",
    description: "Our AI suggests optimal text placement and styling for your images automatically."
  },
  {
    icon: <Icons.sliders className="w-8 h-8" />,
    title: "Customizable Effects",
    description: "Adjust text opacity, blur effects, and positioning to create the perfect look."
  },
  {
    icon: <Icons.templates className="w-8 h-8" />,
    title: "100+ Templates",
    description: "Choose from professionally designed templates for social media, ads, and more."
  },
  {
    icon: <Icons.export className="w-8 h-8" />,
    title: "One-Click Export",
    description: "Download in high-resolution PNG, JPG, or directly share to social platforms."
  },
  {
    icon: <Icons.collaborate className="w-8 h-8" />,
    title: "Team Collaboration",
    description: "Invite team members to edit and comment on designs in real-time."
  },
  {
    icon: <Icons.history className="w-8 h-8" />,
    title: "Version History",
    description: "Access all previous versions of your design with a single click."
  }
];

export const FeaturesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
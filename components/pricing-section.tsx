'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for trying out the platform",
      features: [
        "5 designs per month",
        "Basic templates",
        "Standard resolution exports",
        "Community support"
      ],
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$9",
      description: "For creators and small businesses",
      features: [
        "Unlimited designs",
        "Premium templates",
        "High resolution exports",
        "Priority support",
        "Team collaboration"
      ],
      cta: "Upgrade Now",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams and agencies",
      features: [
        "Unlimited everything",
        "Custom templates",
        "API access",
        "Dedicated account manager",
        "White-label options"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className={`h-full flex flex-col ${plan.popular ? 'border-2 border-primary' : ''}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {plan.name}
                {plan.popular && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-lg font-semibold">
                {plan.price} {plan.price !== "Custom" && <span className="text-sm font-normal">/month</span>}
              </CardDescription>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
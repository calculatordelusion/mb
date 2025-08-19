'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Features</Link></li>
              <li><Link href="/pricing" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Pricing</Link></li>
              <li><Link href="/templates" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Templates</Link></li>
              <li><Link href="/examples" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Examples</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Blog</Link></li>
              <li><Link href="/guides" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Guides</Link></li>
              <li><Link href="/support" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Support</Link></li>
              <li><Link href="/api" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">About</Link></li>
              <li><Link href="/careers" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Careers</Link></li>
              <li><Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Contact</Link></li>
              <li><Link href="/press" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Terms</Link></li>
              <li><Link href="/security" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Security</Link></li>
              <li><Link href="/cookies" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Icons.logo className="h-8 w-8" />
            <span className="font-semibold">Text Behind Image</span>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">
              <Icons.twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">
              <Icons.github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">
              <Icons.linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary">
              <Icons.instagram className="h-5 w-5" />
            </Link>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            © {currentYear} Text Behind Image. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
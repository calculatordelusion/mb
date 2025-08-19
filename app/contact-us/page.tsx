'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiMessageSquare, FiArrowUp, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ContactUs = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [theme, setTheme] = useState('system');

    useEffect(() => {
        // Initialize theme based on system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.add(systemTheme);
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                const newSystemTheme = e.matches ? 'dark' : 'light';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(newSystemTheme);
            }
        };
        
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
        
        // Remove existing theme classes
        document.documentElement.classList.remove('dark', 'light');
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            // System theme
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList.add(systemTheme);
        }
    };

    const getCurrentTheme = () => {
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
    };

    const currentTheme = getCurrentTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
            {/* Header */}
            <header className={`${currentTheme === 'dark' ? 'bg-black/20 backdrop-blur-md border-white/10' : 'bg-white shadow-lg border-gray-200'} border-b transition-colors duration-300 sticky top-0 z-40`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <Link href="/" className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}>
                                <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                            <div>
                                <h1 className={`text-2xl sm:text-3xl font-bold ${currentTheme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                    Contact Us
                                </h1>
                                <p className={`${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base mt-1`}>Get in touch with our team</p>
                            </div>
                        </div>
                        
                        {/* Theme Toggle */}
                        <div className="flex items-center justify-center sm:justify-end">
                            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => toggleTheme('light')}
                                    className={`p-2 rounded-md transition-all duration-200 ${theme === 'light' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                                    title="Light theme"
                                >
                                    <FiSun className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toggleTheme('dark')}
                                    className={`p-2 rounded-md transition-all duration-200 ${theme === 'dark' ? 'bg-gray-700 shadow-sm text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                                    title="Dark theme"
                                >
                                    <FiMoon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toggleTheme('system')}
                                    className={`p-2 rounded-md transition-all duration-200 ${theme === 'system' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                                    title="System theme"
                                >
                                    <FiMonitor className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`${currentTheme === 'dark' ? 'bg-gray-900/50 backdrop-blur-sm border-white/10' : 'bg-white shadow-xl'} rounded-2xl border p-6 sm:p-8 lg:p-12 transition-colors duration-300`}
                >
                    {/* Introduction */}
                    <div className="mb-8 sm:mb-12">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${currentTheme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-100 to-purple-100'} rounded-xl flex items-center justify-center`}>
                                <FiMessageSquare className={`w-5 h-5 sm:w-6 sm:h-6 ${currentTheme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
                            </div>
                            <h2 className={`text-xl sm:text-2xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Get in Touch</h2>
                        </div>
                        <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-sm sm:text-base`}>
                            We'd love to hear from you! Whether you have a question about our service, need technical support, or want to share feedback, our team is here to help.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        {/* Email */}
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 sm:p-6 border transition-colors duration-300`}>
                            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${currentTheme === 'dark' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-green-100 to-emerald-100'} rounded-lg flex items-center justify-center`}>
                                    <FiMail className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme === 'dark' ? 'text-white' : 'text-green-600'}`} />
                                </div>
                                <h3 className={`text-lg sm:text-xl font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Us</h3>
                            </div>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base mb-2 sm:mb-3`}>
                                For general inquiries and support:
                            </p>
                            <a 
                                href="mailto:support@text-behind-image.io" 
                                className={`${currentTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors text-sm sm:text-base`}
                            >
                                support@text-behind-image.io
                            </a>
                        </div>

                        {/* Phone */}
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 sm:p-6 border transition-colors duration-300`}>
                            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${currentTheme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-100 to-pink-100'} rounded-lg flex items-center justify-center`}>
                                    <FiPhone className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme === 'dark' ? 'text-white' : 'text-purple-600'}`} />
                                </div>
                                <h3 className={`text-lg sm:text-xl font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Call Us</h3>
                            </div>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base mb-2 sm:mb-3`}>
                                For urgent matters and business inquiries:
                            </p>
                            <a 
                                href="tel:+1-555-0123" 
                                className={`${currentTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors text-sm sm:text-base`}
                            >
                                +1 (555) 012-3456
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="mb-8 sm:mb-12">
                        <h3 className={`text-lg sm:text-xl font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}>Send us a Message</h3>
                        <form className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors duration-300 text-sm sm:text-base ${currentTheme === 'dark' ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors duration-300 text-sm sm:text-base ${currentTheme === 'dark' ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors duration-300 text-sm sm:text-base ${currentTheme === 'dark' ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                    Subject
                                </label>
                                <select className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors duration-300 text-sm sm:text-base ${currentTheme === 'dark' ? 'bg-gray-800 border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}>
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Feature Request</option>
                                    <option>Bug Report</option>
                                    <option>Business Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors duration-300 text-sm sm:text-base ${currentTheme === 'dark' ? 'bg-gray-800 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Office Location */}
                    <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 sm:p-6 border transition-colors duration-300`}>
                        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${currentTheme === 'dark' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-orange-100 to-red-100'} rounded-lg flex items-center justify-center`}>
                                <FiMapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme === 'dark' ? 'text-white' : 'text-orange-600'}`} />
                            </div>
                            <h3 className={`text-lg sm:text-xl font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Office Location</h3>
                        </div>
                        <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base leading-relaxed`}>
                            <strong>Text Behind Image Inc.</strong><br />
                            123 Innovation Drive<br />
                            Tech Valley, CA 94000<br />
                            United States
                        </p>
                    </div>

                    {/* Response Time */}
                    <div className={`border-t ${currentTheme === 'dark' ? 'border-white/10' : 'border-gray-200'} pt-6 sm:pt-8 mt-6 sm:mt-8`}>
                        <h3 className={`text-base sm:text-lg font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}>Response Times</h3>
                        <div className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p><strong>Email Support:</strong> Within 24 hours</p>
                            <p><strong>Phone Support:</strong> Monday - Friday, 9 AM - 6 PM PST</p>
                            <p><strong>Emergency Issues:</strong> Available 24/7 for critical problems</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
                >
                    <FiArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    );
};

export default ContactUs;


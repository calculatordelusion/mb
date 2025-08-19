'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiShield, FiEye, FiLock, FiDatabase, FiArrowUp, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const PrivacyPolicy = () => {
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
        <div className={`min-h-screen transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
            {/* Header */}
            <header className={`${currentTheme === 'dark' ? 'bg-black/30 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-xl shadow-lg border-gray-200/50'} border-b transition-all duration-300 sticky top-0 z-40`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <Link href="/" className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} transition-all duration-300 p-2 rounded-lg`}>
                                <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                            <div>
                                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${currentTheme === 'dark' ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent'}`}>
                                    Privacy Policy
                                </h1>
                                <p className={`${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 text-sm sm:text-base font-medium`}>Last updated: January 2025</p>
                            </div>
                        </div>
                        
                        {/* Theme Toggle */}
                        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
                            <button
                                onClick={() => toggleTheme('light')}
                                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${theme === 'light' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-105'}`}
                            >
                                <FiSun className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => toggleTheme('dark')}
                                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700 shadow-lg text-blue-400 scale-105' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-105'}`}
                            >
                                <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => toggleTheme('system')}
                                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${theme === 'system' ? 'bg-white dark:bg-gray-700 shadow-lg text-blue-600 dark:text-blue-400 scale-105' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-105'}`}
                            >
                                <FiMonitor className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
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
                    className={`${currentTheme === 'dark' ? 'bg-gray-900/60 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-white/90 backdrop-blur-xl shadow-2xl border-gray-200/50'} rounded-3xl border p-6 sm:p-8 lg:p-12 transition-all duration-300`}
                >
                    {/* Introduction */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' : 'bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiShield className={`w-8 h-8 sm:w-10 sm:h-10 ${currentTheme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
                            </div>
                            <div>
                                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Privacy Matters</h2>
                                <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2 text-lg leading-relaxed font-medium`}>
                                    At Text Behind Image, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Information We Collect */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg' : 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiDatabase className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-green-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Information We Collect</h3>
                        </div>
                        <div className={`space-y-6 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                                <h4 className={`font-bold text-lg sm:text-xl mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Personal Information</h4>
                                <ul className="space-y-3 text-base sm:text-lg">
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                        <span>Email address (when you create an account)</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                        <span>Name and profile information</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                        <span>Payment information (processed securely by our payment partners)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                                <h4 className={`font-bold text-lg sm:text-xl mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Usage Information</h4>
                                <ul className="space-y-3 text-base sm:text-lg">
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                        <span>Images you upload for processing</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                        <span>Design preferences and settings</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                        <span>Usage patterns and feature interactions</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                        <span>Device information and browser type</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg' : 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiEye className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-purple-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>How We Use Your Information</h3>
                        </div>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>We use the information we collect to:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Provide and improve our text-behind-image service</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Process your images and generate designs</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Send you important updates about our service</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Provide customer support and respond to inquiries</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Analyze usage patterns to enhance user experience</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Ensure the security and integrity of our platform</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Data Security */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-lg' : 'bg-gradient-to-br from-red-100 to-pink-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiLock className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-red-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Data Security</h3>
                        </div>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>We implement industry-standard security measures to protect your data:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>End-to-end encryption for data transmission</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Secure cloud storage with access controls</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Regular security audits and updates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Limited access to personal information by authorized personnel only</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Automatic deletion of processed images after 24 hours</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Data Sharing */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Data Sharing</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                                    <span>With your explicit consent</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                                    <span>To comply with legal obligations</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                                    <span>To protect our rights and prevent fraud</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'}`}></span>
                                    <span>With trusted service providers who assist in operating our platform</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Your Rights</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>You have the right to:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Access and review your personal information</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Update or correct your data</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Request deletion of your account and data</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Opt-out of marketing communications</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Export your data in a portable format</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Cookies and Tracking</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>We use cookies and similar technologies to:</p>
                            <ul className="space-y-4 text-base sm:text-lg mb-6">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'}`}></span>
                                    <span>Remember your preferences and settings</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'}`}></span>
                                    <span>Analyze website traffic and usage patterns</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'}`}></span>
                                    <span>Improve our service performance</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'}`}></span>
                                    <span>Provide personalized content and features</span>
                                </li>
                            </ul>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium`}>You can control cookie settings through your browser preferences.</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Contact Us</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-700/50 border-white/10' : 'bg-white/80 border-gray-200/50'} rounded-xl p-6 border shadow-lg`}>
                                <div className="space-y-3 text-base sm:text-lg">
                                    <p className="flex items-center space-x-3">
                                        <span className={`font-bold ${currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Email:</span>
                                        <span className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>privacy@text-behind-image.io</span>
                                    </p>
                                    <p className="flex items-center space-x-3">
                                        <span className={`font-bold ${currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Website:</span>
                                        <span className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>text-behind-image.io</span>
                                    </p>
                                    <p className="flex items-center space-x-3">
                                        <span className={`font-bold ${currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Address:</span>
                                        <span className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>[Your Business Address]</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Updates */}
                    <div className={`border-t ${currentTheme === 'dark' ? 'border-white/10' : 'border-gray-200/50'} pt-8`}>
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Updates to This Policy</h3>
                        <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed font-medium`}>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                        </p>
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
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-50 hover:scale-110"
                >
                    <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
            )}
        </div>
    );
};

export default PrivacyPolicy;

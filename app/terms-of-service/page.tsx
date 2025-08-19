'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiFileText, FiShield, FiAlertTriangle, FiCheckCircle, FiArrowUp, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const TermsOfService = () => {
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
                                    Terms of Service
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
                                <FiFileText className={`w-8 h-8 sm:w-10 sm:h-10 ${currentTheme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
                            </div>
                            <div>
                                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h2>
                                <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2 text-lg leading-relaxed font-medium`}>
                                    These Terms of Service ("Terms") govern your use of the Text Behind Image service. By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our service.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Service Description */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg' : 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiCheckCircle className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-green-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Service Description</h3>
                        </div>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>Text Behind Image provides an AI-powered platform that allows users to:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                    <span>Upload and process images</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                    <span>Create text-behind-image effects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                    <span>Generate and download designs</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></span>
                                    <span>Access various text customization tools</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* User Accounts */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>User Accounts</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                    <span>Maintaining the security of your account</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                    <span>All activities that occur under your account</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                    <span>Notifying us immediately of any unauthorized use</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                                    <span>Ensuring your account information is up to date</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Acceptable Use */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg' : 'bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiAlertTriangle className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-orange-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Acceptable Use</h3>
                        </div>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>You agree not to use our service to:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Upload content that is illegal, harmful, or offensive</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Violate any applicable laws or regulations</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Infringe on intellectual property rights</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Attempt to gain unauthorized access to our systems</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Use the service for commercial purposes without permission</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-red-400' : 'bg-red-500'}`}></span>
                                    <span>Upload images containing personal information without consent</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Intellectual Property</h3>
                        <div className={`space-y-6 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                                <h4 className={`font-bold text-lg sm:text-xl mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Content</h4>
                                <p className="text-base sm:text-lg">You retain ownership of the images you upload. By using our service, you grant us a limited license to process your images solely for providing the service.</p>
                            </div>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                                <h4 className={`font-bold text-lg sm:text-xl mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Our Service</h4>
                                <p className="text-base sm:text-lg">The Text Behind Image service, including its software, design, and content, is owned by us and protected by intellectual property laws.</p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy and Data */}
                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg' : 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg'} rounded-2xl flex items-center justify-center`}>
                                <FiShield className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme === 'dark' ? 'text-white' : 'text-purple-600'}`} />
                            </div>
                            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Privacy and Data</h3>
                        </div>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>We process images only to provide our service</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Images are automatically deleted after 24 hours</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>We do not store or use your images for other purposes</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
                                    <span>Your personal data is protected according to our Privacy Policy</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Payment Terms</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>Some features of our service may require payment:</p>
                            <ul className="space-y-4 text-base sm:text-lg">
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>All payments are processed securely through our payment partners</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Prices are subject to change with notice</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Refunds are handled according to our refund policy</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                                    <span>Subscription services may be cancelled at any time</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Limitation of Liability</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed font-medium`}>
                                To the maximum extent permitted by law, Text Behind Image shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
                            </p>
                        </div>
                    </div>

                    {/* Termination */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Termination</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed font-medium`}>
                                We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately.
                            </p>
                        </div>
                    </div>

                    {/* Changes to Terms */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Changes to Terms</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed font-medium`}>
                                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-12">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Contact Us</h3>
                        <div className={`${currentTheme === 'dark' ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-2xl p-6 border`}>
                            <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg font-medium`}>If you have any questions about these Terms of Service, please contact us:</p>
                            <div className={`${currentTheme === 'dark' ? 'bg-gray-700/50 border-white/10' : 'bg-white/80 border-gray-200/50'} rounded-xl p-6 border shadow-lg`}>
                                <div className="space-y-3 text-base sm:text-lg">
                                    <p className="flex items-center space-x-3">
                                        <span className={`font-bold ${currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Email:</span>
                                        <span className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>legal@text-behind-image.io</span>
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

                    {/* Governing Law */}
                    <div className={`border-t ${currentTheme === 'dark' ? 'border-white/10' : 'border-gray-200/50'} pt-8`}>
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Governing Law</h3>
                        <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed font-medium`}>
                            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
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

export default TermsOfService;

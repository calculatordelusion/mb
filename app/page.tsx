'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { HeroImages } from '@/components/hero-images';
import { HeroParallaxImages } from '@/components/hero-parallax-images';
import { AdditionalInfo } from '@/components/additional-info';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import BeforeAfterSlider from '@/components/ui/before-after-slider';
import Link from 'next/link';
import { FiArrowRight, FiStar, FiUsers, FiZap, FiHeart, FiAward, FiTrendingUp, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const Page = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [theme, setTheme] = useState('system');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        
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

    const features = [
        {
            icon: <FiZap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Create stunning designs in seconds with our optimized engine",
            gradient: "from-red-500 to-orange-500"
        },
        {
            icon: <FiStar className="w-8 h-8" />,
            title: "Premium Quality",
            description: "Professional-grade results that stand out from the crowd",
            gradient: "from-yellow-500 to-pink-500"
        },
        {
            icon: <FiUsers className="w-8 h-8" />,
            title: "Community Driven",
            description: "Join 400,000+ creators building amazing content",
            gradient: "from-blue-500 to-purple-500"
        },
        {
            icon: <FiHeart className="w-8 h-8" />,
            title: "User Friendly",
            description: "Intuitive interface designed for creators of all levels",
            gradient: "from-green-500 to-teal-500"
        }
    ];

    return ( 
        <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
            {/* Simple Background */}
            <div className="fixed inset-0 -z-10">
                {currentTheme === 'dark' && <BackgroundBeams />}
                <div className={`absolute inset-0 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`} />
                
                {/* Simple Grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className={`absolute inset-0 ${currentTheme === 'dark' ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)]'} bg-[size:50px_50px]`} />
                </div>
            </div>

            {/* Loading Animation */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                    >
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-black/20 border-white/10 shadow-2xl shadow-black/50' : 'bg-white/90 border-gray-200 shadow-lg'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        {/* Logo/Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-sm sm:text-lg">T</span>
                            </div>
                            <h1 className={`text-xl sm:text-2xl font-bold ${currentTheme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                Text Behind Image
                            </h1>
                        </motion.div>

                        {/* Theme Toggle and Get Started Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4"
                        >
                            {/* Theme Toggle */}
                            <div className={`flex items-center space-x-1 backdrop-blur-sm rounded-lg p-1 border transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'}`}>
                                <button
                                    onClick={() => toggleTheme('light')}
                                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${theme === 'light' ? (currentTheme === 'dark' ? 'bg-white/20 text-white' : 'bg-white text-blue-600') : (currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700')}`}
                                    title="Light theme"
                                >
                                    <FiSun className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => toggleTheme('dark')}
                                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${theme === 'dark' ? (currentTheme === 'dark' ? 'bg-white/20 text-white' : 'bg-gray-700 text-blue-400') : (currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700')}`}
                                    title="Dark theme"
                                >
                                    <FiMoon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => toggleTheme('system')}
                                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${theme === 'system' ? (currentTheme === 'dark' ? 'bg-white/20 text-white' : 'bg-white text-blue-600') : (currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700')}`}
                                    title="System theme"
                                >
                                    <FiMonitor className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>

                            {/* Get Started Button */}
                            <Link href="/app">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
                                >
                                    Get Started For Free
                                </motion.button>
            </Link>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    {/* Main Heading */}
                    <div className="mb-6 sm:mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6"
                        >
                            <motion.span 
                                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            >
                                Text Behind
                            </motion.span>
                            <motion.span 
                                className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent block"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            >
                                Image
                            </motion.span>
                        </motion.h1>
                        
                        {/* Animated Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            className="mb-4 sm:mb-6"
                        >
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                                >
                                    Transform Your Images
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 1.4 }}
                                    className="text-white block mt-1 sm:mt-2"
                                >
                                    with AI-Powered Text Effects
                                </motion.span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                        className="mb-8 sm:mb-12"
                    >
                        <TextGenerateEffect 
                            words="Create stunning text-behind-image effects that make your content stand out. Professional results in seconds with our advanced AI technology."
                            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4"
                        />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mb-8 sm:mb-12"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-lg font-semibold text-gray-300">
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                                <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                <span>400,000+ designs created</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                                <FiAward className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                <span>Top rated tool</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="mb-12 sm:mb-16"
                    >
                        <Link href="/app">
                            <CardContainer className="inline-block">
                                <CardBody className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                                    <CardItem translateZ={50} className="flex items-center space-x-2 sm:space-x-3">
                                        <span>Start Creating Now</span>
                                        <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </CardItem>
                                </CardBody>
                            </CardContainer>
                        </Link>
                    </motion.div>

                    {/* Product Hunt Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    >
                        {[
                            "https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=494264&theme=dark&period=monthly&topic_id=164",
                            "https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=494264&theme=dark&period=daily",
                            "https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=494264&theme=dark&period=monthly&topic_id=44"
                        ].map((src, index) => (
                            <a
                                key={index}
                                href="https://www.producthunt.com/posts/text-behind-image"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-1.5 sm:p-2 hover:bg-white/20 transition-all duration-300"
                            >
                                <img src={src} alt="Product Hunt Badge" className="h-10 sm:h-14" />
                            </a>
                        ))}
                    </motion.div>
            </div>
            
                {/* Simple Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
                    </div>
                </motion.div>
            </section>

            {/* Before/After Slider Section */}
            <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    See the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    Transformation
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                  Drag the slider to see how our tool transforms your images with stunning text effects
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <BeforeAfterSlider />
              </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Why Choose
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                            Text Behind Image?
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Experience the perfect blend of power, simplicity, and creativity
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="p-4 sm:p-6 text-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div 
                                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How To Use Section */}
            <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            How To Use
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                            Text Behind Image?
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Create stunning text-behind-image effects in just 4 simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            step: "01",
                            title: "Upload Your Image",
                            description: "Drag and drop your image or click to browse. We support JPG, PNG, and WebP formats up to 10MB.",
                            icon: "📸"
                        },
                        {
                            step: "02",
                            title: "Add Your Text",
                            description: "Enter the text you want to place behind your image. Customize font, size, color, and position.",
                            icon: "✏️"
                        },
                        {
                            step: "03",
                            title: "Adjust & Preview",
                            description: "Fine-tune the text placement, opacity, and effects. See real-time preview of your creation.",
                            icon: "🎨"
                        },
                        {
                            step: "04",
                            title: "Download & Share",
                            description: "Download your masterpiece in high quality. Share directly to social media or save for later use.",
                            icon: "💾"
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="p-4 sm:p-6 text-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {step.step}
                                </div>
                                <div className="text-4xl mb-4">{step.icon}</div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            <section className="relative py-16 sm:py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Stunning
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                            Examples
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        See the magic in action with these incredible designs
                    </p>
                </motion.div>

                <div className="w-full h-full">
                <HeroImages />
                <HeroParallaxImages />
            </div>
            </section>

            {/* FAQ Section */}
            <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Frequently Asked
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Everything you need to know about Text Behind Image tool
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {[
                        {
                            question: "What is Text Behind Image?",
                            answer: "Text Behind Image is an AI-powered online tool that allows you to create stunning visual effects by placing text behind your images. It's perfect for creating eye-catching social media content, marketing materials, and artistic designs."
                        },
                        {
                            question: "How does the text behind image effect work?",
                            answer: "Our advanced AI technology analyzes your image and intelligently places text behind the main subjects while maintaining visual clarity. The tool uses sophisticated algorithms to ensure the text is readable and aesthetically pleasing."
                        },
                        {
                            question: "What file formats are supported?",
                            answer: "We support JPG, PNG, and WebP image formats. You can upload images up to 10MB in size. For best results, we recommend using high-quality images with clear subjects."
                        },
                        {
                            question: "Is Text Behind Image free to use?",
                            answer: "Yes! Text Behind Image offers a generous free tier that allows you to create unlimited designs. We also offer premium features for advanced users who need additional customization options."
                        },
                        {
                            question: "Can I customize the text appearance?",
                            answer: "Absolutely! You can customize font type, size, color, opacity, position, and add various effects like shadows, outlines, and gradients to make your text stand out perfectly."
                        },
                        {
                            question: "How do I download my created image?",
                            answer: "Once you're satisfied with your design, simply click the 'Download' button. Your image will be saved in high quality and you can choose between different formats and resolutions."
                        },
                        {
                            question: "Is my content safe and private?",
                            answer: "Yes, we take your privacy seriously. Your uploaded images are processed securely and are not stored permanently on our servers. We use industry-standard encryption to protect your data."
                        },
                        {
                            question: "Can I use Text Behind Image for commercial purposes?",
                            answer: "Yes! All designs created with Text Behind Image are yours to use for personal and commercial purposes. You retain full rights to your creations."
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                            <details className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer text-left">
                                    <h3 className="text-lg sm:text-xl font-bold text-white group-open:text-blue-400 transition-colors duration-300">
                                        {faq.question}
                                    </h3>
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold group-open:rotate-45 transition-transform duration-300">
                                        +
                                    </div>
                                </summary>
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                    <p className="text-gray-300 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </div>
            </section>



            {/* Footer */}
            <footer className="relative py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-4 sm:mb-6">
                        {/* Brand Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center md:text-left"
                        >
                            <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-sm sm:text-lg">T</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Text Behind Image
                                </h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                                Transform your images with AI-powered text effects that captivate and engage your audience.
                            </p>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center md:text-right"
                        >
                            <div className="flex items-center justify-center md:justify-end space-x-3 sm:space-x-4">
                                <a href="https://instagram.com/textbehindimage" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="https://twitter.com/textbehindimage" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="border-t border-white/10 pt-3 sm:pt-4"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                                © 2025 Text Behind Image. All rights reserved.
                            </div>
                            <div className="flex items-center space-x-4 sm:space-x-6">
                                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm">
                                    Terms of Service
                                </Link>
                </div> 
            </div>
                    </motion.div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
                >
                    <FiArrowRight className="w-5 h-5 rotate-[-90deg]" />
                </motion.button>
            )}
        </div>
    );
}

export default Page;
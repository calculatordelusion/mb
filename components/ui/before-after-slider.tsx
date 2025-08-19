'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface BeforeAfterImage {
  before: string;
  after: string;
  title: string;
  description: string;
}

interface BeforeAfterSliderProps {
  images?: BeforeAfterImage[];
  className?: string;
}

const beforeAfterImages = [
  {
    before: "/assets/mountain-hiker-hd.png",
    after: "/assets/mountain-explore-hd.png",
    title: "Mountain Explorer",
    description: "Text overlay on adventure photography"
  },
  {
    before: "/assets/wow2.png",
    after: "/assets/wow.png",
    title: "Urban Style",
    description: "Text overlay on street photography"
  },
  {
    before: "/assets/garden-capture-hd.png",
    after: "/assets/garden-woman-hd.png",
    title: "Garden Beauty",
    description: "Elegant text on nature photography"
  },
  {
    before: "/assets/greenhouse-nature-hd.png",
    after: "/assets/greenhouse-woman-hd.png",
    title: "Greenhouse Life",
    description: "Lifestyle text on botanical photography"
  },
  {
    before: "/assets/plants-enjoy-hd.png",
    after: "/assets/plants-woman-hd.png",
    title: "Plant Life",
    description: "Inspirational text on plant photography"
  }
];

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentImage = beforeAfterImages[currentIndex];

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <motion.button
          onClick={prevImage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
            {currentImage.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300">
            {currentImage.description}
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {beforeAfterImages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        <motion.button
          onClick={nextImage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Slider Container */}
      <div className="relative w-full aspect-[6/7] sm:aspect-[5/6] rounded-2xl overflow-hidden shadow-2xl">
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Before Image (Full) */}
          <div className="absolute inset-0">
            <img
              src={currentImage.before}
              alt="Before"
              className="w-full h-full object-cover"
              onError={(e) => console.error('Failed to load before image:', currentImage.before)}
              onLoad={() => console.log('Before image loaded successfully:', currentImage.before)}
            />
          </div>

          {/* After Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={currentImage.after}
              alt="After"
              className="w-full h-full object-cover"
              onError={(e) => console.error('Failed to load after image:', currentImage.after)}
              onLoad={() => console.log('After image loaded successfully:', currentImage.after)}
            />
          </div>

          {/* Slider Handle */}
          <motion.div
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            whileHover={{ scaleX: 2 }}
            transition={{ duration: 0.2 }}
          >
            {/* Slider Handle Circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg border-2 border-gray-200 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex items-center gap-1">
                <FiArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </div>
            </motion.div>
          </motion.div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
            After
          </div>

          {/* Percentage Display */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(sliderPosition)}%
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 sm:mt-6">
        <p className="text-sm sm:text-base text-gray-300">
          Drag the slider to see the transformation • {currentIndex + 1} of {beforeAfterImages.length}
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

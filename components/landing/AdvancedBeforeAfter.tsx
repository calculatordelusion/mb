import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Import HD images
import mountainHikerHd from "@/assets/mountain-hiker-hd.png";
import mountainExploreHd from "@/assets/mountain-explore-hd.png";
import gardenWomanHd from "@/assets/garden-woman-hd.png";
import gardenCaptureHd from "@/assets/garden-capture-hd.png";
const bearBeforeHd = "/lovable-uploads/10fbb735-4293-4e8e-949a-788f0a3e95dc.png";
const bearAfterHd = "/lovable-uploads/a6749fd9-5639-4093-b395-0895f1299d44.png";
import greenhouseWomanHd from "@/assets/greenhouse-woman-hd.png";
import greenhouseNatureHd from "@/assets/greenhouse-nature-hd.png";
import plantsWomanHd from "@/assets/plants-woman-hd.png";
import plantsEnjoyHd from "@/assets/plants-enjoy-hd.png";

interface ImagePair {
  before: string;
  after: string;
  title: string;
  description: string;
  beforeAlt: string;
  afterAlt: string;
}

const imagePairs: ImagePair[] = [
  {
    before: "/lovable-uploads/0a83a499-0504-4ab7-9170-56ccd4c0418e.png",
    after: "/lovable-uploads/f1f2c96e-1392-4121-bf97-7bb594624d85.png",
    title: "Classic Mustang",
    description: "Transform vintage cars with bold text overlays",
    beforeAlt: "Classic white Ford Mustang with racing stripes",
    afterAlt: "Classic Mustang with 'MUSTANG' text overlay"
  },
  {
    before: mountainHikerHd,
    after: mountainExploreHd,
    title: "Mountain Explorer",
    description: "Transform landscapes with dynamic text overlays",
    beforeAlt: "Hiker overlooking snowy mountains",
    afterAlt: "Hiker with 'EXPLORE' text overlay on mountain landscape"
  },
  {
    before: gardenWomanHd,
    after: gardenCaptureHd,
    title: "Garden Moments",
    description: "Capture life's beautiful moments with artistic text",
    beforeAlt: "Woman sitting in garden setting",
    afterAlt: "Woman with 'Capture' text overlay in garden"
  },
  {
    before: bearBeforeHd,
    after: bearAfterHd,
    title: "Wildlife Magic",
    description: "Bring nature to life with seamless text integration",
    beforeAlt: "Brown bear in natural forest habitat",
    afterAlt: "Brown bear with 'bear' text overlay"
  },
  {
    before: greenhouseWomanHd,
    after: greenhouseNatureHd,
    title: "Greenhouse Vibes",
    description: "Create stunning botanical compositions",
    beforeAlt: "Woman in peaceful greenhouse setting",
    afterAlt: "Woman with 'nature' text in greenhouse"
  },
  {
    before: plantsWomanHd,
    after: plantsEnjoyHd,
    title: "Joyful Expression",
    description: "Express emotions through creative text placement",
    beforeAlt: "Happy woman with lush green background",
    afterAlt: "Woman with 'enjoy' text overlay on green backdrop"
  }
];

export const AdvancedBeforeAfter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPair = imagePairs[currentIndex];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + imagePairs.length) % imagePairs.length);
    setSliderPosition(50);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            Professional Text Behind Image
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Experience the magic of seamless text integration with our advanced AI-powered tool
          </p>
          
          {/* Current slide info */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground">{currentPair.title}</h3>
              <p className="text-muted-foreground">{currentPair.description}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main slider container */}
        <div className="max-w-2xl mx-auto">
          {/* Navigation and controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isAutoplay ? 'Pause' : 'Play'}</span>
              </button>

              <div className="flex gap-2">
                {imagePairs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary shadow-lg scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Before/After Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="perspective-1000"
            >
              <div 
                ref={containerRef}
                className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-3xl shadow-2xl cursor-col-resize select-none group"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Before Image (Background) */}
                <div className="absolute inset-0">
                  <img
                    src={currentPair.before}
                    alt={currentPair.beforeAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                  <div className="absolute top-6 left-6 bg-red-500/90 text-white px-6 py-3 rounded-full font-semibold text-sm backdrop-blur-sm shadow-lg">
                    BEFORE
                  </div>
                </div>

                {/* After Image (Overlay) */}
                <div 
                  className="absolute inset-0 overflow-hidden transition-all duration-300"
                  style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
                >
                  <img
                    src={currentPair.after}
                    alt={currentPair.afterAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                  <div className="absolute top-6 right-6 bg-green-500/90 text-white px-6 py-3 rounded-full font-semibold text-sm backdrop-blur-sm shadow-lg">
                    AFTER
                  </div>
                </div>

                {/* Enhanced Slider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 cursor-col-resize transition-all duration-300"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Handle Circle */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-primary flex items-center justify-center"
                    animate={{ 
                      scale: isDragging ? 1.1 : 1,
                      boxShadow: isDragging 
                        ? "0 20px 40px rgba(0,0,0,0.3), 0 0 0 4px rgba(var(--primary), 0.2)"
                        : "0 10px 30px rgba(0,0,0,0.2)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex space-x-1"
                      animate={{ 
                        opacity: isDragging ? 1 : 0.8,
                        scale: isDragging ? 1.1 : 1
                      }}
                    >
                      <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                      <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    </motion.div>
                  </motion.div>

                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/20"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Gradient overlays for enhanced contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none" />
                
                {/* Instructions overlay */}
                <AnimatePresence>
                  {!isDragging && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm"
                    >
                      ← Drag to compare →
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Progress Bar */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-6 mb-8">
              <span className="text-sm font-medium text-red-500">Before</span>
              <div className="relative w-48 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                  style={{ width: `${sliderPosition}%` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
              <span className="text-sm font-medium text-green-500">After</span>
            </div>

            <motion.button
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start Creating - It's Free!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
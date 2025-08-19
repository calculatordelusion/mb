import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Zap } from "lucide-react";

const sliderImages = [
  {
    src: "/lovable-uploads/519c05a4-530c-477b-80d4-87fd3a9cff8b.png",
    title: "Cold",
    subtitle: "Sports Photography",
    description: "Create stunning text effects that flow naturally behind athletic subjects, adding depth and drama to sports photography.",
    category: "SPORTS"
  },
  {
    src: "/lovable-uploads/9eb64270-bd9e-4556-ad80-3131788f82d0.png",
    title: "Natural",
    subtitle: "Lifestyle Photography", 
    description: "Seamlessly blend typography with natural environments for authentic, organic visual storytelling that captivates.",
    category: "LIFESTYLE"
  },
  {
    src: "/lovable-uploads/a72f4d2a-01d6-4a7a-a553-4b301b23d549.png",
    title: "Life",
    subtitle: "Urban Moments",
    description: "Transform everyday urban scenes into powerful visual narratives with dynamic text placement and modern typography.",
    category: "URBAN"
  },
  {
    src: "/lovable-uploads/ddce77f7-3f14-485d-8af9-5ba4ca2b1f60.png",
    title: "NYC",
    subtitle: "City Life",
    description: "Capture the energy of city life with bold text effects that complement the urban landscape and street photography.",
    category: "STREET"
  },
  {
    src: "/lovable-uploads/5af51c3c-3018-435f-9dfa-e7cfdc2e323e.png",
    title: "Go",
    subtitle: "Street Style",
    description: "Express personal style and movement through creative text positioning that adds narrative depth to portrait photography.",
    category: "PORTRAIT"
  },
  {
    src: "/lovable-uploads/ea4e1753-05e0-4812-b007-d7fdb061f100.png",
    title: "San Francisco",
    subtitle: "Travel Photography",
    description: "Document your travels with sophisticated text overlays that preserve the beauty while adding location context.",
    category: "TRAVEL"
  },
  {
    src: "/lovable-uploads/adc01fa9-249b-4e26-a89a-9c4befc938e6.png",
    title: "POV",
    subtitle: "Product Photography",
    description: "Enhance product presentations with text that doesn't obstruct but adds value and storytelling to commercial imagery.",
    category: "COMMERCIAL"
  },
  {
    src: "/lovable-uploads/6008922c-e0ed-4bb1-b555-5808c8d18392.png",
    title: "Behind",
    subtitle: "Luxury Lifestyle",
    description: "Create premium visual content with elegant text integration that maintains sophistication and brand excellence.",
    category: "LUXURY"
  }
];

export const ModernSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const currentImage = sliderImages[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
      rotateY: direction > 0 ? 25 : -25
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 25 : -25
    })
  };

  return (
    <div className="relative w-full h-[700px] rounded-3xl overflow-hidden group bg-gradient-to-br from-card via-card/50 to-background shadow-premium">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px), radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </div>

      {/* Main image container */}
      <div className="relative w-full h-full perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 }
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
          {/* Top section */}
          <div className="flex justify-between items-start">
            <motion.div
              key={`category-${currentIndex}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-4 py-2 rounded-full glass-effect"
            >
              <span className="text-sm font-semibold text-accent">{currentImage.category}</span>
            </motion.div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </motion.button>
            </div>
          </div>

          {/* Bottom content */}
          <div className="space-y-6">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-6xl md:text-8xl font-bold text-white mb-2">
                {currentImage.title}
              </h3>
              <p className="text-xl text-gray-200 font-medium">{currentImage.subtitle}</p>
              <p className="text-base text-gray-300 max-w-lg leading-relaxed">
                {currentImage.description}
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <motion.button
                  onClick={goToPrevious}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full glass-effect flex items-center justify-center text-white hover:bg-white/20 transition-colors group"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>
                
                <motion.button
                  onClick={goToNext}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full glass-effect flex items-center justify-center text-white hover:bg-white/20 transition-colors group"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>

              {/* Dots with preview */}
              <div className="flex gap-3">
                {sliderImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      index === currentIndex 
                        ? "w-16 h-12 ring-2 ring-white" 
                        : "w-12 h-8 opacity-70 hover:opacity-100"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 5, 
              ease: "linear",
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0
            }}
            key={`progress-${currentIndex}-${isPlaying}`}
          />
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-2 h-2 bg-accent rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-1 h-1 bg-primary rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </div>
  );
};
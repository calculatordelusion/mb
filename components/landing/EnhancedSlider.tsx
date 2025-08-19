import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

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
  }
];

export const EnhancedSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<boolean[]>([]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = sliderImages.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => resolve(); // Still resolve on error to not block
          img.src = image.src;
        });
      });
      
      await Promise.all(imagePromises);
    };

    preloadImages();
  }, []);

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
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    })
  };

  const transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    opacity: { duration: 0.5 }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[70vh] min-h-[500px] overflow-hidden rounded-3xl group">
      {/* Glass morphism container */}
      <div className="relative w-full h-full glass-effect border border-border/20 rounded-3xl overflow-hidden">
        
        {/* Main slider container */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute inset-0"
            >
              {/* Background image with overlay */}
              <div className="relative w-full h-full">
                {preloadedImages[currentIndex] ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/20 animate-pulse flex items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                  </div>
                )}
                
                {/* Gradient overlays for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 text-white">
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="self-start"
                >
                  <span className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-sm font-bold border border-white/20 shadow-lg">
                    {currentImage.category}
                  </span>
                </motion.div>

                {/* Main content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="space-y-6 max-w-3xl"
                >
                  <h3 className="text-6xl lg:text-8xl font-bold leading-none tracking-tight">
                    {currentImage.title}
                  </h3>
                  <p className="text-2xl lg:text-3xl text-gray-200 font-light">
                    {currentImage.subtitle}
                  </p>
                  <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                    {currentImage.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Play/Pause control */}
        <div className="absolute top-6 right-6 z-20">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>
        </div>

        {/* Navigation arrows */}
        <motion.button
          onClick={goToPrevious}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 shadow-lg"
        >
          <ChevronLeft className="w-7 h-7" />
        </motion.button>

        <motion.button
          onClick={goToNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 shadow-lg"
        >
          <ChevronRight className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Enhanced dots navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {sliderImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-3 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-12 bg-primary shadow-glow" 
                : "w-3 bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            whileHover={{ scale: index === currentIndex ? 1.1 : 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                layoutId="activeSlide"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full h-1 bg-muted/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary rounded-full"
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
    </div>
  );
};
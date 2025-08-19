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

export const PaperFlipSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

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

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      z: -200,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      z: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      z: -200,
      opacity: 0,
      scale: 0.8,
    })
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] perspective-[1000px] group">
      {/* Main container with paper effect */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
            className="absolute inset-0 bg-white dark:bg-card rounded-2xl shadow-xl"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center"
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-2xl" />
            
            {/* Image */}
            <div className="relative w-full h-full">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="self-start"
              >
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  {currentImage.category}
                </span>
              </motion.div>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-5xl md:text-7xl font-bold">
                  {currentImage.title}
                </h3>
                <p className="text-xl text-gray-200">{currentImage.subtitle}</p>
                <p className="text-base text-gray-300 max-w-2xl">
                  {currentImage.description}
                </p>
              </motion.div>
            </div>

            {/* Paper edge effect */}
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/10 to-transparent rounded-r-2xl" />
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl" />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute top-4 right-4 z-20">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>
        </div>

        {/* Navigation buttons */}
        <motion.button
          onClick={goToPrevious}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={goToNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-8 gap-2">
        {sliderImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-primary scale-125" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 4, 
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
import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
const bearBeforeHd = "/lovable-uploads/10fbb735-4293-4e8e-949a-788f0a3e95dc.png";
const bearAfterHd = "/lovable-uploads/a6749fd9-5639-4093-b395-0895f1299d44.png";

export const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            See The Magic In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Drag the slider to see the transformation
          </p>
          <p className="text-sm text-muted-foreground">
            ← Before | After →
          </p>
        </motion.div>

        {/* Interactive Before/After Slider */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div 
            ref={containerRef}
            className="relative w-full h-[550px] md:h-[650px] overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none"
            onMouseDown={handleMouseDown}
          >
            {/* Before Image (Background) */}
            <div className="absolute inset-0">
              <img
                src={bearBeforeHd}
                alt="Before - Original brown bear in natural habitat"
                className="w-full h-full object-cover object-center"
                draggable={false}
                style={{ imageRendering: 'crisp-edges' }}
              />
              <div className="absolute top-6 left-6 bg-red-500/90 text-white px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-sm">
                BEFORE
              </div>
            </div>

            {/* After Image (Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img
                src={bearAfterHd}
                alt="After - Brown bear with 'bear' text overlay effect"
                className="w-full h-full object-cover object-center"
                draggable={false}
                style={{ imageRendering: 'crisp-edges' }}
              />
              <div className="absolute top-6 right-6 bg-green-500/90 text-white px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-sm">
                AFTER
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 cursor-col-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-primary flex items-center justify-center">
                <motion.div
                  className="flex space-x-1"
                  animate={{ opacity: isDragging ? 1 : 0.7 }}
                >
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                </motion.div>
              </div>
            </div>

            {/* Gradient Overlays for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Instructions */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-6">
              {isDragging ? "Keep dragging to see the difference!" : "Click and drag the slider to compare"}
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-sm text-red-500 font-medium">Before</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-green-500"
                  style={{ width: `${sliderPosition}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <span className="text-sm text-green-500 font-medium">After</span>
            </div>

            <motion.button
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Own - It's Free!
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
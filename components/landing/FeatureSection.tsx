import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap, Palette, Download, Layers, Smartphone, Globe, Shield, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Detection",
    description: "Advanced artificial intelligence automatically identifies objects and depth in your images for perfect text placement",
    color: "text-accent"
  },
  {
    icon: Palette,
    title: "Custom Typography",
    description: "Choose from premium fonts, colors, gradients, and effects to match your creative vision perfectly",
    color: "text-primary"
  },
  {
    icon: Layers,
    title: "Perfect Depth Control",
    description: "Sophisticated layering technology ensures text appears naturally behind foreground objects",
    color: "text-green-400"
  },
  {
    icon: Download,
    title: "High-Quality Export",
    description: "Download your creations in multiple formats including 4K resolution for any use case",
    color: "text-blue-400"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Create stunning designs on any device with our fully responsive and mobile-friendly interface",
    color: "text-purple-400"
  },
  {
    icon: Globe,
    title: "Instant Processing",
    description: "Lightning-fast cloud processing means your designs are ready in seconds, not minutes",
    color: "text-orange-400"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your images are processed securely and never stored on our servers - complete privacy guaranteed",
    color: "text-red-400"
  },
  {
    icon: Rocket,
    title: "No Limits",
    description: "Unlimited uploads, unlimited downloads, unlimited creativity - completely free forever",
    color: "text-indigo-400"
  }
];

const steps = [
  {
    number: "01",
    title: "Upload Your Image",
    description: "Simply drag and drop or click to upload any image from your device. We support all common formats.",
    icon: "📤",
    detail: "JPEG, PNG, WebP up to 10MB"
  },
  {
    number: "02", 
    title: "Add Your Text",
    description: "Type your message and watch as our AI automatically positions it behind the main subject in your photo.",
    icon: "✨",
    detail: "AI-powered text placement"
  },
  {
    number: "03",
    title: "Customize & Style",
    description: "Fine-tune the text appearance with fonts, colors, size, and positioning to match your vision.",
    icon: "🎨",
    detail: "300+ fonts & unlimited colors"
  },
  {
    number: "04",
    title: "Download & Share",
    description: "Export your creation in high quality and share it anywhere - social media, websites, or print.",
    icon: "🚀",
    detail: "4K resolution export"
  }
];

export const FeatureSection = () => {
  return (
    <section className="pt-0 px-6 relative overflow-hidden">{/* Removed top padding */}
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto relative z-10">
        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 pt-0"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Why Choose <span className="text-gradient">Text Behind Image?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of visual design with cutting-edge AI technology that makes professional text effects accessible to everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-6 h-full glass-effect hover:shadow-premium transition-all duration-500 group border-border/50">
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning text behind image effects in just four simple steps
          </p>
        </motion.div>

        {/* Revolutionary 3D Floating Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative pt-16 pb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 100, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
              viewport={{ once: true }}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ 
                  y: -25,
                  rotateY: 8,
                  rotateX: -8,
                  scale: 1.05,
                  z: 50
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }}
                className="transform-gpu h-full relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Main Card with Glass Morphism */}
                <Card className="p-8 h-[32rem] text-center relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl shadow-2xl group-hover:shadow-4xl transition-all duration-700 group-hover:border-primary/30">
                  {/* Dynamic Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '20px 20px'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Floating Orb Background */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />

                  {/* Enhanced Content */}
                  <motion.div 
                    className="mt-8 space-y-6 flex-1 flex flex-col justify-between relative z-10 px-2"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.3
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {/* Icon */}
                    <motion.div 
                      className="text-4xl mb-4 self-center"
                      variants={{
                        hidden: { opacity: 0, scale: 0.5, rotateY: 180 },
                        visible: { opacity: 1, scale: 1, rotateY: 0 }
                      }}
                      whileHover={{ scale: 1.2, rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:via-accent group-hover:to-primary transition-all duration-700 text-center"
                      variants={{
                        hidden: { opacity: 0, y: 30, rotateX: 45 },
                        visible: { opacity: 1, y: 0, rotateX: 0 }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-muted-foreground leading-relaxed text-base font-medium text-center flex-1"
                      variants={{
                        hidden: { opacity: 0, y: 30, rotateX: 45 },
                        visible: { opacity: 1, y: 0, rotateX: 0 }
                      }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Detail Badge */}
                    <motion.div
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: "linear-gradient(to right, hsl(var(--primary)/0.2), hsl(var(--accent)/0.2), hsl(var(--primary)/0.2))"
                      }}
                    >
                      <span className="text-sm font-medium text-primary text-center block">
                        {step.detail}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, hsl(var(--primary) / 0.1) 50%, transparent 70%)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />

                  {/* Magical Particles */}
                  {Array.from({ length: 6 }).map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
                      style={{
                        left: `${20 + (particleIndex * 15)}%`,
                        top: `${30 + (particleIndex * 10)}%`
                      }}
                      animate={{ 
                        y: [0, -20, 0],
                        x: [0, Math.sin(particleIndex) * 10, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ 
                        duration: 3 + particleIndex * 0.5, 
                        repeat: Infinity, 
                        delay: index * 0.2 + particleIndex * 0.3
                      }}
                    />
                  ))}

                  {/* Premium Connecting Flow */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2 z-30"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
                    >
                      <motion.div
                        className="flex items-center"
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <motion.div 
                          className="w-16 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ backgroundSize: '200% 100%' }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-primary rounded-full ml-2 relative"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            boxShadow: [
                              "0 0 0px hsl(var(--primary))",
                              "0 0 20px hsl(var(--primary))",
                              "0 0 0px hsl(var(--primary))"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary"
                            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </Card>

                {/* Reflection Effect */}
                <motion.div
                  className="absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-b from-primary/10 to-transparent rounded-lg blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                  initial={{ scaleY: 0.5 }}
                  whileHover={{ scaleY: 0.8 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is a text behind image tool?",
    answer: "A text behind image tool is an AI-powered photo editing solution that creates stunning depth effects by placing text behind objects in your photos. Our advanced algorithm automatically detects foreground subjects and seamlessly integrates your text to appear naturally behind them, creating professional layered visuals."
  },
  {
    question: "Is the tool completely free to use?",
    answer: "Yes! Our service is 100% free with no hidden costs, subscriptions, or premium tiers. You get unlimited access to all features, unlimited downloads, and zero watermarks on your creations. We believe powerful design tools should be accessible to everyone."
  },
  {
    question: "Do I need design experience?",
    answer: "Absolutely not! Our tool is designed for everyone, from complete beginners to professional designers. The intuitive interface combined with AI-powered automation means you can create stunning effects in seconds, regardless of your background or technical skills."
  },
  {
    question: "How does the tool work?",
    answer: "Simply upload your photo, type your desired text, and our AI automatically detects depth and objects in your image. You can then customize the text position, font, size, color, and effects. The tool instantly generates a preview, and when satisfied, download in high quality."
  },
  {
    question: "What image types work best?",
    answer: "Our tool works best with photos that have clear foreground subjects like people, objects, animals, or buildings against distinct backgrounds. Images with good contrast and defined edges produce the most stunning results."
  },
  {
    question: "Can I customize text appearance?",
    answer: "Absolutely! Our tool offers complete control over text styling including font family, size, color, opacity, shadows, gradients, and positioning. Choose from premium fonts, apply stunning effects, and fine-tune every aspect to match your vision."
  },
  {
    question: "What download formats are available?",
    answer: "You can download your creations in multiple high-quality formats including PNG, JPG, and SVG. All downloads are available in up to 4K resolution, making them perfect for social media, print materials, websites, and marketing campaigns."
  },
  {
    question: "Can I use creations commercially?",
    answer: "Yes! All designs you create are yours to use however you'd like, including commercial purposes, marketing materials, social media content, websites, or print advertising. There are no usage restrictions or licensing fees - they're completely yours."
  }
];

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First FAQ open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-primary opacity-10 blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-gradient-accent opacity-10 blur-2xl"
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center premium-glow">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to <span className="text-gradient">Know</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get answers to the most common questions about our text behind image tool and discover how easy it is to create stunning visuals.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Collapsible
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="p-6 cursor-pointer glass-effect hover:shadow-glow transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-accent" />
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <Card className="p-6 glass-effect border-l-4 border-l-primary/50">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="p-8 rounded-2xl glass-effect">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Try our tool now and see how easy it is to create amazing text behind image effects!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold premium-glow"
              onClick={() => window.location.href = '/contact-us'}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
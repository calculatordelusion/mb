'use client'

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChromePicker } from 'react-color';
import { colors } from '@/constants/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Palette, Zap } from 'lucide-react';

interface ColorPickerProps {
  attribute: string;
  label: string;
  currentColor: string;
  handleAttributeChange: (attribute: string, value: any) => void;
} 

const ColorPicker: React.FC<ColorPickerProps> = ({
  attribute,
  label,
  currentColor,
  handleAttributeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('colorPicker');

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={attribute} className="text-sm font-medium text-foreground/80">
        {label}
      </Label>

      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between px-3 py-2 h-auto hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <motion.div
                style={{ background: currentColor }}
                className="rounded-md h-6 w-6 border border-muted shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <span className="font-mono text-sm bg-background px-2 py-1 rounded-md border dark:bg-accent/30">
                {currentColor.toUpperCase()}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Palette className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent
          className="w-[276px] p-2 rounded-xl shadow-lg border bg-popover"
          side="bottom"
          align="start"
          sideOffset={8}
        >
          <Tabs 
            defaultValue="colorPicker"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-9 mb-3">
              <TabsTrigger 
                value="colorPicker"
                className="flex items-center gap-2 text-xs"
              >
                <Palette className="h-3.5 w-3.5" />
                Custom
              </TabsTrigger>
              <TabsTrigger 
                value="suggestions"
                className="flex items-center gap-2 text-xs"
              >
                <Zap className="h-3.5 w-3.5" />
                Presets
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                <TabsContent value="colorPicker" className="m-0">
                  <ChromePicker
                    color={currentColor}
                    onChange={(color) => handleAttributeChange(attribute, color.hex)}
                    styles={{
                      default: {
                        picker: {
                          width: '100%',
                          boxShadow: 'none',
                          background: 'transparent',
                        },
                      },
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="suggestions" className="m-0">
                  <div className="grid grid-cols-8 gap-2 p-1">
                    {colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAttributeChange(attribute, color)}
                        className="relative h-6 w-6 rounded-md border border-muted shadow-sm"
                        style={{ background: color }}
                        title={color}
                      >
                        {currentColor.toLowerCase() === color.toLowerCase() && (
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="h-3 w-3 text-white stroke-[3px]" />
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColorPicker;
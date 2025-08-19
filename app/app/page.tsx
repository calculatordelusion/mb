// app/app/page.tsx
'use client'

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';
import TextCustomizer from '@/components/editor/text-customizer';

import { PlusIcon, ReloadIcon, UploadIcon, DownloadIcon } from '@radix-ui/react-icons';
import { removeBackground } from "@imgly/background-removal";

import '@/app/fonts.css';
import AppAds from '@/components/editor/app-ads';
import FirecrawlAd from '@/ads/firecrawl';

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
  const [textSets, setTextSets] = useState<Array<any>>([]);
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);
  const [isHoveringSave, setIsHoveringSave] = useState(false);
  const [parent] = useAutoAnimate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null); // used to compute on-screen "contain" rect

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await setupImage(imageUrl);
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      setIsImageSetupDone(false);
      const imageBlob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(imageBlob);
      setRemovedBgImageUrl(url);
      setIsImageSetupDone(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTextSet = () => {
    const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
    setTextSets(prev => [...prev, {
      id: newId,
      text: 'edit',
      fontFamily: 'Inter',
      top: 0,
      left: 0,
      color: 'white',
      fontSize: 200,
      fontWeight: 800,
      opacity: 1,
      shadowColor: 'rgba(0, 0, 0, 0.8)',
      shadowSize: 4,
      rotation: 0,
      tiltX: 0,
      tiltY: 0,
      letterSpacing: 0
    }]);
  };

  const handleAttributeChange = (id: number, attribute: string, value: any) => {
    setTextSets(prev => prev.map(set =>
      set.id === id ? { ...set, [attribute]: value } : set
    ));
  };

  const duplicateTextSet = (textSet: any) => {
    const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
    setTextSets(prev => [...prev, { ...textSet, id: newId }]);
  };

  const removeTextSet = (id: number) => {
    setTextSets(prev => prev.filter(set => set.id !== id));
  };

  // ===== SAVE AT ORIGINAL IMAGE SIZE, NO LETTERBOX, ACCURATE TEXT SCALE/POS =====
  const saveCompositeImage = () => {
    if (!canvasRef.current || !isImageSetupDone || !previewRef.current || !selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper: compute the "object-fit: contain" rect for an image inside a box
    function getContainRect(imgW: number, imgH: number, boxW: number, boxH: number) {
      const scale = Math.min(boxW / imgW, boxH / imgH);
      const dw = imgW * scale;
      const dh = imgH * scale;
      const dx = (boxW - dw) / 2;
      const dy = (boxH - dh) / 2;
      return { dx, dy, dw, dh, scale };
    }

    // 1) Load the base image to know its *actual* size
    const bgImg = new (window as any).Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      const imgW = bgImg.naturalWidth || bgImg.width;
      const imgH = bgImg.naturalHeight || bgImg.height;

      // 2) Final canvas is exactly the image's original size (no white bars)
      canvas.width = imgW;
      canvas.height = imgH;

      // 3) Figure out how big the image is being shown inside the preview (object-fit: contain)
      const boxRect = previewRef.current!.getBoundingClientRect();
      const boxW = Math.max(1, Math.round(boxRect.width));
      const boxH = Math.max(1, Math.round(boxRect.height));
      const contain = getContainRect(imgW, imgH, boxW, boxH);

      // Scale factor to map from preview coordinates to original image pixels
      // If the image is displayed as "dw x dh" in preview, then each preview pixel corresponds to (imgW/dw) image pixels.
      const toImageScale = imgW / contain.dw; // same as imgH / contain.dh

      // 4) Draw the base image to fill the final canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImg, 0, 0, imgW, imgH);

      // 5) Draw all text layers, converting preview positions to image coordinates
      textSets.forEach(textSet => {
        ctx.save();

        // Convert % (relative to preview box) into preview pixels:
        const xPreview = (boxW * (textSet.left + 50)) / 100;     // same formula used on-screen
        const yPreview = (boxH * (50 - textSet.top)) / 100;

        // Convert preview pixels into image pixels by removing letterbox and scaling
        const xImg = (xPreview - contain.dx) * toImageScale;
        const yImg = (yPreview - contain.dy) * toImageScale;

        // Scale font size, letterSpacing, shadow to image pixels
        const fontSizePx = Math.max(1, textSet.fontSize * toImageScale);
        const spacingPx = (textSet.letterSpacing || 0) * toImageScale;
        const shadowBlurPx = (textSet.shadowSize || 0) * toImageScale;

        ctx.font = `${textSet.fontWeight} ${fontSizePx}px ${textSet.fontFamily}`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Approximate CSS textShadow using canvas shadows
        ctx.shadowColor = textSet.shadowColor || 'rgba(0,0,0,0)';
        ctx.shadowBlur = shadowBlurPx;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Apply tilt/rotation transforms
        ctx.translate(xImg, yImg);
        const tiltXRad = (-textSet.tiltX * Math.PI) / 180;
        const tiltYRad = (-textSet.tiltY * Math.PI) / 180;
        ctx.transform(
          Math.cos(tiltYRad),
          0,
          0,
          Math.cos(tiltXRad),
          0,
          0
        );
        ctx.rotate((textSet.rotation * Math.PI) / 180);

        // Render with optional letter-spacing
        if (!spacingPx) {
          ctx.fillText(textSet.text, 0, 0);
        } else {
          const chars = String(textSet.text).split('');
          const totalWidth = chars.reduce((acc, ch, i) => {
            const w = ctx.measureText(ch).width;
            return acc + w + (i < chars.length - 1 ? spacingPx : 0);
          }, 0);
          let currentX = -totalWidth / 2;
          chars.forEach((ch) => {
            const w = ctx.measureText(ch).width;
            ctx.fillText(ch, currentX + w / 2, 0);
            currentX += w + spacingPx;
          });
        }

        ctx.restore();
      });

      // 6) Overlay the "removed background" subject (same original image size)
      if (removedBgImageUrl) {
        const removedBgImg = new (window as any).Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, imgW, imgH);
          triggerDownload();
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload();
      }
    };

    bgImg.src = selectedImage;

    function triggerDownload() {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'text-behind-image.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1609710199882100" crossOrigin="anonymous"></script>
      <div className='flex flex-col h-screen bg-gradient-to-br from-background to-muted/20'>
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col sm:flex-row items-center justify-between p-3 sm:p-5 px-4 sm:px-6 md:px-10 backdrop-blur-sm bg-background/80 border-b gap-3 sm:gap-0'
        >
          <motion.h2
            whileHover={{ scale: 1.02 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent"
          >
            <span className="block sm:hidden">TBI</span>
            <span className="hidden sm:block">Text Behind Image</span>
          </motion.h2>

          <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center w-full sm:w-auto'>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
            />

            <div className='flex gap-2 w-full sm:w-auto'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant={isHoveringUpload ? "default" : "outline"}
                  onClick={handleUploadImage}
                  onMouseEnter={() => setIsHoveringUpload(true)}
                  onMouseLeave={() => setIsHoveringUpload(false)}
                  className="gap-2 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                >
                  {isHoveringUpload ? (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <UploadIcon />
                    </motion.span>
                  ) : null}
                  Upload
                </Button>
              </motion.div>

              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none"
                  >
                    <Button
                      variant={isHoveringSave ? "default" : "outline"}
                      onClick={saveCompositeImage}
                      onMouseEnter={() => setIsHoveringSave(true)}
                      onMouseLeave={() => setIsHoveringSave(false)}
                      className="gap-2 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                    >
                      {isHoveringSave ? (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DownloadIcon />
                        </motion.span>
                      ) : null}
                      Save
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <ModeToggle />
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedImage ? (
              <motion.div
                key="editor-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col lg:flex-row items-start justify-start gap-4 sm:gap-6 md:gap-10 w-full h-full px-3 sm:px-4 md:px-10 py-4 sm:py-6'
              >
                {/* Image Preview Section */}
                <motion.div
                  layout
                  className="flex flex-col items-center justify-start w-full lg:w-1/2 gap-3 sm:gap-4 h-full"
                >
                  <motion.div
                    ref={previewRef}
                    className="relative w-full h-full max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] p-2 sm:p-4 border-2 border-border rounded-xl bg-gradient-to-br from-muted/20 to-background shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    {isImageSetupDone ? (
                      <>
                        <Image
                          src={selectedImage}
                          alt="Uploaded"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          className="z-0"
                        />
                        {textSets.map(textSet => (
                          <motion.div
                            key={textSet.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              position: 'absolute',
                              top: `${50 - textSet.top}%`,
                              left: `${textSet.left + 50}%`,
                              transform: `
                                translate(-50%, -50%) 
                                rotate(${textSet.rotation}deg)
                                perspective(1000px)
                                rotateX(${textSet.tiltX}deg)
                                rotateY(${textSet.tiltY}deg)
                              `,
                              color: textSet.color,
                              textAlign: 'center',
                              fontSize: `${textSet.fontSize}px`,
                              fontWeight: textSet.fontWeight,
                              fontFamily: textSet.fontFamily,
                              opacity: textSet.opacity,
                              letterSpacing: `${textSet.letterSpacing}px`,
                              transformStyle: 'preserve-3d',
                              zIndex: 10,
                              textShadow: `0 0 ${textSet.shadowSize}px ${textSet.shadowColor}`
                            }}
                          >
                            {textSet.text}
                          </motion.div>
                        ))}
                        {removedBgImageUrl && (
                          <Image
                            src={removedBgImageUrl}
                            alt="Removed bg"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            className="absolute top-0 left-0 w-full h-full z-20"
                          />
                        )}
                      </>
                    ) : (
                      <motion.div
                        className="flex items-center justify-center w-full h-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base">
                          <ReloadIcon className='animate-spin h-4 w-4 sm:h-5 sm:w-5' />
                          <span>Processing your image...</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* Text Controls Section */}
                <motion.div
                  layout
                  className='flex flex-col w-full lg:w-1/2 h-full gap-3 sm:gap-4'
                >
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant={'secondary'}
                      onClick={addNewTextSet}
                      className="w-full py-4 sm:py-6 shadow-sm text-sm sm:text-base"
                    >
                      <PlusIcon className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                      <span className="text-base sm:text-lg">Add New Text Layer</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    ref={parent}
                    className="h-full rounded-xl border bg-background/50 backdrop-blur-sm shadow-inner overflow-hidden"
                  >
                    <ScrollArea className="h-full p-3 sm:p-4">
                      <Accordion type="multiple" className="w-full space-y-2 sm:space-y-3">
                        {textSets.map(textSet => (
                          <motion.div
                            key={textSet.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-background rounded-lg border shadow-sm"
                          >
                            <TextCustomizer
                              textSet={textSet}
                              handleAttributeChange={handleAttributeChange}
                              removeTextSet={removeTextSet}
                              duplicateTextSet={duplicateTextSet}
                            />
                          </motion.div>
                        ))}
                      </Accordion>

                      {textSets.length === 0 && (
                        <motion.div
                          className="flex flex-col items-center justify-center h-48 sm:h-64 text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="text-center space-y-2 px-4">
                            <UploadIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 opacity-50" />
                            <h3 className="text-base sm:text-lg font-medium">No text layers yet</h3>
                            <p className="text-xs sm:text-sm">Add your first text layer to get started</p>
                          </div>
                        </motion.div>
                      )}
                    </ScrollArea>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center h-full w-full p-4 sm:p-6"
              >
                <motion.div
                  className="text-center max-w-md space-y-4 sm:space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mx-auto w-fit p-3 sm:p-4 rounded-full bg-primary/10">
                    <UploadIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Create Stunning Text Behind Image Effects
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Upload an image to get started with our professional text placement tool. Create beautiful compositions with text behind your subjects.
                  </p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      onClick={handleUploadImage}
                      className="gap-2 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold"
                    >
                      <UploadIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      Upload Image
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default Page;

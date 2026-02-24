"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const countriesRow1 = [
  { flag: '🇺🇸', name: 'United States' },
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇫🇷', name: 'France' },
];

const countriesRow2 = [
  { flag: '🇮🇳', name: 'India' },
  { flag: '🇧🇷', name: 'Brazil' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇲🇽', name: 'Mexico' },
  { flag: '🇨🇴', name: 'Colombia' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🌍', name: '180+ Countries' },
];

export function CoverageSection() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Desktop Scroll Animations
  const row1XDesktop = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const row2XDesktop = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] md:min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Animated Dotted Map Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full max-w-6xl text-[#cfe3f5] fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" />
            </pattern>
            <path id="worldMapPath" d="M150,200 L300,180 L450,190 L600,170 L850,220 L880,450 L750,520 L400,500 L150,480 Z" />
            <mask id="mapMask">
              <use href="#worldMapPath" fill="white" />
            </mask>
          </defs>
          
          <rect width="1000" height="600" fill="url(#dotPattern)" mask="url(#mapMask)" />
          
          {[...Array(40)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 700 + 150}
              cy={Math.random() * 320 + 180}
              r={Math.random() * 2 + 1}
              initial={{ opacity: 0.1, fill: '#cfe3f5' }}
              animate={{ 
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.3, 1],
                fill: ['#cfe3f5', '#93c5fd', '#cfe3f5']
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity, 
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container relative z-10 px-6 md:px-12 lg:px-20 mx-auto text-center"
      >
        <div className="inline-flex items-center px-4 py-1.5 mb-6 md:mb-10 text-xs md:text-sm font-medium rounded-full glass border-white/40 shadow-sm backdrop-blur-md">
          <span className="text-foreground/70">The world is your oyster</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 md:mb-8 leading-tight tracking-tight px-4">
          Global Traffic Coverage<br />
          <span className="italic font-normal text-accent/80">Traffic by Location</span>
        </h2>

        <p className="max-w-xl mx-auto text-sm md:text-lg text-muted-foreground mb-12 md:mb-20 leading-relaxed font-medium px-4">
          Experience premium AI traffic distribution across the US,<br className="hidden md:block" />
          and 180+ countries globally.
        </p>

        {/* Floating Pills */}
        <div className="flex flex-col gap-4 md:gap-10 items-center select-none overflow-hidden py-4 md:py-10">
          {/* Row 1: Right to Left on Mobile */}
          <motion.div 
            style={!isMobile ? { x: row1XDesktop } : {}}
            animate={isMobile ? { x: [-30, 30] } : {}}
            transition={isMobile ? { repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" } : {}}
            className="flex gap-3 md:gap-6 items-center will-change-transform"
          >
            {countriesRow1.map((country, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-4 bg-white rounded-full shadow-lg border border-white hover:scale-105 transition-transform cursor-default whitespace-nowrap"
              >
                <span className="text-lg md:text-2xl">{country.flag}</span>
                <span className="font-bold text-foreground text-[10px] md:text-base">{country.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Row 2: Left to Right on Mobile */}
          <motion.div 
            style={!isMobile ? { x: row2XDesktop } : {}}
            animate={isMobile ? { x: [30, -30] } : {}}
            transition={isMobile ? { repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" } : {}}
            className="flex gap-3 md:gap-6 items-center will-change-transform"
          >
            {countriesRow2.map((country, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-4 bg-white rounded-full shadow-lg border border-white hover:scale-105 transition-transform cursor-default whitespace-nowrap"
              >
                <span className="text-lg md:text-2xl">{country.flag}</span>
                <span className="font-bold text-foreground text-[10px] md:text-base">{country.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

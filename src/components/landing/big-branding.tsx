
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function BigBranding() {
  return (
    <section className="sticky top-0 h-screen bg-black overflow-hidden flex items-center justify-center -z-10">
      {/* Texture and Glow Effects */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.pattern')] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 pointer-events-none" />
      
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
        <div className="w-[150%] h-[150%] bg-gradient-to-r from-accent via-primary to-accent animate-[spin_30s_linear_infinite]" />
      </div>
      
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative inline-block">
            {/* Background Blur Text for Depth */}
            <h2 className="text-[14vw] font-black leading-none tracking-tighter text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl select-none whitespace-nowrap">
              TRAFFICA.AI
            </h2>
            <h2 className="text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-accent select-none relative">
              TRAFFICA.AI
            </h2>
          </div>
          
          <p className="text-lg md:text-2xl font-bold text-white/30 mt-12 uppercase tracking-[0.6em] opacity-60">
            The Future of Social Traffic
          </p>
        </motion.div>
      </div>
    </section>
  );
}

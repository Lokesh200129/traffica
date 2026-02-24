"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-12 rounded-[3rem] shadow-xl border-white/60 relative overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
              >
                <Star className="w-8 h-8 fill-accent text-accent" />
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4">Trusted by 10,000+ Publishers</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12">
            The world's most reliable AI social traffic network for premium publishers.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">AD_TECH</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">PUB_GEN</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">TRUST_AI</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">SOCIAL_MAX</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateAdSenseSafeTraffic } from '@/ai/flows/generate-adsense-safe-traffic-flow';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CountryStrip } from './country-strip';

export function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetTraffic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const result = await generateAdSenseSafeTraffic({ websiteUrl: url });
      toast({
        title: "Strategy Activated!",
        description: result.message,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate traffic generation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-secondary rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container relative z-10 px-6 md:px-12 lg:px-20 mx-auto text-center flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/80 px-4 py-2 rounded-full mb-8 border border-white/50 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground/80">AI-Powered Social Traffic Distribution</span>
          </div>

          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
            Get High-Quality, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AdSense-Safe</span> Social Traffic Instantly
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Drive premium traffic from Pinterest, Facebook, Instagram and more using our intelligent AI routing system designed for 100% safety.
          </p>

          <form
            onSubmit={handleGetTraffic}
            className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-2 p-4 sm:p-2 bg-white rounded-[2rem] sm:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50"
          >
            <div className="flex-1">
              <Input
                type="url"
                placeholder="Your Website URL"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 bg-white border-accent border-[1px] text-base placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-accent rounded-2xl sm:rounded-full px-6 transition-colors w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-2xl sm:rounded-full transition-all duration-300 shadow-lg shadow-accent/20 w-full sm:w-auto"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Free Traffic"}
            </Button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full pb-12"
      >
        <CountryStrip />
      </motion.div>
    </section>
  );
}

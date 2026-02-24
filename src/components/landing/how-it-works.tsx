
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, UserCheck, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Submit Your Website",
    description: "Simply enter your URL and target niche. Our AI analyzes your content to find the best traffic fit."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AI Distributes Social Traffic",
    description: "Our system intelligently routes visitors from Pinterest, FB, and IG using safe, organic patterns."
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Receive Safe, Real Visitors",
    description: "Monitor your high-quality, real-user traffic in real-time through our premium dashboard."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30 relative scroll-mt-20">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">How It Works</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Three simple steps to boost your website visibility with premium social traffic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative group px-4 py-8 md:p-8 rounded-3xl glass shadow-lg hover:shadow-2xl transition-all duration-500 text-center border-white/50"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 translate-y-[-50%] z-20">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-muted-foreground/30"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

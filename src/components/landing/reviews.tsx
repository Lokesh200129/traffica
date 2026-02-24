
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    name: "Alex Johnson",
    country: "United States",
    image: "https://picsum.photos/seed/10/200/200",
    text: "AdTraffic AI transformed my blog. The traffic is consistent, high-quality, and 100% safe. My AdSense revenue has doubled since I started using their service.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    country: "Spain",
    image: "https://picsum.photos/seed/20/200/200",
    text: "I was skeptical about social traffic, but the AI distribution system here is magic. Real users, real engagement, and no issues with compliance whatsoever.",
    rating: 5
  },
  {
    name: "Marcus Chen",
    country: "Singapore",
    image: "https://picsum.photos/seed/30/200/200",
    text: "The best ROI I've had in years. The dashboard is detailed and shows exactly where every visitor comes from. Highly recommended for premium sites.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    country: "United Kingdom",
    image: "https://picsum.photos/seed/40/200/200",
    text: "The targeted country feature is a game changer. I can finally reach my audience in the UK and US with precision. Customer support is also top-notch!",
    rating: 5
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-background scroll-mt-20">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">What Publishers Say</h2>
          <p className="text-base md:text-lg text-muted-foreground">Join thousands of successful publishers growing their reach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="px-4 py-8 md:p-8 glass rounded-3xl shadow-lg border-white/50 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20 flex-shrink-0">
                  <Image src={review.image} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none mb-1">{review.name}</h4>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{review.country}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed italic mt-auto">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

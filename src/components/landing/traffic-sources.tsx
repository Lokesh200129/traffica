
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const sources = [
  {
    name: "Google",
    description: "High-intent search traffic from the world's largest search network.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    color: "bg-blue-50"
  },
  {
    name: "Meta",
    description: "Deep demographic reach through the world's most connected social ecosystem.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0668E1">
        <path d="M16.666 4.333c-3.125 0-5.417 2.084-7.5 5.209-2.083-3.125-4.375-5.209-7.5-5.209-3.125 0-5 1.875-5 5s1.875 5 5 5c3.125 0 5.417-2.084 7.5-5.209 2.083 3.125 4.375 5.209 7.5 5.209 3.125 0 5-1.875 5-5s-1.875-5-5-5zM4.166 12.666c-1.875 0-3.333-1.458-3.333-3.333s1.458-3.333 3.333-3.333c1.875 0 3.542 1.458 5 4.167-1.458 2.5-3.125 2.5-5 2.5zm12.5 0c-1.875 0-3.542-1.458-5-4.167 1.458-2.5 3.125-2.5 5-2.5 1.875 0 3.333 1.458 3.333 3.333s-1.458 3.333-3.333 3.333z"/>
      </svg>
    ),
    color: "bg-sky-50"
  },
  {
    name: "Instagram",
    description: "High-engagement visual discovery from a trend-conscious global audience.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <defs>
          <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path fill="url(#insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: "bg-pink-50"
  },
  {
    name: "Pinterest",
    description: "Highly relevant referral traffic from users in the active inspiration and planning phase.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E60023">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/>
      </svg>
    ),
    color: "bg-red-50"
  },
  {
    name: "X (Twitter)",
    description: "Instant viral traffic from trending conversations and real-time global events.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "bg-slate-50"
  },
  {
    name: "LinkedIn",
    description: "Premium B2B traffic and professional networking focused on industry growth.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "bg-indigo-50"
  },
  {
    name: "TikTok",
    description: "Hyper-engaged, trend-driven video referral traffic for maximum brand retention.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.7-1.49 5.66-1.02v4.08c-.78-.23-1.65-.21-2.37.15-.74.29-1.33.91-1.62 1.63-.34.77-.38 1.66-.12 2.46.21.72.68 1.34 1.28 1.74.6.43 1.35.61 2.09.54.75-.03 1.48-.3 2.06-.77.74-.57 1.22-1.43 1.31-2.39.04-3.47.01-6.93.01-10.4z"/>
      </svg>
    ),
    color: "bg-cyan-50"
  },
  {
    name: "YouTube",
    description: "Authoritative video-driven traffic with the highest dwell time in the industry.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "bg-rose-50"
  }
];

export function TrafficSources() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Verified Traffic Sources</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI intelligently routes visitors from the most trusted and high-authority platforms on the web.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {sources.map((source, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group px-4 py-8 md:p-8 rounded-[2rem] border border-black/5 flex flex-col items-center text-center hover:shadow-xl hover:border-black/10 transition-all duration-500 bg-white shadow-sm"
            >
              <div className={`w-16 h-16 ${source.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {source.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{source.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {source.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

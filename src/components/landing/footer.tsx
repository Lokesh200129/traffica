
"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 0, }}
      className="relative z-20 bg-white rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.15)] border-t border-gray-100"
    >
      <div className="container px-6 md:px-12 lg:px-20 mx-auto pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center group mb-6">
              <span>TRAFFICA</span>
              <span className="text-accent">.AI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
              The world's most advanced AI-powered social traffic network. Designed for premium publishers who demand safety and high ROI.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Solutions</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="#" className="hover:text-accent flex items-center gap-2 transition-colors">AdSense Safety <ExternalLink className="w-3 h-3" /></Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Traffic Filtering</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Country Targeting</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Analytics Integration</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Company</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="#" className="hover:text-accent transition-colors">About Traffica</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Media Kit</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-6">Get tips on scaling your AdSense revenue.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 rounded-xl bg-secondary/30 border-none px-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              />
              <button className="absolute right-1 top-1 h-10 px-4 bg-primary text-white rounded-lg text-xs font-bold hover:bg-accent transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-muted-foreground font-medium">
            <p>© 2026 AdTraffic AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="font-bold text-foreground">99.9%</span> Uptime
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

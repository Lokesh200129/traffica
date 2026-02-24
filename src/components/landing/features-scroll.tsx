"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Share2, Target, Users, BotOff, TrendingUp, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: "100% AdSense Safe",
    icon: <Shield className="w-6 h-6" />,
    desc: "All traffic fully complies with Google AdSense policies. Your account stays safe and your revenue keeps growing.",
    color: "bg-[#f0fdf4]",
    iconColor: "bg-[#dcfce7] text-[#166534]",
    linkColor: "text-[#166534]"
  },
  {
    title: "Social Media Traffic",
    icon: <Share2 className="w-6 h-6" />,
    desc: "Real visitors from Pinterest, Facebook, Instagram, Twitter and more social platforms worldwide.",
    color: "bg-[#f5f3ff]",
    iconColor: "bg-[#ede9fe] text-[#5b21b6]",
    linkColor: "text-[#5b21b6]"
  },
  {
    title: "AI Optimized Visitors",
    icon: <Rocket className="w-6 h-6" />,
    desc: "Smart algorithms match your content with the right audience for maximum engagement and retention.",
    color: "bg-[#fffbeb]",
    iconColor: "bg-[#fef3c7] text-[#92400e]",
    linkColor: "text-[#92400e]"
  },
  {
    title: "Country Targeting",
    icon: <Target className="w-6 h-6" />,
    desc: "Target specific countries and regions to get the most relevant traffic for your audience and niche.",
    color: "bg-[#f0f9ff]",
    iconColor: "bg-[#e0f2fe] text-[#075985]",
    linkColor: "text-[#075985]"
  },
  {
    title: "Real User Engagement",
    icon: <Users className="w-6 h-6" />,
    desc: "Actual people visiting and interacting with your site. Higher dwell time and lower bounce rates guaranteed.",
    color: "bg-[#f0fdf4]",
    iconColor: "bg-[#dcfce7] text-[#166534]",
    linkColor: "text-[#166534]"
  },
  {
    title: "No Bots Guaranteed",
    icon: <BotOff className="w-6 h-6" />,
    desc: "Advanced filtering algorithms block all automated traffic. We only deliver human-grade interactions.",
    color: "bg-[#f5f3ff]",
    iconColor: "bg-[#ede9fe] text-[#5b21b6]",
    linkColor: "text-[#5b21b6]"
  },
  {
    title: "High CTR Traffic",
    icon: <TrendingUp className="w-6 h-6" />,
    desc: "Optimized for clicks and publisher revenue. Our AI routes traffic that is more likely to engage.",
    color: "bg-[#fffbeb]",
    iconColor: "bg-[#fef3c7] text-[#92400e]",
    linkColor: "text-[#92400e]"
  }
];

export function FeaturesScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth horizontal scroll for desktop
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="features" ref={targetRef} className="relative bg-background scroll-mt-20">
      {/* Desktop View: Sticky Horizontal Scroll */}
      <div className="hidden lg:block h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container px-6 md:px-12 lg:px-20 mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Features</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Everything you need to grow</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Premium features designed to deliver the highest quality traffic to your website.
              </p>
            </motion.div>
          </div>

          <div className="flex items-center">
            <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 lg:px-20">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-[400px] h-[450px] ${feature.color} rounded-[2.5rem] p-10 flex flex-col items-start shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-500`}
                >
                  <div className={`w-14 h-14 ${feature.iconColor} rounded-2xl flex items-center justify-center mb-10`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground leading-tight">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-auto">{feature.desc}</p>
                  <Link
                    href="#"
                    className={`group inline-flex items-center gap-2 font-bold ${feature.linkColor} hover:opacity-80 transition-opacity`}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
              <div className="flex-shrink-0 w-[400px]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet View: Standard Vertical Scroll */}
      <div className="lg:hidden py-20">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-bold uppercase tracking-widest text-xs mb-3">Features</p>
            <h2 className="text-3xl font-black text-foreground mb-4">Everything you need to grow</h2>
            <p className="text-sm text-muted-foreground">
              Premium features designed for high-quality traffic.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`w-full ${feature.color} rounded-3xl p-8 flex flex-col items-start border border-black/5`}
              >
                <div className={`w-12 h-12 ${feature.iconColor} rounded-xl flex items-center justify-center mb-6`}>
                  {React.cloneElement(feature.icon as React.ReactElement<any>, {
                    className: "w-5 h-5"
                  })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{feature.desc}</p>
                <Link
                  href="#"
                  className={`group inline-flex items-center gap-2 text-sm font-bold ${feature.linkColor}`}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold" asChild>
              <Link href="#how-it-works">View All Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, UserCheck, Lock, Globe } from 'lucide-react';

const guarantees = [
  {
    title: "AdSense Safe",
    description: "Our traffic patterns are indistinguishable from organic social discovery, ensuring 100% compliance with Google AdSense policies.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F4B400">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: "bg-amber-50"
  },
  {
    title: "Google Analytics Ready",
    description: "All visitors are fully trackable in GA4. You'll see real-time data including session duration, bounce rate, and user behavior.",
    icon: <BarChart3 className="w-8 h-8 text-[#4285F4]" />,
    color: "bg-blue-50"
  },
  {
    title: "24/7 Live Monitoring",
    description: "Our AI systems monitor traffic quality around the clock to ensure consistent delivery and immediate filtering of suspicious patterns.",
    icon: <Clock className="w-8 h-8 text-accent" />,
    color: "bg-orange-50"
  },
  {
    title: "100% Human Traffic",
    description: "We use advanced server-side fingerprinting to block bots, scrapers, and automated scripts. You only pay for verified human interactions.",
    icon: <UserCheck className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50"
  },
  {
    title: "Secure & Private",
    description: "We respect user privacy and adhere to global standards like GDPR. Your website's reputation and security are our top priorities.",
    icon: <Lock className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50"
  },
  {
    title: "Global Compliance",
    description: "Our routing system automatically adjusts to regional regulations, ensuring safe traffic distribution across 180+ countries.",
    icon: <Globe className="w-8 h-8 text-sky-600" />,
    color: "bg-sky-50"
  }
];

export function SafetyGuarantee() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Safety & Guarantee</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the most secure traffic network in the industry, backed by advanced AI and strict compliance protocols.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="px-4 py-8 md:p-8 rounded-[2.5rem] border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col items-start"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

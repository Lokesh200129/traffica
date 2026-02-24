
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: "AdSense Safe",
    adTraffic: "100% Guaranteed Safety",
    competitors: "High Risk of Bans",
    others: "Limited Protection"
  },
  {
    name: "Traffic Source",
    adTraffic: "Premium Social Networks",
    competitors: "Generic Backlinks",
    others: "Unknown/Mixed"
  },
  {
    name: "Targeting",
    adTraffic: "180+ Countries (Ultra-Precise)",
    competitors: "Tier-1 Only",
    others: "Global (Unfiltered)"
  },
  {
    name: "Bot Filtering",
    adTraffic: "Advanced AI-Driven Detection",
    competitors: "Basic Pattern Matching",
    others: "None"
  },
  {
    name: "Real User Engagement",
    adTraffic: "Verified Human Activity",
    competitors: "Mixed with Bots",
    others: "Mostly Automated"
  },
  {
    name: "Analytics",
    adTraffic: "Live Real-Time Dashboard",
    competitors: "Static Daily Reports",
    others: "Email Reports Only"
  },
  {
    name: "Setup Time",
    adTraffic: "Instant (Under 5 Mins)",
    competitors: "24-48 Hours",
    others: "Manual Approval"
  },
  {
    name: "Pricing",
    adTraffic: "No Monthly Contracts",
    competitors: "High Monthly Fees",
    others: "Hidden Costs"
  }
];

export default function Comparison() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              AdTraffic AI — <span className="text-accent">The Premium Choice</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              See why professional publishers choose our premium network over standard alternatives.
            </p>
          </motion.div>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {feature.name}
                </h3>
              </div>

              <div className="space-y-4">
                {/* AdTraffic AI Column */}
                <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-black italic text-accent tracking-tighter uppercase">
                      ADTRAFFIC AI
                    </span>
                  </div>
                  <p className="text-sm font-bold text-accent">
                    {feature.adTraffic}
                  </p>
                </div>

                {/* Others Grid */}
                <div className="grid grid-cols-2 gap-4 px-1">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase block mb-1">
                      Standard
                    </span>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {feature.competitors}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase block mb-1">
                      Direct
                    </span>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {feature.others}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View: Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block overflow-hidden"
        >
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-8 text-sm font-bold text-foreground w-1/4 bg-gray-50/50 uppercase tracking-widest">Features</th>
                  <th className="p-8 bg-accent/5 border-x border-accent/10">
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-black italic tracking-tighter text-accent">ADTRAFFIC AI</span>
                    </div>
                  </th>
                  <th className="p-8 text-muted-foreground/60">
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <X className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">Standard Networks</span>
                    </div>
                  </th>
                  <th className="p-8 text-muted-foreground/60 border-l border-gray-100">
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <X className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">Direct Buying</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-none group hover:bg-gray-50/30 transition-colors">
                    <td className="p-6 font-bold text-foreground bg-gray-50/10 text-sm">{feature.name}</td>
                    <td className="p-6 bg-accent/5 font-bold text-accent border-x border-accent/10 text-sm">
                      <div className="flex items-center justify-start gap-2">
                        <Check className="w-4 h-4" />
                        {feature.adTraffic}
                      </div>
                    </td>
                    <td className="p-6 text-muted-foreground text-xs">
                      {feature.competitors}
                    </td>
                    <td className="p-6 text-muted-foreground text-xs border-l border-gray-50">
                      {feature.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

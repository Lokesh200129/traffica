"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Is traffic AdSense safe?",
    a: "Yes, 100%. Our AI distribution system filters traffic patterns to ensure they mimic organic social discovery, fully complying with AdSense policies. We focus on high-quality referrals that protect your account standing."
  },
  {
    q: "Is it bot traffic?",
    a: "Absolutely not. We have advanced server-side filtering that identifies and blocks 99.9% of all non-human traffic. You receive only real user engagement from active social profiles."
  },
  {
    q: "How fast does traffic start?",
    a: "Once you activate your campaign, our AI begins routing traffic almost instantly. You should see your first visitors within 5-10 minutes, with the full volume scaling up shortly after."
  },
  {
    q: "Which countries are supported?",
    a: "We support over 180 countries. You can target specific regions like Tier-1 (USA, UK, CA, AU) or opt for a global distribution depending on your content's niche and audience."
  },
  {
    q: "Can I track this in Google Analytics 4?",
    a: "Yes. All our traffic is fully transparent and visible in GA4. You'll be able to see real-time sessions, user behavior, and engagement metrics just like organic traffic."
  },
  {
    q: "Do I need to provide login details?",
    a: "Never. We only need your website URL and target niche. We never ask for passwords or administrative access to your site or social media accounts."
  },
  {
    q: "Is there a minimum order requirement?",
    a: "We offer flexible plans starting with low entry points so you can test the quality of our traffic before scaling your campaigns."
  },
  {
    q: "How does the AI optimize my traffic?",
    a: "Our AI analyzes your content type and matches it with the most relevant social media segments. It dynamically adjusts delivery times and sources to maximize engagement and safety."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-[#F8F9FB] scroll-mt-20">
      <div className="container max-w-4xl px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-left mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3">Common Questions</h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">Everything you need to know about our premium traffic network.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`} 
                className="border-b border-gray-200 last:border-none px-6 md:px-8 hover:bg-gray-50/30 transition-colors"
              >
                <AccordionTrigger className="text-base md:text-lg font-bold hover:no-underline py-5 md:py-6 text-left group transition-all [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full gap-4">
                    <span>{faq.q}</span>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 transition-transform duration-300">
                      {/* Plus Icon: Shown when closed */}
                      <Plus className="w-4 h-4 md:w-5 md:h-5 absolute transition-all duration-300 opacity-100 scale-100 group-data-[state=open]:opacity-0 group-data-[state=open]:scale-0" />
                      {/* Minus Icon: Shown when open */}
                      <Minus className="w-4 h-4 md:w-5 md:h-5 absolute transition-all duration-300 opacity-0 scale-0 group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground pb-6 leading-relaxed max-w-3xl">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

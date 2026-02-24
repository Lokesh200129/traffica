
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Cell,
  LabelList
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  type ChartConfig 
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const initialVisitorData = [
  { time: '10:00', visitors: 450 },
  { time: '10:05', visitors: 520 },
  { time: '10:10', visitors: 480 },
  { time: '10:15', visitors: 610 },
  { time: '10:20', visitors: 590 },
  { time: '10:25', visitors: 750 },
  { time: '10:30', visitors: 820 },
  { time: '10:35', visitors: 780 },
  { time: '10:40', visitors: 950 },
  { time: '11:00', visitors: 1050 },
];

const initialSourceData = [
  { source: 'Pinterest', value: 45 },
  { source: 'Facebook', value: 30 },
  { source: 'Instagram', value: 15 },
  { source: 'Other', value: 10 },
];

const chartConfig = {
  visitors: {
    label: "Active Visitors",
    color: "hsl(var(--accent))",
  },
  value: {
    label: "Traffic Share (%)",
    color: "hsl(var(--accent))",
  }
} satisfies ChartConfig;

export function AnalyticsPreview() {
  const [visitorData, setVisitorData] = useState(initialVisitorData);
  const [sourceData, setSourceData] = useState(initialSourceData);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorData(prev => {
        const lastValue = prev[prev.length - 1].visitors;
        const variation = (Math.random() * 300 - 150); 
        const newValue = Math.max(300, Math.min(1400, lastValue + variation));
        const now = new Date();
        const newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return [...prev.slice(1), { time: newTime, visitors: Math.floor(newValue) }];
      });

      setSourceData(prev => prev.map((item, index) => {
        const variation = (Math.random() * 25 - 12.5) + (Math.sin(Date.now() / 600 + index) * 6);
        const newValue = Math.max(8, Math.min(75, item.value + variation));
        return { ...item, value: Math.floor(newValue) };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Live Analytics <span className="text-accent">Tracking</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Our traffic is 100% compatible with GA4. Watch your sessions, engagement, 
              and revenue grow in real-time through your own dashboard.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden bg-white h-full px-2 py-6 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-4 md:px-6">
                <div>
                  <CardTitle className="text-2xl font-black text-foreground">Real-Time Visitors</CardTitle>
                  <CardDescription className="text-sm font-medium text-muted-foreground">Active users on site right now</CardDescription>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </div>
              </CardHeader>
              <CardContent className="px-1 md:px-6">
                <div className="h-[450px] md:h-[500px] w-full pt-4">
                  <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
                    <AreaChart data={visitorData} margin={{ left: -15, right: 15, top: 40, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F1F1" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                        domain={[0, 1500]}
                        orientation="left"
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorVisitors)" 
                        animationDuration={600}
                        isAnimationActive={true}
                        dot={{ r: 4, fill: "hsl(var(--accent))", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      >
                        <LabelList 
                          dataKey="visitors" 
                          position="top" 
                          offset={12}
                          content={(props: any) => {
                            const { x, y, value, index } = props;
                            if (index !== visitorData.length - 1) return null;
                            return (
                              <g>
                                <rect x={x - 28} y={y - 38} width={56} height={26} rx={13} fill="hsl(var(--accent))" />
                                <text x={x} y={y - 20} fill="#fff" textAnchor="middle" fontSize={11} fontWeight="bold">{value}</text>
                              </g>
                            );
                          }}
                        />
                      </Area>
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden bg-white h-full px-2 py-6 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-4 md:px-6">
                <div>
                  <CardTitle className="text-2xl font-black text-foreground">Traffic Distribution</CardTitle>
                  <CardDescription className="text-sm font-medium text-muted-foreground">Top social referral channels</CardDescription>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </div>
              </CardHeader>
              <CardContent className="px-1 md:px-6">
                <div className="h-[450px] md:h-[500px] w-full pt-4">
                  <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
                    <BarChart data={sourceData} margin={{ left: -15, right: 15, top: 40, bottom: 20 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F1F1" />
                      <XAxis 
                        dataKey="source" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                        domain={[0, 80]}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(var(--accent))" 
                        radius={[15, 15, 0, 0]}
                        animationDuration={400}
                        barSize={60}
                      >
                        <LabelList 
                          dataKey="value" 
                          position="top" 
                          content={(props: any) => {
                            const { x, y, width, value } = props;
                            return (
                              <g>
                                <rect x={x + width/2 - 25} y={y - 35} width={50} height={24} rx={12} fill="rgba(255, 131, 0, 0.15)" />
                                <text x={x + width/2} y={y - 18} fill="hsl(var(--accent))" textAnchor="middle" fontSize={11} fontWeight="bold">{value}%</text>
                              </g>
                            );
                          }}
                        />
                        {sourceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? "hsl(var(--accent))" : `rgba(255, 131, 0, ${0.8 - index * 0.15})`} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

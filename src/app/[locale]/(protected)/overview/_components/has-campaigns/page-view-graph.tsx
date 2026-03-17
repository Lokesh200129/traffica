"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 1. Data isi file mein rakh raha hoon taaki import error na ho
const MOCK_DATA = [
    { date: "10 Jan 25", mobile: 2000, desktop: 1000, tablet: 500, other: 100 },
    { date: "21 Jan 25", mobile: 45000, desktop: 15000, tablet: 2000, other: 500 },
    { date: "02 Feb 25", mobile: 25000, desktop: 8000, tablet: 4000, other: 800 },
    { date: "13 Feb 25", mobile: 60000, desktop: 25000, tablet: 8000, other: 1200 },
    { date: "24 Feb 25", mobile: 35000, desktop: 12000, tablet: 5000, other: 900 },
    { date: "12 Mar 25", mobile: 78000, desktop: 30000, tablet: 12000, other: 1500 },
];

export function ViewsGraph() {
    return (
        /* 2. Parent Container with forced height and relative positioning */
        <div className="relative w-full h-[400px] min-h-[400px] block">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={MOCK_DATA}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                    {/* Subtle Horizontal Grid */}
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e5e7eb" opacity={0.5} />

                    <XAxis
                        dataKey="date"
                        fontSize={12}
                        tickLine={false}
                        // axisLine={{ stroke: '#081e4a' }}
                        // text-primary implementation via fill
                        fill="currentColor"
                        className="text-primary font-bold"
                        dy={15}
                    />

                    <YAxis
                        fontSize={12}
                        tickLine={false}
                        // axisLine={false}
                        tickFormatter={(v) => v === 0 ? "0" : v.toLocaleString()}
                        // text-primary implementation
                        fill="currentColor"
                        className="text-primary font-bold"
                        dx={-10}
                    />

                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "white",
                            fontSize: "12px",
                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                    />

                    {/* Lines matching your image peaks */}
                    <Line
                        type="monotone"
                        dataKey="mobile"
                        stroke="var(--accent)" // Orange Accent
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6, fill: "var(--accent)" }}
                        animationDuration={1000}
                    />
                    <Line type="monotone" dataKey="desktop" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="tablet" stroke="#ef4444" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="other" stroke="#10b981" strokeWidth={1.5} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
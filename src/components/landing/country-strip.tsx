
"use client";
import React from 'react';
const activityItems = [
  { flag: '🇺🇸', user: 'James W.', initial: 'J', time: '2m ago' },
  { flag: '🇬🇧', user: 'Sarah L.', initial: 'S', time: '5m ago' },
  { flag: '🇨🇦', user: 'Robert M.', initial: 'R', time: '8m ago' },
  { flag: '🇦🇺', user: 'Emma B.', initial: 'E', time: '12m ago' },
  { flag: '🇩🇪', user: 'Hans K.', initial: 'H', time: '15m ago' },
  { flag: '🇫🇷', user: 'Chloe D.', initial: 'C', time: '18m ago' },
  { flag: '🇮🇳', user: 'Arjun P.', initial: 'A', time: '22m ago' },
  { flag: '🇧🇷', user: 'Tiago S.', initial: 'T', time: '25m ago' },
  { flag: '🇯🇵', user: 'Yuki O.', initial: 'Y', time: '30m ago' },
  { flag: '🇳🇬', user: 'Blessing E.', initial: 'B', time: '35m ago' },
];

export function CountryStrip() {
  const repeatedItems = [...activityItems, ...activityItems, ...activityItems, ...activityItems];

  return (
    <div className="bg-secondary/20 border-y py-6 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3 px-5 py-2 mx-4 bg-white rounded-full shadow-sm border border-gray-100/50 cursor-default whitespace-nowrap group hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
              {item.initial}
            </div>
            <span className="font-bold text-foreground text-sm">{item.user}</span>
            <span className="text-xl">{item.flag}</span>
            <span className="text-xs text-muted-foreground">bought traffic</span>
            <span className="text-xs font-bold text-accent">{item.time}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

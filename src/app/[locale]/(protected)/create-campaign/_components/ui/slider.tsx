import React from "react";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: SliderProps) {
  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const slider = (e.currentTarget as HTMLElement).closest<HTMLElement>(
      "[data-slider]"
    )!;
    const rect = slider.getBoundingClientRect();

    const move = (ev: MouseEvent) => {
      const raw =
        ((ev.clientX - rect.left) / rect.width) * (max - min) + min;
      onChange(
        Math.min(max, Math.max(min, Math.round(raw / step) * step))
      );
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const pct = toPercent(value);

  return (
    <div
      data-slider
      className="relative flex h-5 w-full items-center cursor-pointer select-none"
    >
      <div className="absolute h-1.5 w-full rounded-full bg-gray-200" />
      <div
        className="absolute h-1.5 rounded-full bg-blue-500"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute h-5 w-5 -translate-x-1/2 rounded-full border-2 border-blue-600 bg-white shadow-md hover:border-blue-700 transition-colors"
        style={{ left: `${pct}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

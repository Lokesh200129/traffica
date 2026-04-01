"use client";
import { Info } from "lucide-react";
import { ReactNode, useState } from "react";

type Position = "top" | "right" | "bottom" | "left";

interface TooltipContainerProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  position?: Position; // 👈 add karo
}

const positionClasses: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  right: "left-full top-1/2 -translate-y-1/2 -translate-x-0 ml-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
};

const arrowClasses: Record<Position, string> = {
  top: "absolute left-1/2 -translate-x-1/2 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white",
  bottom: "absolute left-1/2 -translate-x-1/2 bottom-full border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white",
  right: "absolute right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-white",
  left: "absolute left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-white",
};

export function TooltipContainer({
  title,
  description,
  children,
  position = "top", // default top
}: TooltipContainerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center rounded-full transition-colors focus:outline-none"
      >
        {children ?? <Info size={14} className="hover:cursor-pointer text-accent" />}
      </button>

      {open && (
        <div className={`absolute z-50 w-52 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xl ${positionClasses[position]}`}>
          <p className="text-[13px] font-semibold text-gray-800">{title}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-gray-500">{description}</p>
          <div className={arrowClasses[position]} />
        </div>
      )}
    </div>
  );
}
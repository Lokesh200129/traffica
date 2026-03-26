import { Info } from "lucide-react";
import { useState, type ReactNode } from "react";

interface TooltipContainerProps {
  title: string;
  description: string;
  /** Custom trigger element; defaults to a help-circle icon. */
  children?: ReactNode;
}

export function TooltipContainer({
  title,
  description,
  children,
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
        className="inline-flex items-center justify-center rounded-full  transition-colors focus:outline-none"
      >
        {children ?? (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   className="h-4 w-4"
          //   viewBox="0 0 24 24"
          //   fill="none"
          //   stroke="currentColor"
          //   strokeWidth="2"
          // >
          //   <circle cx="12" cy="12" r="10" />
          //   <path d="M12 16v-4M12 8h.01" />
          // </svg>
          <Info size={14} className="hover:cursor-pointer text-accent" />
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xl">
          <p className="text-[13px] font-semibold text-gray-800">{title}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-gray-500">
            {description}
          </p>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}
    </div>
  );
}

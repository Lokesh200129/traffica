import { useState, useEffect } from "react";
import { Slider } from "../ui/Slider";
import { cn, fmtNum } from "../../lib/utils";

const QUICK_PV: number[] = [5000, 10000, 20000, 50000, 1_000_000];

interface PageViewsSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function PageViewsSlider({ value, onChange }: PageViewsSliderProps) {
  const [inp, setInp] = useState<string>(value.toString());
  useEffect(() => setInp(value.toString()), [value]);

  const estUsers = Math.round(value / 3);

  const commitInput = () => {
    const parsed = parseInt(inp.replace(/,/g, ""), 10);
    if (!isNaN(parsed)) {
      const clamped = Math.min(1_000_000, Math.max(1000, parsed));
      onChange(clamped);
      setInp(clamped.toString());
    } else {
      setInp(value.toString());
    }
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Slider
              value={value}
              min={1000}
              max={1_000_000}
              step={1000}
              onChange={(v) => {
                onChange(v);
                setInp(v.toString());
              }}
            />
          </div>
          <input
            className="w-28 rounded-xl border border-gray-200 px-3 py-2 text-right text-sm tabular-nums focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={inp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInp(e.target.value)
            }
            onBlur={commitInput}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {QUICK_PV.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                onChange(q);
                setInp(q.toString());
              }}
              className={cn(
                "rounded-lg border px-3 py-1 text-xs font-medium transition-colors",
                value === q
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-400 hover:text-blue-600"
              )}
            >
              {fmtNum(q)}
            </button>
          ))}
        </div>
      </div>

      {/* Mini stats box */}
      <div className="shrink-0 w-36 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Page views</span>
          <span className="text-xs font-bold text-gray-800">{fmtNum(value)}</span>
        </div>
        <div className="h-px bg-blue-100" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Users:</span>
          <span className="text-xs font-bold text-gray-800">{fmtNum(estUsers)}</span>
        </div>
      </div>
    </div>
  );
}

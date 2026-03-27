import { useState, useEffect } from "react";
import { cn, fmtNum } from "../../_lib/utils";
import { Input } from "@/components/ui/input";

const QUICK_PV: number[] = [5000, 10000, 20000, 50000, 1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000];

interface PageViewsSliderProps {
  value: number;
  onChange: (_value: number) => void;
}

export function PageViewsSlider({ value, onChange }: PageViewsSliderProps) {
  const [inp, setInp] = useState<string>(value.toString());
  useEffect(() => setInp(value.toString()), [value]);

  const commitInput = () => {
    const parsed = parseInt(inp.replace(/,/g, ""), 10);
    if (!isNaN(parsed)) {
      const clamped = Math.min(5_000_000, Math.max(1000, parsed));
      onChange(clamped);
      setInp(clamped.toString());
    } else {
      setInp(value.toString());
    }
  };

  return (
    <div className="flex gap-4 items-start">

      {/* Left — input + quick buttons */}
      <div className="flex-1 space-y-3">
        <Input
          className="w-48 text-right tabular-nums"
          value={inp}
          onChange={(e) => {
            setInp(e.target.value)
            const parsed = parseInt(e.target.value.replace(/,/g, ""), 10)
            if (!isNaN(parsed)) {
              const clamped = Math.min(5_000_000, Math.max(1000, parsed))
              onChange(clamped)
            }
          }}
          onBlur={commitInput}
          onKeyDown={(e) => e.key === "Enter" && commitInput()}
        />

        <div className="flex flex-wrap gap-2">
          {QUICK_PV.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => { onChange(q); setInp(q.toString()); }}
              className={cn(
                "rounded-lg border px-3 py-1 text-xs font-medium transition-colors",
                value === q
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-muted/40 text-muted-foreground hover:border-accent/50 hover:text-accent"
              )}
            >
              {fmtNum(q)}
            </button>
          ))}
        </div>
      </div>

      {/* Right — page views badge */}
      <div className="shrink-0 w-36 rounded-xl bg-accent/10 border border-accent/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Page views</span>
          <span className="text-xs font-bold text-foreground">{fmtNum(value)}</span>
        </div>
      </div>

    </div>
  );
}
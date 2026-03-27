import React from "react";
import { cn } from "../../_lib/utils";
import type { FCampaign } from "../../../_types/type";
import { Input } from "@/components/ui/input";

type DurationValue = FCampaign["duration"];
type DurationMode = DurationValue["mode"];

interface DurationInputProps {
  value: DurationValue;
  onChange: (_value: DurationValue) => void;
}

const TABS: { id: DurationMode; label: string }[] = [
  { id: "fixed",  label: "Fixed" },
  { id: "random", label: "Randomised" },
];

export function DurationInput({ value, onChange }: DurationInputProps) {
  const up = (patch: Partial<DurationValue>) => onChange({ ...value, ...patch });

  const handleInt =
    (field: keyof DurationValue) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseInt(e.target.value, 10);
      up({ [field]: isNaN(n) || n < 0 ? 0 : n });
    };

  return (
    <div className="space-y-4">

      {/* Mode tabs — pehle jaisa */}
      <div className="inline-flex rounded-xl border border-accent/20  p-1 gap-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => up({ mode: tab.id })}
            className={cn(
              "px-5 py-1 rounded-xl text-sm font-medium transition-all w-full",
              value.mode === tab.id
                ? "bg-accent text-white shadow-sm border border-accent/20"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fixed mode */}
      {value.mode === "fixed" && (
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-muted-foreground">
            Interval (seconds)
          </label>
          <Input
            type="number"
            min={0}
            placeholder="e.g. 30"
            value={value.fixedSec || ""}
            onChange={handleInt("fixedSec")}
            className="tabular-nums"
          />
          {value.fixedSec > 0 && (
            <p className="text-xs text-muted-foreground">
              Every visit lasts exactly{" "}
              <span className="font-semibold text-foreground">{value.fixedSec}s</span>
            </p>
          )}
        </div>
      )}

      {/* Randomised mode */}
      {value.mode === "random" && (
        <div className="space-y-3">
          <div className="flex items-end gap-3">

            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground">
                From (seconds)
              </label>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 5"
                value={value.randomFrom || ""}
                onChange={handleInt("randomFrom")}
                className="tabular-nums"
              />
            </div>

            <div className="pb-2.5 shrink-0 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              ,
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground">
                To (seconds)
              </label>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 30"
                value={value.randomTo || ""}
                onChange={handleInt("randomTo")}
                className="tabular-nums"
              />
            </div>

          </div>

          {(value.randomFrom > 0 || value.randomTo > 0) && (
            <div className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-2.5 text-xs text-foreground/70">
              Each visit will last a random duration between{" "}
              <span className="font-bold text-foreground">{value.randomFrom}s</span>
              {" and "}
              <span className="font-bold text-foreground">{value.randomTo}s</span>
              {value.randomFrom >= value.randomTo && value.randomTo > 0 && (
                <span className="ml-1 font-semibold text-amber-600">
                  — "From" should be less than "To"
                </span>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
import React from "react";
import type { DurationValue, DurationMode } from "../../_types";
import { cn } from "../../_lib/utils";

interface DurationInputProps {
  value: DurationValue;
  onChange: (value: DurationValue) => void;
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
      {/* Mode tabs */}
      <div className="flex gap-1 w-fit rounded-xl border border-gray-200 bg-gray-50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => up({ mode: tab.id })}
            className={cn(
              "rounded-lg px-5 py-1.5 text-xs font-semibold transition-colors",
              value.mode === tab.id
                ? "bg-blue-600 text-white shadow"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fixed mode — single input */}
      {value.mode === "fixed" && (
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            Interval (seconds)
          </label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 30"
            value={value.fixedSec || ""}
            onChange={handleInt("fixedSec")}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm tabular-nums focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {value.fixedSec > 0 && (
            <p className="text-xs text-gray-400">
              Every visit lasts exactly{" "}
              <span className="font-semibold text-gray-600">{value.fixedSec}s</span>
            </p>
          )}
        </div>
      )}

      {/* Randomised mode — from / to */}
      {value.mode === "random" && (
        <div className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                From (seconds)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 5"
                value={value.randomFrom || ""}
                onChange={handleInt("randomFrom")}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm tabular-nums focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="pb-2.5 shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">
              ,
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                To (seconds)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 30"
                value={value.randomTo || ""}
                onChange={handleInt("randomTo")}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm tabular-nums focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {(value.randomFrom > 0 || value.randomTo > 0) && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs text-blue-700">
              Each visit will last a random duration between{" "}
              <span className="font-bold">{value.randomFrom}s</span>
              {" and "}
              <span className="font-bold">{value.randomTo}s</span>
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
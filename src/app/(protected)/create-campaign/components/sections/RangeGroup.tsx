import React from "react";
import type { RangeItem } from "../../types";
import { distribute, equalSplit } from "../../lib/rangeUtils";
import { uid } from "../../lib/utils";
import { Slider } from "../ui/Slider";

interface RangeGroupProps {
  options: string[];
  items: RangeItem[];
  onChange: (items: RangeItem[]) => void;
  addLabel?: string;
  placeholder?: string;
  showKeyword?: boolean;
}

export function RangeGroup({
  options,
  items,
  onChange,
  addLabel = "Add",
  placeholder = "Select...",
  showKeyword = false,
}: RangeGroupProps) {
  const handleAdd = () => {
    const n = items.length + 1;
    const splits = equalSplit(n);
    onChange([
      ...items.map((item, i) => ({ ...item, percentage: splits[i] })),
      { id: uid(), value: "", percentage: splits[n - 1], keyword: "" },
    ]);
  };

  const handleRemove = (id: string) => {
    const filtered = items.filter((i) => i.id !== id);
    if (!filtered.length) return onChange([]);
    const splits = equalSplit(filtered.length);
    onChange(filtered.map((item, i) => ({ ...item, percentage: splits[i] })));
  };

  const handleSelectChange = (
    id: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(
      items.map((i) => (i.id === id ? { ...i, value: e.target.value } : i))
    );
  };

  const handleKeywordChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(
      items.map((i) => (i.id === id ? { ...i, keyword: e.target.value } : i))
    );
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center gap-3">
            <select
              value={item.value}
              onChange={(e) => handleSelectChange(item.id, e)}
              className="w-44 shrink-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="relative flex-1 pt-6">
              <div
                className="absolute top-0 z-10 transition-all duration-100"
                style={{ left: `calc(${item.percentage}% - 18px)` }}
              >
                <span className="inline-flex items-center justify-center rounded-md bg-blue-600 px-1.5 py-0.5 text-[11px] font-bold text-white shadow">
                  {item.percentage}%
                </span>
              </div>
              <Slider
                value={item.percentage}
                min={1}
                max={100}
                onChange={(v) => onChange(distribute(items, item.id, v))}
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3,6 5,6 21,6" />
                <path d="M19,6l-1,14H6L5,6" />
                <path d="M10,11v6M14,11v6" />
                <path d="M9,6V4h6v2" />
              </svg>
            </button>
          </div>

          {showKeyword && (
            <input
              value={item.keyword ?? ""}
              onChange={(e) => handleKeywordChange(item.id, e)}
              placeholder="Keyword (optional)"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-100"
            />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-blue-300 bg-blue-50 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
}

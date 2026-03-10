import { useState } from "react";
import { ALL_COUNTRIES } from "../../lib/constants";

interface CountrySelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CountrySelector({ selected, onChange }: CountrySelectorProps) {
  const [search, setSearch] = useState<string>("");

  const filtered = ALL_COUNTRIES.filter(
    (c) =>
      !selected.includes(c) &&
      c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {c}
              <button
                type="button"
                onClick={() => onChange(selected.filter((x) => x !== c))}
                className="ml-0.5 rounded-full hover:text-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search & add country…"
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        {search && filtered.length > 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 z-30 max-h-44 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
            {filtered.slice(0, 8).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChange([...selected, c]);
                  setSearch("");
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

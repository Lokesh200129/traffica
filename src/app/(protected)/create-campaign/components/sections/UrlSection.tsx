import React from "react";
import type { UrlConfig } from "../../types";
import { Toggle } from "../ui/Toggle";

interface UrlSectionProps {
  value: UrlConfig;
  onChange: (value: UrlConfig) => void;
}

export function UrlSection({ value, onChange }: UrlSectionProps) {
  const up = (patch: Partial<UrlConfig>) => onChange({ ...value, ...patch });

  const totalCount = [
    ...(value.entryUrls || "").split("\n"),
    ...(value.innerUrls || "").split("\n"),
  ].filter((u) => u.trim()).length;

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600">
        URLs count:{" "}
        <span className="font-bold text-gray-900">{totalCount}</span>
        <span className="text-gray-400"> of 50</span>
      </p>

      {/* Entry URLs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-800">
            Entry URLs
          </label>
          <div className="flex items-center gap-2">
            <Toggle
              checked={value.entryCrawl}
              onChange={(v) => up({ entryCrawl: v })}
            />
            <span className="text-sm text-gray-600">
              Automatically Crawl URLs
            </span>
          </div>
        </div>
        <textarea
          value={value.entryUrls}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            up({ entryUrls: e.target.value })
          }
          placeholder={"https://example.com\nhttps://example.com/page"}
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed resize-y focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Inner URLs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-800">
            Inner URLs
          </label>
          <div className="flex items-center gap-2">
            <Toggle
              checked={value.innerCrawl}
              onChange={(v) => up({ innerCrawl: v })}
            />
            <span className="text-sm text-gray-600">
              Automatically Crawl URLs
            </span>
          </div>
        </div>
        <textarea
          value={value.innerUrls}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            up({ innerUrls: e.target.value })
          }
          placeholder={"https://example.com/blog\nhttps://example.com/about"}
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed resize-y focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}

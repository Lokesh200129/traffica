import type { SummaryData, RangeItem } from "../../types";
import { fmtNum } from "../../lib/utils";

function SummaryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600 mr-1 mb-1">
      {label}
    </span>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-1.5 border-b border-gray-50 last:border-0">
      <p className="text-[10px] text-gray-400 mb-0.5 font-medium uppercase tracking-wide">
        {label}
      </p>
      {children}
    </div>
  );
}

interface SummarySidebarProps {
  data: SummaryData;
}

export function SummarySidebar({ data }: SummarySidebarProps) {
  const {
    campaignName,
    pageViews,
    duration,
    urlConfig,
    trafficSources,
    devices,
    geoType,
    countries,
  } = data;

  const estUsers = Math.round(pageViews / 3);
  const hasUrls = urlConfig.entryUrls || urlConfig.innerUrls;
  const hasDuration =
    (duration.mode === "fixed" && duration.fixedSec > 0) ||
    (duration.mode === "random" && (duration.randomFrom > 0 || duration.randomTo > 0));
  const activeTraffic = trafficSources.filter((t): t is RangeItem => Boolean(t.value));
  const activeDevices = devices.filter((d): d is RangeItem => Boolean(d.value));

  return (
    <div className="hidden md:block sticky top-6 w-60 shrink-0 rounded-2xl border border-border bg-background shadow-sm overflow-hidden self-start">
      {/* Header */}
      <div className="bg-accent px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest">
          Live Summary
        </p>
        <p className="text-sm font-bold text-white truncate mt-0.5">
          {campaignName || "Untitled Campaign"}
        </p>
      </div>

      <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
        {/* Page views / Users */}
        <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5 mb-3 flex justify-between">
          <div>
            <p className="text-[10px] text-blue-400 font-medium">Page Views</p>
            <p className="text-sm font-bold text-blue-700">{fmtNum(pageViews)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-blue-400 font-medium">Est. Users</p>
            <p className="text-sm font-bold text-blue-700">{fmtNum(estUsers)}</p>
          </div>
        </div>

        {hasUrls && (
          <SummaryRow label="URLs">
            {urlConfig.entryUrls && (
              <p className="text-[10px] text-gray-500">
                Entry:{" "}
                <span className="font-semibold text-gray-700">
                  {urlConfig.entryUrls.split("\n").filter(Boolean).length} URL(s)
                </span>
              </p>
            )}
            {urlConfig.innerUrls && (
              <p className="text-[10px] text-gray-500">
                Inner:{" "}
                <span className="font-semibold text-gray-700">
                  {urlConfig.innerUrls.split("\n").filter(Boolean).length} URL(s)
                </span>
              </p>
            )}
          </SummaryRow>
        )}

        {hasDuration && (
          <SummaryRow label="Duration">
            {duration.mode === "fixed" ? (
              <p className="text-[11px] font-semibold text-gray-700">
                Fixed: {duration.fixedSec}s
              </p>
            ) : (
              <p className="text-[11px] font-semibold text-gray-700">
                Random: {duration.randomFrom}s – {duration.randomTo}s
              </p>
            )}
          </SummaryRow>
        )}

        <SummaryRow label="Geo">
          <p className="text-[11px] font-semibold text-gray-700">{geoType}</p>
          {countries.length > 0 && (
            <div className="mt-1 flex flex-wrap">
              {countries.map((c) => (
                <SummaryBadge key={c} label={c} />
              ))}
            </div>
          )}
        </SummaryRow>

        {activeTraffic.length > 0 && (
          <SummaryRow label="Traffic Sources">
            {activeTraffic.map((t) => (
              <div key={t.id} className="flex justify-between items-start mb-1.5">
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-700 font-medium truncate max-w-25">
                    {t.value}
                  </p>
                  {t.keyword && (
                    <p className="text-[10px] text-gray-400 italic truncate max-w-25">
                      "{t.keyword}"
                    </p>
                  )}
                </div>
                <span className="text-[11px] font-bold text-blue-600 shrink-0 ml-1">
                  {t.percentage}%
                </span>
              </div>
            ))}
          </SummaryRow>
        )}

        {activeDevices.length > 0 && (
          <SummaryRow label="Devices">
            {activeDevices.map((d) => (
              <div
                key={d.id}
                className="flex justify-between items-center mb-1"
              >
                <span className="text-[11px] text-gray-700 truncate max-w-30">
                  {d.value}
                </span>
                <span className="text-[11px] font-bold text-blue-600 shrink-0 ml-1">
                  {d.percentage}%
                </span>
              </div>
            ))}
          </SummaryRow>
        )}
      </div>
    </div>
  );
}
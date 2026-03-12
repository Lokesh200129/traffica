import type { SummaryData, RangeItem } from "../../_types";
import { fmtNum } from "../../_lib/utils";

function SummaryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent mr-1 mb-1">
      {label}
    </span>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-1.5 border-b border-border last:border-0">
      <p className="text-[10px] text-muted-foreground mb-0.5 font-medium uppercase tracking-wide">
        {label}
      </p>
      {children}
    </div>
  );
}

// ── Dummy price calculator ────────────────────────────────────────────────────
function calcPrice(pageViews: number): string {
  const price = (pageViews / 1000) * 0.85; // $0.85 per 1K views
  return price.toFixed(2);
}

interface SummarySidebarProps {
  data: SummaryData;
}

export function SummarySidebar({ data }: SummarySidebarProps) {
  const {
    campaignName,
    pageViews,
    duration,
    trafficSources,
    devices,
    geoType,
    country,
  } = data;

  const estUsers = Math.round(pageViews / 3);
  const hasDuration =
    (duration.mode === "fixed" && duration.fixedSec > 0) ||
    (duration.mode === "random" && (duration.randomFrom > 0 || duration.randomTo > 0));
  const activeTraffic = trafficSources.filter((t): t is RangeItem => Boolean(t.value));
  const activeDevices = devices.filter((d): d is RangeItem => Boolean(d.value));

  const basePrice = parseFloat(calcPrice(pageViews));
  const tax = parseFloat((basePrice * 0.18).toFixed(2)); // 18% GST
  const totalPrice = (basePrice + tax).toFixed(2);

  return (
    <div className="hidden md:block sticky top-6 w-60 shrink-0 rounded-2xl border border-border bg-background shadow-sm overflow-hidden self-start">

      {/* Header */}
      <div className="bg-accent px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-foreground/70">
          Live Summary
        </p>
        <p className="text-sm font-bold text-accent-foreground truncate mt-0.5">
          {campaignName || "Untitled Campaign"}
        </p>
      </div>

      <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">

        {/* Page views / Users */}
        <div className="rounded-lg bg-accent/10 border border-accent/20 px-3 py-2.5 mb-3 flex justify-between">
          <div>
            <p className="text-[10px] text-accent font-medium">Page Views</p>
            <p className="text-sm font-bold text-foreground">{fmtNum(pageViews)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-accent font-medium">Est. Users</p>
            <p className="text-sm font-bold text-foreground">{fmtNum(estUsers)}</p>
          </div>
        </div>

        {hasDuration && (
          <SummaryRow label="Duration">
            {duration.mode === "fixed" ? (
              <p className="text-[11px] font-semibold text-foreground">
                Fixed: {duration.fixedSec}s
              </p>
            ) : (
              <p className="text-[11px] font-semibold text-foreground">
                Random: {duration.randomFrom}s – {duration.randomTo}s
              </p>
            )}
          </SummaryRow>
        )}

        <SummaryRow label="Geo">
          <p className="text-[11px] font-semibold text-foreground">{geoType}</p>

          <SummaryBadge label={country} />
        </SummaryRow>

        {activeTraffic.length > 0 && (
          <SummaryRow label="Traffic Sources">
            {activeTraffic.map((t) => (
              <div key={t.id} className="flex justify-between items-start mb-1.5">
                <div className="min-w-0">
                  <p className="text-[11px] text-foreground font-medium truncate max-w-25">
                    {t.value}
                  </p>
                  {t.keyword && (
                    <p className="text-[10px] text-muted-foreground italic truncate max-w-25">
                      "{t.keyword}"
                    </p>
                  )}
                </div>
                <span className="text-[11px] font-bold text-accent shrink-0 ml-1">
                  {t.percentage}%
                </span>
              </div>
            ))}
          </SummaryRow>
        )}

        {activeDevices.length > 0 && (
          <SummaryRow label="Devices">
            {activeDevices.map((d) => (
              <div key={d.id} className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-foreground truncate max-w-30">
                  {d.value}
                </span>
                <span className="text-[11px] font-bold text-accent shrink-0 ml-1">
                  {d.percentage}%
                </span>
              </div>
            ))}
          </SummaryRow>
        )}
      </div>

      {/* ── Price section ─────────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-3 space-y-1.5 bg-muted/30">
        {/* <div className="flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground">Base price</span>
          <span className="text-[11px] font-medium text-foreground">${basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground">Tax (18%)</span>
          <span className="text-[11px] font-medium text-foreground">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-border my-1" /> */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="text-sm font-bold text-accent">${totalPrice}</span>
        </div>
      </div>

    </div>
  );
}
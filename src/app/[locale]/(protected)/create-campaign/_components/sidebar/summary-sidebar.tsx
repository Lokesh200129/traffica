// import type { SummaryData } from "../../_types";
import { CampaignFormData } from "../../../_types/type";
import { fmtNum } from "../../_lib/utils";


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

function calcPrice(pageViews: number): string {
  return ((pageViews / 1000) * 0.85).toFixed(2);
}

interface SummarySidebarProps {
  data: CampaignFormData;
}

export function SummarySidebar({ data }: SummarySidebarProps) {
  const { campaignName, pageViews, duration, trafficSource, device, country } = data;

  const estUsers = Math.round(pageViews / 3);
  const basePrice = parseFloat(calcPrice(pageViews));
  const tax = parseFloat((basePrice * 0.18).toFixed(2));
  const totalPrice = (basePrice + tax).toFixed(2);

  const hasDuration =
    (duration.mode === "fixed" && duration.fixedSec > 0) ||
    (duration.mode === "random" && (duration.randomFrom > 0 || duration.randomTo > 0));

  return (
    // <div className="w-full rounded-2xl border border-border bg-background  overflow-hidden">
    <div className="w-60 shrink-0 rounded-2xl border border-border bg-background shadow-sm overflow-hidden self-start">
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
          <p className="text-[11px] font-semibold text-foreground">
            {country || "Global"}
          </p>
        </SummaryRow>

        {trafficSource && (
          <SummaryRow label="Traffic Source">
            <p className="text-[11px] font-medium text-foreground">{trafficSource}</p>
          </SummaryRow>
        )}

        {device && (
          <SummaryRow label="Device">
            <p className="text-[11px] font-medium text-foreground">{device}</p>
          </SummaryRow>
        )}

      </div>

      {/* Price */}
      <div className="border-t border-border px-4 py-3 bg-muted/30">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="text-sm font-bold text-accent">${totalPrice}</span>
        </div>
      </div>

    </div>
  );
}
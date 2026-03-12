import type { ReactNode } from "react";
import type { SaveStatus, TooltipInfo } from "../../_types";
import { SaveBadge } from "./save-badge";
import { TooltipContainer } from "./tooltip-container";

interface SectionProps {
  title: string;
  tooltip?: TooltipInfo;
  saveStatus?: SaveStatus;
  children: ReactNode;
}

export function Section({
  title,
  tooltip,
  saveStatus,
  children,
}: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold ">{title}</h3>
        {tooltip && (
          <TooltipContainer
            title={tooltip.title}
            description={tooltip.description}
          />
        )}
        <SaveBadge status={saveStatus ?? null} />
      </div>
      {children}
    </div>
  );
}

export function Divider() {
  return <div className="h-px bg-gray-100" />;
}

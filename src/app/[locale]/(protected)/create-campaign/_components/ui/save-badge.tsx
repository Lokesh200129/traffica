import type { ReactNode } from "react";
import type { SaveStatus } from "../../_types";
import { cn } from "../../_lib/utils";

interface SaveBadgeProps {
  status: SaveStatus;
}

export function SaveBadge({ status }: SaveBadgeProps): ReactNode {
  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] font-semibold transition-all duration-200",
        status === "saving" ? "text-gray-400" : "text-green-600"
      )}
    >
      {status === "saving" ? (
        <>
          <svg
            className="h-3 w-3 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              strokeLinecap="round"
            />
          </svg>
          Saving
        </>
      ) : (
        <>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline
              points="20 6 9 17 4 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Saved
        </>
      )}
    </span>
  );
}

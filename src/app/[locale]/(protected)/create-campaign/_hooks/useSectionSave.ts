import { useState, useRef, useCallback } from "react";
import type { SaveStatus } from "../types";

interface UseSectionSaveReturn {
  status: SaveStatus;
  trigger: () => void;
}

/**
 * Per-section autosave indicator hook.
 * Call `trigger()` on any field change; status transitions:
 *   null → "saving" → "saved"
 */
export function useSectionSave(): UseSectionSaveReturn {
  const [status, setStatus] = useState<SaveStatus>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    setStatus("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("saved"), 900);
  }, []);

  return { status, trigger };
}

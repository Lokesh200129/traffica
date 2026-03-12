import type { RangeItem } from "../types";

/**
 * Redistributes percentages across all RangeItems proportionally
 * whenever a single item's percentage changes, keeping the total at 100.
 */
export function distribute(
  items: RangeItem[],
  changedId: string,
  newPct: number
): RangeItem[] {
  const others = items.filter((i) => i.id !== changedId);
  const remaining = 100 - newPct;

  if (others.length === 0) {
    return items.map((i) => ({ ...i, percentage: 100 }));
  }

  const sum = others.reduce((s, i) => s + i.percentage, 0);

  const redist = others.map((item) => ({
    ...item,
    percentage: Math.round(
      (sum > 0 ? item.percentage / sum : 1 / others.length) * remaining
    ),
  }));

  // Fix rounding drift so total is always exactly 100
  const drift =
    100 - newPct - redist.reduce((s, i) => s + i.percentage, 0);
  if (redist.length > 0) redist[0].percentage += drift;

  return items.map((i) => {
    if (i.id === changedId) return { ...i, percentage: newPct };
    return redist.find((r) => r.id === i.id) ?? i;
  });
}

/**
 * Splits 100% evenly across `count` items.
 * Any rounding remainder goes to the first item.
 */
export function equalSplit(count: number): number[] {
  const base = Math.floor(100 / count);
  const rem = 100 - base * count;
  return Array.from({ length: count }, (_, i) =>
    base + (i === 0 ? rem : 0)
  );
}

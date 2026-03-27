/** Merges class names, filtering out falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Auto-incrementing unique id generator. */
let _counter = 0;
export const uid = (): string => `id_${++_counter}`;

/** Format a number as a human-readable string (K / M suffix). */
export const fmtNum = (n: number): string =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1000
      ? `${(n / 1000).toFixed(1)}K`
      : `${n}`;

import type { Stats } from "@/types/stats";

/**
 * The statsKeys to iterate over for calculations.
 * This should work with an additional keyof check.
 */
export const statsKeys = [
  "seconds",
  "fgMade",
  "fgAttempted",
  "fg3Made",
  "fg3Attempted",
  "ftMade",
  "ftAttempted",
  "points",
  "offRebounds",
  "defRebounds",
  "rebounds",
  "assists",
  "steals",
  "blocks",
  "turnovers",
  "personalFouls",
  "technicalFouls",
];

/**
 * Count for if player played based off started or seconds.
 */
export function getPlayed(seconds: number): number {
  return +(seconds > 0);
}

/**
 * Count for if player started.
 */
export function getStarted(started: boolean): number {
  return +(started);
}

/**
 * Get particular statsKey value (working with `statsKey`) for calculation.
 */
export function getStatsValue(stats: Stats, statsKey: string): number {
  return stats[statsKey];
}

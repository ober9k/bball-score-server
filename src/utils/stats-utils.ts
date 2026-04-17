import type { StatisticsLog } from "@/types/statistics-log";
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
 * Generate empty stats object.
 */
function generateEmptyStats(): Stats {
  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: 0,
  }), {}) as Stats;
}

export function generateEmptyStatisticsLog(playerLog: any): StatisticsLog {
  const { player, team } = playerLog;
  const { id } = player;

  const played  = 0;
  const started = 0;
  const stats   = generateEmptyStats();

  return { id, player, team, played, started, stats };
}

/**
 * Extract stats values from player log into separate object.
 */
export function extractStats(playerLog: any): Stats {
  const stats = {};

  statsKeys.forEach((key) => {
    stats[key] = playerLog[key];
  });

  return stats as Stats;
}

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

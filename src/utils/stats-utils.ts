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
 * Add next set of stats to existing stats.
 */
export function calculateTotals(log: StatisticsLog, stats: Stats): Stats {
  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: acc[key] + stats[key],
  }), log.stats) as Stats;
}

/**
 * Add next set of stats to existing stats.
 */
export function calculateAverages(log: StatisticsLog): Stats {
  const { played } = log;

  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: log.stats[key] / played,
  }), {}) as Stats;
}

/**
 * TODO: this is temporary, mostly for experimental result handling
 * (this should be included elsewhere and tidied up to reduce duplication)
 */
export function accumulateStatisticsFn(playerStatisticsLogs: Map<number, StatisticsLog>) {
  return function (playerLog: any): void {
    const { player } = playerLog;
    const { id } = player;

    if (!playerStatisticsLogs.has(id)) {
      playerStatisticsLogs.set(id, generateEmptyStatisticsLog(playerLog));
    }

    const log   = playerStatisticsLogs.get(id)!;
    const stats = extractStats(playerLog);

    log.played  += getPlayed(playerLog.seconds);
    log.started += getStarted(playerLog.started);
    log.stats    = calculateTotals(log, stats);
  };
}

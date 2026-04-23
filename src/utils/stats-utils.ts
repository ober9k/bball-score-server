import type { PlayerLog } from "@/types/game";
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
] as const;

/**
 * Generate empty stats object.
 */
function generateEmptyStats(): Stats {
  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: 0,
  }), {}) as Stats;
}

/**
 * Accumulate stats based on player stats.
 */
function calculateTotals(log: StatisticsLog, stats: Stats): Stats {
  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: acc[key] + stats[key],
  }), log.stats);
}

/**
 * Average stats based on games played.
 */
function calculateAverages(log: StatisticsLog): Stats {
  return statsKeys.reduce((acc, key) => ({
    ...acc, [key]: log.stats[key] / log.played,
  }), log.stats) as Stats;
}

/**
 * Generate empty stats log with player/team filled.
 */
export function generateEmptyStatisticsLog(playerLog: PlayerLog): StatisticsLog {
  const { player, team } = playerLog;
  const { id } = player;

  const played  = 0;
  const started = 0;
  const stats   = generateEmptyStats();

  return { id, player, team, played, started, stats };
}

/**
 * Generate totals for players as statistics logs.
 * This function is blind only to a player which it accumulates/groups the stats too.
 */
export function generateTotalsStatisticsLogs(playerLogs: PlayerLog[]): StatisticsLog[] {
  /* stored in map for convenient access */
  const statisticsLogs = playerLogs
    .reduce((acc, playerLog) => {
      if (!acc.has(playerLog.player.id)) {
          acc.set(playerLog.player.id, generateEmptyStatisticsLog(playerLog));
      }

      /* no `getOrInsert()` available */
      const log = acc.get(playerLog.player.id)!;
      log.played  += (playerLog.stats.seconds > 0) ? 1 : 0;
      log.started += (playerLog.started) ? 1 : 0;
      log.stats    = calculateTotals(log, playerLog.stats);

      return acc;
    }, new Map<number, StatisticsLog>());

  return [ ...statisticsLogs.values() ];
}

/**
 * Generate average for players as statistics logs.
 * This function is blind only to a player which it accumulates/groups the stats too.
 */
export function generateAveragesStatisticsLogs(playerLogs: PlayerLog[]): StatisticsLog[] {
  return generateTotalsStatisticsLogs(playerLogs)
    .map((log) => ({
        ...log, stats: calculateAverages(log)
      }));
}

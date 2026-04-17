import { prisma } from "@/lib/prisma";
import type { StatisticsLog } from "@/types/statistics-log";
import { extractStats, generateEmptyStatisticsLog, getPlayed, getStarted, getStatsValue, statsKeys } from "@/utils/stats-utils";

/**
 * TODO: this is temporary, need to work out a tidier way to handle all of this
 */
const reducer = (acc, cur: string) => ({ ...acc, [cur]: true });
const getColumns = (columns: string[]) => columns.reduce(reducer, {});

/**
 * TODO: this is temporary, need to work out a tidier way to handle all of this
 * (potentially via multiple requests instead)
 */
const gameTeamPlayerCols = getColumns(["started", "seconds", "fgMade", "fgAttempted", "fg3Made", "fg3Attempted", "ftMade", "ftAttempted", "points", "offRebounds", "defRebounds", "rebounds", "assists", "steals", "blocks", "turnovers", "personalFouls", "technicalFouls"]);
const teamCols = getColumns(["id", "name", "shortName"]);
const playerCols = getColumns(["id", "name", "position", "number", "height"]);

export async function findStatisticsLogs(): Promise<StatisticsLog[]> {
  const playerLogs: any[] = await prisma.gameTeamPlayer.findMany({
    select: {
      ...gameTeamPlayerCols,
      team: {
        select: {
          ...teamCols,
        },
      },
      player: {
        select: {
          ...playerCols,
        }
      }
    }
  });

  const playerStatisticsLogs = new Map<number, StatisticsLog>();

  /**
   * TODO: this is temporary, mostly for experimental result handling
   * (this should be included elsewhere and tidied up to reduce duplication)
   */
  playerLogs
    .forEach((pl) => {
      const { player } = pl;
      const { id } = player;

      if (!playerStatisticsLogs.has(id)) {
        playerStatisticsLogs.set(id, generateEmptyStatisticsLog(pl));
      }

      const log   = playerStatisticsLogs.get(id)!;
      const stats = extractStats(pl);

      log.played  += getPlayed(pl.played);
      log.started += getStarted(pl.started);

      statsKeys.forEach((key) => {
        log.stats[key] += getStatsValue(stats, key);
      });
    });

  const averages = true; /* default for now */

  if (averages) {
    playerStatisticsLogs.forEach((log) => {
      statsKeys.forEach((key) => {
        log.stats[key] = log.stats[key] / log.played;
      });
    });
  }

  return [...playerStatisticsLogs.values()];
}

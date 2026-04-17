import { prisma } from "@/lib/prisma";
import type { StatisticsLog } from "@/types/statistics-log";

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

/**
 * TODO: this is temporary, mostly for experimental result handling
 */
function getPlayed(pl: any): number {
  return pl.started || pl.seconds > 0 ? 1 : 0;
}

/**
 * TODO: this is temporary, mostly for experimental result handling
 */
function getStarted(pl: any): number {
  return pl.started ? 1 : 0;
}

/**
 * TODO: this is temporary, mostly for experimental result handling
 */
function getValue(pl: any, key: string): number {
  return pl[key];
}

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
      const { id } = pl.player;

      if (playerStatisticsLogs.has(id)) {
        const log = playerStatisticsLogs.get(id)!;

        log.played               += getPlayed(pl);
        log.started              += getStarted(pl);
        log.stats.seconds        += getValue(pl, "seconds");
        log.stats.seconds        += getValue(pl, "seconds");
        log.stats.fgMade         += getValue(pl, "fgMade");
        log.stats.fgAttempted    += getValue(pl, "fgAttempted");
        log.stats.fg3Made        += getValue(pl, "fg3Made");
        log.stats.fg3Attempted   += getValue(pl, "fg3Attempted");
        log.stats.ftMade         += getValue(pl, "ftMade");
        log.stats.ftAttempted    += getValue(pl, "ftAttempted");
        log.stats.points         += getValue(pl, "points");
        log.stats.offRebounds    += getValue(pl, "offRebounds");
        log.stats.defRebounds    += getValue(pl, "defRebounds");
        log.stats.rebounds       += getValue(pl, "rebounds");
        log.stats.assists        += getValue(pl, "assists");
        log.stats.steals         += getValue(pl, "steals");
        log.stats.blocks         += getValue(pl, "blocks");
        log.stats.turnovers      += getValue(pl, "turnovers");
        log.stats.personalFouls  += getValue(pl, "personalFouls");
        log.stats.technicalFouls += getValue(pl, "technicalFouls");

        return;
      }

      playerStatisticsLogs.set(pl.player.id, {
        id:      pl.player.id,
        team:    pl.team,
        player:  pl.player,
        played:  getPlayed(pl),
        started: getStarted(pl),
        stats: {
          seconds:        getValue(pl, "seconds"),
          fgMade:         getValue(pl, "fgMade"),
          fgAttempted:    getValue(pl, "fgAttempted"),
          fg3Made:        getValue(pl, "fg3Made"),
          fg3Attempted:   getValue(pl, "fg3Attempted"),
          ftMade:         getValue(pl, "ftMade"),
          ftAttempted:    getValue(pl, "ftAttempted"),
          points:         getValue(pl, "points"),
          offRebounds:    getValue(pl, "offRebounds"),
          defRebounds:    getValue(pl, "defRebounds"),
          rebounds:       getValue(pl, "rebounds"),
          assists:        getValue(pl, "assists"),
          steals:         getValue(pl, "steals"),
          blocks:         getValue(pl, "blocks"),
          turnovers:      getValue(pl, "turnovers"),
          personalFouls:  getValue(pl, "personalFouls"),
          technicalFouls: getValue(pl, "technicalFouls"),
        }
      } as StatisticsLog)
    });

  return [...playerStatisticsLogs.values()];
}

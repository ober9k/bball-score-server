import { prisma } from "@/lib/prisma";
import type { StandingsLog } from "@/types/standings-log";
import { accumulateForGame, generateStandingsLogs } from "@/utils/standings-utils";

/**
 * TODO: this is temporary, need to work out a tidier way to handle all of this
 */
const reducer = (acc, cur: string) => ({ ...acc, [cur]: true });
const getColumns = (columns: string[]) => columns.reduce(reducer, {});

const gameCols = getColumns(["id", "date", "phase", "round"]);
const gameTeamCols = getColumns(["id", "side", "score", "scoreByPeriod"]);
const teamCols = getColumns(["id", "name", "shortName"]);

export async function generateStandings(): Promise<StandingsLog[]> {
  const games: any[] = await prisma.game.findMany({
    select: {
      ...gameCols,
      gameTeams: {
        select: {
          ...gameTeamCols,
          team: {
            select: {
              ...teamCols,
            },
          },
        },
      },
    },
  });

  const teamStandingsLog = generateStandingsLogs(games);

  games
    .forEach((g) => {
      const [ awayTeamLog, homeTeamLog ] = g.gameTeams as any[];
      const { team: awayTeam } = awayTeamLog;
      const { team: homeTeam } = homeTeamLog;

      accumulateForGame(teamStandingsLog.get(awayTeam.id)!, awayTeamLog.score, homeTeamLog.score);
      accumulateForGame(teamStandingsLog.get(homeTeam.id)!, homeTeamLog.score, awayTeamLog.score);
    });

  return [ ...teamStandingsLog.values() ];
}

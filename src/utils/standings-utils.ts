import type { StandingsLog } from "@/types/standings-log";

/**
 * Generate empty stats object.
 */
function generateStandingsLog(log: any): StandingsLog {
  const { team } = log;
  const { id } = team;

  const played        = 0;
  const wins          = 0;
  const losses        = 0;
  const draws         = 0;
  const byes          = 0;
  const forfeits      = 0;
  const pointsFor     = 0;
  const pointsAgainst = 0;

  return { id, team, played, wins, losses, draws, byes, forfeits, pointsFor, pointsAgainst };
}

/**
 * Accumulate standings for a game based on the provided team.
 */
export function accumulateForGame(log: StandingsLog, scoreA: number, scoreB): void {
  log.played        += 1; /* increment for any log, later factor forfeit */
  log.wins          += +(scoreA > scoreB);
  log.losses        += +(scoreA < scoreB);
  log.draws         += +(scoreA === scoreB);
  log.byes          += 0; /* tbd */
  log.forfeits      += 0; /* tbd */
  log.pointsFor     += scoreA;
  log.pointsAgainst += scoreB;
}

export function generateStandingsLogs(games: any[]): Map<number, StandingsLog> {
  const standingsLogs = new Map<number, StandingsLog>();

  games
    .map((g) => ([...g.gameTeams]))
    .flat()
    .forEach((tl) => {
      const { team } = tl;
      standingsLogs.set(team.id, generateStandingsLog(tl));
    });

  return standingsLogs;
}

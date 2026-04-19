import type { StandingsLog } from "@/types/standings-log";

/**
 * Generate empty stats object.
 */
export function generateEmptyStandingsLog(log: any): StandingsLog {
  const { team } = log;
  const { id } = team;

  const wins          = 0;
  const losses        = 0;
  const draws         = 0;
  const byes          = 0;
  const pointsFor     = 0;
  const pointsAgainst = 0;

  return { id, team, wins, losses, draws, byes, pointsFor, pointsAgainst };
}

/**
 * Accumulate standings for a game based on the provided team.
 */
export function accumulateForGame(log: StandingsLog, scoreA: number, scoreB): void {
  log.wins          += +(scoreA > scoreB);
  log.losses        += +(scoreA < scoreB);
  log.draws         += +(scoreA === scoreB);
  log.byes          += 0; /* tbd */
  log.pointsFor     += scoreA;
  log.pointsAgainst += scoreB;
}

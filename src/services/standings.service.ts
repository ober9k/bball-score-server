import { toBasicTeam } from "@/lib/converters";
import { GameService } from "@/services/game.service";
import type { Game, TeamLog } from "@/types/game";
import type { StandingsLog } from "@/types/standings-log";

/* todo: non-linked for now (no database) */
export class StandingsService {

  private gameService = new GameService();

  public async generate(): Promise<StandingsLog[]> {
    const games = await this.gameService.findAll() as Game[];

    return games
      .filter(StandingsService.filterEmpty)
      .map(StandingsService.fromGame)
      .flat()
      .reduce(StandingsService.accumulateByTeam, []);
  }

  /**
   * Apply a reducer to accumulate logs for the same teams.
   * @private
   */
  private static accumulateByTeam(acc: StandingsLog[], cur: StandingsLog): StandingsLog[] {
    const log = acc.find((log) => log.id === cur.id);

    if (log) {
      log.played        += cur.played;
      log.wins          += cur.wins;
      log.losses        += cur.losses;
      log.draws         += cur.draws;
      log.byes          += cur.byes;
      log.forfeits      += cur.forfeits;
      log.pointsFor     += cur.pointsFor;
      log.pointsAgainst += cur.pointsAgainst;
      return acc;
    }

    return [ ...acc, cur ]; /* push new value */
  }

  /**
   * Generate initial log tied to a team's outcome against the opposing team.
   * @private
   */
  private static fromLog(log: TeamLog, opposingLog: TeamLog): StandingsLog {
    const score = log.score;
    const opposingScore = opposingLog.score;

    const team          = toBasicTeam(log.team); /* todo: limit query too */
    const played        = 1;
    const wins          = +(score > opposingScore);
    const losses        = +(score < opposingScore);
    const draws         = +(score === opposingScore);
    const byes          = 0; /* todo: not yet factored in */
    const forfeits      = 0; /* todo: not yet factored in */
    const pointsFor     = score;
    const pointsAgainst = opposingScore;

    return { id: log.team.id, team, played, wins, losses, draws, byes, forfeits, pointsFor, pointsAgainst };
  }

  /**
   * Generate standings logs for both the home and away teams.
   * @private
   */
  private static fromGame(game: Game): StandingsLog[] {
    const [ awayTeamLog, homeTeamLog ] = game.teamLogs;

    return [
      StandingsService.fromLog(awayTeamLog, homeTeamLog),
      StandingsService.fromLog(homeTeamLog, awayTeamLog),
    ].flat();
  }

  /**
   * Games without team logs can just be disregarded.
   * @private
   */
  private static filterEmpty(game: Game): boolean {
    return game.teamLogs.length > 0;
  }

}

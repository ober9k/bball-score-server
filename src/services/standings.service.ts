import { GameService } from "@/services/game.service";
import type { Game } from "@/types/game";
import type { StandingsLog } from "@/types/standings-log";
import { accumulateForGame, generateStandingsLogs } from "@/utils/standings-utils";

export async function generateStandings(): Promise<StandingsLog[]> {
  const gameService = new GameService();
  const games = await gameService.findAll() as Game[];

  const teamStandingsLog = generateStandingsLogs(games);

  games
    .filter((g) => g.teamLogs.length > 0) /* disregard empty logs */
    .forEach((g) => {
      const [ awayTeamLog, homeTeamLog ] = g.teamLogs as any[];
      const { team: awayTeam } = awayTeamLog;
      const { team: homeTeam } = homeTeamLog;

      accumulateForGame(teamStandingsLog.get(awayTeam.id)!, awayTeamLog.score, homeTeamLog.score);
      accumulateForGame(teamStandingsLog.get(homeTeam.id)!, homeTeamLog.score, awayTeamLog.score);
    });

  return [ ...teamStandingsLog.values() ];
}

import { findAll, findByPlayerIdWithGames, findByTeamId } from "@/services/player-log.service";
import type { StatisticsLog } from "@/types/statistics-log";
import { generateAveragesStatisticsLogs, generateGamesStatisticsLogs, generateTotalsStatisticsLogs } from "@/utils/stats-utils";

export type StatisticsMode = "averages" | "totals" | "games";

export class StatisticsService {

  public async generate(mode?: StatisticsMode): Promise<StatisticsLog[]> {
    const playerLogs = await findAll();

    return (mode === "averages")
      ? generateAveragesStatisticsLogs(playerLogs)
      : generateTotalsStatisticsLogs(playerLogs)
  }

  public async generateByTeam(teamId: number, mode?: StatisticsMode): Promise<StatisticsLog[]> {
    const playerLogs = await findByTeamId(teamId);

    return (mode === "averages")
      ? generateAveragesStatisticsLogs(playerLogs)
      : generateTotalsStatisticsLogs(playerLogs)
  }

  public async generateByPlayer(playerId: number, mode?: StatisticsMode): Promise<StatisticsLog[]> {
    const playerLogs = await findByPlayerIdWithGames(playerId);

    if (mode === "games") {
      return generateGamesStatisticsLogs(playerLogs);
    }

    return (mode === "averages")
      ? generateAveragesStatisticsLogs(playerLogs)
      : generateTotalsStatisticsLogs(playerLogs)
  }

}

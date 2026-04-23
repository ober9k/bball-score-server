import { findAll, findByTeamId } from "@/services/player-log.service";
import type { StatisticsLog } from "@/types/statistics-log";
import { generateAveragesStatisticsLogs, generateTotalsStatisticsLogs } from "@/utils/stats-utils";

export type StatisticsMode = "averages" | "totals";

export async function generateStatisticsLogs(mode?: StatisticsMode): Promise<StatisticsLog[]> {
  const playerLogs = await findAll();

  return (mode === "averages")
    ? generateAveragesStatisticsLogs(playerLogs)
    : generateTotalsStatisticsLogs(playerLogs)
}

export async function generateStatisticsLogsByTeamId(teamId: number, mode?: StatisticsMode): Promise<StatisticsLog[]> {
  const playerLogs = await findByTeamId(teamId);

  return (mode === "averages")
    ? generateAveragesStatisticsLogs(playerLogs)
    : generateTotalsStatisticsLogs(playerLogs)
}

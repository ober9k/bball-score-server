import { created, ok } from "@/controllers/base.controller";
import { getLocalLeague } from "@/services/league.service";
import { PlayerService } from "@/services/player.service";
import type { StatisticsMode } from "@/services/statistics.service";
import { generateStatisticsLogsByPlayerId } from "@/services/statistics.service";
import { findTeamsByPlayerId } from "@/services/team-player.service";
import type { BriefPlayer, BriefPlayerData, Player } from "@/types/player";
import type { StatisticsLog } from "@/types/statistics-log";
import type { Team } from "@/types/team";
import type { Request, Response } from "express";

function getPlayerId(req: Request): number {
  return +req.params.id;
}

function getPlayerData(req: Request, res: Response): BriefPlayerData {
  const { name, position, number, height, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res); /* overwrite any leagueId sent by the front-end data */

  return {
    name, position, number, height, activated, archived, leagueId,
  };
}

export async function getPlayers(req: Request, res: Response) {
  const data = await (new PlayerService()).findAll() as Player[];
  return ok<Player[]>(res, data);
}

export async function getPlayer(req: Request, res: Response) {
  const data = await (new PlayerService()).findById(getPlayerId(req)) as Player;
  return ok<Player>(res, data);
}

export async function getBriefPlayers(req: Request, res: Response) {
  const data = await (new PlayerService()).findAll(true) as BriefPlayer[];
  return ok<BriefPlayer[]>(res, data);
}

export async function getBriefPlayer(req: Request, res: Response) {
  const data = await (new PlayerService()).findById(getPlayerId(req), true) as BriefPlayer;
  return ok<BriefPlayer>(res, data);
}

export async function createPlayer(req: Request, res: Response) {
  const data = await (new PlayerService()).save(getPlayerData(req, res));
  return created<BriefPlayer>(res, data);
}

export async function updatePlayer(req: Request, res: Response) {
  const data = await (new PlayerService()).saveById(getPlayerId(req), getPlayerData(req, res));
  return ok<BriefPlayer>(res, data);
}

export async function getPlayerTeams(req: Request, res: Response) {
  await (new PlayerService()).findById(getPlayerId(req)); /* trigger an initial failure if not found */

  const data = await findTeamsByPlayerId(getPlayerId(req));
  return ok<Team[]>(res, data);
}

async function getPlayerStatistics(req: Request, res: Response, mode: StatisticsMode) {
  await (new PlayerService()).findById(getPlayerId(req)); /* trigger an initial failure if not found */

  const data = await generateStatisticsLogsByPlayerId(getPlayerId(req), mode);
  return ok<StatisticsLog[]>(res, data);
}

export async function getPlayerStatisticsAverages(req: Request, res: Response) {
  return getPlayerStatistics(req, res, "averages");
}

export async function getPlayerStatisticsTotals(req: Request, res: Response) {
  return getPlayerStatistics(req, res, "totals");
}

export async function getPlayerStatisticsGames(req: Request, res: Response) {
  return getPlayerStatistics(req, res, "games");
}

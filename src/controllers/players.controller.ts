import { getLocalLeague } from "@/services/league.service";
import { PlayerService } from "@/services/player.service";
import type { StatisticsMode } from "@/services/statistics.service";
import { generateStatisticsLogsByPlayerId } from "@/services/statistics.service";
import { findTeamsByPlayerId } from "@/services/team-player.service";
import type { BriefPlayerData } from "@/types/player";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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
  return res
    .status(StatusCodes.OK)
    .json(
      await (new PlayerService()).findAll()
    );
}

export async function getPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new PlayerService()).findById(getPlayerId(req))
    );
}

export async function getBriefPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new PlayerService()).findAll(true)
    );
}

export async function getBriefPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new PlayerService()).findById(getPlayerId(req), true)
    );
}

export async function createPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await (new PlayerService()).save(getPlayerData(req, res))
    );
}

export async function updatePlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new PlayerService()).saveById(getPlayerId(req), getPlayerData(req, res))
    );
}

export async function getPlayerTeams(req: Request, res: Response) {
  await (new PlayerService()).findById(getPlayerId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamsByPlayerId(getPlayerId(req))
    );
}

async function getPlayerStatistics(req: Request, res: Response, mode: StatisticsMode) {
  await (new PlayerService()).findById(getPlayerId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await generateStatisticsLogsByPlayerId(getPlayerId(req), mode)
    )
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

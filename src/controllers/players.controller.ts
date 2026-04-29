import { getLocalLeague } from "@/services/league.service";
import { findAll, findBriefAll, findBriefById, findById, save, saveById } from "@/services/player.service";
import type { StatisticsMode } from "@/services/statistics.service";
import { generateStatisticsLogsByPlayerId } from "@/services/statistics.service";
import { findTeamsByPlayerId } from "@/services/team-player.service";
import type { PlayerData } from "@/types/player";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getPlayerId(req: Request): number {
  return +req.params.id;
}

function getPlayerData(req: Request, res: Response): PlayerData {
  const { name, position, number, height, active, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, position, number, height, active, archived, leagueId,
  };
}

export async function getPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAll()
    );
}

export async function getPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findById(getPlayerId(req))
    );
}

export async function getBriefPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefAll()
    );
}

export async function getBriefPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefById(getPlayerId(req))
    );
}

export async function createPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await save(getPlayerData(req, res))
    );
}

export async function updatePlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveById(getPlayerId(req), getPlayerData(req, res))
    );
}

export async function getPlayerTeams(req: Request, res: Response) {
  await findById(getPlayerId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamsByPlayerId(getPlayerId(req))
    );
}

async function getPlayerStatistics(req: Request, res: Response, mode: StatisticsMode) {
  await findById(getPlayerId(req)); /* trigger an initial failure if not found */

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

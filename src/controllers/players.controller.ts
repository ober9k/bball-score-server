import { getLocalLeague } from "@/services/league.service";
import { findAll, findById, save, saveById } from "@/services/player.service";
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

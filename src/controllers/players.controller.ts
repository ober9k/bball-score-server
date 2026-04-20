import { getLocalLeague } from "@/services/league.service";
import { findPlayerById, findPlayers, findPlayerTeams, savePlayer, savePlayerById } from "@/services/player.service";
import type { PlayerData } from "@/types/player";
import type { TeamData } from "@/types/team";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getPlayerId(req: Request): number {
  return +req.params.playerId;
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
      await findPlayers()
    );
}

export async function getPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findPlayerById(getPlayerId(req))
    );
}

export async function createPlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await savePlayer(getPlayerData(req, res))
    );
}

export async function updatePlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await savePlayerById(getPlayerId(req), getPlayerData(req, res))
    );
}

export async function getPlayerTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findPlayerTeams(getPlayerId(req))
    );
}

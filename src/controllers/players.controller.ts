import { getLocalLeague } from "@/services/league.service";
import { findPlayerById, findPlayers, findPlayerTeams, savePlayer, savePlayerById } from "@/services/player.service";
import type { PlayerData } from "@/types/player";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getPlayerId(req: Request): number {
  return +req.params.playerId;
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
  const playerData: PlayerData = {
    name: req.body.name,
    position: req.body.position,
    number: req.body.number,
    height: req.body.height,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await savePlayer(playerData)
    );
}

export async function updatePlayer(req: Request, res: Response) {
  const playerData: PlayerData = {
    name: req.body.name,
    position: req.body.position,
    number: req.body.number,
    height: req.body.height,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await savePlayerById(getPlayerId(req), playerData)
    );
}

export async function getPlayerTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findPlayerTeams(getPlayerId(req))
    );
}

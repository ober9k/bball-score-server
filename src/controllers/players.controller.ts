import { findPlayerById, findPlayers } from "@/services/player.service";
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
  return res
    .status(StatusCodes.OK)
    .json({
      request: "createPlayer",
    });
}

export async function updatePlayer(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "updatePlayer",
    });
}

export async function getPlayerTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "getPlayerTeams",
    });
}

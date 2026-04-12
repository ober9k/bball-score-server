import { findGameById, findGames } from "@/services/game.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getGameId(req: Request): number {
  return +req.params.gameId;
}

export async function getGames(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findGames()
    );
}

export async function getGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findGameById(getGameId(req))
    );
}

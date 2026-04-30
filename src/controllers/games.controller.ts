import { GameService } from "@/services/game.service";
import { getLocalLeague } from "@/services/league.service";
import type { BriefGameData } from "@/types/game";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getGameId(req: Request): number {
  return +req.params.id;
}

function getGameData(req: Request, res: Response): BriefGameData {
  const { date, phase, round, seasonId, divisionId, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    date, phase, round, seasonId, divisionId, activated, archived,
  };
}

export async function getGames(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new GameService()).findAll()
    );
}

export async function getGame(req: Request, res: Response) {
  /* a bit ugly for now */
  return res
    .status(StatusCodes.OK)
    .json(
      await (new GameService()).findById(getGameId(req))
    );
}

export async function getBriefGames(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new GameService()).findAll(true)
    );
}

export async function getBriefGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new GameService()).findById(getGameId(req), true)
    );
}

export async function createGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await (new GameService()).save(getGameData(req, res))
    );
}

export async function updateGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new GameService()).saveById(getGameId(req), getGameData(req, res))
    );
}

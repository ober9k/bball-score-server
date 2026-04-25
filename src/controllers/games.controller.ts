import { findAll, findById, save, saveById } from "@/services/game.service";
import { getLocalLeague } from "@/services/league.service";
import type { GameData } from "@/types/game";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getGameId(req: Request): number {
  return +req.params.id;
}

function getGameData(req: Request, res: Response): GameData {
  const { date, phase, round, active, archived, seasonId, divisionId } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    date: new Date(date), phase, round, active, archived, seasonId, divisionId, leagueId,
  };
}

export async function getGames(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAll()
    );
}

export async function getGame(req: Request, res: Response) {
  /* a bit ugly for now */
  return res
    .status(StatusCodes.OK)
    .json(
      await findById(getGameId(req))
    );
}

export async function createGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await save(getGameData(req, res))
    );
}

export async function updateGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveById(getGameId(req), getGameData(req, res))
    );
}

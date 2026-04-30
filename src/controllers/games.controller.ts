import { created, ok } from "@/controllers/base.controller";
import { GameService } from "@/services/game.service";
import { getLocalLeague } from "@/services/league.service";
import type { BriefGame, BriefGameData, Game } from "@/types/game";
import type { Request, Response } from "express";

function getGameId(req: Request): number {
  return +req.params.id;
}

function getGameData(req: Request, res: Response): BriefGameData {
  const { date, phase, round, seasonId, divisionId, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res); /* overwrite any leagueId sent by the front-end data */

  return {
    date, phase, round, seasonId, divisionId, activated, archived, leagueId,
  };
}

export async function getGames(req: Request, res: Response) {
  const data = await (new GameService()).findAll() as Game[];
  return ok<Game[]>(res, data);
}

export async function getGame(req: Request, res: Response) {
  const data = await (new GameService()).findById(getGameId(req)) as Game;
  return ok<Game>(res, data);
}

export async function getBriefGames(req: Request, res: Response) {
  const data = await (new GameService()).findAll(true) as BriefGame[];
  return ok<BriefGame[]>(res, data);
}

export async function getBriefGame(req: Request, res: Response) {
  const data = await (new GameService()).findById(getGameId(req), true) as BriefGame;
  return ok<BriefGame>(res, data);
}

export async function createGame(req: Request, res: Response) {
  const data = await (new GameService()).save(getGameData(req, res));
  return created<BriefGame>(res, data);
}

export async function updateGame(req: Request, res: Response) {
  const data = await (new GameService()).saveById(getGameId(req), getGameData(req, res));
  return ok<BriefGame>(res, data);
}

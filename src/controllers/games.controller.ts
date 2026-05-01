import { BaseController, created, ok } from "@/controllers/base.controller";
import { GameService } from "@/services/game.service";
import type { BriefGame, BriefGameData, Game } from "@/types/game";
import type { Request, Response } from "express";

export class GamesController extends BaseController<BriefGameData> {

  private gameService = new GameService();

  public async getGames(req: Request, res: Response) {
    const data = await (new GameService()).findAll() as Game[];
    return ok<Game[]>(res, data);
  }

  public async getGame(req: Request, res: Response) {
    const data = await (new GameService()).findById(this.getId(req)) as Game;
    return ok<Game>(res, data);
  }

  public async getBriefGames(req: Request, res: Response) {
    const data = await (new GameService()).findAll(true) as BriefGame[];
    return ok<BriefGame[]>(res, data);
  }

  public async getBriefGame(req: Request, res: Response) {
    const data = await (new GameService()).findById(this.getId(req), true) as BriefGame;
    return ok<BriefGame>(res, data);
  }

  public async createGame(req: Request, res: Response) {
    const data = await (new GameService()).save(this.getBriefData(req, res));
    return created<BriefGame>(res, data);
  }

  public async updateGame(req: Request, res: Response) {
    const data = await (new GameService()).saveById(this.getId(req), this.getBriefData(req, res));
    return ok<BriefGame>(res, data);
  }

  protected getBriefData(req: Request, res: Response): BriefGameData {
    const { date, phase, round, seasonId, divisionId, activated, archived } = req.body;
    const leagueId = this.getLeagueId(res); /* overwrite any leagueId sent by the front-end data */

    return {
      date, phase, round, seasonId, divisionId, activated, archived, leagueId,
    };
  }

}


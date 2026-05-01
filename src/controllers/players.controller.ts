import { BaseController, created, ok } from "@/controllers/base.controller";
import { PlayerService } from "@/services/player.service";
import { generateStatisticsLogsByPlayerId } from "@/services/statistics.service";
import { findTeamsByPlayerId } from "@/services/team-player.service";
import type { BriefPlayer, BriefPlayerData, Player } from "@/types/player";
import type { StatisticsLog } from "@/types/statistics-log";
import type { Team } from "@/types/team";
import type { Request, Response } from "express";

export class PlayersController extends BaseController<BriefPlayerData> {

  private playerService = new PlayerService();

  public async getPlayers(req: Request, res: Response) {
    const data = await this.playerService.findAll() as Player[];
    return ok<Player[]>(res, data);
  }

  public async getPlayer(req: Request, res: Response) {
    const data = await this.playerService.findById(this.getId(req)) as Player;
    return ok<Player>(res, data);
  }

  public async getBriefPlayers(req: Request, res: Response) {
    const data = await this.playerService.findAll(true) as BriefPlayer[];
    return ok<BriefPlayer[]>(res, data);
  }

  public async getBriefPlayer(req: Request, res: Response) {
    const data = await this.playerService.findById(this.getId(req), true) as BriefPlayer;
    return ok<BriefPlayer>(res, data);
  }

  public async createPlayer(req: Request, res: Response) {
    const data = await this.playerService.save(this.getBriefData(req, res));
    return created<BriefPlayer>(res, data);
  }

  public async updatePlayer(req: Request, res: Response) {
    const data = await this.playerService.saveById(this.getId(req), this.getBriefData(req, res));
    return ok<BriefPlayer>(res, data);
  }

  public async getPlayerTeams(req: Request, res: Response) {
    await this.playerService.findById(this.getId(req)); /* trigger an initial failure if not found */

    const data = await findTeamsByPlayerId(this.getId(req));
    return ok<Team[]>(res, data);
  }

  public async getPlayerStatistics(req: Request, res: Response) {
    await this.playerService.findById(this.getId(req)); /* trigger an initial failure if not found */
    const mode = req.params.mode;

    switch (mode) {
      case "averages":
      case "totals":
      case "games":
        const data = await generateStatisticsLogsByPlayerId(this.getId(req), mode);
        return ok<StatisticsLog[]>(res, data);
      default:
        throw Error("Unable to handle requested `mode` for statistics.");
    }
  }

  protected getBriefData(req: Request, res: Response): BriefPlayerData {
    const { name, position, number, height, activated, archived } = req.body;
    const leagueId = this.getLeagueId(res); /* overwrite any leagueId sent by the front-end data */

    return {
      name, position, number, height, activated, archived, leagueId,
    };
  }

}

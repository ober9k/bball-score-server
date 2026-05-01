import { BaseController, created, ok } from "@/controllers/base.controller";
import { generateStatisticsLogsByTeamId } from "@/services/statistics.service";
import { findPlayersByTeamId } from "@/services/team-player.service";
import { TeamService } from "@/services/team.service";
import type { Option } from "@/types/option";
import type { Player } from "@/types/player";
import type { StatisticsLog } from "@/types/statistics-log";
import type { BriefTeam, BriefTeamData, Team } from "@/types/team";
import type { Request, Response } from "express";

export class TeamsController extends BaseController<BriefTeamData> {

  private teamService = new TeamService();

  public async getTeams(req: Request, res: Response) {
    const data = await this.teamService.findAll() as Team[];
    return ok<Team[]>(res, data);
  }

  public async getTeam(req: Request, res: Response) {
    const data = await this.teamService.findById(this.getId(req)) as Team;
    return ok<Team>(res, data);
  }

  public async getBriefTeams(req: Request, res: Response) {
    const data = await this.teamService.findAll(true) as BriefTeam[];
    return ok<BriefTeam[]>(res, data);
  }

  public async getBriefTeam(req: Request, res: Response) {
    const data = await this.teamService.findById(this.getId(req), true) as BriefTeam;
    return ok<BriefTeam>(res, data);
  }

  public async createTeam(req: Request, res: Response) {
    const data = await this.teamService.save(this.getBriefData(req, res));
    return created<BriefTeam>(res, data);
  }

  public async updateTeam(req: Request, res: Response) {
    const data = await this.teamService.saveById(this.getId(req), this.getBriefData(req, res));
    return ok<BriefTeam>(res, data);
  }

  public async getTeamsOptions(req: Request, res: Response) {
    const data = await this.teamService.findOptions();
    return ok<Option[]>(res, data);
  }

  public async getTeamPlayers(req: Request, res: Response) {
    await this.teamService.findById(this.getId(req)); /* trigger an initial failure if not found */

    const data = await findPlayersByTeamId(this.getId(req));
    return ok<Player[]>(res, data);
  }

  public async getTeamStatistics(req: Request, res: Response) {
    await this.teamService.findById(this.getId(req)); /* trigger an initial failure if not found */
    const mode = req.params.mode;

    switch (mode) {
      case "averages":
      case "totals":
        const data = await generateStatisticsLogsByTeamId(this.getId(req), mode);
        return ok<StatisticsLog[]>(res, data);
      default:
        throw Error("Unable to handle requested `mode` for statistics.");
    }
  }

  protected getBriefData(req: Request, res: Response): BriefTeamData {
    const { name, shortName, divisionId, activated, archived } = req.body;
    const leagueId = this.getLeagueId(res); /* overwrite any leagueId sent by the front-end data */

    return {
      name, shortName, divisionId, activated, archived, leagueId,
    };
  }

}

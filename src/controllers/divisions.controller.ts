import { BaseController, created, ok } from "@/controllers/base.controller";
import { DivisionService, findTeamsByDivisionId } from "@/services/division.service";
import type { BriefDivision, BriefDivisionData, Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { Team } from "@/types/team";
import type { Request, Response } from "express";

export class DivisionsController extends BaseController<BriefDivisionData> {

  private divisionService = new DivisionService();

  public async getDivisions(req: Request, res: Response) {
    const data = await this.divisionService.findAll() as Division[];
    return ok<Division[]>(res, data);
  }

  public async getDivision(req: Request, res: Response) {
    const data = await this.divisionService.findById(this.getId(req)) as Division;
    return ok<Division>(res, data);
  }

  public async getBriefDivisions(req: Request, res: Response) {
    const data = await this.divisionService.findAll(true) as BriefDivision[];
    return ok<BriefDivision[]>(res, data);
  }

  public async getBriefDivision(req: Request, res: Response) {
    const data = await this.divisionService.findById(this.getId(req), true) as BriefDivision;
    return ok<BriefDivision>(res, data);
  }

  public async createDivision(req: Request, res: Response) {
    const data = await this.divisionService.save(this.getBriefData(req, res));
    return created<BriefDivision>(res, data);
  }

  public async updateDivision(req: Request, res: Response) {
    const data = await this.divisionService.saveById(this.getId(req), this.getBriefData(req, res));
    return ok<BriefDivision>(res, data);
  }

  public async getDivisionsOptions(req: Request, res: Response) {
    const data = await this.divisionService.findOptions();
    return ok<Option[]>(res, data);
  }

  public async getDivisionTeams(req: Request, res: Response) {
    await this.divisionService.findById(this.getId(req)); /* trigger an initial failure if not found */

    const data = await findTeamsByDivisionId(this.getId(req));
    return ok<Team[]>(res, data);
  }

  protected getBriefData(req: Request, res: Response): BriefDivisionData {
    const { name, seasonId, activated, archived } = req.body;
    const leagueId = this.getLeagueId(res); /* overwrite any leagueId sent by the front-end data */

    return {
      name, seasonId, activated, archived, leagueId,
    };
  }

}

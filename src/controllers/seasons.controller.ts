import { BaseController, created, ok } from "@/controllers/base.controller";
import { findDivisionsBySeasonId, SeasonService } from "@/services/season.service";
import type { Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { BriefSeason, BriefSeasonData, Season } from "@/types/season";
import type { Request, Response } from "express";

export class SeasonsController extends BaseController<BriefSeasonData> {

  private seasonService = new SeasonService();

  public async getSeasons(req: Request, res: Response) {
    const data = await this.seasonService.findAll() as Season[];
    return ok<Season[]>(res, data);
  }

  public async getSeason(req: Request, res: Response) {
    const data = await this.seasonService.findById(this.getId(req)) as Season;
    return ok<Season>(res, data);
  }

  public async getBriefSeasons(req: Request, res: Response) {
    const data = await this.seasonService.findAll(true) as BriefSeason[];
    return ok<BriefSeason[]>(res, data);
  }

  public async getBriefSeason(req: Request, res: Response) {
    const data = await this.seasonService.findById(this.getId(req), true) as BriefSeason;
    return ok<BriefSeason>(res, data);
  }

  public async createSeason(req: Request, res: Response) {
    const data = await this.seasonService.save(this.getBriefData(req, res));
    return created<BriefSeason>(res, data);
  }

  public async updateSeason(req: Request, res: Response) {
    const data = await this.seasonService.saveById(this.getId(req), this.getBriefData(req, res));
    return ok<BriefSeason>(res, data);
  }

  public async getSeasonsOptions(req: Request, res: Response) {
    const data = await this.seasonService.findOptions();
    return ok<Option[]>(res, data);
  }

  public async getSeasonDivisions(req: Request, res: Response) {
    await this.seasonService.findById(this.getId(req)); /* trigger an initial failure if not found */

    const data = await findDivisionsBySeasonId(this.getId(req));
    return ok<Division[]>(res, data);
  }

  protected getBriefData(req: Request, res: Response): BriefSeasonData {
    const { name, activated, archived } = req.body;
    const leagueId = this.getLeagueId(res); /* overwrite any leagueId sent by the front-end data */

    return {
      name, activated, archived, leagueId,
    };
  }

}

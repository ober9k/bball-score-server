import { BaseController, ok } from "@/controllers/base.controller";
import { StandingsService } from "@/services/standings.service";
import { StatisticsService } from "@/services/statistics.service";
import type { StandingsLog } from "@/types/standings-log";
import type { StatisticsLog } from "@/types/statistics-log";
import type { Request, Response } from "express";

export class LeagueController extends BaseController {

  private standingsService = new StandingsService();
  private statisticsService = new StatisticsService();

  public async getStandings(req: Request, res: Response) {
    const data = await this.standingsService.generate();
    return ok<StandingsLog[]>(res, data);
  }

  public async getStatistics(req: Request, res: Response) {
    const mode = req.params.mode;

    switch (mode) {
      case "averages":
      case "totals":
        const data = await this.statisticsService.generate(mode);
        return ok<StatisticsLog[]>(res, data);
      default:
        throw Error("Unable to handle requested `mode` for statistics.");
    }
  }

}

import { BaseController } from "@/controllers/base.controller";
import { SeasonService } from "@/services/season.service";
import { Request, Response } from "express"

export class SeasonController extends BaseController {

    public find = async (request: Request, response: Response) => {
        const service = this.getSeasonService(response);

        try {
            this.success(response, await service.find());
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public findOne = async (request: Request, response: Response) => {
        const service  = this.getSeasonService(response);
        const seasonId = request.params.id;

        try {
            this.success(response, await service.findById(seasonId));
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public getSeasonService({ app }: Response): SeasonService {
        return new SeasonService(app.locals.db);
    }

}

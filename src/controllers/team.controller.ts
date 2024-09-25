import { BaseController } from "@/controllers/base.controller";
import { TeamService } from "@/services/team.service";
import { Request, Response } from "express"

export class TeamController extends BaseController {

    public find = async (request: Request, response: Response) => {
        const service = this.getTeamService(response);

        try {
            this.success(response, await service.find());
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public findOne = async (request: Request, response: Response) => {
        const service = this.getTeamService(response);
        const teamId  = request.params.id;

        try {
            this.success(response, await service.findById(teamId));
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public getTeamService({ app }: Response): TeamService {
        return new TeamService(app.locals.db);
    }

}

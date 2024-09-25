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

    public create = async (request: Request, response: Response) => {
        const service = this.getTeamService(response);
        const team    = { ... request.body };
        const result  = await service.create(team);

        if (result?.acknowledged) {
            this.success(response, `Created new team: ID ${result.insertedId}.`);
        } else {
            this.error(response, "Failed to create new team.");
        }
    }

    public update = async (request: Request, response: Response) => {
        const service = this.getTeamService(response);
        const teamId  = request.params.id;
        const team    = { ... request.body };
        const result  = await service.update(teamId, team);

        if (result?.acknowledged) {
            this.success(response, `Updated team: ID ${teamId}.`);
        } else {
            this.error(response, "Failed to update team.");
        }
    }

    public getTeamService({ app }: Response): TeamService {
        return new TeamService(app.locals.db);
    }

}

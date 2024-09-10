import { TeamService } from "@/services/team.service";
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export class TeamController {

    private readonly teamService: TeamService;

    constructor () {
        this.teamService = new TeamService()
    }

    public find = (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(this.teamService.find());
    }

}

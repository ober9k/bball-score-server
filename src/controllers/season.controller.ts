import { SeasonService } from "@/services/season.service";
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export class SeasonController {

    private readonly seasonService: SeasonService;

    constructor () {
        this.seasonService = new SeasonService();
    }

    public find = (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(this.seasonService.find());
    }

}

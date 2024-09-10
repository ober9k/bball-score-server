import { PlayerService } from "@/services/player.service";
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export class PlayerController {

    private readonly playerService: PlayerService;

    constructor () {
        this.playerService = new PlayerService();
    }

    public find = (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(this.playerService.find());
    }

}

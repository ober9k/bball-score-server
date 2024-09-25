import { BaseController } from "@/controllers/base.controller";
import { PlayerService } from "@/services/player.service";
import { Request, Response } from "express"

export class PlayerController extends BaseController {

    public find = async (request: Request, response: Response) => {
        const service = this.getPlayerService(response);

        try {
            this.success(response, await service.find());
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public findOne = async (request: Request, response: Response) => {
        const service  = this.getPlayerService(response);
        const playerId = request.params.id;

        try {
            this.success(response, await service.findById(playerId));
        }
        catch (error: any) {
            this.error(response, error);
        }
    }

    public getPlayerService({ app }: Response): PlayerService {
        return new PlayerService(app.locals.db);
    }

}

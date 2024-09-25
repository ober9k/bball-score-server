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

    public create = async (request: Request, response: Response) => {
        const service = this.getPlayerService(response);
        const player  = { ... request.body };
        const result  = await service.create(player);

        if (result?.acknowledged) {
            this.success(response, `Created new player: ID ${result.insertedId}.`);
        } else {
            this.error(response, "Failed to create new player.");
        }
    }

    public update = async (request: Request, response: Response) => {
        const service  = this.getPlayerService(response);
        const playerId = request.params.id;
        const player   = { ... request.body };
        const result   = await service.update(playerId, player);

        if (result?.acknowledged) {
            this.success(response, `Updated player: ID ${playerId}.`);
        } else {
            this.error(response, "Failed to update player.");
        }
    }

    public getPlayerService({ app }: Response): PlayerService {
        return new PlayerService(app.locals.db);
    }

}

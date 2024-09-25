import { PlayerController } from "@/controllers/player.controller";
import { Router } from "express";
import { Route } from "@/interfaces/route.interface";
import { StatusCodes } from "http-status-codes";

export class PlayerRoute implements Route {

    public path: string = "/players"
    public router: Router = Router()
    public controller: PlayerController = new PlayerController();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.controller.find);
        this.router.get(this.path + "/:id", this.controller.findOne);
        this.router.post(this.path, this.controller.create);
        this.router.put(this.path + "/:id", this.controller.update);
    }
}

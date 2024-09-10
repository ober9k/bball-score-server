import { PlayerController } from "@/controllers/player.controller";
import { Router } from "express";
import { Route } from "@/interfaces/route.interface";

export class PlayerRoute implements Route {

    public path: string = "/players"
    public router: Router = Router()
    public controller: PlayerController = new PlayerController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.controller.find);
    }
}

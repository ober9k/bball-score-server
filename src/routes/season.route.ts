import { SeasonController } from "@/controllers/season.controller";
import { Router } from "express";
import { Route } from "@/interfaces/route.interface";

export class SeasonRoute implements Route {

    public path: string = "/seasons"
    public router: Router = Router()
    public controller: SeasonController = new SeasonController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.controller.find);
    }
}

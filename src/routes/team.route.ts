import { TeamController } from "@/controllers/team.controller";
import { Router } from "express";
import { Route } from "@/interfaces/route.interface";

export class TeamRoute implements Route {

    public path: string = "/teams"
    public router: Router = Router()
    public controller: TeamController = new TeamController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.controller.find);
    }
}

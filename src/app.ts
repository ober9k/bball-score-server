import { Route } from "@/interfaces/route.interface";
import cors from "cors";
import express, { Application } from "express";

export class App {

    private static BasePath = "/api";
    private static BasePort = 5200;

    public app: Application;

    constructor(routes: Array<Route>) {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes(routes);
    }

    public listen(): void {
        this.app.listen(App.BasePort, () => {
            console.log(`Server running at http://localhost:${App.BasePort}/`);
        });
    }

    private initMiddlewares(): void {
        this.app.use(cors());
    }

    private initRoutes(routes: Array<Route>): void {
        routes.forEach((route: Route) => {
            this.app.use(App.BasePath, route.router);
        });
    }

}

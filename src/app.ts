import { dbConnect } from "@/database";
import { Route } from "@/interfaces/route.interface";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in .env");
    process.exit(1);
}

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

        dbConnect(ATLAS_URI as string)
            .then((client) => {
                this.app.locals.db = client.db("bballScore");

                this.app.listen(App.BasePort, () => {
                    console.log(`Server running at http://localhost:${App.BasePort}/`);
                });
            });

    }

    private initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }

    private initRoutes(routes: Array<Route>): void {
        routes.forEach((route: Route) => {
            this.app.use(App.BasePath, route.router);
        });
    }

}

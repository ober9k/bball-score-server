import { App } from "@/app";
import { PlayerRoute } from "@/routes/player.route";
import { SeasonRoute } from "@/routes/season.route";
import { TeamRoute } from "@/routes/team.route";
import * as dotenv from "dotenv";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable is defined");
    process.exit(1);
}

const routes = [
    new PlayerRoute(),
    new SeasonRoute(),
    new TeamRoute(),
];

const app = new App(routes);
      app.listen();

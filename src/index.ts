import { App } from "@/app";
import { PlayerRoute } from "@/routes/player.route";
import { SeasonRoute } from "@/routes/season.route";
import { TeamRoute } from "@/routes/team.route";

const routes = [
    new PlayerRoute(),
    new SeasonRoute(),
    new TeamRoute(),
];

const app = (new App(routes));
      app.listen();

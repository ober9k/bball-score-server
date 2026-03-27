import { authRoutes } from "@/routes/auth.routes";
import { divisionsRoutes } from "@/routes/divisions.routes";
import { playersRoutes } from "@/routes/players.routes";
import { seasonsRoutes } from "@/routes/seasons.routes";
import { standingsRoutes } from "@/routes/standings.routes";
import { statisticsRoutes } from "@/routes/statistics.routes";
import { teamsRoutes } from "@/routes/teams.routes";

export const routes = [
  authRoutes,
];

export const leagueRoutes = [
  divisionsRoutes,
  playersRoutes,
  seasonsRoutes,
  standingsRoutes,
  statisticsRoutes,
  teamsRoutes,
];

export const manageRoute = [
  /* TBD */
];

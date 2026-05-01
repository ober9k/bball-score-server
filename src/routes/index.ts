import { authRoutes } from "@/routes/auth.routes";
import { divisionsRoutes } from "@/routes/divisions.routes";
import { gamesRoutes } from "@/routes/games.routes";
import { leaguesRoutes } from "@/routes/league.routes";
import { playersRoutes } from "@/routes/players.routes";
import { seasonsRoutes } from "@/routes/seasons.routes";
import { teamsRoutes } from "@/routes/teams.routes";

export const routes = [
  authRoutes,
];

export const leagueRoutes = [
  leaguesRoutes,
  divisionsRoutes,
  gamesRoutes,
  playersRoutes,
  seasonsRoutes,
  teamsRoutes,
];

import { getPlayer, getPlayers, getPlayerStatisticsAverages, getPlayerStatisticsGames, getPlayerStatisticsTotals, getPlayerTeams } from "@/controllers/players.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // players (public)
  .get("/players", getPlayers)
  .get("/players/:id", [validateIdHandler], getPlayer)
  .get("/players/:id/teams", [validateIdHandler], getPlayerTeams)
  .get("/players/:id/statistics/averages", [validateIdHandler], getPlayerStatisticsAverages)
  .get("/players/:id/statistics/totals", [validateIdHandler], getPlayerStatisticsTotals)
  .get("/players/:id/statistics/games", [validateIdHandler], getPlayerStatisticsGames);

export { router as playersRoutes };

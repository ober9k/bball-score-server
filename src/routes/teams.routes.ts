import { getTeam, getTeamPlayers, getTeams, getTeamsOptions, getTeamStatisticsAverages, getTeamStatisticsTotals } from "@/controllers/teams.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // teams (public)
  .get("/teams", getTeams)
  .get("/teams/options", getTeamsOptions)
  .get("/teams/:id", [validateIdHandler], getTeam)
  .get("/teams/:id/players", [validateIdHandler], getTeamPlayers)
  .get("/teams/:id/statistics/averages", [validateIdHandler], getTeamStatisticsAverages)
  .get("/teams/:id/statistics/totals", [validateIdHandler], getTeamStatisticsTotals);

export { router as teamsRoutes };

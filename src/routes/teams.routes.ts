import { getTeam, getTeamPlayers, getTeams, getTeamsOptions, getTeamStatistics } from "@/controllers/teams.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // teams (public)
  .get("/teams", getTeams)
  .get("/teams/options", getTeamsOptions)
  .get("/teams/:id", [validateIdHandler], getTeam)
  .get("/teams/:id/players", [validateIdHandler], getTeamPlayers)
  .get("/teams/:id/statistics/:mode", [validateIdHandler], getTeamStatistics);

export { router as teamsRoutes };

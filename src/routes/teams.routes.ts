import { createTeam, getTeam, getTeamPlayers, getTeams, updateTeam } from "@/controllers/teams.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .get("/teams", getTeams)
  .post("/teams", [isAuthenticated], createTeam)
  .get("/teams/:id", getTeam)
  .put("/teams/:id", [isAuthenticated], updateTeam)
  .get("/teams/:id/players", getTeamPlayers);

export { router as teamsRoutes };

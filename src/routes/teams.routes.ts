import { createTeam, getTeam, getTeamPlayers, getTeams, updateTeam } from "@/controllers/teams.controller";
import { Router } from "express";

const router = Router()
  .get("/teams", getTeams)
  .post("/teams", createTeam)
  .get("/teams/:id", getTeam)
  .put("/teams/:id", updateTeam)
  .get("/teams/:id/players", getTeamPlayers);

export { router as teamsRoutes };

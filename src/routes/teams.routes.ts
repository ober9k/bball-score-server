import { TeamsController } from "@/controllers/teams.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const teamsController = new TeamsController();

const router = Router()
  // teams (public)
  .get("/teams", (req, res) => teamsController.getTeams(req, res))
  .get("/teams/options", (req, res) => teamsController.getTeamsOptions(req, res))
  .get("/teams/:id", [validateIdHandler], (req, res) => teamsController.getTeam(req, res))
  .get("/teams/:id/players", [validateIdHandler], (req, res) => teamsController.getTeamPlayers(req, res))
  .get("/teams/:id/statistics/:mode", [validateIdHandler], (req, res) => teamsController.getTeamStatistics(req, res));

export { router as teamsRoutes };

import { PlayersController } from "@/controllers/players.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const playersController = new PlayersController();

const router = Router()
  // players (public)
  .get("/players", (req, res) => playersController.getPlayers(req, res))
  .get("/players/:id", [validateIdHandler], (req, res) => playersController.getPlayer(req, res))
  .get("/players/:id/teams", [validateIdHandler], (req, res) => playersController.getPlayerTeams(req, res))
  .get("/players/:id/statistics/:mode", [validateIdHandler], (req, res) => playersController.getPlayerStatistics(req, res));

export { router as playersRoutes };

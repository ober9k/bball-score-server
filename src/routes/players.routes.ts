import { getPlayer, getPlayers, getPlayerStatistics, getPlayerTeams } from "@/controllers/players.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // players (public)
  .get("/players", getPlayers)
  .get("/players/:id", [validateIdHandler], getPlayer)
  .get("/players/:id/teams", [validateIdHandler], getPlayerTeams)
  .get("/players/:id/statistics/:mode", [validateIdHandler], getPlayerStatistics);

export { router as playersRoutes };

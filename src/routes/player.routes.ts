import { createPlayer, getPlayer, getPlayers, getPlayerTeams, updatePlayer } from "@/controllers/players.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .get("/players", getPlayers)
  .post("/players", [isAuthenticated], createPlayer)
  .get("/players/:id", getPlayer)
  .put("/players/:id", [isAuthenticated], updatePlayer)
  .get("/players/:id/teams", getPlayerTeams);

export { router as playersRoutes };

import { createPlayer, getPlayer, getPlayers, getPlayerTeams, updatePlayer } from "@/controllers/players.controller";
import { Router } from "express";

const router = Router()
  .get("/players", getPlayers)
  .post("/players", createPlayer)
  .get("/players/:id", getPlayer)
  .put("/players/:id", updatePlayer)
  .get("/players/:id/teams", getPlayerTeams);

export { router as playersRoutes };

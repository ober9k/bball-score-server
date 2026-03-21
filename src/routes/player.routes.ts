import { createPlayer, getPlayer, getPlayers, getPlayerTeams, updatePlayer } from "@/controllers/players.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/players", getPlayers)
  .post("/players", [isAuthenticated, isAuthorizedRole(authorizedRoles)], createPlayer)
  .get("/players/:id", getPlayer)
  .put("/players/:id", [isAuthenticated, isAuthorizedRole(authorizedRoles)], updatePlayer)
  .get("/players/:id/teams", getPlayerTeams);

export { router as playersRoutes };

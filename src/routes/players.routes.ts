import { createPlayer, getPlayer, getPlayers, getPlayerTeams, updatePlayer } from "@/controllers/players.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { playerValidationHandler } from "@/schemas/player";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // players
  .get("/players", getPlayers)
  .get("/players/:id", [validateIdHandler], getPlayer)
  .get("/players/:id/teams", [validateIdHandler], getPlayerTeams)
  // players (create/update)
  .post("/players", [...authorizedPaths, playerValidationHandler()], createPlayer)
  .put("/players/:id", [...authorizedPaths, validateIdHandler, playerValidationHandler()], updatePlayer);

export { router as playersRoutes };

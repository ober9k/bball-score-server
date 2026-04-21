import { createGame, getGame, getGames, updateGame } from "@/controllers/games.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { fixDate, gameValidationHandler } from "@/schemas/game";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/games", getGames)
  .get("/games/:gameId", getGame)
  .post("/games", [isAuthenticated, isAuthorizedRole(authorizedRoles), fixDate, gameValidationHandler()], createGame)
  .put("/games/:gameId", [isAuthenticated, isAuthorizedRole(authorizedRoles), fixDate, gameValidationHandler()], updateGame)

export { router as gamesRoutes };

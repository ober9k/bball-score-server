import { createGame, getBriefGame, getBriefGames, getGame, getGames, updateGame } from "@/controllers/games.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { fixDate, gameValidationHandler } from "@/schemas/game";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // games
  .get("/games", getGames)
  .get("/games/:id", [validateIdHandler], getGame)
  // games/manage (create/update)
  .get("/manage/games", [...authorizedPaths], getBriefGames)
  .get("/manage/games/:id", [...authorizedPaths, validateIdHandler], getBriefGame)
  .post("/manage/games", [...authorizedPaths, fixDate, gameValidationHandler()], createGame)
  .put("/manage/games/:id", [...authorizedPaths, validateIdHandler, fixDate, gameValidationHandler()], updateGame)

export { router as gamesRoutes };

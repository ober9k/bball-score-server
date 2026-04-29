import {
  createPlayer,
  getBriefPlayer,
  getBriefPlayers,
  getPlayer,
  getPlayers,
  getPlayerStatisticsAverages,
  getPlayerStatisticsGames,
  getPlayerStatisticsTotals,
  getPlayerTeams,
  updatePlayer
} from "@/controllers/players.controller";
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
  .get("/players/:id/statistics/averages", [validateIdHandler], getPlayerStatisticsAverages)
  .get("/players/:id/statistics/totals", [validateIdHandler], getPlayerStatisticsTotals)
  .get("/players/:id/statistics/games", [validateIdHandler], getPlayerStatisticsGames)
  // players/manage (create/update)
  .get("/manage/players", [...authorizedPaths], getBriefPlayers)
  .get("/manage/players/:id", [...authorizedPaths, validateIdHandler], getBriefPlayer)
  .post("/manage/players", [...authorizedPaths, playerValidationHandler()], createPlayer)
  .put("/manage/players/:id", [...authorizedPaths, validateIdHandler, playerValidationHandler()], updatePlayer);

export { router as playersRoutes };

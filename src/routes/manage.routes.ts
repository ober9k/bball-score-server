import { createDivision, getBriefDivision, getBriefDivisions, updateDivision } from "@/controllers/divisions.controller";
import { createGame, getBriefGame, getBriefGames, updateGame } from "@/controllers/games.controller";
import { createPlayer, getBriefPlayer, getBriefPlayers, updatePlayer } from "@/controllers/players.controller";
import { createSeason, getBriefSeason, getBriefSeasons, updateSeason } from "@/controllers/seasons.controller";
import { createTeam, getBriefTeam, getBriefTeams, updateTeam } from "@/controllers/teams.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { divisionValidationHandler } from "@/schemas/division";
import { fixDate, gameValidationHandler } from "@/schemas/game";
import { playerValidationHandler } from "@/schemas/player";
import { seasonValidationHandler } from "@/schemas/season";
import { teamValidationHandler } from "@/schemas/team";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // force authorization check
  .use([...authorizedPaths])
  // seasons (protected)
  .get("/seasons", getBriefSeasons)
  .get("/seasons/:id", [validateIdHandler], getBriefSeason)
  .post("/seasons", [seasonValidationHandler()], createSeason)
  .put("/seasons/:id", [validateIdHandler, seasonValidationHandler()], updateSeason)
  // divisions (protected)
  .get("/divisions", getBriefDivisions)
  .get("/divisions/:id", [validateIdHandler], getBriefDivision)
  .post("/divisions", [divisionValidationHandler()], createDivision)
  .put("/divisions/:id", [validateIdHandler, divisionValidationHandler()], updateDivision)
  // teams (protected)
  .get("/teams", getBriefTeams)
  .get("/teams/:id", [validateIdHandler], getBriefTeam)
  .post("/teams", [teamValidationHandler()], createTeam)
  .put("/teams/:id", [validateIdHandler, teamValidationHandler()], updateTeam)
  // players (protected)
  .get("/players", getBriefPlayers)
  .get("/players/:id", [validateIdHandler], getBriefPlayer)
  .post("/players", [playerValidationHandler()], createPlayer)
  .put("/players/:id", [validateIdHandler, playerValidationHandler()], updatePlayer)
  // games (protected)
  .get("/games", getBriefGames)
  .get("/games/:id", [validateIdHandler], getBriefGame)
  .post("/games", [fixDate, gameValidationHandler()], createGame)
  .put("/games/:id", [validateIdHandler, fixDate, gameValidationHandler()], updateGame);

export { router as manageRoutes };

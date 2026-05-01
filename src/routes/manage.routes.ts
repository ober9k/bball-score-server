import { DivisionsController } from "@/controllers/divisions.controller";
import { GamesController } from "@/controllers/games.controller";
import { PlayersController } from "@/controllers/players.controller";
import { SeasonsController } from "@/controllers/seasons.controller";
import { TeamsController } from "@/controllers/teams.controller";
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

const seasonController = new SeasonsController();
const divisionController = new DivisionsController();
const teamsController = new TeamsController();
const playersController = new PlayersController();
const gamesController = new GamesController();

const router = Router()
  // force authorization check
  .use([...authorizedPaths])
  // seasons (protected)
  .get("/seasons", (req, res) => seasonController.getBriefSeasons(req, res))
  .get("/seasons/:id", [validateIdHandler], (req, res) => seasonController.getBriefSeason(req, res))
  .post("/seasons", [seasonValidationHandler()], (req, res) => seasonController.createSeason(req, res))
  .put("/seasons/:id", [validateIdHandler, seasonValidationHandler()], (req, res) => seasonController.updateSeason(req, res))
  // divisions (protected)
  .get("/divisions", (req, res) => divisionController.getBriefDivisions(req, res))
  .get("/divisions/:id", [validateIdHandler], (req, res) => divisionController.getBriefDivision(req, res))
  .post("/divisions", [divisionValidationHandler()], (req, res) => divisionController.createDivision(req, res))
  .put("/divisions/:id", [validateIdHandler, divisionValidationHandler()], (req, res) => divisionController.updateDivision(req, res))
  // teams (protected)
  .get("/teams", (req, res) => teamsController.getBriefTeams(req, res))
  .get("/teams/:id", [validateIdHandler], (req, res) => teamsController.getBriefTeam(req, res))
  .post("/teams", [teamValidationHandler()], (req, res) => teamsController.createTeam(req, res))
  .put("/teams/:id", [validateIdHandler, teamValidationHandler()], (req, res) => teamsController.updateTeam(req, res))
  // players (protected)
  .get("/players", (req, res) => playersController.getBriefPlayers(req, res))
  .get("/players/:id", [validateIdHandler], (req, res) => playersController.getBriefPlayer(req, res))
  .post("/players", [playerValidationHandler()], (req, res) => playersController.createPlayer(req, res))
  .put("/players/:id", [validateIdHandler, playerValidationHandler()], (req, res) => playersController.updatePlayer(req, res))
  // games (protected)
  .get("/games", (req, res) => gamesController.getBriefGames(req, res))
  .get("/games/:id", [validateIdHandler], (req, res) => gamesController.getBriefGame(req, res))
  .post("/games", [fixDate, gameValidationHandler()], (req, res) => gamesController.createGame(req, res))
  .put("/games/:id", [validateIdHandler, fixDate, gameValidationHandler()], (req, res) => gamesController.updateGame(req, res));

export { router as manageRoutes };

import { DivisionsController } from "@/controllers/divisions.controller";
import { GamesController } from "@/controllers/games.controller";
import { LeagueController } from "@/controllers/league.controller";
import { PlayersController } from "@/controllers/players.controller";
import { SeasonsController } from "@/controllers/seasons.controller";
import { TeamsController } from "@/controllers/teams.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const leagueController = new LeagueController();
const seasonController = new SeasonsController();
const divisionController = new DivisionsController();
const teamsController = new TeamsController();
const playersController = new PlayersController();
const gamesController = new GamesController();

const router = Router()
  // league (public)
  .get("/standings", (req, res) => leagueController.getStandings(req, res))
  .get("/statistics/:mode", (req, res) => leagueController.getStatistics(req, res))
  .get("/leaders", (req, res) => leagueController.getLeaders(req, res))
  // seasons (public)
  .get("/seasons", (req, res) => seasonController.getSeasons(req, res))
  .get("/seasons/options", (req, res) => seasonController.getSeasonsOptions(req, res))
  .get("/seasons/:id", [validateIdHandler], (req, res) => seasonController.getSeason(req, res))
  .get("/seasons/:id/divisions", [validateIdHandler], (req, res) => seasonController.getSeasonDivisions(req, res))
  // divisions (public)
  .get("/divisions", (req, res) => divisionController.getDivisions(req, res))
  .get("/divisions/options", (req, res) => divisionController.getDivisionsOptions(req, res))
  .get("/divisions/:id", [validateIdHandler], (req, res) => divisionController.getDivision(req, res))
  .get("/divisions/:id/teams", [validateIdHandler], (req, res) => divisionController.getDivisionTeams(req, res))
  // teams (public)
  .get("/teams", (req, res) => teamsController.getTeams(req, res))
  .get("/teams/options", (req, res) => teamsController.getTeamsOptions(req, res))
  .get("/teams/:id", [validateIdHandler], (req, res) => teamsController.getTeam(req, res))
  .get("/teams/:id/players", [validateIdHandler], (req, res) => teamsController.getTeamPlayers(req, res))
  .get("/teams/:id/statistics/:mode", [validateIdHandler], (req, res) => teamsController.getTeamStatistics(req, res))
  // players (public)
  .get("/players", (req, res) => playersController.getPlayers(req, res))
  .get("/players/:id", [validateIdHandler], (req, res) => playersController.getPlayer(req, res))
  .get("/players/:id/teams", [validateIdHandler], (req, res) => playersController.getPlayerTeams(req, res))
  .get("/players/:id/statistics/:mode", [validateIdHandler], (req, res) => playersController.getPlayerStatistics(req, res))
  // games (public)
  .get("/games", (req, res) => gamesController.getGames(req, res))
  .get("/games/:id", [validateIdHandler], (req, res) => gamesController.getGame(req, res));

export { router as leagueRoutes };

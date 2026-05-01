import { LeagueController } from "@/controllers/league.controller";
import { Router } from "express";

const leagueController = new LeagueController();

const router = Router()
  .get("/standings", (req, res) => leagueController.getStandings(req, res))
  .get("/statistics/:mode", (req, res) => leagueController.getStatistics(req, res));

export { router as leaguesRoutes };

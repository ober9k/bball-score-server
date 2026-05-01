import { GamesController } from "@/controllers/games.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const gamesController = new GamesController();

const router = Router()
  // games (public)
  .get("/games", (req, res) => gamesController.getGames(req, res))
  .get("/games/:id", [validateIdHandler], (req, res) => gamesController.getGame(req, res));

export { router as gamesRoutes };

import { getGame, getGames } from "@/controllers/games.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // games (public)
  .get("/games", getGames)
  .get("/games/:id", [validateIdHandler], getGame);

export { router as gamesRoutes };

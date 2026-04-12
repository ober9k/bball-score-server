import { getGame, getGames } from "@/controllers/games.controller";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/games", getGames)
  .get("/games/:gameId", getGame)

export { router as gamesRoutes };

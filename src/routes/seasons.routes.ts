import { createSeason, getSeason, getSeasonDivisions, getSeasons, updateSeason } from "@/controllers/seasons.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .get("/seasons", getSeasons)
  .post("/seasons", [isAuthenticated], createSeason)
  .get("/seasons/:id", getSeason)
  .put("/seasons/:id", [isAuthenticated], updateSeason)
  .get("/seasons/:id/players", getSeasonDivisions);

export { router as seasonsRoutes };

import { createSeason, getSeason, getSeasonDivisions, getSeasons, updateSeason } from "@/controllers/seasons.controller";
import { Router } from "express";

const router = Router()
  .get("/seasons", getSeasons)
  .post("/seasons", createSeason)
  .get("/seasons/:id", getSeason)
  .put("/seasons/:id", updateSeason)
  .get("/seasons/:id/players", getSeasonDivisions);

export { router as seasonsRoutes };

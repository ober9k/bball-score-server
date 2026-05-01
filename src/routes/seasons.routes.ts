import { getSeason, getSeasonDivisions, getSeasons, getSeasonsOptions } from "@/controllers/seasons.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // seasons (public)
  .get("/seasons", getSeasons)
  .get("/seasons/options", getSeasonsOptions)
  .get("/seasons/:id", [validateIdHandler], getSeason)
  .get("/seasons/:id/divisions", [validateIdHandler], getSeasonDivisions);

export { router as seasonsRoutes };

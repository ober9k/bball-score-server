import { SeasonsController } from "@/controllers/seasons.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const seasonController = new SeasonsController();

const router = Router()
  // seasons (public)
  .get("/seasons", (req, res) => seasonController.getSeasons(req, res))
  .get("/seasons/options", (req, res) => seasonController.getSeasonsOptions(req, res))
  .get("/seasons/:id", [validateIdHandler], (req, res) => seasonController.getSeason(req, res))
  .get("/seasons/:id/divisions", [validateIdHandler], (req, res) => seasonController.getSeasonDivisions(req, res))

export { router as seasonsRoutes };

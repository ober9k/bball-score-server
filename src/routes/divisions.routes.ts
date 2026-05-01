import { getDivision, getDivisions, getDivisionsOptions, getDivisionTeams } from "@/controllers/divisions.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const router = Router()
  // divisions (public)
  .get("/divisions", getDivisions)
  .get("/divisions/options", getDivisionsOptions)
  .get("/divisions/:id", [validateIdHandler], getDivision)
  .get("/divisions/:id/teams", [validateIdHandler], getDivisionTeams);

export { router as divisionsRoutes };

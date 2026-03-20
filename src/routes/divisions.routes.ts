import { createDivision, getDivision, getDivisions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { Router } from "express";

const router = Router()
  .get("/divisions", getDivisions)
  .post("/divisions", createDivision)
  .get("/divisions/:id", getDivision)
  .put("/divisions/:id", updateDivision)
  .get("/divisions/:id/players", getDivisionTeams);

export { router as divisionsRoutes };

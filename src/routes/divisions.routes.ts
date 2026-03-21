import { createDivision, getDivision, getDivisions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";

const router = Router()
  .get("/divisions", getDivisions)
  .post("/divisions", [isAuthenticated], createDivision)
  .get("/divisions/:id", getDivision)
  .put("/divisions/:id", [isAuthenticated], updateDivision)
  .get("/divisions/:id/players", getDivisionTeams);

export { router as divisionsRoutes };

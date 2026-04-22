import { createSeason, getSeason, getSeasonDivisions, getSeasons, getSeasonsOptions, updateSeason } from "@/controllers/seasons.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { seasonValidationHandler } from "@/schemas/season";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // seasons
  .get("/seasons", getSeasons)
  .get("/seasons/options", getSeasonsOptions)
  .get("/seasons/:id", getSeason)
  .get("/seasons/:id/divisions", getSeasonDivisions)
  // seasons (create/update)
  .post("/seasons", [...authorizedPaths, seasonValidationHandler()], createSeason)
  .put("/seasons/:id", [...authorizedPaths, seasonValidationHandler()], updateSeason);

export { router as seasonsRoutes };

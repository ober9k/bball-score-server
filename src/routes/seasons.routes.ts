import { createSeason, getSeason, getSeasonDivisions, getSeasons, updateSeason } from "@/controllers/seasons.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/seasons", getSeasons)
  .post("/seasons", [isAuthenticated, isAuthorizedRole(authorizedRoles)], createSeason)
  .get("/seasons/:id", getSeason)
  .put("/seasons/:id", [isAuthenticated, isAuthorizedRole(authorizedRoles)], updateSeason)
  .get("/seasons/:id/players", getSeasonDivisions);

export { router as seasonsRoutes };

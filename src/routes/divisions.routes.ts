import { createDivision, getDivision, getDivisions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Router } from "express";
import { Role } from "@/types/user/role";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/divisions", getDivisions)
  .post("/divisions", [isAuthenticated, isAuthorizedRole(authorizedRoles)], createDivision)
  .get("/divisions/:id", getDivision)
  .put("/divisions/:id", [isAuthenticated, isAuthorizedRole(authorizedRoles)], updateDivision)
  .get("/divisions/:id/players", getDivisionTeams);

export { router as divisionsRoutes };

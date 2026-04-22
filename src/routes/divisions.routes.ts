import { createDivision, getDivision, getDivisions, getDivisionsOptions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { divisionValidationHandler } from "@/schemas/division";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // divisions
  .get("/divisions", getDivisions)
  .get("/divisions/:id", getDivision)
  .get("/divisions/options", getDivisionsOptions)
  .get("/divisions/:id/teams", getDivisionTeams)
  // divisions (create/update)
  .post("/divisions", [...authorizedPaths, divisionValidationHandler()], createDivision)
  .put("/divisions/:id", [...authorizedPaths, divisionValidationHandler()], updateDivision);

export { router as divisionsRoutes };

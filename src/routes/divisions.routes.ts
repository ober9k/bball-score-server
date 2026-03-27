import { createDivision, getDivision, getDivisions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { divisionValidationHandler } from "@/schemas/division";
import { Router } from "express";
import { Role } from "@/types/user/role";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/divisions", getDivisions)
  .post("/divisions", [isAuthenticated, isAuthorizedRole(authorizedRoles), divisionValidationHandler()], createDivision)
  .get("/divisions/:divisionId", getDivision)
  .put("/divisions/:divisionId", [isAuthenticated, isAuthorizedRole(authorizedRoles), divisionValidationHandler()], updateDivision)
  .get("/divisions/:divisionId/teams", getDivisionTeams);

export { router as divisionsRoutes };

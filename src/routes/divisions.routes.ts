import { createDivision, getBriefDivision, getBriefDivisions, getDivision, getDivisions, getDivisionsOptions, getDivisionTeams, updateDivision } from "@/controllers/divisions.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { divisionValidationHandler } from "@/schemas/division";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // divisions
  .get("/divisions", getDivisions)
  .get("/divisions/options", getDivisionsOptions)
  .get("/divisions/:id", [validateIdHandler], getDivision)
  .get("/divisions/:id/teams", [validateIdHandler], getDivisionTeams)
  // divisions/manage (create/update)
  .get("/manage/divisions", [...authorizedPaths], getBriefDivisions)
  .get("/manage/divisions/:id", [...authorizedPaths, validateIdHandler], getBriefDivision)
  .post("/manage/divisions", [...authorizedPaths, divisionValidationHandler()], createDivision)
  .put("/manage/divisions/:id", [...authorizedPaths, validateIdHandler, divisionValidationHandler()], updateDivision);

export { router as divisionsRoutes };

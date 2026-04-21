import {
  createTeam,
  getTeam,
  getTeamPlayers,
  getTeams,
  getTeamsOptions,
  updateTeam
} from "@/controllers/teams.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { teamValidationHandler } from "@/schemas/team";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/teams", getTeams)
  .get("/teams/options", getTeamsOptions)
  .post("/teams", [isAuthenticated, isAuthorizedRole(authorizedRoles), teamValidationHandler()], createTeam)
  .get("/teams/:teamId", getTeam)
  .put("/teams/:teamId", [isAuthenticated, isAuthorizedRole(authorizedRoles), teamValidationHandler()], updateTeam)
  .get("/teams/:teamId/players", getTeamPlayers);

export { router as teamsRoutes };

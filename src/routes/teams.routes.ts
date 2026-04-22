import { createTeam, getTeam, getTeamPlayers, getTeams, getTeamsOptions, getTeamStatistics, updateTeam } from "@/controllers/teams.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { teamValidationHandler } from "@/schemas/team";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // teams
  .get("/teams", getTeams)
  .get("/teams/options", getTeamsOptions)
  .get("/teams/:id", getTeam)
  .get("/teams/:id/players", getTeamPlayers)
  .get("/teams/:id/statistics", getTeamStatistics)
  // teams (create/update)
  .post("/teams", [...authorizedPaths, teamValidationHandler()], createTeam)
  .put("/teams/:id", [...authorizedPaths, teamValidationHandler()], updateTeam)

export { router as teamsRoutes };

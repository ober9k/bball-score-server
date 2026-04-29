import {
  createTeam,
  getBriefTeam,
  getBriefTeams,
  getTeam,
  getTeamPlayers,
  getTeams,
  getTeamsOptions,
  getTeamStatisticsAverages,
  getTeamStatisticsTotals,
  updateTeam
} from "@/controllers/teams.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { teamValidationHandler } from "@/schemas/team";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];
const authorizedPaths = [isAuthenticated, isAuthorizedRole(authorizedRoles)];

const router = Router()
  // teams
  .get("/teams", getTeams)
  .get("/teams/options", getTeamsOptions)
  .get("/teams/:id", [validateIdHandler], getTeam)
  .get("/teams/:id/players", [validateIdHandler], getTeamPlayers)
  .get("/teams/:id/statistics/averages", [validateIdHandler], getTeamStatisticsAverages)
  .get("/teams/:id/statistics/totals", [validateIdHandler], getTeamStatisticsTotals)
  // teams/manage (create/update)
  .get("/manage/teams", [...authorizedPaths], getBriefTeams)
  .get("/manage/teams/:id", [...authorizedPaths, validateIdHandler], getBriefTeam)
  .post("/manage/teams", [...authorizedPaths, teamValidationHandler()], createTeam)
  .put("/manage/teams/:id", [...authorizedPaths, validateIdHandler, teamValidationHandler()], updateTeam)

export { router as teamsRoutes };

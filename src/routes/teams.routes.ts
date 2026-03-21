import { createTeam, getTeam, getTeamPlayers, getTeams, updateTeam } from "@/controllers/teams.controller";
import { isAuthorizedRole } from "@/middlewares/auth-role";
import { isAuthenticated } from "@/middlewares/auth-token";
import { Role } from "@/types/user/role";
import { Router } from "express";

const authorizedRoles = [Role.ADMINISTRATOR, Role.MANAGER];

const router = Router()
  .get("/teams", getTeams)
  .post("/teams", [isAuthenticated, isAuthorizedRole(authorizedRoles)], createTeam)
  .get("/teams/:id", getTeam)
  .put("/teams/:id", [isAuthenticated, isAuthorizedRole(authorizedRoles)], updateTeam)
  .get("/teams/:id/players", getTeamPlayers);

export { router as teamsRoutes };

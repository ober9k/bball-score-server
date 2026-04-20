import { getLocalLeague } from "@/services/league.service";
import { findTeamById, findTeamPlayers, findTeams, saveTeam, saveTeamById } from "@/services/team.service";
import type { TeamData } from "@/types/team";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getTeamId(req: Request): number {
  return +req.params.teamId;
}

export async function getTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findTeams()
    );
}

export async function getTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamById(getTeamId(req))
    );
}

export async function createTeam(req: Request, res: Response) {
  const teamData: TeamData = {
    name: req.body.name,
    shortName: req.body.shortName,
    active: req.body.active,
    archived: req.body.archived,
    divisionId: req.body.divisionId,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveTeam(teamData)
    );
}

export async function updateTeam(req: Request, res: Response) {
  const teamData: TeamData = {
    name: req.body.name,
    shortName: req.body.shortName,
    active: req.body.active,
    archived: req.body.archived,
    divisionId: req.body.divisionId,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveTeamById(getTeamId(req), teamData)
    );
}

export async function getTeamPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamPlayers(getTeamId(req))
    );
}

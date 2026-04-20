import { getLocalLeague } from "@/services/league.service";
import { findTeamById, findTeamPlayers, findTeams, saveTeam, saveTeamById } from "@/services/team.service";
import type { TeamData } from "@/types/team";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getTeamId(req: Request): number {
  return +req.params.teamId;
}

function getTeamData(req: Request, res: Response): TeamData {
  const { name, shortName, divisionId, active, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, shortName, divisionId, active, archived, leagueId,
  };
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
  return res
    .status(StatusCodes.CREATED)
    .json(
      await saveTeam(getTeamData(req, res))
    );
}


export async function updateTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveTeamById(getTeamId(req), getTeamData(req, res))
    );
}

export async function getTeamPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamPlayers(getTeamId(req))
    );
}

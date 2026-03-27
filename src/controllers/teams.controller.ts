import { findTeamById, findTeamPlayers, findTeams } from "@/services/team.service";
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
  return res
    .status(StatusCodes.OK)
    .json({
      request: "createTeam",
    });
}

export async function updateTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "updateTeam",
    });
}

export async function getTeamPlayers(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamPlayers(getTeamId(req))
    );
}

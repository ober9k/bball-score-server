import { findDivisionById, findDivisions, findDivisionTeams, saveDivision, saveDivisionById } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import type { DivisionData } from "@/types/division";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getDivisionId(req: Request): number {
  return +req.params.divisionId;
}

function getDivisionData(req: Request, res: Response): DivisionData {
  const { name, seasonId, active, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, active, seasonId, archived, leagueId,
  };
}

export async function getDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisions()
    );
}

export async function getDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionById(getDivisionId(req))
    );
}

export async function createDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await saveDivision(getDivisionData(req, res))
    );
}

export async function updateDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveDivisionById(getDivisionId(req), getDivisionData(req, res))
    );
}

export async function getDivisionTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionTeams(getDivisionId(req))
    );
}

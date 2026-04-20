import { findDivisionById, findDivisions, findDivisionTeams, saveDivision, saveDivisionById } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import type { DivisionData } from "@/types/division";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getDivisionId(req: Request): number {
  return +req.params.divisionId;
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
  const divisionData: DivisionData = {
    name: req.body.name,
    active: req.body.active,
    archived: req.body.archived,
    seasonId: req.body.seasonId,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveDivision(divisionData)
    );
}

export async function updateDivision(req: Request, res: Response) {
  const divisionData: DivisionData = {
    name: req.body.name,
    active: req.body.active,
    archived: req.body.archived,
    seasonId: req.body.seasonId,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveDivisionById(getDivisionId(req), divisionData)
    );
}

export async function getDivisionTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionTeams(getDivisionId(req))
    );
}

import { findAll, findAllAsOptions, findById, findTeamsByDivisionId, save, saveById } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import type { DivisionData } from "@/types/division";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getDivisionId(req: Request): number {
  return +req.params.id;
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
      await findAll()
    );
}

export async function getDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findById(getDivisionId(req))
    );
}

export async function getDivisionsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAllAsOptions()
    );
}

export async function createDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await save(getDivisionData(req, res))
    );
}

export async function updateDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveById(getDivisionId(req), getDivisionData(req, res))
    );
}

export async function getDivisionTeams(req: Request, res: Response) {
  await findById(getDivisionId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamsByDivisionId(getDivisionId(req))
    );
}

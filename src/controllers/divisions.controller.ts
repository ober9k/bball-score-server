import { DivisionService, findTeamsByDivisionId } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import type { BriefDivisionData } from "@/types/division";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getDivisionId(req: Request): number {
  return +req.params.id;
}

function getDivisionData(req: Request, res: Response): BriefDivisionData {
  const { name, seasonId, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res); /* overwrite any leagueId sent by the front-end data */

  return {
    name, seasonId, activated, archived, leagueId,
  };
}

export async function getDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).findAll()
    );
}

export async function getDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).findById(getDivisionId(req))
    );
}

export async function getDivisionsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).findOptions()
    );
}

export async function getBriefDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).findAll(true)
    );
}

export async function getBriefDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).findById(getDivisionId(req), true)
    );
}

export async function createDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await (new DivisionService()).save(getDivisionData(req, res))
    );
}

export async function updateDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new DivisionService()).saveById(getDivisionId(req), getDivisionData(req, res))
    );
}

export async function getDivisionTeams(req: Request, res: Response) {
  await (new DivisionService()).findById(getDivisionId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findTeamsByDivisionId(getDivisionId(req))
    );
}

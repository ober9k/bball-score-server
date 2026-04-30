import { created, ok } from "@/controllers/base.controller";
import { DivisionService, findTeamsByDivisionId } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import type { BriefDivision, BriefDivisionData, Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { Team } from "@/types/team";
import type { Request, Response } from "express";

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
  const data = await (new DivisionService()).findAll() as Division[];
  return ok<Division[]>(res, data);
}

export async function getDivision(req: Request, res: Response) {
  const data = await (new DivisionService()).findById(getDivisionId(req)) as Division;
  return ok<Division>(res, data);
}

export async function getBriefDivisions(req: Request, res: Response) {
  const data = await (new DivisionService()).findAll(true) as BriefDivision[];
  return ok<BriefDivision[]>(res, data);
}

export async function getBriefDivision(req: Request, res: Response) {
  const data = await (new DivisionService()).findById(getDivisionId(req), true) as BriefDivision;
  return ok<BriefDivision>(res, data);
}

export async function createDivision(req: Request, res: Response) {
  const data = await (new DivisionService()).save(getDivisionData(req, res));
  return created<BriefDivision>(res, data);
}

export async function updateDivision(req: Request, res: Response) {
  const data = await (new DivisionService()).saveById(getDivisionId(req), getDivisionData(req, res));
  return ok<BriefDivision>(res, data);
}

export async function getDivisionsOptions(req: Request, res: Response) {
  const data = await (new DivisionService()).findOptions();
  return ok<Option[]>(res, data);
}

export async function getDivisionTeams(req: Request, res: Response) {
  await (new DivisionService()).findById(getDivisionId(req)); /* trigger an initial failure if not found */

  const data = await findTeamsByDivisionId(getDivisionId(req));
  return ok<Team[]>(res, data);
}

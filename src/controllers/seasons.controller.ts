import { created, ok } from "@/controllers/base.controller";
import { getLocalLeague } from "@/services/league.service";
import { findDivisionsBySeasonId, SeasonService } from "@/services/season.service";
import type { Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { BriefSeason, BriefSeasonData, Season } from "@/types/season";
import type { Request, Response } from "express";

function getSeasonId(req: Request): number {
  return +req.params.id;
}

function getSeasonData(req: Request, res: Response): BriefSeasonData {
  const { name, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res); /* overwrite any leagueId sent by the front-end data */

  return {
    name, activated, archived, leagueId,
  };
}

export async function getSeasons(req: Request, res: Response) {
  const data = await (new SeasonService()).findAll() as Season[];
  return ok<Season[]>(res, data);
}

export async function getSeason(req: Request, res: Response) {
  const data = await (new SeasonService()).findById(getSeasonId(req)) as Season;
  return ok<Season>(res, data);
}

export async function getBriefSeasons(req: Request, res: Response) {
  const data = await (new SeasonService()).findAll(true) as BriefSeason[];
  return ok<BriefSeason[]>(res, data);
}

export async function getBriefSeason(req: Request, res: Response) {
  const data = await (new SeasonService()).findById(getSeasonId(req), true) as BriefSeason;
  return ok<BriefSeason>(res, data);
}

export async function createSeason(req: Request, res: Response) {
  const data = await (new SeasonService()).save(getSeasonData(req, res));
  return created<BriefSeason>(res, data);
}

export async function updateSeason(req: Request, res: Response) {
  const data = await (new SeasonService()).saveById(getSeasonId(req), getSeasonData(req, res));
  return ok<BriefSeason>(res, data);
}

export async function getSeasonsOptions(req: Request, res: Response) {
  const data = await (new SeasonService()).findOptions();
  return ok<Option[]>(res, data);
}

export async function getSeasonDivisions(req: Request, res: Response) {
  await (new SeasonService()).findById(getSeasonId(req)); /* trigger an initial failure if not found */

  const data = await findDivisionsBySeasonId(getSeasonId(req));
  return ok<Division[]>(res, data);
}

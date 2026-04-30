import { getLocalLeague } from "@/services/league.service";
import { findDivisionsBySeasonId, SeasonService } from "@/services/season.service";
import type { BriefSeasonData } from "@/types/season";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getSeasonId(req: Request): number {
  return +req.params.id;
}

function getSeasonData(req: Request, res: Response): BriefSeasonData {
  const { name, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, activated, archived,
  };
}

export async function getSeasons(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).findAll()
    );
}

export async function getSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).findById(getSeasonId(req))
    );
}

export async function getSeasonsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).findOptions()
    );
}

export async function getBriefSeasons(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).findAll(true),
    );
}

export async function getBriefSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).findById(getSeasonId(req), true)
    );
}

export async function createSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await (new SeasonService()).save(getSeasonData(req, res))
    );
}

export async function updateSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new SeasonService()).saveById(getSeasonId(req), getSeasonData(req, res))
    );
}

export async function getSeasonDivisions(req: Request, res: Response) {
  await (new SeasonService()).findById(getSeasonId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionsBySeasonId(getSeasonId(req))
    );
}

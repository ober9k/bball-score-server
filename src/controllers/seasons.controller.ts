import { getLocalLeague } from "@/services/league.service";
import { findAll, findAllAsOptions, findBriefAll, findBriefById, findById, findDivisionsBySeasonId, save, saveById } from "@/services/season.service";
import type { SeasonData } from "@/types/season";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getSeasonId(req: Request): number {
  return +req.params.id;
}

function getSeasonData(req: Request, res: Response): SeasonData {
  const { name, active, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, active, archived, leagueId,
  };
}

export async function getSeasons(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAll()
    );
}

export async function getSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findById(getSeasonId(req))
    );
}

export async function getSeasonsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAllAsOptions()
    );
}

export async function getBriefSeasons(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefAll()
    );
}

export async function getBriefSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefById(getSeasonId(req))
    );
}

export async function createSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await save(getSeasonData(req, res))
    );
}

export async function updateSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveById(getSeasonId(req), getSeasonData(req, res))
    );
}

export async function getSeasonDivisions(req: Request, res: Response) {
  await findById(getSeasonId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionsBySeasonId(getSeasonId(req))
    );
}

import { getLocalLeague } from "@/services/league.service";
import {
  findSeasonById,
  findSeasonDivisions,
  findSeasons,
  findSeasonsOptions,
  saveSeason,
  saveSeasonById
} from "@/services/season.service";
import type { SeasonData } from "@/types/season";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getSeasonId(req: Request): number {
  return +req.params.seasonId;
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
      await findSeasons()
    );
}

export async function getSeasonsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasonsOptions()
    );
}

export async function getSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasonById(getSeasonId(req))
    );
}

export async function createSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await saveSeason(getSeasonData(req, res))
    );
}

export async function updateSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveSeasonById(getSeasonId(req), getSeasonData(req, res))
    );
}

export async function getSeasonDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasonDivisions(getSeasonId(req))
    );
}

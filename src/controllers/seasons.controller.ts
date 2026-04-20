import { getLocalLeague } from "@/services/league.service";
import { findSeasonById, findSeasonDivisions, findSeasons, saveSeason, saveSeasonById } from "@/services/season.service";
import type { SeasonData } from "@/types/season";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getSeasonId(req: Request): number {
  return +req.params.seasonId;
}

export async function getSeasons(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasons()
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
  const seasonData: SeasonData = {
    name: req.body.name,
    active: req.body.active,
    archived: req.body.archived,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveSeason(seasonData)
    );
}

export async function updateSeason(req: Request, res: Response) {
  const seasonData: SeasonData = {
    name: req.body.name,
    active: req.body.active,
    archived: req.body.archived,
    leagueId: getLocalLeague(res).id,
  };

  return res
    .status(StatusCodes.OK)
    .json(
      await saveSeasonById(getSeasonId(req), seasonData)
    );
}

export async function getSeasonDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasonDivisions(getSeasonId(req))
    );
}

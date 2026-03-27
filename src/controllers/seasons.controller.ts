import { findSeasonById, findSeasonDivisions, findSeasons } from "@/services/season.service";
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
  return res
    .status(StatusCodes.OK)
    .json({
      request: "createSeason",
    });
}

export async function updateSeason(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "updateSeason",
    });
}

export async function getSeasonDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findSeasonDivisions(getSeasonId(req))
    );
}

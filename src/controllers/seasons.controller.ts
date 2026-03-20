import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getSeasons = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getSeasons", data: "season",
  });
}

export const getSeason = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getSeason", data: "season",
  });
}

export const createSeason = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "createSeason", data: "season",
  });
}

export const updateSeason = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "updateSeason", data: "season",
  });
}

export const getSeasonDivisions = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getSeasonDivisions", data: "division[]",
  });
}

import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getTeams = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getTeams", data: "team",
  });
}

export const getTeam = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getTeam", data: "team",
  });
}

export const createTeam = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "createTeam", data: "team",
  });
}

export const updateTeam = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "updateTeam", data: "team",
  });
}

export const getTeamPlayers = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getTeamPlayers", data: "player[]",
  });
}

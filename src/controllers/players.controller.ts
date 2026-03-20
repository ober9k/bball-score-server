import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getPlayers = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getPlayers", data: "player",
  });
}

export const getPlayer = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getPlayer", data: "player",
  });
}

export const createPlayer = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "createPlayer", data: "player",
  });
}

export const updatePlayer = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "updatePlayer", data: "player",
  });
}

export const getPlayerTeams = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getPlayerTeams", data: "team[]",
  });
}

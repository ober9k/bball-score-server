import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getDivisions = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getDivisions", data: "division",
  });
}

export const getDivision = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getDivision", data: "division",
  });
}

export const createDivision = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "createDivision", data: "division",
  });
}

export const updateDivision = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "updateDivision", data: "division",
  });
}

export const getDivisionTeams = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getDivisionDivisions", data: "team[]",
  });
}

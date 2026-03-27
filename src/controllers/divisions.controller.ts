import { findDivisionById, findDivisions, findDivisionTeams } from "@/services/division.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getDivisionId(req: Request): number {
  return +req.params.divisionId;
}

export async function getDivisions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisions()
    );
}

export async function getDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionById(getDivisionId(req))
    );
}

export async function createDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "createDivision",
    });
}

export async function updateDivision(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json({
      request: "updateDivision",
    });
}

export async function getDivisionTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findDivisionTeams(getDivisionId(req))
    );
}

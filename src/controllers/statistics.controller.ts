import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getStatistics = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
   request: "getStatistics", data: "log[]",
  });
}

import { findStatisticsLogs } from "@/services/statistics.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getStatistics = async (req: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .json(
      await findStatisticsLogs()
    );
}

import { generateStatisticsLogs, type StatisticsContext } from "@/services/statistics.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getStatistics = async(req: Request, res: Response, context: StatisticsContext) => {
  return res
    .status(StatusCodes.OK)
    .json(
      await generateStatisticsLogs(context)
    );
}

export const getStatisticsAverages = async (req: Request, res: Response) => {
  return getStatistics(req, res, "averages");
}

export const getStatisticsTotals = async (req: Request, res: Response) => {
  return getStatistics(req, res, "totals");
}


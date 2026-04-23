import { generateStatisticsLogs, type StatisticsMode } from "@/services/statistics.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getStatistics = async(req: Request, res: Response, context: StatisticsMode) => {
  return res
    .status(StatusCodes.OK)
    .json(
      await generateStatisticsLogs(context === "averages")
    );
}

export const getStatisticsAverages = async (req: Request, res: Response) => {
  return getStatistics(req, res, "averages");
}

export const getStatisticsTotals = async (req: Request, res: Response) => {
  return getStatistics(req, res, "totals");
}


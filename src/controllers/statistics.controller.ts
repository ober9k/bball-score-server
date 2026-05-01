import { ok } from "@/controllers/base.controller";
import { generateStatisticsLogs } from "@/services/statistics.service";
import type { StatisticsLog } from "@/types/statistics-log";
import type { Request, Response } from "express";

export const getStatistics = async(req: Request, res: Response) => {
  const mode = req.params.mode;

  switch (mode) {
    case "averages":
    case "totals":
      const data = await generateStatisticsLogs(mode);
      return ok<StatisticsLog[]>(res, data);
    default:
      throw Error("Unable to handle requested `mode` for statistics.");
  }
}

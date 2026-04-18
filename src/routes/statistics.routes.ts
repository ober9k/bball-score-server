import { getStatisticsAverages, getStatisticsTotals } from "@/controllers/statistics.controller";
import { Router } from "express";

const router = Router()
  .get("/statistics/averages", getStatisticsAverages)
  .get("/statistics/totals", getStatisticsTotals)

export { router as statisticsRoutes };

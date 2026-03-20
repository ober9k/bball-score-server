import { getStatistics } from "@/controllers/statistics.controller";
import { Router } from "express";

const router = Router()
  .get("/statistics", getStatistics)

export { router as statisticsRoutes };

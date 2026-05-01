import { getStatistics } from "@/controllers/statistics.controller";
import { Router } from "express";

const router = Router()
  .get("/statistics/:mode", getStatistics);

export { router as statisticsRoutes };

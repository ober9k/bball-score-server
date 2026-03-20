import { getStandings } from "@/controllers/standings.controller";
import { Router } from "express";

const router = Router()
  .get("/standings", getStandings)

export { router as standingsRoutes };

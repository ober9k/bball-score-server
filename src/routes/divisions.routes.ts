import { DivisionsController } from "@/controllers/divisions.controller";
import { validateIdHandler } from "@/middlewares/validate-id-handler";
import { Router } from "express";

const divisionController = new DivisionsController();

const router = Router()
  // divisions (public)
  .get("/divisions", (req, res) => divisionController.getDivisions(req, res))
  .get("/divisions/options", (req, res) => divisionController.getDivisionsOptions(req, res))
  .get("/divisions/:id", [validateIdHandler], (req, res) => divisionController.getDivision(req, res))
  .get("/divisions/:id/teams", [validateIdHandler], (req, res) => divisionController.getDivisionTeams(req, res));

export { router as divisionsRoutes };

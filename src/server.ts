import { divisionsRoutes } from "@/routes/divisions.routes";
import { playersRoutes } from "@/routes/player.routes";
import { seasonsRoutes } from "@/routes/seasons.routes";
import { standingsRoutes } from "@/routes/standings.routes";
import { statisticsRoutes } from "@/routes/statistics.routes";
import { teamsRoutes } from "@/routes/teams.routes";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello-world", async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    data: "Hello World!",
  });
});

const routes = [
  divisionsRoutes,
  playersRoutes,
  seasonsRoutes,
  standingsRoutes,
  statisticsRoutes,
  teamsRoutes,
];

routes.forEach((r) => {
    app.use("/api/v1", r);
});

export default app;

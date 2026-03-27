import { getBaseLeagueUrl, getBaseUrl } from "@/lib/urls";
import { errorHandler } from "@/middlewares/error-handler";
import { leagueHandler } from "@/middlewares/league-handler";
import { passportHandler } from "@/middlewares/passport-handler";
import { leagueRoutes, routes } from "@/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

/* init auth handler */
passport.use(passportHandler);

app.use(passport.initialize());
app.use(errorHandler);
app.use(getBaseLeagueUrl(), leagueHandler);

routes.forEach((r) => {
  // handle base URLs
  app.use(getBaseUrl(), r);
});

leagueRoutes.forEach((r) => {
  // handle league specific URLs
  app.use(getBaseLeagueUrl(), r);
});

export default app;

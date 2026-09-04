import { getBaseAuthUrl, getBaseLeagueUrl, getBaseManageUrl } from "@/lib/urls";
import { errorHandler } from "@/middlewares/error-handler";
import { leagueHandler } from "@/middlewares/league-handler";
import { passportHandler } from "@/middlewares/passport-handler";
import { authRoutes } from "@/routes/auth.routes";
import { leagueRoutes } from "@/routes/league.routes";
import { manageRoutes } from "@/routes/manage.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

/* init auth handler */
passport.use(passportHandler);

app.use(passport.initialize());

// global auth URLs
app.use(getBaseAuthUrl(), authRoutes);

// league based urls with league handling
app.use(getBaseLeagueUrl(), leagueHandler);
app.use(getBaseLeagueUrl(), leagueRoutes);
app.use(getBaseManageUrl(), manageRoutes);

/* init error handler (last) */
app.use(errorHandler);

export default app;

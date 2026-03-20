import { TestEmail, TestId } from "@/controllers/auth.controller";
import { authTokenExtractor } from "@/lib/auth-token-extractor";
import { authRoutes } from "@/routes/auth.routes";
import { divisionsRoutes } from "@/routes/divisions.routes";
import { playersRoutes } from "@/routes/player.routes";
import { seasonsRoutes } from "@/routes/seasons.routes";
import { standingsRoutes } from "@/routes/standings.routes";
import { statisticsRoutes } from "@/routes/statistics.routes";
import { teamsRoutes } from "@/routes/teams.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { Strategy } from "passport-jwt";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

let options = {
  jwtFromRequest: authTokenExtractor, /* alt: ExtractJwt.fromAuthHeaderAsBearerToken() */
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(new Strategy(options, async (jwt_payload, done) => {
  console.log("jwt_payload", jwt_payload);

  try {
    if (jwt_payload.id !== TestId) {
      return done(null, false);
    }

    return done(null, {
      id: TestId,
      email: TestEmail,
    });
  }
  catch (error) {
    return done(error, false);
  }
}));

app.use(passport.initialize());

app.get("/hello-world", async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    data: "Hello World!",
  });
});

const routes = [
  authRoutes,
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

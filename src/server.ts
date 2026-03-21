import { authTokenExtractor } from "@/lib/auth-token-extractor";
import { prisma } from "@/lib/prisma";
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
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.id },
    }) as any;

    return done(null, {
      id:    user.id,
      email: user.email,
      role:  user.role,
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

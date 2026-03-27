import { findLeagueById, setLocalLeague } from "@/services/league.service";
import type { NextFunction, Request, Response } from "express";

/**
 * All non /auth URLs are tied to a league, hence have this as a pre-requisite for all URLs.
 */
export async function leagueHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // this should work off an ID or a slug
  const leagueId = +req.params.leagueId;

  // store locally for subsequent requests
  const league = await findLeagueById(leagueId);

  if (league) {
    setLocalLeague(res, league); // otherwise exception
  }

  next();
}

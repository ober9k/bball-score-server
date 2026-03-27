import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { League } from "@/types/league";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Helper for getting leagueId passed to controllers.
 */
export function getLocalLeague(res: Response): League {
  return res.locals.league;
}

/**
 * Helper for setting leagueId passed to controllers.
 */
export function setLocalLeague(res: Response, league: League): void {
  res.locals.league = league;
}

export async function findLeagues(): Promise<League[]> {
  return prisma.league.findMany();
}

export async function findLeague(id: number): Promise<League | null> {
  const league = await prisma.league.findUnique({
    where: {
      id,
    },
  });

  if (!league) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find league with `leagueId` provided.");
  }

  return league;
}

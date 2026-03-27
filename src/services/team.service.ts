import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Team } from "@/types/team";
import { StatusCodes } from "http-status-codes";

export async function findTeams(): Promise<Team[]> {
  return prisma.team.findMany();
}

export async function findTeamById(id: number): Promise<Team | null> {
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });

  if (!team) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find team with `teamId` provided.");
  }

  return team;
}

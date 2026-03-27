import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Player } from "@/types/player";
import type { Team } from "@/types/team";
import type { TeamPlayer } from "@/types/team-player";
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

export async function findTeamPlayers(id: number): Promise<Player[]> {
  const players = await prisma.teamPlayer.findMany({
    where: {
      teamId: id,
    },
    include: {
      player: true,
    },
  }) as TeamPlayer[];

  return players
    .map((tp) => tp.player);
}

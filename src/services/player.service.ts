import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Player } from "@/types/player";
import type { Team } from "@/types/team";
import type { TeamPlayer } from "@/types/team-player";
import { StatusCodes } from "http-status-codes";

export async function findPlayers(): Promise<Player[]> {
  return prisma.player.findMany();
}

export async function findPlayerById(id: number): Promise<Player | null> {
  const player = await prisma.player.findUnique({
    where: {
      id,
    },
  });

  if (!player) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find player with `playerId` provided.");
  }

  return player;
}

export async function findPlayerTeams(id: number): Promise<Team[]> {
  const teams = await prisma.teamPlayer.findMany({
    where: {
      playerId: id,
    },
    include: {
      team: true,
    },
  }) as TeamPlayer[];

  return teams
    .map((tp) => tp.team);
}

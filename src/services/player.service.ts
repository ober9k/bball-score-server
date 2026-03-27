import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Player, PlayerData } from "@/types/player";
import type { Team } from "@/types/team";
import type { TeamPlayer } from "@/types/team-player";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
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

export async function savePlayer(data: PlayerData): Promise<Player | null> {
  try {
    return await prisma.player.create({
      data: {
        ...data,
      },
    });
  }
  catch (error) {
    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
  }
}

export async function savePlayerById(id: number, data: PlayerData): Promise<Player | null> {
  try {
    return await prisma.player.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });
  }
  catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find player with `playerId` provided to update.");
      }
    }
    else {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
    }
  }
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

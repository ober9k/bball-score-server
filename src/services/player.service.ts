import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Player } from "@/types/player";
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

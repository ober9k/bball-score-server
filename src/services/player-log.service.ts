import { toPlayerLog, toShallowGame } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { gameDefaultOrderBy, gameSimpleSelect } from "@/services/game.service";
import type { PlayerLog } from "@/types/game";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { PlayerLogSelect } from "@prisma/generated/models/PlayerLog";

function defaultSelect(): PlayerLogSelect {
  return {
    started:        true,
    seconds:        true,
    fgMade:         true,
    fgAttempted:    true,
    fg3Made:        true,
    fg3Attempted:   true,
    ftMade:         true,
    ftAttempted:    true,
    points:         true,
    offRebounds:    true,
    defRebounds:    true,
    rebounds:       true,
    assists:        true,
    steals:         true,
    blocks:         true,
    turnovers:      true,
    personalFouls:  true,
    technicalFouls: true,
    playerId:       true,
    player:         true,
  };
}

export { defaultSelect as playerLogDefaultSelect };

export async function findAll(): Promise<PlayerLog[]> {
  const items: any[] = await prisma.playerLog.findMany({
    select: defaultSelect(),
  });

  return items
    .map(toPlayerLog);
}

export async function findByTeamId(teamId: number): Promise<PlayerLog[]> {
  const items: any[] = await prisma.playerLog.findMany({
    select: defaultSelect(),
    where:  { teamId },
  });

  return items
    .map(toPlayerLog);
}

export async function findByPlayerId(playerId: number): Promise<PlayerLog[]> {
  const items: any[] = await prisma.playerLog.findMany({
    select: { ... defaultSelect() , seasonId: true, season: true },
    where:  { playerId },
  });

  return items
    .map(toPlayerLog);
}

export async function findByPlayerIdWithGames(playerId: number): Promise<PlayerLog[]> {
  const items: any[] = await prisma.playerLog.findMany({
    select: { ... defaultSelect() , seasonId: true, season: true, gameId: true, game: { select: gameSimpleSelect() } },
    where:  { playerId },
    orderBy: {
      game: gameDefaultOrderBy(),
    }
  });

  return items
    .map(toPlayerLog);
}

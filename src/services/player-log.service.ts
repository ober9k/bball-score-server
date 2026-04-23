import { toPlayerLog } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { PlayerLog } from "@/types/game";
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

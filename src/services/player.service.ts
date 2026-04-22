import { toPlayer, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { Player, PlayerData } from "@/types/player";
import type { Team } from "@/types/team";
import { type PlayerOrderByWithRelationInput, SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { PlayerSelect } from "@prisma/generated/models/Player";

function defaultSelect(): PlayerSelect {
  return {
    id:       true,
    name:     true,
    position: true,
    number:   true,
    height:   true,
    active:   true,
    archived: true,
    leagueId: true,
  };
}

function defaultOrderBy(): PlayerOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export async function findAll(): Promise<Player[]> {
  const items: any[] = await prisma.player.findMany({
    select:  defaultSelect(),
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toPlayer);
}

export async function findById(id: number): Promise<Player | null> {
  const item: any = await prisma.player.findUniqueOrThrow({
    select:  defaultSelect(),
    where:   { id },
  });

  return (item)
    ? toPlayer(item)
    : null;
}

export async function save(data: PlayerData): Promise<Player | null> {
  const item: any = await prisma.player.create({
    data: { ...data },
  });

  return (item)
    ? toPlayer(item)
    : null;
}

export async function saveById(id: number, data: PlayerData): Promise<Player | null> {
  const item: any = await prisma.player.update({
    data:  { ...data },
    where: { id },
  });

  return (item)
    ? toPlayer(item)
    : null;
}

/* todo, this should potentially be relocated */
export async function findTeamsByPlayerId(playerId: number): Promise<Team[]> {
  const items: any[] = await prisma.teamPlayer.findMany({
    where: { playerId },
    include: {
      team: true,
    },
  });

  return items
    .map((tp) => toTeam(tp.team));
}

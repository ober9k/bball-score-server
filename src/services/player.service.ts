import { toBriefPlayer, toPlayer } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { BriefPlayer, Player, PlayerData } from "@/types/player";
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

function briefSelect(): PlayerSelect {
  return {
    id:       true,
    name:     true,
    position: true,
    number:   true,
    height:   true,
    active:   true,
    archived: true,
  };
}

export { defaultSelect as playerDefaultSelect };
export { briefSelect as playerBriefSelect };

function defaultOrderBy(): PlayerOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export { defaultOrderBy as playerDefaultOrderBy };

export async function _findAll(brief?: boolean): Promise<any[]> {
  return prisma.player.findMany({
    select:  (brief)
      ? briefSelect()
      : defaultSelect(),
    orderBy: defaultOrderBy(),
  });
}

export async function findAll(brief?: boolean): Promise<Player[]> {
  const items: any[] = await _findAll(brief);

  return items
    .map(toPlayer);
}

export async function findBriefAll(brief?: boolean): Promise<BriefPlayer[]> {
  const items: any[] = await _findAll(brief);

  return items
    .map(toBriefPlayer);
}

async function _findById(id: number, brief?: boolean): Promise<any> {
  return prisma.player.findUniqueOrThrow({
    select: (brief)
      ? briefSelect()
      : defaultSelect(),
    where:  { id },
  });
}

export async function findById(id: number, brief?: boolean): Promise<Player | null> {
  const item: any = await _findById(id, brief);

  return (item)
    ? toPlayer(item)
    : null;
}

export async function findBriefById(id: number, brief?: boolean): Promise<BriefPlayer | null> {
  const item: any = await _findById(id, brief);

  return (item)
    ? toBriefPlayer(item)
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

import { toGame } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { Game, GameData } from "@/types/game";
import { type GameOrderByWithRelationInput, SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { GameSelect } from "@prisma/generated/models/Game";

function defaultSelect(): GameSelect {
  return {
    id:         true,
    date:       true,
    phase:      true,
    round:      true,
    seasonId:   true,
    divisionId: true,
    active:     true,
    archived:   true,
    leagueId:   true,
    gameTeams: {
      select: {
        id:              true,
        side:            true,
        score:           true,
        scoreByPeriod:   true, /* to rename */
        gameId:          true,
        teamId:          true,
        gameTeamPlayers: true, /* no need to filter out any fields */
      },
    },
  };
}

function defaultOrderBy(): GameOrderByWithRelationInput {
  return {
    date: SortOrder.desc,
  };
}

export async function findAll(): Promise<Game[]> {
  const items: any[] = await prisma.game.findMany({
    select:  defaultSelect(),
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toGame);
}

export async function findById(id: number): Promise<Game | null> {
  const item: any = await prisma.game.findUnique({
    select: defaultSelect(),
    where:  { id },
  });

  return (item)
    ? toGame(item)
    : null;
}

export async function save(data: GameData): Promise<Game | null> {
  const item: any = await prisma.game.create({
    data: { ...data },
  });

  return (item)
    ? toGame(item)
    : null;
}

export async function saveById(id: number, data: GameData): Promise<Game | null> {
  const item: any = await prisma.game.update({
    data: { ...data },
    where: { id },
  });

  return (item)
    ? toGame(item)
    : null;
}

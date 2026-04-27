import { toGame } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { divisionDefaultSelect } from "@/services/division.service";
import { playerDefaultSelect } from "@/services/player.service";
import { seasonDefaultSelect } from "@/services/season.service";
import { teamDefaultSelect } from "@/services/team.service";
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
    season: {
      select: seasonDefaultSelect(), /* TBD... some sort of select/hydration condition */
    },
    divisionId: true,
    division: {
      select: divisionDefaultSelect(), /* TBD... some sort of select/hydration condition */
    },
    active:     true,
    archived:   true,
    leagueId:   true,
    teamLogs: {
      select: {
        id:         true,
        side:       true,
        score:      true,
        byPeriod:   true,
        gameId:     true,
        teamId:     true,
        team: {
          select: teamDefaultSelect(),
        },
        playerLogs: {
          select: {
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
            player: {
              select: playerDefaultSelect(),
            },
          },
        },
      },
    },
  };
}

function simpleSelect(): GameSelect {
  return {
    id:         true,
    date:       true,
    phase:      true,
    round:      true,
    teamLogs: {
      select: {
        id:         true,
        side:       true,
        score:      true,
        byPeriod:   true,
        teamId:     true,
        team: {
          select: teamDefaultSelect(),
        },
        playerLogs: {
          select: {
            /* need to redo this */
            playerId: true,
            player: {
              select: playerDefaultSelect(),
            },
          },
        },
      },
    },
  };
}

export { defaultSelect as gameDefaultSelect };
export { simpleSelect as gameSimpleSelect };

function defaultOrderBy(): GameOrderByWithRelationInput {
  return {
    date: SortOrder.desc,
  };
}

export { defaultOrderBy as gameDefaultOrderBy };

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
    data:  { ...data },
    where: { id },
  });

  return (item)
    ? toGame(item)
    : null;
}

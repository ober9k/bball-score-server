import { toBriefGame, toGame } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { DivisionService } from "@/services/division.service";
import { playerDefaultSelect } from "@/services/player.service";
import { SeasonService } from "@/services/season.service";
import { teamDefaultSelect } from "@/services/team.service";
import type { BriefGame, Game, GameData } from "@/types/game";
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
      select: SeasonService.SelectColumns(),
    },
    divisionId: true,
    division: {
      select: DivisionService.SelectColumns(), /* TBD... some sort of select/hydration condition */
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

function briefSelect(): GameSelect {
  return {
    id:         true,
    date:       true,
    phase:      true,
    round:      true,
    seasonId:   true,
    season:     { select: SeasonService.BriefSelectColumns() },
    divisionId: true,
    division:   { select: DivisionService.BriefSelectColumns() },
    active:     true,
    archived:   true,
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
export { briefSelect as gameBriefSelect };
export { simpleSelect as gameSimpleSelect };

function defaultOrderBy(): GameOrderByWithRelationInput {
  return {
    date: SortOrder.desc,
  };
}

export { defaultOrderBy as gameDefaultOrderBy };

export async function _findAll(brief?: boolean): Promise<any[]> {
  return prisma.game.findMany({
    select:  (brief)
      ? briefSelect()
      : defaultSelect(),
    orderBy: defaultOrderBy(),
  });
}

export async function findAll(): Promise<Game[]> {
  const items: any[] = await _findAll();

  return items
    .map(toGame);
}

export async function findBriefAll(): Promise<BriefGame[]> {
  const items: any[] = await _findAll(true);

  return items
    .map(toBriefGame);
}

async function _findById(id: number, brief?: boolean): Promise<any> {
  return prisma.game.findUniqueOrThrow({
    select: (brief)
      ? briefSelect()
      : defaultSelect(),
    where:  { id },
  });
}

export async function findById(id: number): Promise<Game | null> {
  const item: any = await _findById(id);

  return (item)
    ? toGame(item)
    : null;
}

export async function findBriefById(id: number): Promise<BriefGame | null> {
  const item: any = await _findById(id, true);

  return (item)
    ? toBriefGame(item)
    : null;
}

export async function save(data: GameData): Promise<Game | null> {
  const item: any = await prisma.game.create({
    data: { ...data },
  });

  return findById(item.id); /* TODO: just get a new one for now */
}

export async function saveById(id: number, data: GameData): Promise<Game | null> {
  const item: any = await prisma.game.update({
    data:  { ...data },
    where: { id },
  });

  return findById(item.id); /* TODO: just get a new one for now */
}

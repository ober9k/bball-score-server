import { toOption, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { Option } from "@/types/option";
import type { Player } from "@/types/player";
import type { Team, TeamData } from "@/types/team";
import type { TeamPlayer } from "@/types/team-player";
import { SortOrder, type TeamOrderByWithRelationInput } from "@prisma/generated/internal/prismaNamespace";
import type { TeamSelect } from "@prisma/generated/models/Team";

function defaultSelect(): TeamSelect {
  return {
    id:         true,
    name:       true,
    shortName:  true,
    divisionId: true,
    active:     true,
    archived:   true,
    leagueId:   true,
  };
}

function defaultOrderBy(): TeamOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export async function findAll(): Promise<Team[]> {
  const items: any[] = await prisma.team.findMany({
    select:  defaultSelect(),
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toTeam);
}

export async function findById(id: number): Promise<Team | null> {
  const item: any = await prisma.team.findUniqueOrThrow({
    select: defaultSelect(),
    where:  { id },
  });

  return (item)
    ? toTeam(item)
    : null;
}

export async function findAllAsOptions(): Promise<Option[]> {
  console.log("all", await findAll());

  return (await findAll())
    .map(toOption);
}

export async function save(data: TeamData): Promise<Team | null> {
  const item: any = await prisma.team.create({
    data: { ...data },
  });

  return (item)
    ? toTeam(item)
    : null;
}

export async function saveById(id: number, data: TeamData): Promise<Team | null> {
  const item: any = prisma.team.update({
    data: { ...data },
    where: { id },
  });

  return (item)
    ? toTeam(item)
    : null;
}

export async function findPlayersTeamId(teamId: number): Promise<Player[]> {
  const items: any[] = await prisma.teamPlayer.findMany({
    where: { teamId },
    include: {
      player: true,
    },
  }) as TeamPlayer[];

  return items
    .map((tp) => tp.player);
}

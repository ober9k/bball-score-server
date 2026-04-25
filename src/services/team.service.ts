import { toOption, toPlayer, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { Option } from "@/types/option";
import type { Player } from "@/types/player";
import type { Team, TeamData } from "@/types/team";
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

export { defaultSelect as teamDefaultSelect };

function defaultOrderBy(): TeamOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export { defaultOrderBy as teamDefaultOrderBy };

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
    data:  { ...data },
    where: { id },
  });

  return (item)
    ? toTeam(item)
    : null;
}

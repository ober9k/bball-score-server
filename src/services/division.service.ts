import { toDivision, toOption, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { seasonBriefSelect } from "@/services/season.service";
import type { Division, DivisionData } from "@/types/division";
import type { Option } from "@/types/option";
import type { Team } from "@/types/team";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { DivisionOrderByWithRelationInput, DivisionSelect } from "@prisma/generated/models/Division";

function defaultSelect(): DivisionSelect {
  return {
    id:       true,
    name:     true,
    seasonId: true,
    active:   true,
    archived: true,
    leagueId: true,
  };
}

function briefSelect(): DivisionSelect {
  return {
    id:       true,
    name:     true,
    seasonId: true,
    season:   { select: seasonBriefSelect() },
    active:   true,
    archived: true,
  };
}

export { defaultSelect as divisionDefaultSelect };
export { briefSelect as divisionBriefSelect };

function defaultOrderBy(): DivisionOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export async function findAll(): Promise<Division[]> {
  const items: any[] = await prisma.division.findMany({
    select:  defaultSelect(),
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toDivision);
}

export async function findById(id: number): Promise<Division | null> {
  const item: any = await prisma.division.findUniqueOrThrow({
    select: defaultSelect(),
    where:  { id },
  });

  return (item)
    ? toDivision(item)
    : null;
}

export async function findAllAsOptions(): Promise<Option[]> {
  return (await findAll())
    .map(toOption);
}

export async function save(data: DivisionData): Promise<Division | null> {
  const item: any = prisma.division.create({
    data: { ...data },
  });

  return (item)
    ? toDivision(item)
    : null;
}

export async function saveById(id: number, data: DivisionData): Promise<Division | null> {
  const item: any = prisma.division.update({
    data:  { ...data },
    where: { id },
  });

  return (item)
    ? toDivision(item)
    : null;
}

/* todo, this should potentially be relocated */
export async function findTeamsByDivisionId(divisionId: number): Promise<Team[]> {
  const items: any[] = await prisma.team.findMany({
    where:   { divisionId },
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toTeam);
}

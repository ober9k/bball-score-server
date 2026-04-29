import { toDivision, toOption, toSeason } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import type { Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { Season, SeasonData } from "@/types/season";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { SeasonOrderByWithRelationInput, SeasonSelect } from "@prisma/generated/models/Season";

function defaultSelect(): SeasonSelect {
  return {
    id:       true,
    name:     true,
    active:   true,
    archived: true,
    leagueId: true,
  };
}

function briefSelect(): SeasonSelect {
  return {
    id:       true,
    name:     true,
    active:   true,
    archived: true,
  };
}

export { defaultSelect as seasonDefaultSelect };
export { briefSelect as seasonBriefSelect };

function defaultOrderBy(): SeasonOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export async function findAll(): Promise<Season[]> {
  const items: any[] = await prisma.season.findMany({
    select:  defaultSelect(),
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toSeason);
}

export async function findById(id: number): Promise<Season | null> {
  const item: any = await prisma.season.findUniqueOrThrow({
    select: defaultSelect(),
    where:  { id },
  });

  return (item)
    ? toSeason(item)
    : null;
}

export async function findAllAsOptions(): Promise<Option[]> {
  return (await findAll())
    .map(toOption);
}

export async function save(data: SeasonData): Promise<Season | null> {
  const item: any = await prisma.season.create({
    data: { ...data },
  });

  return (item)
    ? toSeason(item)
    : null;
}

export async function saveById(id: number, data: SeasonData): Promise<Season | null> {
  const item: any = await prisma.season.update({
    data:  { ...data },
    where: { id },
  });

  return (item)
    ? toSeason(item)
    : null;
}

/* todo, this should potentially be relocated */
export async function findDivisionsBySeasonId(seasonId: number): Promise<Division[]> {
  const items: any[] = await prisma.division.findMany({
    where:   { seasonId },
    orderBy: defaultOrderBy(),
  });

  return items
    .map(toDivision);
}

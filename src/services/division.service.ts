import { toBriefDivision, toDivision, toOption, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { SeasonService } from "@/services/season.service";
import type { BriefDivision, Division, DivisionData } from "@/types/division";
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
    season:   { select: SeasonService.BriefSelectColumns() },
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

export async function _findAll(brief?: boolean): Promise<any[]> {
  return prisma.division.findMany({
    select:  (brief)
      ? briefSelect()
      : defaultSelect(),
    orderBy: defaultOrderBy(),
  });
}

export async function findAll(): Promise<Division[]> {
  const items: any[] = await _findAll();

  return items
    .map(toDivision);
}

export async function findBriefAll(): Promise<BriefDivision[]> {
  const items: any[] = await _findAll(true);

  return items
    .map(toBriefDivision);
}

async function _findById(id: number, brief?: boolean): Promise<any> {
  return prisma.division.findUniqueOrThrow({
    select: (brief)
      ? briefSelect()
      : defaultSelect(),
    where:  { id },
  });
}

export async function findById(id: number): Promise<Division | null> {
  const item: any = await _findById(id);

  return (item)
    ? toDivision(item)
    : null;
}

export async function findBriefById(id: number): Promise<BriefDivision | null> {
  const item: any = await _findById(id, true);

  return (item)
    ? toBriefDivision(item)
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

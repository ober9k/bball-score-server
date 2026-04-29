import { toBriefTeam, toOption, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { divisionBriefSelect } from "@/services/division.service";
import type { Option } from "@/types/option";
import type { BriefTeam, Team, TeamData } from "@/types/team";
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

function briefSelect(): TeamSelect {
  return {
    id:         true,
    name:       true,
    shortName:  true,
    divisionId: true,
    division:   { select: divisionBriefSelect() },
    active:     true,
    archived:   true,
  };
}

export { defaultSelect as teamDefaultSelect };
export { briefSelect as teamBriefSelect };

function defaultOrderBy(): TeamOrderByWithRelationInput {
  return {
    name: SortOrder.asc,
  };
}

export { defaultOrderBy as teamDefaultOrderBy };

export async function _findAll(brief?: boolean): Promise<any[]> {
  return prisma.team.findMany({
    select:  (brief)
      ? briefSelect()
      : defaultSelect(),
    orderBy: defaultOrderBy(),
  });
}

export async function findAll(): Promise<Team[]> {
  const items: any[] = await _findAll();

  return items
    .map(toTeam);
}

export async function findBriefAll(): Promise<BriefTeam[]> {
  const items: any[] = await _findAll(true);

  return items
    .map(toBriefTeam);
}

async function _findById(id: number, brief?: boolean): Promise<any> {
  return prisma.team.findUniqueOrThrow({
    select: (brief)
      ? briefSelect()
      : defaultSelect(),
    where:  { id },
  });
}

export async function findById(id: number): Promise<Team | null> {
  const item: any = await _findById(id);

  return (item)
    ? toTeam(item)
    : null;
}

export async function findBriefById(id: number): Promise<BriefTeam | null> {
  const item: any = await _findById(id, true);

  return (item)
    ? toBriefTeam(item)
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

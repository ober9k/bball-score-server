import { toBriefSeason, toDivision, toSeason } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import type { Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { BriefSeason, BriefSeasonData, Season, SeasonData } from "@/types/season";
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

export class SeasonService extends BaseService<Season, BriefSeason, BriefSeasonData>{

  public async findAll(brief?: boolean): Promise<Season[] | BriefSeason[]> {
    const items: any[] = await prisma.season.findMany({
      select:  (brief)
        ? briefSelect()
        : defaultSelect(),
      orderBy: defaultOrderBy(),
    });

    return (brief)
      ? this.mapBriefItems(items)
      : this.mapItems(items);
  }

  public async findById(id: number, brief?: boolean): Promise<Season | BriefSeason> {
    const item: any = await prisma.season.findUniqueOrThrow({
      select: (brief)
        ? briefSelect()
        : defaultSelect(),
      where:  { id },
    });

    return (brief)
      ? this.toBriefItem(item)
      : this.toItem(item);
  }

  public async save(data: BriefSeasonData): Promise<BriefSeason> {
    const { activated, saveData } = data;

    const item: any = await prisma.season.create({
      data: { ...saveData, active: activated }, /* temp: transform structure */
    });

    return this.findById(item.id, true);
  }

  public async saveById(id: number, data: BriefSeasonData): Promise<BriefSeason> {
    const { activated, saveData } = data;

    const item: any = await prisma.season.update({
      data: { ...saveData, active: activated }, /* temp: transform structure */
      where: { id },
    });

    return this.findById(item.id, true);
  }

  public async findOptions(): Promise<Option[]> {
    const items: any[] = await prisma.season.findMany({
      select:  { id: true, name: true },
      orderBy: defaultOrderBy(),
    });

    return this.mapOptions(items);
  }

  protected toItem(data: any): Season {
    return toSeason(data);
  }

  protected toBriefItem(data: any): BriefSeason {
    return toBriefSeason(data);
  }

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

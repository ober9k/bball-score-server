import { toBriefSeason, toDivision, toSeason } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import type { Division } from "@/types/division";
import type { BriefSeason, BriefSeasonData, Season } from "@/types/season";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { SeasonDelegate, SeasonOrderByWithRelationInput, SeasonSelect } from "@prisma/generated/models/Season";

export class SeasonService extends BaseService<Season, BriefSeason, BriefSeasonData, SeasonDelegate, SeasonSelect, SeasonOrderByWithRelationInput>{

  public getDelegate(): SeasonDelegate {
    return prisma.season;
  }

  protected toItem(data: any): Season {
    return toSeason(data);
  }

  protected toBriefItem(data: any): BriefSeason {
    return toBriefSeason(data);
  }

  protected getSelectColumns(): SeasonSelect {
    return SeasonService.SelectColumns();
  }

  protected getBriefSelectColumns(): SeasonSelect {
    return SeasonService.BriefSelectColumns();
  }

  protected getOrderByColumns(): SeasonOrderByWithRelationInput {
    return SeasonService.OrderByColumns();
  }

  public static SelectColumns(): SeasonSelect {
    return {
      id:       true,
      name:     true,
      active:   true,
      archived: true,
      leagueId: true,
    };
  }

  public static BriefSelectColumns(): SeasonSelect {
    return {
      id:       true,
      name:     true,
      active:   true,
      archived: true,
    };
  }

  public static OrderByColumns(): SeasonOrderByWithRelationInput {
    return {
      name: SortOrder.asc,
    };
  }

}

/* todo, this should potentially be relocated */
export async function findDivisionsBySeasonId(seasonId: number): Promise<Division[]> {
  const items: any[] = await prisma.division.findMany({
    where:   { seasonId },
    orderBy: SeasonService.OrderByColumns(),
  });

  return items
    .map(toDivision);
}

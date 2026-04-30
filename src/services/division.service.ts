import { toBriefDivision, toDivision, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import { SeasonService } from "@/services/season.service";
import type { BriefDivision, BriefDivisionData, Division } from "@/types/division";
import type { Team } from "@/types/team";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { DivisionDelegate, DivisionOrderByWithRelationInput, DivisionSelect } from "@prisma/generated/models/Division";

export class DivisionService extends BaseService<Division, BriefDivision, BriefDivisionData, DivisionDelegate, DivisionSelect, DivisionOrderByWithRelationInput>{
  
  public getDelegate(): DivisionDelegate {
    return prisma.division;
  }

  protected toItem(data: any): Division {
    return toDivision(data);
  }

  protected toBriefItem(data: any): BriefDivision {
    return toBriefDivision(data);
  }

  protected getSelectColumns(): DivisionSelect {
    return DivisionService.SelectColumns();
  }

  protected getBriefSelectColumns(): DivisionSelect {
    return DivisionService.BriefSelectColumns();
  }

  protected getOrderByColumns(): DivisionOrderByWithRelationInput {
    return DivisionService.OrderByColumns();
  }

  public static SelectColumns(): DivisionSelect {
    return {
      id:       true,
      name:     true,
      seasonId: true,
      active:   true,
      archived: true,
      leagueId: true,
    };
  }

  public static BriefSelectColumns(): DivisionSelect {
    return {
      id:       true,
      name:     true,
      seasonId: true,
      season:   { select: SeasonService.BriefSelectColumns() },
      active:   true,
      archived: true,
    };
  }

  public static OrderByColumns(): DivisionOrderByWithRelationInput {
    return {
      name: SortOrder.asc,
    };
  }

}

/* todo, this should potentially be relocated */
export async function findTeamsByDivisionId(divisionId: number): Promise<Team[]> {
  const items: any[] = await prisma.team.findMany({
    where:   { divisionId },
    orderBy: DivisionService.OrderByColumns(),
  });

  return items
    .map(toTeam);
}

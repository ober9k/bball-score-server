import { toBriefTeam, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import { DivisionService } from "@/services/division.service";
import type { BriefTeam, BriefTeamData, Team } from "@/types/team";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { TeamDelegate, TeamOrderByWithRelationInput, TeamSelect } from "@prisma/generated/models/Team";

export class TeamService extends BaseService<Team, BriefTeam, BriefTeamData, TeamDelegate, TeamSelect, TeamOrderByWithRelationInput>{

  public getDelegate(): TeamDelegate {
    return prisma.team;
  }

  protected toItem(data: any): Team {
    return toTeam(data);
  }

  protected toBriefItem(data: any): BriefTeam {
    return toBriefTeam(data);
  }

  protected getSelectColumns(): TeamSelect {
    return TeamService.SelectColumns();
  }

  protected getBriefSelectColumns(): TeamSelect {
    return TeamService.BriefSelectColumns();
  }

  protected getOrderByColumns(): TeamOrderByWithRelationInput {
    return TeamService.OrderByColumns();
  }

  public static SelectColumns(): TeamSelect {
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

  public static BriefSelectColumns(): TeamSelect {
    return {
      id:         true,
      name:       true,
      shortName:  true,
      divisionId: true,
      division:   { select: DivisionService.BriefSelectColumns() },
      active:     true,
      archived:   true,
    };
  }

  public static OrderByColumns(): TeamOrderByWithRelationInput {
    return {
      name: SortOrder.asc,
    };
  }

}

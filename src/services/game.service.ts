import { toBriefGame, toGame } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import { DivisionService } from "@/services/division.service";
import { PlayerService } from "@/services/player.service";
import { SeasonService } from "@/services/season.service";
import { TeamService } from "@/services/team.service";
import type { BriefGame, BriefGameData, Game } from "@/types/game";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { GameDelegate, GameOrderByWithRelationInput, GameSelect } from "@prisma/generated/models/Game";

export class GameService extends BaseService<Game, BriefGame, BriefGameData, GameDelegate, GameSelect, GameOrderByWithRelationInput>{

  public getDelegate(): GameDelegate {
    return prisma.game;
  }

  protected toItem(data: any): Game {
    return toGame(data);
  }

  protected toBriefItem(data: any): BriefGame {
    return toBriefGame(data);
  }

  protected getSelectColumns(): GameSelect {
    return GameService.SelectColumns();
  }

  protected getBriefSelectColumns(): GameSelect {
    return GameService.BriefSelectColumns();
  }

  protected getOrderByColumns(): GameOrderByWithRelationInput {
    return GameService.OrderByColumns();
  }

  public static SelectColumns(): GameSelect {
    return {
      id:         true,
      date:       true,
      phase:      true,
      round:      true,
      seasonId:   true,
      season: {
        select: SeasonService.SelectColumns(),
      },
      divisionId: true,
      division: {
        select: DivisionService.SelectColumns(), /* TBD... some sort of select/hydration condition */
      },
      active:     true,
      archived:   true,
      leagueId:   true,
      teamLogs: {
        select: {
          id:         true,
          side:       true,
          score:      true,
          byPeriod:   true,
          gameId:     true,
          teamId:     true,
          team: {
            select: TeamService.SelectColumns(),
          },
          playerLogs: {
            select: {
              started:        true,
              seconds:        true,
              fgMade:         true,
              fgAttempted:    true,
              fg3Made:        true,
              fg3Attempted:   true,
              ftMade:         true,
              ftAttempted:    true,
              points:         true,
              offRebounds:    true,
              defRebounds:    true,
              rebounds:       true,
              assists:        true,
              steals:         true,
              blocks:         true,
              turnovers:      true,
              personalFouls:  true,
              technicalFouls: true,
              playerId:       true,
              player: {
                select: PlayerService.SelectColumns(),
              },
            },
          },
        },
      },
    };
  }

  public static BriefSelectColumns(): GameSelect {
    return {
      id:         true,
      date:       true,
      phase:      true,
      round:      true,
      seasonId:   true,
      season:     { select: SeasonService.BriefSelectColumns() },
      divisionId: true,
      division:   { select: DivisionService.BriefSelectColumns() },
      active:     true,
      archived:   true,
    };
  }

  public static OrderByColumns(): GameOrderByWithRelationInput {
    return {
      date: SortOrder.desc,
    };
  }

}

function simpleSelect(): GameSelect {
  return {
    id:         true,
    date:       true,
    phase:      true,
    round:      true,
    teamLogs: {
      select: {
        id:         true,
        side:       true,
        score:      true,
        byPeriod:   true,
        teamId:     true,
        team: {
          select: TeamService.BriefSelectColumns(),
        },
        playerLogs: {
          select: {
            /* need to redo this */
            playerId: true,
            player: {
              select: PlayerService.SelectColumns(),
            },
          },
        },
      },
    },
  };
}

export { simpleSelect as gameSimpleSelect };

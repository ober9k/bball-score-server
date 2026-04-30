import { toBriefPlayer, toPlayer } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { BaseService } from "@/services/base.service";
import type { BriefPlayer, BriefPlayerData, Player } from "@/types/player";
import { SortOrder } from "@prisma/generated/internal/prismaNamespace";
import type { PlayerDelegate, PlayerOrderByWithRelationInput, PlayerSelect } from "@prisma/generated/models/Player";

export class PlayerService extends BaseService<Player, BriefPlayer, BriefPlayerData, PlayerDelegate, PlayerSelect, PlayerOrderByWithRelationInput>{

  public getDelegate(): PlayerDelegate {
    return prisma.player;
  }

  protected toItem(data: any): Player {
    return toPlayer(data);
  }

  protected toBriefItem(data: any): BriefPlayer {
    return toBriefPlayer(data);
  }

  protected getSelectColumns(): PlayerSelect {
    return PlayerService.SelectColumns();
  }

  protected getBriefSelectColumns(): PlayerSelect {
    return PlayerService.BriefSelectColumns();
  }

  protected getOrderByColumns(): PlayerOrderByWithRelationInput {
    return PlayerService.OrderByColumns();
  }

  public static SelectColumns(): PlayerSelect {
    return {
      id:       true,
      name:     true,
      position: true,
      number:   true,
      height:   true,
      active:   true,
      archived: true,
      leagueId: true,
    };
  }

  public static BriefSelectColumns(): PlayerSelect {
    return {
      id:       true,
      name:     true,
      position: true,
      number:   true,
      height:   true,
      active:   true,
      archived: true,
    };
  }

  public static OrderByColumns(): PlayerOrderByWithRelationInput {
    return {
      name: SortOrder.asc,
    };
  }

}

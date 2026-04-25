import { toPlayer, toTeam } from "@/lib/converters";
import { prisma } from "@/lib/prisma";
import { playerDefaultOrderBy, playerDefaultSelect } from "@/services/player.service";
import { teamDefaultOrderBy, teamDefaultSelect } from "@/services/team.service";
import type { Player } from "@/types/player";
import type { Team } from "@/types/team";
import { SortOrder, type TeamOrderByWithRelationInput, type TeamPlayerSelect } from "@prisma/generated/internal/prismaNamespace";

function defaultSelectForTeam(): TeamPlayerSelect {
  return {
    team: {
      select: teamDefaultSelect(),
    },
  };
}

function defaultSelectForPlayer(): TeamPlayerSelect {
  return {
    player: {
      select: playerDefaultSelect(),
    },
  };
}

export async function findTeamsByPlayerId(playerId: number): Promise<Team[]> {
  const items: any[] = await prisma.teamPlayer.findMany({
    select:  defaultSelectForTeam(),
    where:   { playerId },
    orderBy: {
      team: teamDefaultOrderBy(),
    },
  });

  return items
    .map((item) => item.team)
    .map(toTeam);
}

export async function findPlayersByTeamId(teamId: number): Promise<Player[]> {
  const items: any[] = await prisma.teamPlayer.findMany({
    select:  defaultSelectForPlayer(),
    where:   { teamId },
    orderBy: {
      player: playerDefaultOrderBy(),
    },
  });

  return items
    .map((item) => item.player)
    .map(toPlayer);
}

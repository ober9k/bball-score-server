import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Player } from "@/types/player";
import type { Team, TeamData } from "@/types/team";
import type { TeamPlayer } from "@/types/team-player";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { StatusCodes } from "http-status-codes";
import type { Option } from "@/types/option";
import { findOptions } from "@/services/league.service";
import type { TeamDelegate } from "../../prisma/generated/models/Team";

export async function findTeams(): Promise<Team[]> {
  return prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function findTeamsOptions(): Promise<Option[]> {
  return findOptions<TeamDelegate>(prisma.team);
}

export async function findTeamById(id: number): Promise<Team | null> {
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });

  if (!team) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find team with `teamId` provided.");
  }

  return team;
}

export async function saveTeam(data: TeamData): Promise<Team | null> {
  try {
    return await prisma.team.create({
      data: {
        ...data,
      },
    });
  }
  catch (error) {
    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
  }
}

export async function saveTeamById(id: number, data: TeamData): Promise<Team | null> {
  try {
    return await prisma.team.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });
  }
  catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find team with `teamId` provided to update.");
      }
    }
    else {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
    }
  }
}

export async function findTeamPlayers(id: number): Promise<Player[]> {
  const players = await prisma.teamPlayer.findMany({
    where: {
      teamId: id,
    },
    include: {
      player: true,
    },
  }) as TeamPlayer[];

  return players
    .map((tp) => tp.player);
}

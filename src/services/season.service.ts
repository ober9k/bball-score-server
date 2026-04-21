import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Division } from "@/types/division";
import type { Season, SeasonData } from "@/types/season";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { StatusCodes } from "http-status-codes";
import type { Option } from "@/types/option";
import { findOptions } from "@/services/league.service";
import type { SeasonDelegate } from "../../prisma/generated/models/Season";

export async function findSeasons(): Promise<Season[]> {
  return prisma.season.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function findSeasonsOptions(): Promise<Option[]> {
  return findOptions<SeasonDelegate>(prisma.season);
}

export async function findSeasonById(id: number): Promise<Season | null> {
  const season = await prisma.season.findUnique({
    where: {
      id,
    },
  });

  if (!season) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find season with `seasonId` provided.");
  }

  return season;
}

export async function saveSeason(data: SeasonData): Promise<Season | null> {
  try {
    return await prisma.season.create({
      data: {
        ...data,
      },
    });
  }
  catch (error) {
    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
  }
}

export async function saveSeasonById(id: number, data: SeasonData): Promise<Season | null> {
  try {
    return await prisma.season.update({
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
        throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find season with `seasonId` provided to update.");
      }
    }
    else {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
    }
  }
}

export async function findSeasonDivisions(id: number): Promise<Division[]> {
  return prisma.division.findMany({
    where: {
      seasonId: id,
    },
  });
}

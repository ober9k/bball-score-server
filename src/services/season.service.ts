import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Season } from "@/types/season";
import { StatusCodes } from "http-status-codes";

export async function findSeasons(): Promise<Season[]> {
  return prisma.season.findMany();
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

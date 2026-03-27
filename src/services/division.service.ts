import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Division } from "@/types/division";
import type { Team } from "@/types/team";
import { StatusCodes } from "http-status-codes";

export async function findDivisions(): Promise<Division[]> {
  return prisma.division.findMany();
}

export async function findDivisionById(id: number): Promise<Division | null> {
  const division = await prisma.division.findUnique({
    where: {
      id,
    },
  });

  if (!division) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find division with `divisionId` provided.");
  }

  return division;
}

export async function findDivisionTeams(id: number): Promise<Team[]> {
  return prisma.team.findMany({
    where: {
      divisionId: id,
    },
  });
}

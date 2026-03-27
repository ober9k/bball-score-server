import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Division, DivisionData } from "@/types/division";
import type { Team } from "@/types/team";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
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

export async function saveDivision(data: DivisionData): Promise<Division | null> {
  try {
    return await prisma.division.create({
      data: {
        ...data,
      },
    });
  }
  catch (error) {
    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
  }
}

export async function saveDivisionById(id: number, data: DivisionData): Promise<Division | null> {
  try {
    return await prisma.division.update({
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
        throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find division with `divisionId` provided to update.");
      }
    }
    else {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "InternalServerError", `An unexpected error occurred: ${error.message}`);
    }
  }
}

export async function findDivisionTeams(id: number): Promise<Team[]> {
  return prisma.team.findMany({
    where: {
      divisionId: id,
    },
  });
}

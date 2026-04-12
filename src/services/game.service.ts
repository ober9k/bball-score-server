import { prisma } from "@/lib/prisma";
import HttpException from "@/models/http-exception.model";
import type { Game } from "@/types/game";
import { StatusCodes } from "http-status-codes";

/**
 * TODO: this is temporary, need to work out a tidier way to handle all of this
 */
const reducer = (acc, cur: string) => ({ ...acc, [cur]: true });
const getColumns = (columns: string[]) => columns.reduce(reducer, {});

/**
 * TODO: this is temporary, need to work out a tidier way to handle all of this
 * (potentially via multiple requests instead)
 */
const gameCols = getColumns(["id", "date", "phase", "round"]);
const gameTeamCols = getColumns(["id", "side", "score", "scoreByPeriod"]);
const gameTeamPlayerCols = getColumns(["started", "seconds", "fgMade", "fgAttempted", "fg3Made", "fg3Attempted", "ftMade", "ftAttempted", "points", "offRebounds", "defRebounds", "rebounds", "assists", "steals", "blocks", "turnovers", "personalFouls", "technicalFouls"]);
const teamCols = getColumns(["id", "name", "shortName"]);
const playerCols = getColumns(["id", "name", "position", "number", "height"]);

/**
 * TODO: fix result data for a type instead of using any
 */
export async function findGames(): Promise<any[]> {
  return prisma.game.findMany({
    select: {
      ...gameCols,
      gameTeams: {
        select: {
          ...gameTeamCols,
          team: {
            select: {
              ...teamCols,
            },
          },
        },
      },
    },
  });
}

/**
 * TODO: fix result data for a type instead of using any
 */
export async function findGameById(id: number): Promise<any | null> {
  const game = await prisma.game.findUnique({
    where: {
      id,
    },
    select: {
      ...gameCols,
      gameTeams: {
        select: {
          ...gameTeamCols,
          team: {
            select: {
              ...teamCols,
            },
          },
          gameTeamPlayers: {
            select: {
              ...gameTeamPlayerCols,
              player: {
                select: {
                  ...playerCols,
                }
              }
            }
          },
        },
      },
    },
  });

  if (!game) {
    throw new HttpException(StatusCodes.NOT_FOUND, "NotFound", "Unable to find game with `gameId` provided.");
  }

  return game;
}

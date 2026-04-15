import { findGameById, findGames } from "@/services/game.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getGameId(req: Request): number {
  return +req.params.gameId;
}

export async function getGames(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findGames()
    );
}

export async function getGame(req: Request, res: Response) {

  const toStats = (gtp) => ({
    seconds:        gtp.seconds,
    fgMade:         gtp.fgMade,
    fgAttempted:    gtp.fgAttempted,
    fg3Made:        gtp.fg3Made,
    fg3Attempted:   gtp.fg3Attempted,
    ftMade:         gtp.ftMade,
    ftAttempted:    gtp.ftAttempted,
    points:         gtp.points,
    offRebounds:    gtp.offRebounds,
    defRebounds:    gtp.defRebounds,
    rebounds:       gtp.rebounds,
    assists:        gtp.assists,
    steals:         gtp.steals,
    blocks:         gtp.blocks,
    turnovers:      gtp.turnovers,
    personalFouls:  gtp.personalFouls,
    technicalFouls: gtp.technicalFouls,
  });

  /* a bit ugly for now */
  return res
    .status(StatusCodes.OK)
    .json(
      await findGameById(getGameId(req))
        .then((game) => {
          return {
            ...game,
            gameTeams: [
              ...game.gameTeams.map((gt) => ({
                ...gt,
                gameTeamPlayers: gt.gameTeamPlayers
                  .map((gtp) => ({
                    player:  gtp.player,
                    started: gtp.started,
                    stats:   toStats(gtp),
                  }))
              })),
            ],
          }
        })
    );
}

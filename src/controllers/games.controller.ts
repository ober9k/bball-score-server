import { findGameById, findGames, saveGame, saveGameById } from "@/services/game.service";
import { getLocalLeague } from "@/services/league.service";
import type { GameData } from "@/types/game";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getGameId(req: Request): number {
  return +req.params.gameId;
}

function getGameData(req: Request, res: Response): GameData {
  const { date, phase, round, active, archived, seasonId, divisionId } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    date: new Date(date), phase, round, active, archived, seasonId, divisionId, leagueId,
  };
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

export async function createGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await saveGame(getGameData(req, res))
    );
}

export async function updateGame(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveGameById(getGameId(req), getGameData(req, res))
    );
}

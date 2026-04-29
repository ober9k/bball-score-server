import { getLocalLeague } from "@/services/league.service";
import { generateStatisticsLogsByTeamId, type StatisticsMode } from "@/services/statistics.service";
import { findPlayersByTeamId } from "@/services/team-player.service";
import { findAll, findAllAsOptions, findBriefAll, findBriefById, findById, save, saveById } from "@/services/team.service";
import type { TeamData } from "@/types/team";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getTeamId(req: Request): number {
  return +req.params.id;
}

function getTeamData(req: Request, res: Response): TeamData {
  const { name, shortName, divisionId, active, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res);

  return {
    name, shortName, divisionId, active, archived, leagueId,
  };
}

export async function getTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAll()
    );
}

export async function getTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findById(getTeamId(req))
    );
}

export async function getTeamsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findAllAsOptions()
    );
}

export async function getBriefTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefAll()
    );
}

export async function getBriefTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await findBriefById(getTeamId(req))
    );
}

export async function createTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await save(getTeamData(req, res))
    );
}

export async function updateTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await saveById(getTeamId(req), getTeamData(req, res))
    );
}

export async function getTeamPlayers(req: Request, res: Response) {
  await findById(getTeamId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findPlayersByTeamId(getTeamId(req))
    );
}

async function getTeamStatistics(req: Request, res: Response, mode: StatisticsMode) {
  await findById(getTeamId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await generateStatisticsLogsByTeamId(getTeamId(req), mode)
    )
}

export async function getTeamStatisticsAverages(req: Request, res: Response) {
  return getTeamStatistics(req, res, "averages");
}

export async function getTeamStatisticsTotals(req: Request, res: Response) {
  return getTeamStatistics(req, res, "totals");
}

import { getLocalLeague } from "@/services/league.service";
import { generateStatisticsLogsByTeamId, type StatisticsMode } from "@/services/statistics.service";
import { findPlayersByTeamId } from "@/services/team-player.service";
import { TeamService } from "@/services/team.service";
import type { BriefTeamData } from "@/types/team";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getTeamId(req: Request): number {
  return +req.params.id;
}

function getTeamData(req: Request, res: Response): BriefTeamData {
  const { name, shortName, divisionId, activated, archived } = req.body;
  const { id: leagueId } = getLocalLeague(res); /* overwrite any leagueId sent by the front-end data */

  return {
    name, shortName, divisionId, activated, archived, leagueId,
  };
}

export async function getTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).findAll()
    );
}

export async function getTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).findById(getTeamId(req))
    );
}

export async function getTeamsOptions(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).findOptions()
    );
}

export async function getBriefTeams(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).findAll(true)
    );
}

export async function getBriefTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).findById(getTeamId(req), true)
    );
}

export async function createTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.CREATED)
    .json(
      await (new TeamService()).save(getTeamData(req, res))
    );
}

export async function updateTeam(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(
      await (new TeamService()).saveById(getTeamId(req), getTeamData(req, res))
    );
}

export async function getTeamPlayers(req: Request, res: Response) {
  await (new TeamService()).findById(getTeamId(req)); /* trigger an initial failure if not found */

  return res
    .status(StatusCodes.OK)
    .json(
      await findPlayersByTeamId(getTeamId(req))
    );
}

async function getTeamStatistics(req: Request, res: Response, mode: StatisticsMode) {
  await (new TeamService()).findById(getTeamId(req)); /* trigger an initial failure if not found */

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

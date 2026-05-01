import { created, ok } from "@/controllers/base.controller";
import { DivisionService } from "@/services/division.service";
import { getLocalLeague } from "@/services/league.service";
import { generateStatisticsLogsByTeamId, type StatisticsMode } from "@/services/statistics.service";
import { findPlayersByTeamId } from "@/services/team-player.service";
import { TeamService } from "@/services/team.service";
import type { Option } from "@/types/option";
import type { Player } from "@/types/player";
import type { StatisticsLog } from "@/types/statistics-log";
import type { BriefTeam, BriefTeamData, Team } from "@/types/team";
import type { Request, Response } from "express";

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
  const data = await (new TeamService()).findAll() as Team[];
  return ok<Team[]>(res, data);
}

export async function getTeam(req: Request, res: Response) {
  const data = await (new TeamService()).findById(getTeamId(req)) as Team;
  return ok<Team>(res, data);
}

export async function getBriefTeams(req: Request, res: Response) {
  const data = await (new TeamService()).findAll(true) as BriefTeam[];
  return ok<BriefTeam[]>(res, data);
}

export async function getBriefTeam(req: Request, res: Response) {
  const data = await (new TeamService()).findById(getTeamId(req), true) as BriefTeam;
  return ok<BriefTeam>(res, data);
}

export async function createTeam(req: Request, res: Response) {
  const data = await (new TeamService()).save(getTeamData(req, res));
  return created<BriefTeam>(res, data);
}

export async function updateTeam(req: Request, res: Response) {
  const data = await (new TeamService()).saveById(getTeamId(req), getTeamData(req, res));
  return ok<BriefTeam>(res, data);
}

export async function getTeamsOptions(req: Request, res: Response) {
  const data = await (new TeamService()).findOptions();
  return ok<Option[]>(res, data);
}

export async function getTeamPlayers(req: Request, res: Response) {
  await (new TeamService()).findById(getTeamId(req)); /* trigger an initial failure if not found */

  const data = await findPlayersByTeamId(getTeamId(req));
  return ok<Player[]>(res, data);
}

export async function getTeamStatistics(req: Request, res: Response) {
  await (new TeamService()).findById(getTeamId(req)); /* trigger an initial failure if not found */
  const mode = req.params.mode;

  switch (mode) {
    case "averages":
    case "totals":
      const data = await generateStatisticsLogsByTeamId(getTeamId(req), mode);
      return ok<StatisticsLog[]>(res, data);
    default:
      throw Error("Unable to handle requested `mode` for statistics.");
  }
}

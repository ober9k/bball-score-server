import type { Division } from "@/types/division";
import type { Game } from "@/types/game";
import type { TeamLog } from "@/types/game/game-team";
import type { Option } from "@/types/option";
import type { Player } from "@/types/player";
import type { Season } from "@/types/season";
import type { Stats } from "@/types/stats";
import type { Team } from "@/types/team";

export function toSeason(data: any): Season {
  return {
    id:       data.id,
    name:     data.name,
    active:   data.active,
    archived: data.archived,
    leagueId: data.leagueId,
  };
}

export function toDivision(data: any): Division {
  return {
    id:       data.id,
    name:     data.name,
    active:   data.active,
    archived: data.archived,
    seasonId: data.seasonId,
    leagueId: data.leagueId,
  };
}

export function toTeam(data: any): Team {
  return {
    id:         data.id,
    name:       data.name,
    shortName:  data.shortName,
    divisionId: data.divisionId,
    active:     data.active,
    archived:   data.archived,
    leagueId:   data.leagueId,
  };
}

export function toPlayer(data: any): Player {
  return {
    id:       data.id,
    name:     data.name,
    position: data.position,
    number:   data.number,
    height:   data.height,
    active:   data.active,
    archived: data.archived,
    leagueId: data.leagueId,
  };
}

export function toGame(data: any): Game {
  return {
    id:         data.id,
    date:       data.date,
    phase:      data.phase,
    round:      data.round,
    seasonId:   data.seasonId,
    divisionId: data.divisionId,
    active:     data.active,
    archived:   data.archived,
    leagueId:   data.leagueId,
    teamLogs:   data.gameTeams.map(toTeamLog), /* temporary to be renamed */
  };
}

export function toTeamLog(data: any): TeamLog {
  return {
    id:         data.id,
    side:       data.side,
    score:      data.score,
    byPeriod:   data.scoreByPeriod, /* to rename */
    gameId:     data.gameId,
    teamId:     data.teamId,
    playerLogs: [],
  };
}

export function toStats(data: any): Stats {
  return {
    seconds:        data.seconds,
    fgMade:         data.fgMade,
    fgAttempted:    data.fgAttempted,
    fg3Made:        data.fg3Made,
    fg3Attempted:   data.fg3Attempted,
    ftMade:         data.ftMade,
    ftAttempted:    data.ftAttempted,
    points:         data.points,
    offRebounds:    data.offRebounds,
    defRebounds:    data.defRebounds,
    rebounds:       data.rebounds,
    assists:        data.assists,
    steals:         data.steals,
    blocks:         data.blocks,
    turnovers:      data.turnovers,
    personalFouls:  data.personalFouls,
    technicalFouls: data.technicalFouls,
  };
}

export function toOption(data: { id: number, name: string }): Option {
  return {
    value: data.id,
    label: data.name,
  };
}

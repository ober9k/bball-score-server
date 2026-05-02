import type { Activatable, Archivable } from "@/types/base";
import type { BriefDivision, Division } from "@/types/division";
import type { BriefGame, Game, PlayerLog, TeamLog } from "@/types/game";
import type { Option } from "@/types/option";
import type { BriefPlayer, Player } from "@/types/player";
import type { BriefSeason, Season } from "@/types/season";
import type { Stats } from "@/types/stats";
import type { BasicTeam, BriefTeam, Team } from "@/types/team";

function withActivatable(data: any): Activatable {
  return {
    activated: data.active, /* todo: to be renamed */
  };
}

function withArchivable(data: any): Archivable {
  return {
    archived: data.archived, /* todo: to be renamed */
  };
}

function withLeagueId(data: any): { leagueId: number } {
  return {
    leagueId: data.leagueId, /* todo: to be renamed */
  };
}

export function toSeason(data: any): Season {
  return {
    id:       data.id,
    name:     data.name,
    active:   data.active,
    archived: data.archived,
    leagueId: data.leagueId,
  };
}

export function toBriefSeason(data: any): BriefSeason {
  return {
    id:        data.id,
    name:      data.name,
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
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

export function toBriefDivision(data: any): BriefDivision {
  return {
    id:       data.id,
    name:     data.name,
    seasonId: data.seasonId,
    season:   toBriefSeason(data.season),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
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

export function toBriefTeam(data: any): BriefTeam {
  return {
    id:         data.id,
    name:       data.name,
    shortName:  data.shortName,
    divisionId: data.divisionId,
    division:   toBriefDivision(data.division),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toBasicTeam(data: any): BasicTeam {
  return {
    id:        data.id,
    name:      data.name,
    shortName: data.shortName,
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

export function toBriefPlayer(data: any): BriefPlayer {
  return {
    id:       data.id,
    name:     data.name,
    position: data.position,
    number:   data.number,
    height:   data.height,
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toGame(data: any): Game {
  return {
    id:         data.id,
    date:       data.date,
    phase:      data.phase,
    round:      data.round,
    seasonId:   data.seasonId,
    season:     toSeason(data.season),
    divisionId: data.divisionId,
    division:   toDivision(data.division),
    active:     data.active,
    archived:   data.archived,
    leagueId:   data.leagueId,
    teamLogs:   data.teamLogs.map(toTeamLog),
  };
}

export function toBriefGame(data: any): BriefGame {
  return {
    id:         data.id,
    date:       data.date,
    phase:      data.phase,
    round:      data.round,
    seasonId:   data.seasonId,
    season:     toBriefSeason(data.season),
    divisionId: data.divisionId,
    division:   toBriefDivision(data.division),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toShallowGame(data: any): any {
  return {
    id:       data.id,
    date:     data.date,
    phase:    data.phase,
    round:    data.round,
    teamLogs: (data.teamLogs || []).map(toShallowTeamLog)
  };
}

export function toTeamLog(data: any): TeamLog {
  return {
    id:         data.id,
    side:       data.side,
    score:      data.score,
    byPeriod:   data.byPeriod,
    gameId:     data.gameId,
    teamId:     data.teamId,
    team:       toTeam(data.team),
    playerLogs: data.playerLogs.map(toPlayerLog),
  };
}

export function toShallowTeamLog(data: any): any {
  return {
    id:         data.id,
    side:       data.side,
    score:      data.score,
    byPeriod:   data.byPeriod,
    teamId:     data.teamId,
    team:       toTeam(data.team),
    playerLogs: data.playerLogs.map(toShallowPlayerLog),
  };
}

export function toPlayerLog(data: any): PlayerLog {
  const result: PlayerLog = {
    started:  data.started,
    stats:    toStats(data),
    playerId: data.playerId,
    player:   toPlayer(data.player),
  };

  if (data.season) {
    result.seasonId = data.seasonId;
    result.season = toSeason(data.season);
  }

  if (data.game) {
    result.gameId = data.gameId;
    result.game = toShallowGame(data.game);
  }

  return result;
}

export function toShallowPlayerLog(data: any): any {
  return {
    playerId: data.playerId,
    player:   toPlayer(data.player),
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

export function toOption(data: { id: number | string, name: string }): Option {
  return {
    value: data.id,
    label: data.name,
  };
}

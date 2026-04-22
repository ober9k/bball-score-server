import type { Division } from "@/types/division";
import type { Option } from "@/types/option";
import type { Season } from "@/types/season";
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
  }
}

export function toOption(data: { id: number, name: string }): Option {
  return {
    value: data.id,
    label: data.name,
  };
}

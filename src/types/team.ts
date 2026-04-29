import type { Activatable, Archivable } from "@/types/base";
import type { BriefDivision } from "@/types/division";

export type Team = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
  active:     boolean,
  archived:   boolean,
  leagueId:   number,
};

export type BriefTeam = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
  division:   BriefDivision,
} & Activatable & Archivable;

export type TeamData = Omit<Team, "id">;

export type BriefTeamData = Omit<BriefTeam, "id">;

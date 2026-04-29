import type { Activatable, Archivable } from "@/types/base";

export type Season = {
  id:       number,
  name:     string,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type BriefSeason = {
  id:       number,
  name:     string,
} & Activatable & Archivable;

export type SeasonData = Omit<Season, "id">;

export type BriefSeasonData = Omit<BriefSeason, "id">;

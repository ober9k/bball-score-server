import type { Activatable, Archivable } from "@/types/base";
import type { BriefSeason } from "@/types/season";

export type Division = {
  id:       number,
  name:     string,
  seasonId: number,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type BriefDivision = {
  id:       number,
  name:     string,
  seasonId: number,
  season:   BriefSeason,
} & Activatable & Archivable;

export type DivisionData = Omit<Division, "id">;

export type BriefDivisionData = Omit<BriefDivision, "id" | "season">;

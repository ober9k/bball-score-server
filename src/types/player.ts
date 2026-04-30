import type { Activatable, Archivable } from "@/types/base";
import type { PositionType } from "@/types/player/position";

export type Player = {
  id:       number,
  name:     string,
  position: PositionType,
  number:   string,
  height:   string,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type BriefPlayer = {
  id:       number,
  name:     string,
  position: PositionType,
  number:   string,
  height:   string,
  leagueId: number,
} & Activatable & Archivable;

export type PlayerData = Omit<Player, "id">;

export type BriefPlayerData = Omit<BriefPlayer, "id">;

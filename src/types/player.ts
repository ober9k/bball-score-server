import type { PositionType } from "@/types/player/position";

export type Player = {
  id: number,
  name: string,
  position: PositionType,
  number: string,
  height: string,
  active: boolean,
  archived: boolean,
  leagueId: number,
};

export type PlayerData = Omit<Player, "id">;

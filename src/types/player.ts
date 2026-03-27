import type { Position } from "@/types/player/position";

export type Player = {
  id: number,
  name: string,
  position: Position,
  number: string,
  height: string,
  leagueId: number,
};

export type PlayerData = Omit<Player, "id">;

import type { Position } from "./player/position";
import type { Team } from "./team";

export type Player = {
  id: number,
  name: string,
  position: Position,
  number: string,
  height: string,
  team: Team | undefined, /* expectation, always set */
};

export type NewPlayer = Omit<Player, "id">;

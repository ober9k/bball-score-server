import type { Player } from "@/types/player";
import type { Team } from "@/types/team";

export type TeamPlayer = {
  teamId: number,
  playerId: number,
  team: Team,
  player: Player,
};

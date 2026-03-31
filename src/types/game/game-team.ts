import type { GameTeamPlayer } from "@/types/game/game-team-player";
import type { GameTeamSideType } from "@/types/game/game-team-side";

export type GameTeam = {
  teamSide: GameTeamSideType,
  score: number,
  scoreByPeriod: number[],
  gameId: number,
  teamId: number,
  gameTeamPlayers: GameTeamPlayer[],
}

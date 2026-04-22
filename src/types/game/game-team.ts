import type { GameTeamPlayer } from "@/types/game/game-team-player";
import type { GameTeamSideType, SideType } from "@/types/game/game-team-side";
import type { Stats } from "@/types/stats";

export type GameTeam = {
  teamSide: GameTeamSideType,
  score: number,
  scoreByPeriod: number[],
  gameId: number,
  teamId: number,
  gameTeamPlayers: GameTeamPlayer[],
};

export type TeamLog = {
  id:         number,
  side:       SideType,
  score:      number,
  byPeriod:   number[], /* score by period */
  gameId:     number,
  teamId:     number,
  playerLogs: PlayerLog[],
};

export type PlayerLog = {
  started:  boolean,
  stats:    Stats,
  playerId: number,
};

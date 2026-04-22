import type { GameTeamPlayer } from "@/types/game/game-team-player";
import type { GameTeamSideType, SideType } from "@/types/game/game-team-side";
import type { Player } from "@/types/player";
import type { Stats } from "node:fs";

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
  playerId: number,
  started:  boolean,
  stats:    Stats,
};

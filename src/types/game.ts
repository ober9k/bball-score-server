import type { Division } from "@/types/division";
import type { Player } from "@/types/player";
import type { Season } from "@/types/season";
import type { Stats } from "@/types/stats";
import type { Team } from "@/types/team";

export const Phase = {
  PRE_SEASON:     "PRE_SEASON",
  REGULAR_SEASON: "REGULAR_SEASON",
  POST_SEASON:    "POST_SEASON",
} as const;

export type PhaseType = typeof Phase[keyof typeof Phase];

export const Side = {
  AWAY_TEAM: "AWAY_TEAM",
  HOME_TEAM: "HOME_TEAM",
} as const;

export type SideType = typeof Side[keyof typeof Side];

export type Game = {
  id:         number,
  date:       Date,
  phase:      PhaseType,
  round:      number,
  active:     boolean,
  archived:   boolean,
  leagueId:   number,
  seasonId:   number,
  season:     Season,
  divisionId: number,
  division:   Division,
  teamLogs:   TeamLog[],
};

export type GameData = Omit<Game, "id" | "teamLogs">;

export type TeamLog = {
  id:         number,
  side:       SideType,
  score:      number,
  byPeriod:   number[], /* score by period */
  gameId:     number,
  teamId:     number,
  team:       Team,
  playerLogs: PlayerLog[],
};

export type PlayerLog = {
  started:  boolean,
  stats:    Stats,
  playerId: number,
  player:   Player,
  /* temp */
  seasonId?: number,
  season?:   Season,
  gameId?:   number,
  game?:     Game,
};

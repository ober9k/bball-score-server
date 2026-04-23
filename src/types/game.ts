import type { Stats } from "@/types/stats";

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
  divisionId: number,
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
  playerLogs: PlayerLog[],
};

export type PlayerLog = {
  started:  boolean,
  stats:    Stats,
  playerId: number,
};

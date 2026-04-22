export const GameTeamSide = {
  AWAY_TEAM: "AWAY_TEAM",
  HOME_TEAM: "HOME_TEAM",
} as const;

export const Side = GameTeamSide;

export type GameTeamSideType = typeof GameTeamSide[keyof typeof GameTeamSide];
export type SideType = typeof Side[keyof typeof Side];

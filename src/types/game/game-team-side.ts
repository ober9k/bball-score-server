export const GameTeamSide = {
  AWAY_TEAM: "AWAY_TEAM",
  HOME_TEAM: "HOME_TEAM",
} as const;

export type GameTeamSideType = typeof GameTeamSide[keyof typeof GameTeamSide];

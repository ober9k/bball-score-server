export const GamePhase = {
  PRE_SEASON:     "PRE_SEASON",
  REGULAR_SEASON: "REGULAR_SEASON",
  POST_SEASON:    "POST_SEASON",
} as const;

export type GamePhaseType = typeof GamePhase[keyof typeof GamePhase];

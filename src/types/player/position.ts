export const Position = {
  POINT_GUARD:    "POINT_GUARD",
  SHOOTING_GUARD: "SHOOTING_GUARD",
  SMALL_FORWARD:  "SMALL_FORWARD",
  POWER_FORWARD:  "POWER_FORWARD",
  CENTER:         "CENTER",
} as const;

export type PositionType = typeof Position[keyof typeof Position];

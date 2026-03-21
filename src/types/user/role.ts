export const Role = {
  GUEST:         "GUEST",
  USER:          "USER",
  MANAGER:       "MANAGER",
  ADMINISTRATOR: "ADMINISTRATOR",
} as const;

export type RoleType = typeof Role[keyof typeof Role];

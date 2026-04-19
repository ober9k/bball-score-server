import type { Team } from "@/types/team.ts";

export type StandingsLog = {
  id:            number,
  team:          Team,
  wins:          number,
  losses:        number,
  draws:         number,
  byes:          number,
  pointsFor:     number,
  pointsAgainst: number,
};

import type { Team } from "@/types/team.ts";

export type StandingsLog = {
  id:            number,
  team:          Team,
  played:        number,
  wins:          number,
  losses:        number,
  draws:         number,
  byes:          number,
  forfeits:      number,
  pointsFor:     number,
  pointsAgainst: number,
};

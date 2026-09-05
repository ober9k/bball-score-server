import type { BasicTeam } from "@/types/team.ts";

export type StandingsLog = {
  id:            number,
  team:          BasicTeam,
  played:        number,
  wins:          number,
  losses:        number,
  draws:         number,
  byes:          number,
  forfeits:      number,
  points:        number,
  differential:  number,
};

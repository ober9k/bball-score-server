import type { League } from "./league";

export type Season = {
  id: number,
  name: string,
  league: League | undefined, /* expectation, always set */
};

export type NewSeason = Omit<Season, "id">;

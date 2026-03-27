import type { League } from "./league";

export type Season = {
  id: number,
  name: string,
};

export type NewSeason = Omit<Season, "id">;

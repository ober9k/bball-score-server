import type { Season } from "./season";

export type Division = {
  id: number,
  name: string,
  season: Season | undefined, /* expectation, always set */
};

export type NewDivision = Omit<Division, "id">;

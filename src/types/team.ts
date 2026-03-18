import type { Division } from "./division";

export type Team = {
  id: number,
  name: string,
  shortName: string,
  division: Division | undefined, /* expectation, always set */
};

export type NewTeam = Omit<Team, "id">;

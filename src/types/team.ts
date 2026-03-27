import type { Division } from "./division";

export type Team = {
  id: number,
  name: string,
  shortName: string,
};

export type NewTeam = Omit<Team, "id">;

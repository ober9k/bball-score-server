export type Division = {
  id: number,
  name: string,
  active: boolean,
  archived: boolean,
  leagueId: number,
  seasonId: number,
};

export type DivisionData = Omit<Division, "id">;
